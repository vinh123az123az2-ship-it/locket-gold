/**
 * LOCKET GOLD VIP - AI FILTER v5 (302 redirect → app fetch Worker, nhận SSE stream thật)
 *
 * generateFilteredImage dùng Firebase callable STREAMING (SSE). $done nhét response buffered
 * không hợp stream → dùng 302 cho app TỰ kết nối Worker và đọc SSE trực tiếp (Content-Type
 * text/event-stream đến thẳng từ Worker). image_url/prompt nhét query (URLSession đổi POST->GET
 * khi follow 302 vẫn đủ data).
 *
 * Fallback: body lỗi → $done({}) cho đi tiếp tới Locket.
 */
var WORKER_BASE = "https://locket-gold.locket-gold.workers.dev/generateFilteredImage";
var WORKER_SECRET = "lkg_96793314198125c82ab8488a1739a219";

(function () {
  if (typeof $request === "undefined") return $done({});
  var body = $request.body;
  if (!body) return $done({});
  var data;
  try { var o = JSON.parse(body); data = (o && o.data) ? o.data : o; } catch (e) { return $done({}); }
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
  return $done({ response: { status: 302, headers: { "Location": loc, "Content-Type": "text/plain" }, body: "" } });
})();
