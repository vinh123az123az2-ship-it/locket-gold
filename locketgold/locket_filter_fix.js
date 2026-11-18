/**
 * LOCKET GOLD VIP - AI FILTER (generateFilteredImage)
 * Tác giả: langtucamau
 *
 * Chiều http-request: đổi thẳng đích request generateFilteredImage sang Worker
 * riêng. Nguyên body gốc của Locket (giữ nguyên, không đụng) chảy vào Worker;
 * Worker tự parse, generate ảnh AI, host, trả về format native {result:{outputUrl}}.
 *
 * Bảo mật:
 *  - KHÔNG forward Authorization/Cookie (token Firebase của người dùng) sang Worker.
 *    Worker chỉ cần body (chứa signed URL ảnh), không cần token → strip cho sạch.
 *  - Gắn X-Worker-Secret để Worker chặn request lạ quét thẳng workers.dev (đốt credit).
 *    Lưu ý: script này public nên secret chỉ chặn scanner vu vơ, không bí mật tuyệt đối.
 */

var WORKER_URL = "https://locket-gold.locket-gold.workers.dev";
var WORKER_SECRET = "lkg_96793314198125c82ab8488a1739a219";

// Header nhạy cảm KHÔNG được forward sang Worker
var STRIP_HEADERS = ["authorization", "cookie", "x-firebase-appcheck", "x-goog-api-key", "proxy-authorization"];

(function () {
  if (typeof $request === "undefined") return $done({});

  try {
    var src = $request.headers || {};
    var headers = {};
    for (var k in src) {
      if (!src.hasOwnProperty(k)) continue;
      if (STRIP_HEADERS.indexOf(String(k).toLowerCase()) !== -1) continue;
      headers[k] = src[k];
    }
    headers["Host"] = "locket-gold.locket-gold.workers.dev";
    headers["host"] = "locket-gold.locket-gold.workers.dev";
    headers["X-Worker-Secret"] = WORKER_SECRET;

    return $done({
      url: WORKER_URL + "/generateFilteredImage",
      headers: headers
    });
  } catch (e) {
    return $done({});
  }
})();
