/**
 * LOCKET GOLD VIP - AI FILTER (generateFilteredImage)
 * Tác giả: langtucamau
 *
 * Chiều http-request: đổi thẳng đích request generateFilteredImage sang Worker
 * riêng. Nguyên body gốc của Locket (giữ nguyên, không đụng) chảy vào Worker;
 * Worker tự parse, generate ảnh AI, host, trả về format native {result:{outputUrl}}.
 *
 * Cách này giữ nguyên body gốc bất kể định dạng (JSON/protobuf/multipart),
 * không đoán field, không re-serialize — bền hơn parse ở script.
 */

var WORKER_URL = "https://locket-gold.locket-gold.workers.dev";

(function () {
  if (typeof $request === "undefined") return $done({});

  try {
    var headers = Object.assign({}, $request.headers || {});
    headers["Host"] = "locket-gold.locket-gold.workers.dev";
    headers["host"] = "locket-gold.locket-gold.workers.dev";

    return $done({
      url: WORKER_URL + "/generateFilteredImage",
      headers: headers
    });
  } catch (e) {
    return $done({});
  }
})();
