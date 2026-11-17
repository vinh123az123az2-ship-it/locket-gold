/**
 * LOCKET GOLD VIP - NATIVE AI FILTER UNBLUR
 * Tác giả: langtucamau
 *
 * Chặn response generateFilteredImage của Locket. Server Locket đã render
 * ảnh AI nhưng gate bằng lỗi 402/403 + blur + cờ requires_gold. Script này
 * gỡ paywall → ảnh AI hiện ra, hết mờ.
 *
 * Nhờ đó native AI filter (ai_anime, ai_ghibli, ai_cyberpunk, ai_y2k,
 * ai_polaroid, ai_claymation, ai_tiktok_trend...) chạy thật, không cần Worker.
 */

if (typeof $response === "undefined") {
  return $done({});
}

var body = $response.body;
var status = $response.status || $response.statusCode || 200;

if (status === 402 || status === 403 || status === 400) {
  status = 200;
}

try {
  var obj = JSON.parse(body);

  if (obj) {
    delete obj.error;
    delete obj.errors;

    if (obj.result) {
      delete obj.result.error;
      delete obj.result.errors;
      obj.result.is_locked = false;
      obj.result.requires_gold = false;
      obj.result.unlocked = true;
      obj.result.is_gold = true;
      obj.result.status = 200;
    }

    if (!obj.result) {
      obj.result = { status: 200, is_gold: true, is_locked: false, requires_gold: false, unlocked: true };
    }

    // Đảm bảo outputUrl hợp lệ để app không báo "Không thể áp dụng bộ lọc"
    var fallbackUrl = "";
    if (typeof $request !== "undefined" && $request && $request.body) {
      var m = $request.body.match(/https?:\/\/[^"'\s\\]+\.(jpg|jpeg|png|webp)[^"'\s\\]*/i) ||
              $request.body.match(/https?:\/\/firebasestorage\.googleapis\.com\/[^"'\s\\]+/i) ||
              $request.body.match(/https?:\/\/[^"'\s\\]*locket[^"'\s\\]*/i);
      if (m) fallbackUrl = m[0].replace(/\\u0026/g, "&").replace(/\\/g, "");
    }
    if (!obj.result.outputUrl && fallbackUrl) {
      obj.result.outputUrl = fallbackUrl;
      obj.result.output_url = fallbackUrl;
      obj.result.url = fallbackUrl;
      obj.result.imageUrl = fallbackUrl;
      obj.result.image_url = fallbackUrl;
      if (obj.result.data) {
        obj.result.data.outputUrl = fallbackUrl;
        obj.result.data.output_url = fallbackUrl;
        obj.result.data.url = fallbackUrl;
        obj.result.data.imageUrl = fallbackUrl;
        obj.result.data.image_url = fallbackUrl;
      }
    }
  }

  body = JSON.stringify(obj);
} catch (e) {}

var headers = Object.assign({}, ($response && $response.headers) || {});
delete headers["Content-Encoding"];
delete headers["content-encoding"];
delete headers["Content-Length"];
delete headers["content-length"];
headers["content-type"] = "application/json; charset=utf-8";

$done({ status: status, headers: headers, body: body });
