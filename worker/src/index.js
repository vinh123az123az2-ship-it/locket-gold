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

export default {
  async fetch(request, env) {
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

    try {
      if (path === "/health") {
        return json({ status: "ok", filters: Object.keys(FILTER_PROMPTS).length }, corsHeaders);
      }


      if (path === "/filters") {
        return json({ filters: Object.keys(FILTER_PROMPTS) }, corsHeaders);
      }

      if (path === "/filter" && request.method === "POST") {
        return await handleFilter(request, env, url, corsHeaders);
      }

      if (path === "/photobooth" && request.method === "POST") {
        return await handlePhotobooth(request, env, url, corsHeaders);
      }

      // Debug: lưu raw body request filter để xem format thật
      if (path === "/capture" && request.method === "POST") {
        var cb = ""; try { cb = await request.text(); } catch (e) {}
        if (env.CAPTURE) { try { await env.CAPTURE.put("raw_filter_req", JSON.stringify({ body: cb.slice(0, 3000), at: Date.now() }), { expirationTtl: 3600 }); } catch (e) {} }
        return json({ ok: true }, corsHeaders);
      }

      // Backend AI filter: nhận {imageUrl, prompt}, generate, host ảnh, trả outputUrl
      if (path === "/edit" && request.method === "POST") {
        return await handleEdit(request, env, url, corsHeaders);
      }

      // Request native Locket redirect vào đây (nguyên body gốc)
      if (path === "/generateFilteredImage" && request.method === "POST") {
        return await handleGenerateFilteredImage(request, env, url, corsHeaders);
      }

      // TEMP self-test: gọi thẳng shopaikey với ảnh nhúng, báo có ảnh hay không
      if (path === "/selftest") {
        return await handleSelfTest(env, corsHeaders);
      }

      // Serve ảnh đã generate (host trên KV)
      if (path.indexOf("/img/") === 0) {
        return await serveImage(request, env, path, corsHeaders);
      }

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
var SHOPAIKEY_MODEL = "gemini-3.1-flash-lite-image";

function extractB64FromContent(content) {
  if (typeof content !== "string") return "";
  // dạng ![image](data:image/...;base64,XXXX)
  var m = content.match(/data:image\/[a-z]+;base64,([A-Za-z0-9+/=]+)/i);
  return m ? m[1] : "";
}

// Ảnh test nhúng (64x64 JPEG) để tự kiểm tra model shopaikey có trả ảnh không
var SELFTEST_JPEG_B64 = "/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCABAAEADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDPooor3TygooooAKKKKACiiigAooooA3vC/h9taeR5JGitoiAzBclj6Dt079sjjmvRtP0uy08AWdtFEQCNwGWIJzgseT+dGj2Y0/S7a1AUGNAG2kkFurEZ9yauV8FmOY1MVUaT9zoj6PC4WNGKbXvFa9sbW+TZeW8UwAIG9clc9cHqPwrgPFnhkaWhvLN2a1Z8GMgkxZ6c9xnjn2616RTJ4kngkhlXdHIpRhnGQRg1ngcwq4Saafu9UXiMNCtF3Wvc8SoqW7ga1upreQqXido2K9CQccVFX6AmpK6PmmraMKKKKYj2fTbtb6wt7pNoEqBsBt209xn2PH4VZrzfwh4jXSw9rfGVrViChHPlHPPHXHOePTpzXosE0U8SyQSJLG3R0YMD+Ir8+zDAzwlVpr3ejPpsNiI1oJ316j6bI6xozyMqooJZmOAAO5okdY0Z5GVUUEszHAAHc1w3jDxNFcQPYaa7kFtssykbWXH3R6gnvx07g1ng8HUxdRQgtOr7FV68aMeaRyN/cfa764uNuzzpGk25zjJzjNQUUV+hxiopJdD5hu7uwoooqhBUttcz2rl7aaWFyMFo2Kkj04qKik0pKzGnbVE91eXN3t+1XE023O3zHLYz1xmoKKKUYqKslYG29WFFFFUI/9k=";

async function handleSelfTest(env, corsHeaders) {
  var apiKey = env.SHOPAIKEY_KEY;
  if (!apiKey) return json({ error: "no_key" }, corsHeaders, 500);
  var dataUrl = "data:image/jpeg;base64," + SELFTEST_JPEG_B64;
  var started = Date.now();
  var resp;
  try {
    resp = await fetch(SHOPAIKEY_CHAT_URL, {
      method: "POST",
      headers: { "Authorization": "Bearer " + apiKey, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: SHOPAIKEY_MODEL,
        messages: [{
          role: "user",
          content: [
            { type: "text", text: "Add a warm cinematic film look to this photo. Output the edited image only." },
            { type: "image_url", image_url: { url: dataUrl } }
          ]
        }]
      })
    });
  } catch (e) {
    return json({ stage: "fetch_failed", error: String(e) }, corsHeaders, 502);
  }
  var elapsedMs = Date.now() - started;
  var raw;
  try { raw = await resp.json(); } catch (e) {
    return json({ stage: "bad_json", httpStatus: resp.status, elapsedMs }, corsHeaders, 502);
  }
  var msg = raw && raw.choices && raw.choices[0] && raw.choices[0].message ? raw.choices[0].message : null;
  var content = msg ? msg.content : null;
  var b64 = extractB64FromContent(typeof content === "string" ? content : "");
  var hasImageField = !!(msg && msg.images && msg.images.length);
  return json({
    model: SHOPAIKEY_MODEL,
    httpStatus: resp.status,
    elapsedMs: elapsedMs,
    hasInlineImage: !!b64,
    inlineImageBytes: b64 ? b64.length : 0,
    hasImagesField: hasImageField,
    textSnippet: typeof content === "string" ? content.slice(0, 300) : JSON.stringify(content).slice(0, 300),
    apiError: raw && raw.error ? raw.error : null
  }, corsHeaders);
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

// Core dùng chung: tải ảnh gốc → shopaikey generate → host KV → {ok, outputUrl, error}
async function generateAndHost(env, url, imageUrl, prompt) {
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
  try {
    resp = await fetch(SHOPAIKEY_CHAT_URL, {
      method: "POST",
      headers: { "Authorization": "Bearer " + apiKey, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: SHOPAIKEY_MODEL,
        messages: [{
          role: "user",
          content: [
            { type: "text", text: prompt + " Output the edited image only." },
            { type: "image_url", image_url: { url: dataUrl } }
          ]
        }]
      })
    });
  } catch (e) { return { ok: false, error: "provider_unavailable" }; }

  if (!resp.ok) return { ok: false, error: "provider_rejected_request" };

  var rd;
  try { rd = await resp.json(); } catch (e) { return { ok: false, error: "invalid_provider_response" }; }
  var msg = rd && rd.choices && rd.choices[0] && rd.choices[0].message ? rd.choices[0].message : null;
  if (!msg) return { ok: false, error: "invalid_generated_image" };

  var outB64 = extractB64FromContent(msg.content);
  if (!outB64 && msg.images && msg.images[0]) {
    outB64 = extractB64FromContent(typeof msg.images[0] === "string" ? msg.images[0] : (msg.images[0].url || ""));
  }
  if (!outB64) return { ok: false, error: "invalid_generated_image" };

  if (!env.CAPTURE) return { ok: false, error: "storage_unavailable" };
  var id = crypto.randomUUID().replace(/-/g, "");
  await env.CAPTURE.put("img:" + id, outB64, { expirationTtl: 600 });
  return { ok: true, outputUrl: url.origin + "/img/" + id + ".jpg" };
}

function nativeFilterResponse(outputUrl, corsHeaders) {
  var urls = { outputUrl: outputUrl, output_url: outputUrl, url: outputUrl, imageUrl: outputUrl, image_url: outputUrl };
  return json({
    result: { outputUrl: outputUrl, output_url: outputUrl, url: outputUrl, imageUrl: outputUrl, image_url: outputUrl, status: 200, data: urls },
    data: urls, status: 200, expiresInSeconds: 600, sourceImageCount: 1, slotCount: 1
  }, corsHeaders);
}

async function doEdit(request, env, url, corsHeaders) {
  var body;
  try { body = await request.json(); } catch (e) { return json({ error: "invalid_json" }, corsHeaders, 400); }
  var imageUrl = pickField(body, IMG_HOST_FIELDS);
  var prompt = pickField(body, PROMPT_FIELDS);
  if (!imageUrl) return json({ error: "image_missing" }, corsHeaders, 400);
  var r = await generateAndHost(env, url, imageUrl, prompt);
  if (!r.ok) return json({ error: r.error }, corsHeaders, 502);
  return nativeFilterResponse(r.outputUrl, corsHeaders);
}

// Request native generateFilteredImage của Locket được redirect thẳng vào đây.
// Luôn lưu raw body để học format thật; parse ảnh + filter id → prompt → generate.
async function handleGenerateFilteredImage(request, env, url, corsHeaders) {
  var raw = "";
  try { raw = await request.text(); } catch (e) {}
  if (env.CAPTURE) {
    try { await env.CAPTURE.put("raw_filter_req", JSON.stringify({ body: raw.slice(0, 4000), len: raw.length, at: Date.now() }), { expirationTtl: 3600 }); } catch (e) {}
  }

  var body = null;
  try { body = JSON.parse(raw); } catch (e) {}
  if (!body || typeof body !== "object") {
    return json({ error: "unparsed_format", result: { status: 200 }, status: 200 }, corsHeaders, 200);
  }

  var imageUrl = pickField(body, IMG_HOST_FIELDS);
  var filterId = pickField(body, FILTER_ID_FIELDS);
  var prompt = pickField(body, PROMPT_FIELDS);
  if (!prompt && filterId && FILTER_PROMPTS[filterId]) prompt = FILTER_PROMPTS[filterId];

  if (!imageUrl) {
    // Chưa biết field ảnh — trả 200 để app không kẹt, raw đã lưu KV để em chỉnh.
    return json({ error: "image_field_unknown", seenKeys: Object.keys(body).slice(0, 25), status: 200 }, corsHeaders, 200);
  }

  var r = await generateAndHost(env, url, imageUrl, prompt);
  if (!r.ok) return json({ error: r.error, status: 200 }, corsHeaders, 200);
  return nativeFilterResponse(r.outputUrl, corsHeaders);
}

async function serveImage(request, env, path, corsHeaders) {
  if (!env.CAPTURE) return new Response("storage unavailable", { status: 500 });
  var id = path.replace("/img/", "").replace(/\.jpg$/, "");
  var b64 = await env.CAPTURE.get("img:" + id);
  if (!b64) return new Response("not found", { status: 404 });
  var bytes = base64ToArrayBuffer(b64);
  return new Response(bytes, {
    status: 200,
    headers: { "Content-Type": "image/jpeg", "Cache-Control": "public, max-age=600", "Access-Control-Allow-Origin": "*" }
  });
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
