/**
 * LOCKET GOLD VIP - AI FILTER ENGINE
 * Tác giả: langtucamau
 *
 * Chặn ảnh upload (moments/upload/post), gửi qua Cloudflare Worker
 * để AI transform, rồi thay thế body bằng ảnh đã xử lý.
 *
 * Cách dùng:
 *   - Đổi FILTER_ID để chọn filter: gta_v, anime_art, grab_rider, etc.
 *   - Set "off" để tắt AI filter, ảnh gửi bình thường.
 *   - Hoặc dùng $persistentStore: script đọc key "ai_filter" nếu có.
 *
 * binary-body-mode=true trong config → $request.body là raw binary data
 */

// ==================== CẤU HÌNH ====================
var WORKER_URL = "https://locket-gold.locket-gold.workers.dev";
// Đổi filter tại đây hoặc dùng $persistentStore.write("gta_v", "ai_filter")
var FILTER_ID = "off";
// ==================================================

(function() {
  if (typeof $request === "undefined") return $done({});

  var url = $request.url || "";
  var body = $request.body;
  var contentType = ($request.headers["Content-Type"] || $request.headers["content-type"] || "").toLowerCase();

  var filter = FILTER_ID;
  try {
    var stored = $persistentStore.read("ai_filter");
    if (stored) filter = stored;
  } catch(e) {}

  if (!filter || filter === "off" || !WORKER_URL) {
    return $done({});
  }

  if (contentType.includes("application/json")) {
    return $done({});
  }

  if (!body || body.length < 100) {
    return $done({});
  }

  var workerUrl = WORKER_URL + "/filter?filter_id=" + encodeURIComponent(filter);

  $httpClient.post({
    url: workerUrl,
    body: body,
    headers: {
      "Content-Type": contentType || "image/jpeg"
    },
    timeout: 30
  }, function(error, response, data) {
    if (!error && response && response.status === 200 && data) {
      try {
        var result = JSON.parse(data);
        if (result.outputUrl && result.outputUrl.indexOf("data:") === 0) {
          var b64 = result.outputUrl.split(",")[1];
          if (b64) {
            $done({ body: b64, headers: { "Content-Type": "image/jpeg" } });
            return;
          }
        }
      } catch(e) {}
    }
    $done({});
  });
})();
