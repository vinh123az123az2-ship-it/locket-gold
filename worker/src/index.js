/**
 * LOCKET GOLD VIP - Cloudflare Worker
 * Tác giả: langtucamau
 *
 * Xử lý AI filter (Google Imagen/Gemini) + Photobooth (4-shot grid)
 *
 * Deploy: npx wrangler deploy
 * Env vars cần set:
 *   GEMINI_API_KEY - Google AI Studio API key
 */

// ==================== FILTER PROMPTS ====================
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

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-fast-generate-001:predict";
const GEMINI_EDIT_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "*"
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

      return json({ error: "not found" }, corsHeaders, 404);
    } catch (err) {
      return json({ error: err.message || "internal error" }, corsHeaders, 500);
    }
  }
};

async function handleFilter(request, env, url, corsHeaders) {
  const apiKey = env.GEMINI_API_KEY;
  if (!apiKey) {
    return json({ error: "GEMINI_API_KEY not configured" }, corsHeaders, 500);
  }

  const filterId = url.searchParams.get("filter_id") || "vintage_film";
  const prompt = FILTER_PROMPTS[filterId] || FILTER_PROMPTS.vintage_film;

  const contentType = request.headers.get("content-type") || "";
  let imageBase64 = "";
  let imageMime = "image/jpeg";

  if (contentType.includes("application/json")) {
    const body = await request.json();
    imageBase64 = body.image || body.photo || body.imageData || "";
    if (body.image_url || body.imageUrl) {
      const imgResp = await fetch(body.image_url || body.imageUrl);
      const imgBuf = await imgResp.arrayBuffer();
      imageBase64 = arrayBufferToBase64(imgBuf);
      imageMime = imgResp.headers.get("content-type") || "image/jpeg";
    }
  } else {
    const imgBuf = await request.arrayBuffer();
    imageBase64 = arrayBufferToBase64(imgBuf);
    imageMime = contentType || "image/jpeg";
  }

  if (!imageBase64) {
    return json({ error: "no image provided" }, corsHeaders, 400);
  }

  const result = await callGeminiImageEdit(apiKey, imageBase64, imageMime, prompt);

  if (result.error) {
    return json({ error: result.error }, corsHeaders, 500);
  }

  if (env.R2_BUCKET) {
    const key = "filter/" + Date.now() + "_" + filterId + ".jpg";
    const imgBytes = base64ToArrayBuffer(result.imageBase64);
    await env.R2_BUCKET.put(key, imgBytes, {
      httpMetadata: { contentType: "image/jpeg" }
    });
    const publicUrl = (env.R2_PUBLIC_URL || url.origin) + "/" + key;
    return json({ outputUrl: publicUrl, status: "success" }, corsHeaders);
  }

  return json({
    outputUrl: "data:image/jpeg;base64," + result.imageBase64,
    status: "success"
  }, corsHeaders);
}

async function handlePhotobooth(request, env, url, corsHeaders) {
  const apiKey = env.GEMINI_API_KEY;
  if (!apiKey) {
    return json({ error: "GEMINI_API_KEY not configured" }, corsHeaders, 500);
  }

  const filterId = url.searchParams.get("filter_id") || "pb_classic";
  const shot = parseInt(url.searchParams.get("shot") || "1");
  const sessionId = request.headers.get("x-session-id") || "default";

  const contentType = request.headers.get("content-type") || "";
  let imageBase64 = "";

  if (contentType.includes("application/json")) {
    const body = await request.json();
    imageBase64 = body.image || body.photo || "";
  } else {
    const imgBuf = await request.arrayBuffer();
    imageBase64 = arrayBufferToBase64(imgBuf);
  }

  if (!imageBase64) {
    return json({ error: "no image provided" }, corsHeaders, 400);
  }

  if (!env.KV_STORE) {
    return json({ error: "KV_STORE not configured" }, corsHeaders, 500);
  }

  var kvKey = "pb:" + sessionId + ":" + shot;
  await env.KV_STORE.put(kvKey, imageBase64, { expirationTtl: 300 });

  if (shot < 4) {
    return json({
      status: "processing",
      shot: shot,
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
    return json({ error: "missing photos, only " + images.length + "/4", complete: false }, corsHeaders, 400);
  }

  var frameStyle = filterId.replace(/^pb_/, "") || "classic";
  var composePrompt = "Create a 2x2 photobooth strip. Arrange these 4 photos in a grid layout with a " + frameStyle + " decorative frame. Add the frame style: " + frameStyle + ". Make it look like a real Korean-style 4-cut photobooth strip.";

  var result = await callGeminiCompose(apiKey, images, composePrompt);

  for (var j = 1; j <= 4; j++) {
    await env.KV_STORE.delete("pb:" + sessionId + ":" + j);
  }

  if (result.error) {
    return json({ error: result.error, complete: true }, corsHeaders, 500);
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
  var resp = await fetch(GEMINI_EDIT_URL + "?key=" + apiKey, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
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
    var errText = await resp.text();
    return { error: "Gemini API error: " + resp.status + " " + errText };
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

  return { error: "No image in Gemini response" };
}

async function callGeminiCompose(apiKey, imageBase64Array, prompt) {
  var parts = [{ text: prompt }];
  for (var i = 0; i < imageBase64Array.length; i++) {
    parts.push({
      inlineData: { mimeType: "image/jpeg", data: imageBase64Array[i] }
    });
  }

  var resp = await fetch(GEMINI_EDIT_URL + "?key=" + apiKey, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: parts }],
      generationConfig: {
        responseModalities: ["IMAGE", "TEXT"],
        temperature: 0.7
      }
    })
  });

  if (!resp.ok) {
    var errText = await resp.text();
    return { error: "Gemini API error: " + resp.status + " " + errText };
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

  return { error: "No image in Gemini compose response" };
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
