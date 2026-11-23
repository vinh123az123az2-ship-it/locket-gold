/**
 * LOCKET GOLD VIP - Cloudflare Worker
 * Tác giả: langtucamau
 *
 * Xử lý AI filter (Google Gemini) + Photobooth (4-shot grid)
 *
 * Deploy: npx wrangler deploy
 * Env vars cần set:
 *   GEMINI_API_KEY  - Google AI Studio API key
 *   WORKER_SECRET   - Pre-shared secret cho auth (set cùng giá trị trong locket_ai.js)
 */

const FILTER_PROMPTS = {
  grab_rider: "Transform this person into a Grab delivery rider wearing a bright green Grab jacket and green Grab helmet, riding a motorbike. Keep the face recognizable.",
  shopee_food: "Transform this person into a ShopeeFood delivery rider wearing an orange ShopeeFood uniform with orange cap and carrying a delivery bag. Keep the face recognizable.",
  gta_v: "Transform this photo into GTA V loading screen art style with bold outlines, saturated colors, and dramatic lighting. Keep the composition similar.",
  anime_art: "Transform this photo into high-quality Japanese anime art style like Studio Ghibli, with smooth cel-shading and vivid colors. Keep the face recognizable.",
  minecraft: "Transform this photo into Minecraft pixel art block style, as if the person and scene were built from Minecraft blocks.",
  vintage_film: "Apply a vintage 1970s analog film camera effect with warm tones, film grain, light leaks, and slight vignette. Make it look like a real old photograph.",
  cyberpunk: "Transform this photo into cyberpunk 2077 style with neon lights, rain-slicked streets, holographic elements, and a futuristic dark atmosphere.",
  watercolor: "Transform this photo into a beautiful watercolor painting with soft edges, visible brush strokes, and gentle color bleeding.",
  squid_game: "Transform this person into a Squid Game player wearing the teal-green tracksuit with number 456, in a dramatic Squid Game scene.",
  barbie: "Transform this photo into Barbie movie style with everything in bright pink aesthetic, glossy plastic-like finish, and dreamy pink lighting.",
  naruto: "Transform this person into a Naruto ninja character with a Konoha headband, ninja outfit, and anime action pose. Keep the face recognizable.",
  spider_man: "Transform this person into Spider-Man wearing the classic red and blue Spider-Man suit, in a dynamic web-slinging pose on a city rooftop.",
  oil_painting: "Transform this photo into a classical oil painting in the style of the Old Masters, with rich textures, dramatic chiaroscuro lighting, and visible brush strokes.",
  pop_art: "Transform this photo into Andy Warhol style pop art with bold colors, halftone dots, and high contrast comic-book-like appearance.",
  studio_ghibli: "Transform this photo into a scene from a Studio Ghibli animated film with lush colors, dreamy atmosphere, and hand-painted background quality.",
  pixel_art: "Transform this photo into detailed 16-bit pixel art style like a classic SNES RPG game, with visible square pixels and limited color palette.",
  lego: "Transform this photo so everything looks built from LEGO bricks, including the person, background, and objects. Maintain recognizable features.",
  clay: "Transform this photo into a claymation / stop-motion clay figure style, with visible clay texture and fingerprint marks on smooth surfaces.",
  comic_book: "Transform this photo into a detailed comic book panel with ink outlines, Ben-Day dots, dramatic shadows, and speech bubble elements.",
  neon: "Transform this photo with intense neon glow effects, as if everything is outlined in bright neon tubes against a dark background."
};

const GEMINI_EDIT_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent";
const MAX_IMAGE_BYTES = 10 * 1024 * 1024;

// Route gọi API trả phí → bắt buộc X-Worker-Secret. /img/, /health, /filters mở (read-only)
// /generateFilteredImage KHÔNG gate: app tới qua 307 URL Rewrite (genuine Firebase callable
// POST), không mang X-Worker-Secret. Chống lạm dụng bằng isAllowedImageUrl (ảnh phải là
// firebasestorage bucket locket-*). Các route khác vẫn gate.
const PAID_ROUTES = { "/edit": 1, "/filter": 1, "/photobooth": 1, "/models": 1 };

