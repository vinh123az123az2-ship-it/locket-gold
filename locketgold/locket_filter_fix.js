/**
 * LOCKET GOLD VIP - AI FILTER ENGINE (generateFilteredImage)
 * Tác giả: langtucamau
 *
 * Chặn request generateFilteredImage của Locket, đọc ảnh gốc + prompt mà app
 * gửi, chuyển sang Worker để Gemini generate, trả ảnh AI đã host về cho app.
 *
 * Flow:
 *   App chụp filter → POST generateFilteredImage {imageUrl, prompt}
 *   → script đọc → POST Worker /edit → Worker generate + host ảnh
 *   → trả {result:{outputUrl}} → app hiển thị ảnh AI
 */

var WORKER_URL = "https://locket-gold.locket-gold.workers.dev";

var IMG_FIELDS = ["imageUrl", "image_url", "inputUrl", "input_url", "url", "downloadUrl", "download_url"];
var PROMPT_FIELDS = ["prompt", "text_prompt", "instruction"];

function pick(body, fields) {
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

function nativeResponse(outputUrl) {
  var urls = { outputUrl: outputUrl, output_url: outputUrl, url: outputUrl, imageUrl: outputUrl, image_url: outputUrl };
  return {
    response: {
      status: 200,
      headers: { "Content-Type": "application/json; charset=utf-8", "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({
        result: {
          outputUrl: outputUrl, output_url: outputUrl, url: outputUrl,
          imageUrl: outputUrl, image_url: outputUrl, status: 200, data: urls
        },
        data: urls,
        status: 200
      })
    }
  };
}

(function () {
  if (typeof $request === "undefined" || !$request.body) return $done({});

  var body;
  try { body = JSON.parse($request.body); } catch (e) { return $done({}); }

  var imageUrl = pick(body, IMG_FIELDS);
  var prompt = pick(body, PROMPT_FIELDS);
  if (!imageUrl) return $done({});

  $httpClient.post({
    url: WORKER_URL + "/edit",
    body: JSON.stringify({ imageUrl: imageUrl, prompt: prompt }),
    headers: { "Content-Type": "application/json" },
    timeout: 55
  }, function (error, response, data) {
    if (!error && response && response.status === 200 && data) {
      try {
        var r = JSON.parse(data);
        var out = r.outputUrl || r.output_url || r.url || "";
        if (out) { $done(nativeResponse(out)); return; }
      } catch (e) {}
    }
    // Worker lỗi → để request gốc đi tiếp (app tự xử lý / báo lỗi riêng)
    $done({});
  });
})();
