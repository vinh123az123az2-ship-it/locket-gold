/**
 * LOCKET GOLD VIP - AI FILTER PAYWALL KILLER (REQUEST MOCK)
 * Tác giả: langtucamau
 *
 * Chặn thẳng REQUEST generateFilteredImage, KHÔNG cho tới server Locket
 * (server trả 402 vì JWT entitlement rỗng). Trả mock 200 với outputUrl =
 * ảnh gốc từ request → app nhận kết quả hợp lệ, hết đòi Gold.
 *
 * Nếu WORKER_URL được set, redirect sang Worker để AI transform thật.
 */

// ==================== CẤU HÌNH ====================
// Để trống = chỉ gỡ paywall (ảnh gốc). Set Worker URL để AI transform thật.
var WORKER_URL = "";
// ==================================================

(function () {
  if (typeof $request === "undefined") return $done({});

  var body = $request.body || "";

  // Trích URL ảnh gốc từ request để làm outputUrl
  var imgUrl = "";
  var m = body.match(/https?:\/\/firebasestorage\.googleapis\.com\/[^"'\s\\]+/i) ||
          body.match(/https?:\/\/[^"'\s\\]+\.(jpg|jpeg|png|webp)[^"'\s\\]*/i) ||
          body.match(/https?:\/\/[^"'\s\\]*locket[^"'\s\\]*/i);
  if (m) imgUrl = m[0].replace(/\\u0026/g, "&").replace(/\\\//g, "/").replace(/\\/g, "");

  // Nếu có Worker → redirect request sang Worker xử lý AI thật
  if (WORKER_URL) {
    var headers = Object.assign({}, $request.headers || {});
    headers["Host"] = WORKER_URL.replace(/^https?:\/\//, "").replace(/\/.*$/, "");
    return $done({ url: WORKER_URL + "/generateFilteredImage", headers: headers });
  }

  // Không có Worker → mock 200 với ảnh gốc (gỡ paywall, ảnh chưa đổi style)
  var result = {
    status: 200,
    is_gold: true,
    is_locked: false,
    requires_gold: false,
    unlocked: true
  };
  if (imgUrl) {
    result.outputUrl = imgUrl;
    result.output_url = imgUrl;
    result.url = imgUrl;
    result.imageUrl = imgUrl;
    result.image_url = imgUrl;
  }

  $done({
    response: {
      status: 200,
      headers: { "Content-Type": "application/json; charset=utf-8", "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ result: result, data: result, status: 200 })
    }
  });
})();
