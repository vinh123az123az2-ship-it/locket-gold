/**
 * LOCKET GOLD VIP - AI FILTER (generateFilteredImage)
 *
 * Chiều http-request (requires-body=true).
 *
 * CƠ CHẾ: trả 302 redirect → app TỰ FETCH tới Worker (GET, params trên query).
 * Lý do bỏ kiểu $httpClient + $done({response}) (nhét response synthetic): rival
 * NMT xác nhận cơ chế nhét response bằng script KHÔNG thỏa Firebase Callable client
 * cho generateFilteredImage ("lỗi không thể áp dụng bộ lọc"), nên nó route app sang
 * server thật (VPS) qua DNS. 302 cho app fetch Worker = response từ SERVER THẬT, đúng
 * khung HTTP, mà không cần VPS. image_url/prompt nhét trên query nên dù URLSession đổi
 * POST→GET khi follow 302 (rớt body) vẫn đủ dữ liệu.
 *
 * Fallback: body lỗi/không parse được → $done({}) để request đi tiếp tới Locket thật.
 */

var WORKER_BASE = "https://locket-gold.locket-gold.workers.dev/generateFilteredImage";
var WORKER_SECRET = "lkg_96793314198125c82ab8488a1739a219";

(function () {
  if (typeof $request === "undefined") return $done({});

  var body = $request.body;
  if (!body) return $done({});

  var data;
  try {
    var obj = JSON.parse(body);
    data = (obj && obj.data) ? obj.data : obj;
  } catch (e) {
    return $done({}); // không parse được → để đi tiếp tới Locket
  }
  if (!data || typeof data !== "object") return $done({});

  var imageUrl = data.image_url || data.imageUrl || data.url || "";
  if (!imageUrl) return $done({});

  var prompt = data.prompt || data.text_prompt || "";
  var filterType = data.filter_type || data.filterType || "normal";
  var filterId = data.filter_id || data.filterId || "";

  var loc = WORKER_BASE +
    "?s=" + encodeURIComponent(WORKER_SECRET) +
    "&image_url=" + encodeURIComponent(imageUrl) +
    "&prompt=" + encodeURIComponent(prompt) +
    "&filter_type=" + encodeURIComponent(filterType) +
    "&filter_id=" + encodeURIComponent(filterId);

  return $done({
    response: {
      status: 302,
      headers: { "Location": loc, "Content-Type": "text/plain; charset=utf-8" },
      body: ""
    }
  });
})();
