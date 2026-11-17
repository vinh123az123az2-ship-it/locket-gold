/**
 * LOCKET GOLD VIP - CUSTOM FILTER INJECTOR
 * Tác giả: langtucamau
 *
 * Chèn các filter AI custom (Grab, Shopee, Anime...) vào danh sách filter
 * của Locket để hiện trong camera. Hoạt động bằng cách modify response
 * từ endpoint getFilters / getCameraEffects / getAiLooks.
 */

// ==================== DANH SÁCH FILTER CUSTOM ====================
// Thêm filter mới: thêm 1 object vào mảng bên dưới
// filter_id phải khớp với FILTER_PROMPTS trong Cloudflare Worker
var CUSTOM_FILTERS = [
  {
    filter_id: "grab_rider",
    name: "Grab Rider",
    category: "Custom AI",
    icon_emoji: "grab",
    is_premium: false,
    is_new: true
  },
  {
    filter_id: "shopee_food",
    name: "ShopeeFood",
    category: "Custom AI",
    icon_emoji: "shopee",
    is_premium: false,
    is_new: true
  },
  {
    filter_id: "gta_v",
    name: "GTA V",
    category: "Custom AI",
    icon_emoji: "gta",
    is_premium: false,
    is_new: true
  },
  {
    filter_id: "anime_art",
    name: "Anime",
    category: "Custom AI",
    icon_emoji: "anime",
    is_premium: false,
    is_new: true
  },
  {
    filter_id: "minecraft",
    name: "Minecraft",
    category: "Custom AI",
    icon_emoji: "minecraft",
    is_premium: false,
    is_new: true
  },
  {
    filter_id: "vintage_film",
    name: "Vintage Film",
    category: "Custom AI",
    icon_emoji: "vintage",
    is_premium: false,
    is_new: true
  },
  {
    filter_id: "cyberpunk",
    name: "Cyberpunk",
    category: "Custom AI",
    icon_emoji: "cyber",
    is_premium: false,
    is_new: true
  },
  {
    filter_id: "watercolor",
    name: "Watercolor",
    category: "Custom AI",
    icon_emoji: "watercolor",
    is_premium: false,
    is_new: true
  },
  {
    filter_id: "squid_game",
    name: "Squid Game",
    category: "Custom AI",
    icon_emoji: "squid",
    is_premium: false,
    is_new: true
  },
  {
    filter_id: "barbie",
    name: "Barbie",
    category: "Custom AI",
    icon_emoji: "barbie",
    is_premium: false,
    is_new: true
  },
  {
    filter_id: "pb_classic",
    name: "Photobooth Classic",
    category: "Photobooth",
    icon_emoji: "photobooth",
    is_premium: false,
    is_new: true
  },
  {
    filter_id: "pb_vintage",
    name: "Photobooth Vintage",
    category: "Photobooth",
    icon_emoji: "photobooth",
    is_premium: false,
    is_new: true
  }
];
// =================================================================

(function() {
  if (typeof $response === "undefined" || !$response.body) return $done({});

  var body = $response.body;
  try {
    var obj = JSON.parse(body);

    injectFilters(obj);
    unlockAllFilters(obj);

    $done({ body: JSON.stringify(obj) });
  } catch(e) {
    $done({});
  }
})();

function injectFilters(obj) {
  var filterArrays = findFilterArrays(obj);

  for (var i = 0; i < filterArrays.length; i++) {
    var arr = filterArrays[i];
    for (var j = 0; j < CUSTOM_FILTERS.length; j++) {
      var cf = CUSTOM_FILTERS[j];
      var exists = false;
      for (var k = 0; k < arr.length; k++) {
        if (arr[k].filter_id === cf.filter_id || arr[k].id === cf.filter_id) {
          exists = true;
          break;
        }
      }
      if (!exists) {
        arr.unshift({
          id: cf.filter_id,
          filter_id: cf.filter_id,
          name: cf.name,
          display_name: cf.name,
          category: cf.category,
          icon: cf.icon_emoji,
          icon_url: "",
          preview_url: "",
          is_premium: false,
          is_locked: false,
          requires_gold: false,
          is_new: cf.is_new,
          is_enabled: true,
          sort_order: -1
        });
      }
    }
  }
}

function unlockAllFilters(obj) {
  if (!obj || typeof obj !== "object") return;

  if ("is_locked" in obj) obj.is_locked = false;
  if ("requires_gold" in obj) obj.requires_gold = false;
  if ("is_premium" in obj) obj.is_premium = false;
  if ("locked" in obj) obj.locked = false;
  if ("is_free" in obj) obj.is_free = true;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && typeof obj[key] === "object" && obj[key] !== null) {
      unlockAllFilters(obj[key]);
    }
  }
}

function findFilterArrays(obj) {
  var results = [];
  if (!obj || typeof obj !== "object") return results;

  if (Array.isArray(obj)) {
    if (obj.length > 0 && obj[0] && (obj[0].filter_id || obj[0].id || obj[0].name)) {
      results.push(obj);
    }
  }

  for (var key in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;
    var val = obj[key];
    if (typeof val === "object" && val !== null) {
      var found = findFilterArrays(val);
      for (var i = 0; i < found.length; i++) {
        results.push(found[i]);
      }
    }
  }

  return results;
}
