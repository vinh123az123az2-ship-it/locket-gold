/**
 * LOCKET GOLD VIP - AI FILTER INTERCEPTOR
 * Tác giả: langtucamau
 *
 * Chặn ảnh upload (moments/upload/post), gửi raw bytes qua Cloudflare
 * Worker để AI transform, nhận raw JPEG bytes về, thay thế ảnh gốc.
 *
 * binary-body-mode=true → $request.body là raw image data.
 *
 * Chọn filter: đổi FILTER_ID, hoặc $persistentStore.write("gta_v","ai_filter").
 * Tắt: FILTER_ID = "off".
 *
 * Filter khả dụng: gta_v, anime_art, grab_rider, shopee_food, cyberpunk,
 *   vintage_film, barbie, squid_game, minecraft, watercolor, neon, ...
 */

// ==================== CẤU HÌNH ====================
var WORKER_URL = "https://locket-gold.locket-gold.workers.dev";
var FILTER_ID = "off";
// ==================================================

(function() {
  if (typeof $request === "undefined" || !$request.body) {
    return $done({});
  }

  var headers = $request.headers || {};
  var contentType = (headers["Content-Type"] || headers["content-type"] || "").toLowerCase();

  // Bỏ qua gói JSON (caption, like, comment)
  if (contentType.includes("application/json")) {
    return $done({});
  }

  var filter = FILTER_ID;
  try {
    var stored = $persistentStore.read("ai_filter");
    if (stored) filter = stored;
  } catch(e) {}

  if (!filter || filter === "off" || !WORKER_URL) {
    return $done({});
  }

  var serverUrl = WORKER_URL + "/filter?filter_id=" + encodeURIComponent(filter);

  $httpClient.post({
    url: serverUrl,
    body: $request.body,
    headers: {
      "Content-Type": contentType || "image/jpeg"
    },
    timeout: 40
  }, function(error, response, data) {
    if (!error && response && response.status === 200 && data) {
      $done({ body: data });
    } else {
      $done({});
    }
  });
})();
