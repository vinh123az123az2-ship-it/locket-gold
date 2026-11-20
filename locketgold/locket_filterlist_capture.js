/**
 * LOCKET GOLD VIP - CAPTURE getFilters (TAM, go sau khi lay format)
 *
 * Bat response danh sach filter (getFilters/getFiltersLive) khi mo thanh filter → post
 * {url, body} ve Worker /capture-resp (ungated) de doc format that + biet chen filter AI o dau.
 * Chi DOC, KHONG sua (nen SDK khong tu choi). $done({}) cho response di nguyen.
 */
(function () {
  if (typeof $response === "undefined") { $done({}); return; }
  var reqUrl = (typeof $request !== "undefined" && $request && $request.url) ? $request.url : "";
  var body = $response.body || "";
  try {
    $httpClient.post({
      url: "https://locket-gold.locket-gold.workers.dev/capture-resp",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({ url: reqUrl, status: $response.status || 0, body: String(body).slice(0, 30000) })
    }, function () { $done({}); });
  } catch (e) { $done({}); }
})();
