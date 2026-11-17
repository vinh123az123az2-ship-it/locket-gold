/**
 * LOCKET GOLD VIP - AI FILTER & PHOTOBOOTH ENGINE
 * Tác giả: langtucamau
 *
 * Chặn request generateFilteredImage, chuyển sang Cloudflare Worker.
 * Nếu Worker chưa deploy → pass through để Locket server xử lý bình thường.
 */

// ==================== CẤU HÌNH ====================
// Thay bằng URL Worker Cloudflare sau khi deploy
var WORKER_URL = "https://locket-gold.locket-gold.workers.dev";
// ==================================================

(function() {
  if (typeof $request === "undefined") return $done({});

  var url = $request.url || "";
  var headers = $request.headers || {};
  var body = $request.body || "";
  var contentType = (headers["Content-Type"] || headers["content-type"] || "").toLowerCase();

  if (!WORKER_URL || WORKER_URL === "WORKER_URL_HERE") {
    return $done({});
  }

  var filterId = "";

  if (contentType.includes("application/json") && body) {
    try {
      var json = JSON.parse(body);
      filterId = json.filter_id || json.filterId || json.style || json.effect || "";
    } catch(e) {}
  }

  if (!filterId) {
    var m = url.match(/[?&]filter_?id=([^&]+)/i) || url.match(/[?&]style=([^&]+)/i);
    if (m) filterId = decodeURIComponent(m[1]);
  }

  var isPhotobooth = /^(pb_|photobooth)/i.test(filterId);

  if (isPhotobooth) {
    handlePhotobooth(filterId, body, contentType);
  } else {
    handleFilter(filterId, body, contentType);
  }
})();

function handleFilter(filterId, body, contentType) {
  var workerUrl = WORKER_URL + "/filter?filter_id=" + encodeURIComponent(filterId);

  var reqHeaders = {
    "Content-Type": contentType || "application/octet-stream",
    "X-Filter-Id": filterId
  };
  $httpClient.post({
    url: workerUrl,
    body: body,
    headers: reqHeaders,
    timeout: 30
  }, function(error, response, data) {
    if (!error && response && response.status === 200 && data) {
      try {
        var result = JSON.parse(data);
        $done({
          response: {
            status: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              outputUrl: result.outputUrl || result.url || "",
              status: "success"
            })
          }
        });
        return;
      } catch(e) {}
      $done({ body: data });
    } else {
      $done({});
    }
  });
}

function handlePhotobooth(filterId, body, contentType) {
  var shotCount = parseInt($persistentStore.read("pb_shot") || "0") + 1;
  $persistentStore.write(String(shotCount), "pb_shot");

  var workerUrl = WORKER_URL + "/photobooth?filter_id=" + encodeURIComponent(filterId)
    + "&shot=" + shotCount;

  var pbHeaders = {
    "Content-Type": contentType || "application/octet-stream",
    "X-Shot-Number": String(shotCount),
    "X-Filter-Id": filterId
  };
  $httpClient.post({
    url: workerUrl,
    body: body,
    headers: pbHeaders,
    timeout: 30
  }, function(error, response, data) {
    if (!error && response && response.status === 200 && data) {
      try {
        var result = JSON.parse(data);
        if (result.complete || shotCount >= 4) {
          $persistentStore.write("0", "pb_shot");
        }
        $done({
          response: {
            status: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              outputUrl: result.outputUrl || result.url || "",
              status: result.complete ? "success" : "processing",
              shot: shotCount
            })
          }
        });
      } catch(e) {
        $done({
          response: {
            status: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: "processing", shot: shotCount })
          }
        });
      }
    } else {
      $done({});
    }
  });
}