function timingSafeEqual(a, b) {
  if (typeof a !== "string" || typeof b !== "string" || a.length !== b.length) return false;
  var out = 0;
  for (var i = 0; i < a.length; i++) out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return out === 0;
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    const corsHeaders = {
      "Access-Control-Allow-Origin": env.ALLOWED_ORIGIN || "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Filter-Id, X-Shot-Number, X-Session-Id"
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    // Gate các route tốn tiền (gọi API trả phí): yêu cầu X-Worker-Secret khớp
    if (PAID_ROUTES[path]) {
      // Query ?s= CHỈ chấp nhận cho GET /generateFilteredImage (app follow 302 không gửi
      // được custom header). Mọi route khác (/edit /filter /photobooth /models + POST
      // generateFilteredImage) vẫn header-only, không nới lỏng.
      // App follow 302 có thể giữ method POST (URLSession preserve) → nhận ?s= cho MỌI
      // method trên đúng route filter. Route khác vẫn header-only.
      var allowQuerySecret = (path === "/generateFilteredImage");
      var provided = request.headers.get("X-Worker-Secret") || (allowQuerySecret ? (url.searchParams.get("s") || "") : "");
      if (!env.WORKER_SECRET || !timingSafeEqual(provided, env.WORKER_SECRET)) {
        return json({ error: "unauthorized" }, corsHeaders, 401);
      }
    }

    try {
      if (path === "/health") {
        return json({ status: "ok", filters: Object.keys(FILTER_PROMPTS).length }, corsHeaders);
      }


      if (path === "/filters") {
        return json({ filters: Object.keys(FILTER_PROMPTS) }, corsHeaders);
      }

      // getFilters: app tới qua 307 URL Rewrite (genuine callable). Trả 42 AI filter (có
      // category → app tự nhóm trong thanh). Bearer-gate như generateFilteredImage.
      if (path === "/getFilters") {
        var gfAuth = request.headers.get("Authorization") || request.headers.get("authorization") || "";
        if (!/^Bearer\s+[A-Za-z0-9._-]{20,}/.test(gfAuth)) {
          return json({ error: "unauthorized" }, corsHeaders, 401);
        }
        return await handleGetFilters(env, corsHeaders);
      }

      // Debug: list model shopaikey khả dụng (gated bằng secret)
      if (path === "/models") {
        if (!env.SHOPAIKEY_KEY) return json({ error: "no key" }, corsHeaders, 500);
        var mr = await fetch("https://api.shopaikey.com/v1/models", { headers: { "Authorization": "Bearer " + env.SHOPAIKEY_KEY } });
        var mt = await mr.text();
        return new Response(mt, { status: mr.status, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      if (path === "/filter" && request.method === "POST") {
        return await handleFilter(request, env, url, corsHeaders);
      }

      if (path === "/photobooth" && request.method === "POST") {
        return await handlePhotobooth(request, env, url, corsHeaders);
      }

      // Backend AI filter: nhận {imageUrl, prompt}, generate, host ảnh, trả outputUrl
      if (path === "/edit" && request.method === "POST") {
        return await handleEdit(request, env, url, corsHeaders);
      }

      // generateFilteredImage: app có thể tới đây 3 kiểu →
      //  - GET (302 follow chuẩn): params trên query
      //  - POST giữ method khi follow 302: params trên query (body có thể rỗng)
      //  - POST gốc chưa redirect / curl test: params trong body
      // Hễ có image_url trên QUERY → xài query (bất kể GET/POST). Không thì đọc body.
      if (path === "/generateFilteredImage") {
        // Auth cho MỌI đường vào runFilter (GET + POST). App genuine luôn có Bearer firebase-jwt.
        var gAuth = request.headers.get("Authorization") || request.headers.get("authorization") || "";
        if (!/^Bearer\s+[A-Za-z0-9._-]{20,}/.test(gAuth)) {
          return json({ error: "unauthorized" }, corsHeaders, 401);
        }
        var qImg = url.searchParams.get("image_url") || url.searchParams.get("imageUrl");
        if (qImg) {
          return await handleGenerateFilteredImageGet(request, env, url, corsHeaders, ctx);
        }
        if (request.method === "POST") {
          return await handleGenerateFilteredImage(request, env, url, corsHeaders, ctx);
        }
      }

      // Serve ảnh đã generate (host trên KV) — read-only, mở để app tải ảnh
      if (path.indexOf("/img/") === 0) {
        return await serveImage(request, env, path, corsHeaders);
      }

      // (route /selftest đã gỡ sau khi xác nhận model shopaikey ra ảnh OK)

      return json({ error: "not found" }, corsHeaders, 404);
    } catch (err) {
      return json({ error: "image processing failed" }, corsHeaders, 500);
    }
  }
};

var IMG_HOST_FIELDS = ["imageUrl", "image_url", "inputUrl", "input_url", "url", "downloadUrl", "download_url"];
var PROMPT_FIELDS = ["prompt", "text_prompt", "instruction"];
var FILTER_ID_FIELDS = ["filterId", "filter_id", "filter", "stickerId", "sticker_id", "sticker", "effectId", "effect_id", "styleId", "style_id", "type"];
var ALLOWED_IMG_HOSTS = ["firebasestorage.googleapis.com", "storage.googleapis.com", "locketcamera.com", "cdn.locketcamera.com"];

function pickField(body, fields) {
  var containers = [body, body && body.data];
  for (var c = 0; c < containers.length; c++) {
    var obj = containers[c];
    if (!obj || typeof obj !== "object") continue;
    for (var i = 0; i < fields.length; i++) {
      var v = obj[fields[i]];
      if (typeof v === "string" && v.trim()) return v.trim();
    }
  }
  return "";
}

function isLocketBucket(b) {
  return typeof b === "string" && /^locket[-_]/i.test(b);
}

function isAllowedImageUrl(u) {
  try {
    var h = new URL(u);
    if (h.protocol !== "https:") return false;
    var host = h.hostname;
    var path = h.pathname || "";
    // firebasestorage: /v0/b/<bucket>/o/... — parse bucket chính xác
    if (host === "firebasestorage.googleapis.com") {
      var m = path.match(/^\/v0\/b\/([^\/]+)\/o\//);
      return !!m && isLocketBucket(decodeURIComponent(m[1]));
    }
    // storage.googleapis.com/<bucket>/... hoặc <bucket>.storage.googleapis.com/...
    if (host === "storage.googleapis.com") {
      var seg = path.match(/^\/([^\/]+)\//);
      return !!seg && isLocketBucket(decodeURIComponent(seg[1]));
    }
    if (host.endsWith(".storage.googleapis.com")) {
      return isLocketBucket(host.replace(".storage.googleapis.com", ""));
    }
    if (host === "locketcamera.com" || host.endsWith(".locketcamera.com")) return true;
  } catch (e) {}
  return false;
}

var SHOPAIKEY_CHAT_URL = "https://api.shopaikey.com/v1/chat/completions";
var SHOPAIKEY_MODEL = "gemini-2.5-flash-image";

function extractB64FromContent(content) {
  if (typeof content !== "string") return "";
  // dạng ![image](data:image/...;base64,XXXX)
  var m = content.match(/data:image\/[a-z]+;base64,([A-Za-z0-9+/=]+)/i);
  return m ? m[1] : "";
}

// Móc ảnh ra khỏi MỌI format shopaikey/OpenAI hay trả:
//  - data[].b64_json | data[].url            (OpenAI images)
//  - message.images[]: string | {url} | {image_url:{url}} | {b64_json}
//  - message.content: string markdown | array parts
// Trả { b64 } hoặc { url }, null nếu không thấy.
function extractImageFromResponse(rd) {
  // allowUrl=true chỉ cho field ảnh CÓ CẤU TRÚC (data[].url, images[].url,
  // image_url.url). Free-text content → chỉ nhận data:base64, KHÔNG nhận http
  // URL (tránh SSRF: provider nhét link nội bộ vào text rồi Worker fetch).
  function fromStr(s, allowUrl) {
    if (typeof s !== "string") return null;
    var m = s.match(/data:image\/[a-z0-9.+-]+;base64,([A-Za-z0-9+/=]+)/i);
    if (m) return { b64: m[1] };
    if (allowUrl && /^https:\/\//i.test(s.trim())) return { url: s.trim() };
    return null;
  }
  if (!rd || typeof rd !== "object") return null;

  if (Array.isArray(rd.data)) {
    for (var d = 0; d < rd.data.length; d++) {
      var it = rd.data[d];
      if (!it) continue;
      if (it.b64_json) return { b64: it.b64_json };
      if (typeof it.url === "string") { var ru = fromStr(it.url, true); if (ru) return ru; }
    }
  }

  var msg = rd.choices && rd.choices[0] && rd.choices[0].message ? rd.choices[0].message : null;
  if (msg) {
    if (Array.isArray(msg.images)) {
      for (var i = 0; i < msg.images.length; i++) {
        var im = msg.images[i];
        if (!im) continue;
        if (typeof im === "string") { var r1 = fromStr(im, true); if (r1) return r1; }
        else {
          if (im.b64_json) return { b64: im.b64_json };
          if (typeof im.url === "string") { var r2 = fromStr(im.url, true); if (r2) return r2; }
          if (im.image_url && typeof im.image_url.url === "string") { var r3 = fromStr(im.image_url.url, true); if (r3) return r3; }
        }
      }
    }
    if (typeof msg.content === "string") { var r4 = fromStr(msg.content, false); if (r4) return r4; }
    if (Array.isArray(msg.content)) {
      for (var c = 0; c < msg.content.length; c++) {
        var p = msg.content[c];
        if (!p) continue;
        if (typeof p === "string") { var r5 = fromStr(p, false); if (r5) return r5; }
        else {
          if (p.text) { var r6 = fromStr(p.text, false); if (r6) return r6; }
          if (p.image_url && typeof p.image_url.url === "string") { var r7 = fromStr(p.image_url.url, true); if (r7) return r7; }
          if (p.inlineData && p.inlineData.data) return { b64: p.inlineData.data };
        }
      }
    }
  }
  return null;
}

// Tải ảnh output từ URL provider một cách an toàn: bắt buộc https, không theo
// redirect, Content-Type phải image/*, chặn size theo MAX_IMAGE_BYTES. Trả b64
// hoặc "" nếu không hợp lệ. (Chống SSRF + ảnh khổng lồ từ URL provider trả.)
async function fetchImageB64(u) {
  try {
    var h = new URL(u);
    if (h.protocol !== "https:") return "";
  } catch (e) { return ""; }
  var ir;
  try { ir = await fetch(u, { redirect: "manual" }); } catch (e) { return ""; }
  if (!ir.ok) return "";
  var ct = ir.headers.get("content-type") || "";
  if (!/^image\//i.test(ct)) return "";
  var cl = parseInt(ir.headers.get("content-length") || "0", 10);
  if (cl && cl > MAX_IMAGE_BYTES) return "";
  var buf;
  try { buf = await ir.arrayBuffer(); } catch (e) { return ""; }
  if (buf.byteLength > MAX_IMAGE_BYTES) return "";
  return arrayBufferToBase64(buf);
}

// Log debug vào KV (last_generate) — KHÔNG in cả ảnh b64 khổng lồ
async function logGenerate(env, obj) {
  if (!env.CAPTURE) return;
  try { obj.at = Date.now(); await env.CAPTURE.put("last_generate", JSON.stringify(obj), { expirationTtl: 3600 }); } catch (e) {}
}
function shapeOf(rd) {
  try {
    var s = { top: Object.keys(rd) };
    var m = rd.choices && rd.choices[0] && rd.choices[0].message;
    if (m) {
      s.msg = Object.keys(m);
      if (Array.isArray(m.images)) s.images0 = (m.images[0] && typeof m.images[0] === "object") ? Object.keys(m.images[0]) : typeof m.images[0];
    }
    if (Array.isArray(rd.data)) s.data0 = rd.data[0] ? Object.keys(rd.data[0]) : "empty";
    return s;
  } catch (e) { return null; }
}
function safeSnippet(rd) {
  try {
    return JSON.stringify(rd, function (k, v) {
      if (typeof v === "string" && v.length > 140) return v.slice(0, 140) + "…[" + v.length + "]";
      return v;
    }).slice(0, 2200);
  } catch (e) { return ""; }
}

async function handleEdit(request, env, url, corsHeaders) {
  var resp = await doEdit(request, env, url, corsHeaders);
  // Log kết quả /edit vào KV để debug (status + body ngắn)
  if (env.CAPTURE) {
    try {
      var clone = resp.clone();
      var txt = await clone.text();
      await env.CAPTURE.put("last_edit", JSON.stringify({ status: resp.status, body: txt.slice(0, 400), at: Date.now() }), { expirationTtl: 3600 });
    } catch (e) {}
  }
  return resp;
}

var DEFAULT_PROMPT = "Enhance this photo with a subtle cinematic look. Keep faces, pose and background unchanged.";

// Tải ảnh gốc → shopaikey generate → trả { ok, b64, error }. KHÔNG host.
async function generateImageB64(env, imageUrl, prompt, modelOverride) {
  var apiKey = env.SHOPAIKEY_KEY;
  if (!apiKey) return { ok: false, error: "not_configured" };
  if (!isAllowedImageUrl(imageUrl)) return { ok: false, error: "unsafe_image_host" };
  if (!prompt) prompt = DEFAULT_PROMPT;

  var imgResp;
  try { imgResp = await fetch(imageUrl, { redirect: "manual" }); } catch (e) { return { ok: false, error: "image_download_failed" }; }
  if (!imgResp.ok) return { ok: false, error: "image_download_failed" };
  var inBuf = await imgResp.arrayBuffer();
  if (inBuf.byteLength > MAX_IMAGE_BYTES) return { ok: false, error: "request_too_large" };
  var inMime = imgResp.headers.get("content-type") || "image/jpeg";
  var dataUrl = "data:" + inMime + ";base64," + arrayBufferToBase64(inBuf);

  var resp;
  var ac = new AbortController();
  var to = setTimeout(function () { ac.abort(); }, 150000);
  try {
    resp = await fetch(SHOPAIKEY_CHAT_URL, {
      method: "POST",
      signal: ac.signal,
      headers: { "Authorization": "Bearer " + apiKey, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: (modelOverride || env.SHOPAIKEY_MODEL || SHOPAIKEY_MODEL),
        messages: [{
          role: "user",
          content: [
            { type: "text", text: prompt + " Output the edited image only." },
            { type: "image_url", image_url: { url: dataUrl } }
          ]
        }]
      })
    });
  } catch (e) { clearTimeout(to); return { ok: false, error: ac.signal.aborted ? "provider_timeout" : "provider_unavailable" }; }
  clearTimeout(to);

  if (!resp.ok) {
    var errTxt = ""; try { errTxt = await resp.text(); } catch (e2) {}
    await logGenerate(env, { stage: "provider_http", status: resp.status, body: errTxt.slice(0, 1500) });
    return { ok: false, error: "provider_rejected_request" };
  }

  var rd;
  try { rd = await resp.json(); } catch (e) {
    await logGenerate(env, { stage: "non_json", status: resp.status });
    return { ok: false, error: "invalid_provider_response" };
  }

  var pick = extractImageFromResponse(rd);
  await logGenerate(env, { stage: pick ? "got_image" : "no_image_field", status: resp.status, shape: shapeOf(rd), snippet: safeSnippet(rd) });
  if (!pick) return { ok: false, error: "invalid_generated_image" };

  var outB64 = pick.b64 || "";
  if (!outB64 && pick.url) outB64 = await fetchImageB64(pick.url);
  if (!outB64) return { ok: false, error: "invalid_generated_image" };
  return { ok: true, b64: outB64 };
}

// Dùng cho /edit (đồng bộ): generate → host random id → { ok, outputUrl, error }
async function generateAndHost(env, url, imageUrl, prompt) {
  var r = await generateImageB64(env, imageUrl, prompt);
  if (!r.ok) return r;
  if (!env.CAPTURE) return { ok: false, error: "storage_unavailable" };
  var id = crypto.randomUUID().replace(/-/g, "");
  await env.CAPTURE.put("img:" + id, r.b64, { expirationTtl: 900 });
  var token = await signImgId(env, id);
  if (!token) return { ok: false, error: "signing_unavailable" };
  return { ok: true, outputUrl: url.origin + "/img/" + id + token + ".jpg" };
}

// shopaikey quá tải chập chờn (503 overloaded) + 2.5-flash đôi khi refuse → retry + xoay model.
// Gen async có ngân sách ~45s (serveImage poll) → thử tối đa 4 lượt, mỗi lượt ~10-15s.
var MODEL_ROTATION = ["gemini-2.5-flash-image", "gemini-3.1-flash-image-preview", "gemini-3-pro-image-preview", "gemini-2.5-flash-image"];

// Dùng cho native filter (bất đồng bộ): generate nền (retry+rotate), lưu img:<id> hoặc marker lỗi
async function generateToId(env, id, imageUrl, prompt) {
  var models = [(env.SHOPAIKEY_MODEL || SHOPAIKEY_MODEL)].concat(MODEL_ROTATION);
  var lastErr = "fail";
  for (var i = 0; i < models.length && i < 2; i++) {
    try {
      var r = await generateImageB64(env, imageUrl, prompt, models[i]);
      if (r.ok && r.b64) {
        await env.CAPTURE.put("img:" + id, r.b64, { expirationTtl: 900 });
        return;
      }
      lastErr = r.error || "fail";
      // Lỗi KHÔNG đáng retry (ảnh/host sai) → dừng sớm.
      if (lastErr === "unsafe_image_host" || lastErr === "image_download_failed" || lastErr === "not_configured" || lastErr === "request_too_large") break;
    } catch (e) { lastErr = "exception"; }
  }
  try { await env.CAPTURE.put("img:" + id, "ERR:" + lastErr, { expirationTtl: 300 }); } catch (e2) {}
}

// Danh sách AI filter cho thanh chọn (42 filter, host trên GitHub raw để sửa không cần redeploy).
var AI_FILTERS_URL = "https://raw.githubusercontent.com/vinh123az123az2-ship-it/locket-gold/refs/heads/master/locketgold/ai_filters.json";

// getFilters: trả danh sách filter theo đúng khung callable đã capture
// {result:{data:{filters,friend_filters},status}} + mirror top-level (giống rival).
async function handleGetFilters(env, corsHeaders) {
  var filters = [];
  try {
    var r = await fetch(AI_FILTERS_URL, { cf: { cacheTtl: 300, cacheEverything: true } });
    if (r.ok) { var arr = await r.json(); if (Array.isArray(arr)) filters = arr; }
  } catch (e) {}
  var data = { filters: filters, friend_filters: [] };
  return new Response(JSON.stringify({ result: { data: data, status: 200 }, data: data, status: 200 }), {
    headers: Object.assign({ "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" }, corsHeaders)
  });
}

// Payload = GenerateFilteredImagePayload{outputUrl:URL} (field descriptor @39426476, 1 field).
// ★ ENVELOPE (RE ground truth 2026-11-20): binary có chuỗi lỗi FirebaseFunctions SDK:
//   ".call()  → 'Response is missing data field.'            → đòi key DATA"
//   ".stream()→ 'Response is missing result or message field'→ đòi result/message"
// KHÔNG có 'missing result field' riêng → .call() dùng {"data":<payload>}, KHÔNG phải result.
// App gửi accept */* = .call() → non-stream trả DATA. Stream (SSE) giữ result.
function nativeFilterResponse(outputUrl, inputImageUrl, prompt, filterType, corsHeaders, wantsStream) {
  if (wantsStream) {
    var sse = "data: " + JSON.stringify({ result: { outputUrl: outputUrl } }) + "\n\n";
    return new Response(sse, {
      headers: Object.assign({ "Content-Type": "text/event-stream; charset=utf-8", "Cache-Control": "no-store" }, corsHeaders)
    });
  }
  // ★ CẤU TRÚC CHÍNH XÁC từ worker ĐANG CHẠY của minhthoaine (locket-vip.mhiep20077.workers.dev
  // /generateFilteredImage trả 200 khuôn này). Envelope CHỈ {result}, url phủ 5 alias, status:200,
  // và `data` LỒNG trong result. Copy y hệt — đây là khuôn app THẬT SỰ chấp nhận.
  var al = {
    outputUrl: outputUrl, output_url: outputUrl, url: outputUrl,
    imageUrl: outputUrl, image_url: outputUrl, status: 200
  };
  var result = Object.assign({ quota_blocked: false, short_id: "LKG" }, al, { data: Object.assign({}, al) });
  return new Response(JSON.stringify({ result: result }), {
    headers: Object.assign({ "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" }, corsHeaders)
  });
}

// App xin SSE? (Firebase .stream() đặt Accept: text/event-stream). Header giữ qua 302 của URLSession.
function wantsStreamFrom(request) {
  return /text\/event-stream/i.test(request.headers.get("Accept") || "");
}

async function doEdit(request, env, url, corsHeaders) {
  var body;
  try { body = await request.json(); } catch (e) { return json({ error: "invalid_json" }, corsHeaders, 400); }
  var imageUrl = pickField(body, IMG_HOST_FIELDS);
  var prompt = pickField(body, PROMPT_FIELDS);
  if (!imageUrl) return json({ error: "image_missing" }, corsHeaders, 400);
  var r = await generateAndHost(env, url, imageUrl, prompt);
  if (!r.ok) return json({ error: r.error }, corsHeaders, 502);
  return nativeFilterResponse(r.outputUrl, imageUrl, prompt, "normal", corsHeaders, wantsStreamFrom(request));
}

// Native generateFilteredImage: generate AI mất ~15-18s, vượt timeout của app.
// Nên trả outputUrl NGAY (<1s), generate ở nền (ctx.waitUntil), lưu img:<id>.
// App tải /img/<id> — endpoint đó mới chờ ảnh (app kiên nhẫn với tải ảnh hơn API).
// POST: app redirect nguyên body gốc vào đây (giữ cho curl/test trực tiếp).
async function handleGenerateFilteredImage(request, env, url, corsHeaders, ctx) {
  // Hardening: app genuine LUÔN gửi Authorization: Bearer <firebase-jwt>. Chặn lạm dụng
  // (curl random đốt credit shopaikey). Kèm isAllowedImageUrl (ảnh phải bucket locket-*).
  var auth = request.headers.get("Authorization") || request.headers.get("authorization") || "";
  if (!/^Bearer\s+[A-Za-z0-9._-]{20,}/.test(auth)) {
    return json({ error: "unauthorized" }, corsHeaders, 401);
  }
  var raw = "";
  try { raw = await request.text(); } catch (e) {}
  var body = null;
  try { body = JSON.parse(raw); } catch (e) {}
  if (!body || typeof body !== "object") {
    return json({ error: "unparsed_format" }, corsHeaders, 502);
  }
  var imageUrl = pickField(body, IMG_HOST_FIELDS);
  var filterId = pickField(body, FILTER_ID_FIELDS);
  var prompt = pickField(body, PROMPT_FIELDS);
  var filterType = pickField(body, ["filterType", "filter_type"]) || "normal";
  return runFilter(env, url, corsHeaders, ctx, imageUrl, filterId, prompt, filterType, wantsStreamFrom(request), auth);
}

// GET: script Shadowrocket trả 302 → app FETCH THẬT vào đây (params trên query).
// Lý do bỏ $done-inject: rival NMT xác nhận cơ chế nhét response bằng script KHÔNG
// thỏa Firebase Callable client cho generateFilteredImage → phải cho app nối server
// thật. 302 cho app tự fetch Worker = response từ server thật, đúng khung HTTP.
async function handleGenerateFilteredImageGet(request, env, url, corsHeaders, ctx) {
  var q = url.searchParams;
  var imageUrl = q.get("image_url") || q.get("imageUrl") || "";
  var filterId = q.get("filter_id") || q.get("filterId") || "";
  var prompt = q.get("prompt") || "";
  var filterType = q.get("filter_type") || q.get("filterType") || "normal";
  var auth = request.headers.get("Authorization") || request.headers.get("authorization") || "";
  return runFilter(env, url, corsHeaders, ctx, imageUrl, filterId, prompt, filterType, wantsStreamFrom(request), auth);
}

// Core dùng chung cho POST + GET.
async function runFilter(env, url, corsHeaders, ctx, imageUrl, filterId, prompt, filterType, wantsStream, auth) {
  // PHOTOBOOTH: ghép lưới/khung qua Vercel (CPU ảnh), KHÔNG gen AI. Nhánh additive.
  if (filterId && photoboothConfig(filterId)) {
    return handlePhotoboothFilter(env, url, corsHeaders, ctx, imageUrl, filterId, filterType, wantsStream, auth);
  }
  if (!prompt && filterId && FILTER_PROMPTS[filterId]) prompt = FILTER_PROMPTS[filterId];
  filterType = filterType || "normal";
  if (!imageUrl) return json({ error: "image_missing" }, corsHeaders, 502);
  if (!env.CAPTURE) return json({ error: "storage_unavailable" }, corsHeaders, 502);

  // ASYNC (giống worker minhthoaine): generate AI ~15-20s > timeout callable. Trả outUrl NGAY
  // (<1s), generate ở nền (ctx.waitUntil), lưu img:<id>. App fetch outUrl → serveImage chờ ảnh
  // (poll KV tới 45s). serveImage bắt buộc id<32hex>+token<24hex HMAC → gắn token.
  var id = crypto.randomUUID().replace(/-/g, "");
  var token = await signImgId(env, id);
  if (!token) return json({ error: "signing_unavailable" }, corsHeaders, 500);
  var outUrl = url.origin + "/img/" + id + token + ".jpg";
  if (ctx && ctx.waitUntil) ctx.waitUntil(generateToId(env, id, imageUrl, prompt));
  else await generateToId(env, id, imageUrl, prompt);
  return nativeFilterResponse(outUrl, imageUrl, prompt, filterType, corsHeaders, wantsStream);
}

// ===== PHOTOBOOTH (ghép ảnh qua Vercel, không gen AI) =====
// Registry: filterId -> cách ghép. grid2x2 = tích lũy 4 shot; frame1x1 = 1 shot + khung.
var PHOTOBOOTH = {
  "pb_grid_4cut":     { layout: "grid2x2", bg: "#ffffff", gap: 28, frame: null },
  "pb_grid_pastel":   { layout: "grid2x2", bg: "#ffe4ef", gap: 32, frame: null },
  "pb_grid_black":    { layout: "grid2x2", bg: "#111111", gap: 24, frame: null },
  "pb_frame_classic": { layout: "frame1x1", bg: "#ffffff", inset: 48, frame: null },
  "pb_frame_film":    { layout: "frame1x1", bg: "#111111", inset: 56, frame: null }
};
var PB_SESSION_TTL_MS = 120000; // quá 2 phút kể từ shot cuối = session mới

// Nhận diện filter photobooth theo id (khớp registry mới + id cũ minhthoaine theo pattern).
// grid2x2 = 4cut/2x2/photobooth; frame1x1 = single. Trả null nếu không phải photobooth.
function photoboothConfig(filterId) {
  if (!filterId) return null;
  if (PHOTOBOOTH[filterId]) return PHOTOBOOTH[filterId];
  var id = String(filterId).toLowerCase();
  if (/(pb_single|_single_|_single$|single_)/.test(id)) return { layout: "frame1x1", bg: "#ffffff", inset: 48, frame: null };
  if (/(4cut|2x2|photobooth)/.test(id)) return { layout: "grid2x2", bg: "#ffffff", gap: 28, frame: null };
  return null;
}

// Session key = SHA-256 của NGUYÊN Bearer token (không phải uid trong payload).
// Lý do: uid lấy từ JWT chưa verify có thể bị giả → kẻ xấu chạm session người khác (IDOR,
// lộ ảnh photobooth). Hash cả token → session gắn chặt người giữ token; không có token
// thật thì không target được session nạn nhân. (Verify JWKS đầy đủ = hardening tương lai.)
async function sessionKeyFromAuth(auth) {
  var m = /Bearer\s+([A-Za-z0-9._-]+)/.exec(auth || "");
  var tok = m ? m[1] : "anon";
  try {
    var h = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(tok));
    var b = new Uint8Array(h), hex = "";
    for (var i = 0; i < b.length; i++) hex += b[i].toString(16).padStart(2, "0");
    return hex.slice(0, 32);
  } catch (e) { return "anon"; }
}

async function handlePhotoboothFilter(env, url, corsHeaders, ctx, imageUrl, filterId, filterType, wantsStream, auth) {
  var cfg = photoboothConfig(filterId);
  if (!cfg) return json({ error: "not_photobooth" }, corsHeaders, 500);
  if (!imageUrl || !isAllowedImageUrl(imageUrl)) return json({ error: "image_missing" }, corsHeaders, 502);
  if (!env.CAPTURE) return json({ error: "storage_unavailable" }, corsHeaders, 502);

  var cells = [imageUrl];
  if (cfg.layout === "grid2x2") {
    var skey = "pbsess:" + (await sessionKeyFromAuth(auth)) + ":" + filterId;
    var prev = await env.CAPTURE.get(skey);
    var acc = [];
    if (prev) {
      try { var o = JSON.parse(prev); if (o && Array.isArray(o.cells) && (Date.now() - o.ts) < PB_SESSION_TTL_MS && o.cells.length < 4) acc = o.cells; } catch (e) {}
    }
    acc.push(imageUrl);
    cells = acc.slice(0, 4);
    if (cells.length >= 4) { try { await env.CAPTURE.delete(skey); } catch (e) {} }
    else { try { await env.CAPTURE.put(skey, JSON.stringify({ cells: cells, ts: Date.now() }), { expirationTtl: 300 }); } catch (e) {} }
  }

  var spec = {
    layout: cfg.layout, cells: cells, bg: cfg.bg,
    gap: cfg.gap, inset: cfg.inset, frame: cfg.frame || undefined
  };
  var id = crypto.randomUUID().replace(/-/g, "");
  var token = await signImgId(env, id);
  if (!token) return json({ error: "signing_unavailable" }, corsHeaders, 500);
  var outUrl = url.origin + "/img/" + id + token + ".jpg";
  if (ctx && ctx.waitUntil) ctx.waitUntil(composeToId(env, id, spec));
  else await composeToId(env, id, spec);
  return nativeFilterResponse(outUrl, imageUrl, filterId, filterType, corsHeaders, wantsStream);
}

// Gọi Vercel /api/compose → nhận PNG → lưu img:<id> (serveImage phục vụ như ảnh gen).
async function composeToId(env, id, spec) {
  if (!env.COMPOSE_URL) { try { await env.CAPTURE.put("img:" + id, "ERR:no_compose_url", { expirationTtl: 300 }); } catch (e) {} return; }
  var ac = new AbortController();
  var to = setTimeout(function () { ac.abort(); }, 25000);
  try {
    var r = await fetch(env.COMPOSE_URL, {
      method: "POST", signal: ac.signal,
      headers: { "Content-Type": "application/json", "X-Compose-Secret": env.COMPOSE_SECRET || "" },
      body: JSON.stringify(spec)
    });
    clearTimeout(to);
    if (!r.ok) { try { await env.CAPTURE.put("img:" + id, "ERR:compose_" + r.status, { expirationTtl: 300 }); } catch (e) {} return; }
    var buf = await r.arrayBuffer();
    await env.CAPTURE.put("img:" + id, arrayBufferToBase64(buf), { expirationTtl: 900 });
  } catch (e) {
    clearTimeout(to);
    try { await env.CAPTURE.put("img:" + id, "ERR:compose_exc", { expirationTtl: 300 }); } catch (e2) {}
  }
}

var IMG_POLL_MAX_MS = 60000;
var IMG_POLL_INTERVAL_MS = 800;

// HMAC id để chống spam /img: chỉ id Worker tự phát (token khớp) mới được poll.
// Dùng IMG_SIGNING_KEY (server-only, KHÔNG ship client) → token không forge được.
// KHÔNG fallback WORKER_SECRET (secret đó từng lộ trong script public). Không key → null (chặn).
async function signImgId(env, id) {
  var secret = env.IMG_SIGNING_KEY;
  if (!secret) return null;
  var key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  var sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode("img:" + id));
  var b = new Uint8Array(sig), hex = "";
  for (var i = 0; i < b.length; i++) hex += b[i].toString(16).padStart(2, "0");
  return hex.slice(0, 24);
}
function timingSafeHex(a, b) {
  if (a.length !== b.length) return false;
  var out = 0;
  for (var i = 0; i < a.length; i++) out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return out === 0;
}

// Serve ảnh: verify token HMAC trước (id bịa → 404 ngay, không poll), rồi chờ
// generate nền (poll KV tới IMG_POLL_MAX_MS). Token hợp lệ = id Worker thật phát,
// nên poll full mà không cần pending marker (hết phụ thuộc KV read-after-write).
async function logImg(env, obj) {
  if (!env.CAPTURE) return;
  try { obj.at = Date.now(); await env.CAPTURE.put("last_img", JSON.stringify(obj), { expirationTtl: 3600 }); } catch (e) {}
}
async function serveImage(request, env, path, corsHeaders) {
  if (!env.CAPTURE) return new Response("storage unavailable", { status: 500 });
  var raw = path.replace("/img/", "").replace(/\.jpg$/, "");
  var ua = request.headers.get("user-agent") || "";
  var m = raw.match(/^([0-9a-f]{32})([0-9a-f]{24})$/);
  if (!m) { await logImg(env, { stage: "bad_path", raw: raw.slice(0, 80), ua: ua.slice(0, 60) }); return new Response("not found", { status: 404, headers: { ...corsHeaders } }); }
  var id = m[1], token = m[2];
  var expected = await signImgId(env, id);
  if (!expected || !timingSafeHex(token, expected)) { await logImg(env, { stage: "bad_token", id: id, ua: ua.slice(0, 60) }); return new Response("not found", { status: 404, headers: { ...corsHeaders } }); }

  var deadline = Date.now() + IMG_POLL_MAX_MS;
  while (true) {
    var v = await env.CAPTURE.get("img:" + id);
    if (v) {
      if (v.indexOf("ERR:") === 0) {
        await logImg(env, { stage: "served_err", id: id, err: v.slice(0, 40), ua: ua.slice(0, 60) });
        return new Response("generation failed", { status: 502, headers: { ...corsHeaders } });
      }
      var bytes = base64ToArrayBuffer(v);
      // Content-Type đúng theo magic bytes (shopaikey hay trả PNG, app có thể kén)
      var ct = "image/jpeg";
      if (v.indexOf("iVBOR") === 0) ct = "image/png";
      else if (v.indexOf("R0lGOD") === 0) ct = "image/gif";
      else if (v.indexOf("UklGR") === 0) ct = "image/webp";
      await logImg(env, { stage: "served_ok", id: id, bytes: bytes.byteLength, ct: ct, ua: ua.slice(0, 60) });
      return new Response(bytes, {
        status: 200,
        headers: { "Content-Type": ct, "Cache-Control": "public, max-age=600", "Access-Control-Allow-Origin": "*" }
      });
    }
    if (Date.now() > deadline) { await logImg(env, { stage: "timeout", id: id, ua: ua.slice(0, 60) }); return new Response("timeout", { status: 504, headers: { ...corsHeaders } }); }
    await new Promise(function (res) { setTimeout(res, IMG_POLL_INTERVAL_MS); });
  }
}

async function handleFilter(request, env, url, corsHeaders) {
  var apiKey = env.GEMINI_API_KEY;
  if (!apiKey) {
    return json({ error: "API key not configured" }, corsHeaders, 500);
  }

  var filterId = url.searchParams.get("filter_id") || url.searchParams.get("filter") || "vintage_film";
  var prompt = FILTER_PROMPTS[filterId] || FILTER_PROMPTS.vintage_film;

  var contentType = request.headers.get("content-type") || "";
  var imageBase64 = "";
  var imageMime = "image/jpeg";

  if (contentType.includes("application/json")) {
    var body = await request.json();
    imageBase64 = body.image || body.photo || body.imageData || "";
    imageMime = body.mime || "image/jpeg";
  } else {
    var imgBuf = await request.arrayBuffer();
    if (imgBuf.byteLength > MAX_IMAGE_BYTES) {
      return new Response("image too large", { status: 400, headers: corsHeaders });
    }
    imageBase64 = arrayBufferToBase64(imgBuf);
    imageMime = contentType || "image/jpeg";
  }

  if (!imageBase64) {
    return new Response("no image provided", { status: 400, headers: corsHeaders });
  }

  var result = await callGeminiImageEdit(apiKey, imageBase64, imageMime, prompt);

  if (result.error) {
    return new Response("image processing failed", { status: 500, headers: corsHeaders });
  }

  // Trả raw JPEG bytes (giống contract HexDen) — script chỉ $done({body:data})
  var outBytes = base64ToArrayBuffer(result.imageBase64);
  var outHeaders = Object.assign({}, corsHeaders, { "Content-Type": "image/jpeg" });
  return new Response(outBytes, { status: 200, headers: outHeaders });
}

async function handlePhotobooth(request, env, url, corsHeaders) {
  var apiKey = env.GEMINI_API_KEY;
  if (!apiKey) {
    return json({ error: "API key not configured" }, corsHeaders, 500);
  }

  var filterId = url.searchParams.get("filter_id") || "pb_classic";
  var shot = parseInt(url.searchParams.get("shot") || "1");

  if (shot < 1 || shot > 4 || isNaN(shot)) {
    return json({ error: "invalid shot number" }, corsHeaders, 400);
  }

  var sessionId = request.headers.get("x-session-id") || "";
  if (!sessionId || sessionId.length < 8 || sessionId.length > 64 || !/^[a-zA-Z0-9_-]+$/.test(sessionId)) {
    sessionId = crypto.randomUUID();
  }

  var contentType = request.headers.get("content-type") || "";
  var imageBase64 = "";

  if (contentType.includes("application/json")) {
    var body = await request.json();
    imageBase64 = body.image || body.photo || "";
  } else {
    var imgBuf = await request.arrayBuffer();
    if (imgBuf.byteLength > MAX_IMAGE_BYTES) {
      return json({ error: "image too large" }, corsHeaders, 400);
    }
    imageBase64 = arrayBufferToBase64(imgBuf);
  }

  if (!imageBase64) {
    return json({ error: "no image provided" }, corsHeaders, 400);
  }

  if (!env.KV_STORE) {
    return json({ error: "storage not configured" }, corsHeaders, 500);
  }

  var kvKey = "pb:" + sessionId + ":" + shot;
  await env.KV_STORE.put(kvKey, imageBase64, { expirationTtl: 300 });

  if (shot < 4) {
    return json({
      status: "processing",
      shot: shot,
      sessionId: sessionId,
      message: "Photo " + shot + "/4 received",
      complete: false
    }, corsHeaders);
  }

  var images = [];
  for (var i = 1; i <= 4; i++) {
    var k = "pb:" + sessionId + ":" + i;
    var img = await env.KV_STORE.get(k);
    if (img) images.push(img);
  }

  if (images.length < 4) {
    return json({ error: "missing photos", complete: false }, corsHeaders, 400);
  }

  var frameStyle = filterId.replace(/^pb_/, "") || "classic";
  var composePrompt = "Create a 2x2 photobooth strip. Arrange these 4 photos in a grid layout with a " + frameStyle + " decorative frame. Make it look like a real Korean-style 4-cut photobooth strip.";

  var result = await callGeminiCompose(apiKey, images, composePrompt);

  for (var j = 1; j <= 4; j++) {
    await env.KV_STORE.delete("pb:" + sessionId + ":" + j);
  }

  if (result.error) {
    return json({ error: "photobooth processing failed", complete: true }, corsHeaders, 500);
  }

  if (env.R2_BUCKET) {
    var rKey = "photobooth/" + Date.now() + "_" + frameStyle + ".jpg";
    var imgBytes = base64ToArrayBuffer(result.imageBase64);
    await env.R2_BUCKET.put(rKey, imgBytes, {
      httpMetadata: { contentType: "image/jpeg" }
    });
    var publicUrl = (env.R2_PUBLIC_URL || url.origin) + "/" + rKey;
    return json({ outputUrl: publicUrl, status: "success", complete: true }, corsHeaders);
  }

  return json({
    outputUrl: "data:image/jpeg;base64," + result.imageBase64,
    status: "success",
    complete: true
  }, corsHeaders);
}

async function callGeminiImageEdit(apiKey, imageBase64, imageMime, prompt) {
  var resp = await fetch(GEMINI_EDIT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey
    },
    body: JSON.stringify({
      contents: [{
        parts: [
          { text: prompt },
          { inlineData: { mimeType: imageMime, data: imageBase64 } }
        ]
      }],
      generationConfig: {
        responseModalities: ["IMAGE", "TEXT"],
        temperature: 1.0
      }
    })
  });

  if (!resp.ok) {
    return { error: "upstream error " + resp.status };
  }

  var data = await resp.json();

  if (data.candidates && data.candidates[0] && data.candidates[0].content) {
    var parts = data.candidates[0].content.parts || [];
    for (var i = 0; i < parts.length; i++) {
      if (parts[i].inlineData) {
        return { imageBase64: parts[i].inlineData.data };
      }
    }
  }

  return { error: "no image generated" };
}

async function callGeminiCompose(apiKey, imageBase64Array, prompt) {
  var parts = [{ text: prompt }];
  for (var i = 0; i < imageBase64Array.length; i++) {
    parts.push({
      inlineData: { mimeType: "image/jpeg", data: imageBase64Array[i] }
    });
  }

  var resp = await fetch(GEMINI_EDIT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey
    },
    body: JSON.stringify({
      contents: [{ parts: parts }],
      generationConfig: {
        responseModalities: ["IMAGE", "TEXT"],
        temperature: 0.7
      }
    })
  });

  if (!resp.ok) {
    return { error: "upstream error " + resp.status };
  }

  var data = await resp.json();

  if (data.candidates && data.candidates[0] && data.candidates[0].content) {
    var cparts = data.candidates[0].content.parts || [];
    for (var j = 0; j < cparts.length; j++) {
      if (cparts[j].inlineData) {
        return { imageBase64: cparts[j].inlineData.data };
      }
    }
  }

  return { error: "no image composed" };
}

function json(data, corsHeaders, status) {
  return new Response(JSON.stringify(data), {
    status: status || 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" }
  });
}

function arrayBufferToBase64(buffer) {
  var bytes = new Uint8Array(buffer);
  var binary = "";
  for (var i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function base64ToArrayBuffer(base64) {
  var binary = atob(base64);
  var bytes = new Uint8Array(binary.length);
  for (var i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}
