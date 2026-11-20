/**
 * =============================================================================
 *   🚀 LOCKET GOLD VIP - FIREBASE REMOTE CONFIG SCRIPT
 *   Tác giả: langtucamau
 *   Hỗ trợ: https://github.com/vinh123az123az2-ship-it/locket-gold
 * =============================================================================
 */

let obj = {};
try {
  obj = JSON.parse($response.body || '{}');
} catch (e) {
  obj = {};
}

obj.entries = obj.entries || {};

// =============================================================================
// 📢 PHẦN 1: THÔNG BÁO POPUP KHI LÊN GOLD THÀNH CÔNG
// (Bạn có thể tự do sửa tiêu đề, lời nhắn và link ảnh tại đây)
// =============================================================================
const popupConfig = {
  "tag": "LOCKET GOLD",
  "tag_gradient": true,
  "tag_style": "gold_gradient",
  "title": "Lên LocketGold rồi đó 😎",
  "feature_set": [
    {
      "title": "Locket Gold VIP - langtucamau ✨",
      "body": "Đã kích hoạt thành công Locket Gold VIP 💛",
      "imageURL": "https://raw.githubusercontent.com/vinh123az123az2-ship-it/locket-gold/refs/heads/master/assets/welcome_banner.png"
    }
  ],
  "primary_button_title": "Xong",
  "campaign": "locket_gold_welcome_v3",
  "start_at": "2020-01-01T00:00:00",
  "end_at": "3000-12-31T23:59:59",
  "use_local_time_zone": true
};

// =============================================================================
// 🖼️ PHẦN 2: CẤU HÌNH KHUNG TIỆN ÍCH WIDGET TỰ CHỌN (WIDGET FRAME)
// (Bạn có thể thay đổi link ảnh PNG khung viền trong suốt của bạn tại đây)
// =============================================================================
const widgetFrameConfig = {
  "uid": "custom_frame_langtucamau",
  "url": "", // Dán link ảnh khung viền PNG trong suốt của BẠN vào đây (để trống = không dùng khung)
  "placement": "below", // "below" (nằm dưới) hoặc "above" (nằm đè lên viền widget)
  "use_local_time_zone": true,
  "start_at": "2020-01-01T00:00:00",
  "end_at": "2099-12-31T23:59:59"
};

// =============================================================================
// 🏷️ PHẦN 3: DANH SÁCH THỨ TỰ CÁC NHÃN CAPTION TRÊN CAMERA (DYNAMIC CAPTIONS)
// (Mỗi dòng là 1 nhãn, bạn có thể thêm mới, xóa bớt hoặc đảo vị trí nhãn)
// =============================================================================
const overlayDynamicCaptions = [
  "langtucamau_vip",      // Nút 1: Tên cá nhân / Admin
  "langtucamau_web",      // Nút 2: Website / Kênh (Trước đây là langtucamau.COM)
  "langtucamau_gold",     // Nút 3: Locket Gold (Trước đây là LocketLAM)
  "langtucamau_quote",    // Nút 4: Slogan / Quote (Bug là tính năng)
  "standard",
  "poll",
  "color_palette",
  "review",
  "music",
  "location",
  "weather",
  "time",
  "streak",
  "star_sign",
  "party_time",
  "locket_count",
  "good_morning",
  "goodnight",
  "ootd",
  "miss_you",
  "custom",
  "phunu_2010",
  "halloween_2026"
];

// =============================================================================
// 🎨 PHẦN 3: CHI TIẾT CÁC NHÓM NHÃN DÁN ĐƯỢC TẠO RA (OVERLAY ITEMS)
// (Định nghĩa màu sắc Gradient, Icon Emoji, Text chữ cho từng nhãn dán)
// =============================================================================
const overlayItems = [
  {
    "section": "👑 Độc Quyền langtucamau",
    "items": [
      // -----------------------------------------------------------------------
      // 👑 NÚT 1: TÊN BẠN / ADMIN
      // -----------------------------------------------------------------------
      {
        "overlay_id": "caption:langtucamau_vip",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#0052D4",
              "#4364F7",
              "#6FB1FC"
            ]
          },
          "icon": {
            "data": "👑",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "langtucamau",
          "localized_text": {
            "en": "langtucamau",
            "vn": "langtucamau"
          },
          "text_color": "#FFFFFF",
          "type": "static_content"
        }
      },
      // -----------------------------------------------------------------------
      // 🌐 NÚT 2: ĐÂY CHÍNH LÀ NÚT "langtucamau.COM" (Bạn sửa tên ở 'vn' và 'text')
      // -----------------------------------------------------------------------
      {
        "overlay_id": "caption:langtucamau_web",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#0F2027",
              "#203A43",
              "#2C5364"
            ]
          },
          "icon": {
            "data": "🌐",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "FB: langtucamau",
          "localized_text": {
            "en": "FB: langtucamau",
            "vn": "FB: Van Nguyen (Den)"
          },
          "text_color": "#00E5FF",
          "type": "static_content"
        }
      },
      // -----------------------------------------------------------------------
      // 💛 NÚT 3: ĐÂY CHÍNH LÀ NÚT "LocketLAM" (Bạn sửa tên ở 'vn' và 'text')
      // -----------------------------------------------------------------------
      {
        "overlay_id": "caption:langtucamau_gold",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#FFD700",
              "#FFA500"
            ]
          },
          "icon": {
            "data": "💛",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "LocketGOLD",
          "localized_text": {
            "en": "LocketGOLD",
            "vn": "LocketGOLD"
          },
          "text_color": "#1A1A1A",
          "type": "static_content"
        }
      },
      // -----------------------------------------------------------------------
      // 🐳 NÚT 4: SLOGAN / QUOTE (Bug là tính năng)
      // -----------------------------------------------------------------------
      {
        "overlay_id": "caption:langtucamau_quote",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#0A192F",
              "#172A45",
              "#304D6D"
            ]
          },
          "icon": {
            "data": "🐳",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Bug là tính năng",
          "localized_text": {
            "en": "Bug là tính năng",
            "vn": "Bug là tính năng"
          },
          "text_color": "#64FFDA",
          "type": "static_content"
        }
      }
    ]
  },
  {
    "section": "🎨 General",
    "items": [
      {
        "overlay_id": "caption:standard",
        "source": "local",
        "caption": {
          "type": "standard"
        }
      },
      {
        "overlay_id": "caption:review",
        "source": "local",
        "caption": {
          "type": "review"
        }
      },
      {
        "overlay_id": "caption:music",
        "source": "local",
        "caption": {
          "type": "music"
        }
      },
      {
        "overlay_id": "caption:location",
        "source": "local",
        "caption": {
          "type": "location"
        }
      },
      {
        "overlay_id": "caption:weather",
        "source": "local",
        "caption": {
          "type": "weather"
        }
      },
      {
        "overlay_id": "caption:time",
        "source": "local",
        "caption": {
          "type": "time"
        }
      },
      {
        "overlay_id": "caption:streak",
        "source": "local",
        "caption": {
          "type": "streak"
        }
      },
      {
        "overlay_id": "caption:star_sign",
        "source": "local",
        "caption": {
          "type": "star_sign"
        }
      },
      {
        "overlay_id": "caption:poll",
        "source": "local",
        "caption": {
          "type": "poll"
        }
      },
      {
        "overlay_id": "caption:color_palette",
        "source": "local",
        "caption": {
          "type": "color_palette"
        }
      },
      {
        "overlay_id": "caption:locket_count",
        "source": "local",
        "caption": {
          "type": "locket_count"
        }
      }
    ]
  },
  {
    "section": "🎨 Holiday Caption",
    "items": [
      {
        "overlay_id": "caption:halloween_2026",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#150804",
              "#C8540D"
            ]
          },
          "icon": {
            "data": "🎃",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Halloween",
          "localized_text": {
            "en": "Halloween",
            "vn": "Halloween"
          },
          "text_color": "#FFB182",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:autumn_2026",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#FFE0A0",
              "#F6A53A"
            ]
          },
          "icon": {
            "data": "🍂",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Xin chào Mùa Thu",
          "localized_text": {
            "en": "Xin chào Mùa Thu",
            "vn": "Xin chào Mùa Thu"
          },
          "text_color": "#FFFFFF",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:christmas_eve_2026",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#2FA85F",
              "#176B3A"
            ]
          },
          "icon": {
            "data": "🕯️",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Giáng sinh an lành",
          "localized_text": {
            "en": "Giáng sinh an lành",
            "vn": "Giáng sinh an lành"
          },
          "text_color": "#FFFFFF",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:christmas_day_2026",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#E53935",
              "#A81818"
            ]
          },
          "icon": {
            "data": "🎄",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Giáng sinh an lành",
          "localized_text": {
            "en": "Giáng sinh an lành",
            "vn": "Giáng sinh an lành"
          },
          "text_color": "#FFFFFF",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:new_years_eve_2026",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#FFC64B",
              "#FFEDBF"
            ]
          },
          "icon": {
            "data": "🥂",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Xin chào 2027!",
          "localized_text": {
            "en": "Xin chào 2027!",
            "vn": "Xin chào 2027!"
          },
          "text_color": "#643F00",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:new_years_day_2027",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#3B00EC",
              "#823FFF"
            ]
          },
          "icon": {
            "data": "💫",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Xin chào 2027!",
          "localized_text": {
            "en": "Xin chào 2027!",
            "vn": "Xin chào 2027!"
          },
          "text_color": "#FFFFFF",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:new_years_day_2027_alternate",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#FF0062",
              "#FF783F"
            ]
          },
          "max_lines": 1,
          "text": "2027",
          "text_color": "#FFFFFF",
          "type": "static_content"
        }
      }
    ]
  },
  {
    "section": "🎨 Decorative by Locket",
    "items": [
      {
        "overlay_id": "caption:toi_nho_em",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#FFFFFF",
              "#6D9EEB"
            ]
          },
          "max_lines": 1,
          "text": "보고 싶어 🥺",
          "text_color": "#000000E6",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:party_time",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#5EFFF5",
              "#FCFF57"
            ]
          },
          "icon": {
            "data": "🪩",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Party Time!",
          "text_color": "#000000E6",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:good_morning",
        "source": "remote",
        "daily_start_hour": 5,
        "daily_end_hour": 10,
        "caption": {
          "background": {
            "colors": [
              "#EF7402",
              "#EABF0F"
            ]
          },
          "icon": {
            "data": "☀️",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Good morning",
          "text_color": "#FFFFFFE5",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:goodnight",
        "source": "remote",
        "daily_start_hour": 19.5,
        "daily_end_hour": 24,
        "caption": {
          "background": {
            "colors": [
              "#370C6F",
              "#575CD4"
            ]
          },
          "icon": {
            "data": "🌙",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Goodnight",
          "text_color": "#FFFFFFE6",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:ootd",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#FFFFFF",
              "#DBDBDB"
            ]
          },
          "icon": {
            "data": "🕶",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "OOTD",
          "text_color": "#101010E6",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:miss_you",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#EC0C00",
              "#FF493F"
            ]
          },
          "icon": {
            "data": "🥰",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Miss you",
          "text_color": "#FFFFFFDB",
          "type": "static_content"
        }
      }
    ]
  },
  {
    "section": "🎨 Decorative by langtucamau",
    "items": [
      {
        "overlay_id": "caption:lamdev",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#B8E7FF",
              "#A8F5D0",
              "#DCCBFF"
            ]
          },
          "max_lines": 1,
          "text": "💻 langtucamau",
          "text_color": "#183153",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:feeling_cute",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#F8BBD0",
              "#E91E63"
            ]
          },
          "icon": {
            "data": "🌷",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Feeling Cute",
          "localized_text": {
            "en": "Feeling Cute",
            "vn": "Cảm thấy dthw"
          },
          "text_color": "#FFFFFFE5",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:cu",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#FFD6A5",
              "#FFF1A8",
              "#FFC4D6"
            ]
          },
          "max_lines": 1,
          "text": "Cu 🐎",
          "text_color": "#633B24",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:wedding_time",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#FFE4E1",
              "#E73C7E"
            ]
          },
          "icon": {
            "data": "💍",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Wedding Time!",
          "localized_text": {
            "en": "Wedding Time!",
            "vn": "Đám cưới nè!"
          },
          "text_color": "#FFFFFFE6",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:cam_thay_hanh_phuc",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#EC407A",
              "#F8BBD0"
            ]
          },
          "icon": {
            "data": "🇻🇳",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Cảm thấy hạnh phúc",
          "localized_text": {
            "en": "Feeling Happy",
            "vn": "Cảm thấy hạnh phúc"
          },
          "text_color": "#FFFFFFE6",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:coffee_time",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#4E342E",
              "#8D6E63"
            ]
          },
          "icon": {
            "data": "☕",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Coffee Time!",
          "localized_text": {
            "en": "Coffee Time!",
            "vn": "Giờ uống cà phê!"
          },
          "text_color": "#FFFFFFE6",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:snake_vibes",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#2E7D32",
              "#66BB6A"
            ]
          },
          "icon": {
            "data": "🐍",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Snake Vibes",
          "localized_text": {
            "en": "Snake Vibes",
            "vn": "Chất rắn"
          },
          "text_color": "#FFFFFFE6",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:mixue_time",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#FFF9C4",
              "#F8BBD0"
            ]
          },
          "icon": {
            "data": "🍦",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Mixue Time!",
          "localized_text": {
            "en": "Mixue Time!",
            "vn": "Giờ Mixue!"
          },
          "text_color": "#000000E6",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:locket_time",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#ECEFF1",
              "#B3E5FC"
            ]
          },
          "icon": {
            "data": "📷",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Locket Time!",
          "text_color": "#000000E6",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:cinema_time",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#1A237E",
              "#455A64"
            ]
          },
          "icon": {
            "data": "🎬",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Cinema Time!",
          "text_color": "#FFFFFFE6",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:dating_time",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#E91E63",
              "#F44336"
            ]
          },
          "icon": {
            "data": "💕",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Dating Time!",
          "text_color": "#FFFFFFE6",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:graduation_day",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#1A237E",
              "#283593"
            ]
          },
          "icon": {
            "data": "🎓",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Happy Graduation Day!",
          "localized_text": {
            "en": "Happy Graduation Day!",
            "vn": "Chúc mừng tốt nghiệp!"
          },
          "text_color": "#FFFFFFE6",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:shopping_time",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#B3E5FC",
              "#FFFFFF"
            ]
          },
          "icon": {
            "data": "🛍️",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Shopping Time!",
          "localized_text": {
            "en": "Shopping Time!",
            "vn": "Giờ mua sắm!"
          },
          "text_color": "#000000E6",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:dinner_time",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#FFCCBC",
              "#FF8A80"
            ]
          },
          "icon": {
            "data": "🍽️",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Dinner Time!",
          "localized_text": {
            "en": "Dinner Time!",
            "vn": "Giờ ăn tối!"
          },
          "text_color": "#FFFFFFE6",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:chilling_time",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#E1BEE7",
              "#F8BBD0"
            ]
          },
          "icon": {
            "data": "🌴",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Chilling Time!",
          "localized_text": {
            "en": "Chilling Time!",
            "vn": "Giờ thư giãn!"
          },
          "text_color": "#FFFFFFE6",
          "type": "static_content"
        }
      }
    ]
  },
  {
    "section": "🌸 Độc lạ",
    "items": [
      {
        "overlay_id": "caption:xin_vinh_biet_cu",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#232526",
              "#414345"
            ]
          },
          "icon": {
            "data": "🕯️",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Xin vĩnh biệt cụ",
          "text_color": "#FFFFFFE6",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:chay_ngay_di",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#D31027",
              "#EA384D"
            ]
          },
          "icon": {
            "data": "🏃💨",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Chạy ngay đi",
          "text_color": "#FFFFFFE6",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:cu_tu_tu_khoai_se_nhu",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#56AB2F",
              "#A8E063"
            ]
          },
          "icon": {
            "data": "🥔",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Cứ từ từ khoai sẽ nhừ",
          "text_color": "#000000E6",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:kiem_tra_nhan_pham",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#654EA3",
              "#EAAFC8"
            ]
          },
          "icon": {
            "data": "🎲",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Kiểm tra nhân phẩm",
          "text_color": "#FFFFFFE6",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:doc_so_tai_khoan",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#1E90FF",
              "#00D4FF"
            ]
          },
          "icon": {
            "data": "💳",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "đọc số tài khoản",
          "text_color": "#FFFFFFE6",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:ai_so_thi_di_ve",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#B71C1C",
              "#FF5722"
            ]
          },
          "icon": {
            "data": "🏃",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "ai sợ thì đi về",
          "text_color": "#FFFFFFE6",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:con_cai_nit",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#D7CCC8",
              "#8D6E63"
            ]
          },
          "icon": {
            "data": "🧶",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "còn cái nịt",
          "text_color": "#FFFFFFE6",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:canh_bao_co_hat",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#9C27B0",
              "#E91E63"
            ]
          },
          "icon": {
            "data": "🎤",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "cảnh báo có hát",
          "text_color": "#FFFFFFE6",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:than_chua_ma_don",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#607D8B",
              "#37474F"
            ]
          },
          "icon": {
            "data": "😔",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Thân chưa mà dỡn",
          "text_color": "#FFFFFFE6",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:ai_muon",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#E91E63",
              "#F44336"
            ]
          },
          "icon": {
            "data": "🤔",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Ai mượn?",
          "text_color": "#FFFFFFE6",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:hay_ra_de_qua_a",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#FFF59D",
              "#80DEEA"
            ]
          },
          "icon": {
            "data": "🥺",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Hay ra dẻ quá à!",
          "text_color": "#000000E6",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:giam_suc_manh_con_tuong",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#4CAF50",
              "#00BCD4"
            ]
          },
          "icon": {
            "data": "🎮",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Giảm sức mạnh con tướng",
          "text_color": "#FFFFFFE6",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:mac_co_qua_hai_oi",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#FFB74D",
              "#F8BBD0"
            ]
          },
          "icon": {
            "data": "😭",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Mắc cỡ quá hai ơi",
          "text_color": "#FFFFFFE6",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:minh_la_lop",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#263238",
              "#455A64"
            ]
          },
          "icon": {
            "data": "🛞",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Mình là lốp",
          "text_color": "#FFFFFFE6",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:dep_trai_co_gi_sai",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#FF5722",
              "#FFC107"
            ]
          },
          "icon": {
            "data": "😎",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Đẹp trai có gì sai",
          "text_color": "#000000E6",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:mong_ton_hoa_sen",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#D8B4E2",
              "#F8BBD0"
            ]
          },
          "icon": {
            "data": "🪷",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Mong tôn hoa sen thấy cảnh này",
          "text_color": "#FFFFFFE6",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:dam_nhau_khong",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#E53935",
              "#FF7043"
            ]
          },
          "icon": {
            "data": "🥊",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "đấm nhau không",
          "text_color": "#FFFFFFE6",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:sieu_cap_ba_khi",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#EC407A",
              "#F44336"
            ]
          },
          "icon": {
            "data": "🐉",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "siêu cấp bá khí",
          "text_color": "#FFFFFFE6",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:du_an_ma",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#263238",
              "#455A64"
            ]
          },
          "icon": {
            "data": "👻",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "dự án ma",
          "text_color": "#FFFFFFE6",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:doi_roi",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#FF5F6D",
              "#FFC371"
            ]
          },
          "icon": {
            "data": "😤",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Dỗi rồi",
          "text_color": "#FFFFFF",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:dang_ban_tuong_tu",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#1A2980",
              "#26D0CE"
            ]
          },
          "icon": {
            "data": "💭",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Đang bận tương tư",
          "text_color": "#FFFFFF",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:mo_hon_nhung_tam_hien",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#FFB75E",
              "#ED8F03"
            ]
          },
          "icon": {
            "data": "🐤",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Mỏ hỗn nhưng tâm hiền",
          "text_color": "#FFFFFF",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:muon_duoc_om",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#FF9A9E",
              "#FECFEF"
            ]
          },
          "icon": {
            "data": "🫂",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Muốn được ôm",
          "text_color": "#FFFFFF",
          "type": "static_content"
        }
      }
    ]
  },
  {
    "section": "🌸 Trend TikTok",
    "items": [
      {
        "overlay_id": "caption:hoi_chieu_troi_mua",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#546E7A",
              "#263238"
            ]
          },
          "icon": {
            "data": "🌧️",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Hồi chiều trời mưa...",
          "text_color": "#FFFFFFE6",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:con_vien_la_lan",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#12C2E9",
              "#F64F59"
            ]
          },
          "icon": {
            "data": "🍂",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "côn viên lá làn",
          "text_color": "#FFFFFFE6",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:tuyet_doi_khong_nghe",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#FF416C",
              "#FF4B2B"
            ]
          },
          "icon": {
            "data": "🙉",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Tuyệt đối không nghe",
          "text_color": "#FFFFFFE6",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:flex_den_hoi_tho_cuoi",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#F7971E",
              "#FFD200"
            ]
          },
          "icon": {
            "data": "💎",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Flex đến hơi thở cuối",
          "text_color": "#000000E6",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:overthinking_vai_chuong",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#2C3E50",
              "#4CA1AF"
            ]
          },
          "icon": {
            "data": "🤯",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Overthinking vai chưởng",
          "text_color": "#FFFFFFE6",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:chan_bo_may_di",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#870000",
              "#190A05"
            ]
          },
          "icon": {
            "data": "🙄",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Chan bố mày đi",
          "text_color": "#FFFFFF",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:oach_xa_lach",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#11998E",
              "#38EF7D"
            ]
          },
          "icon": {
            "data": "🥬",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "oách xà lách",
          "text_color": "#FFFFFF",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:ua_alo",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#8E2DE2",
              "#4A00E0"
            ]
          },
          "icon": {
            "data": "📞",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Ủa alo",
          "text_color": "#FFFFFF",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:ke_chuyen_nghe_choi",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#8A2387",
              "#E94057"
            ]
          },
          "icon": {
            "data": "🍿",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Kể chuyện nghe chơi",
          "text_color": "#FFFFFFE6",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:hom_nay_toi_buon",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#141E30",
              "#243B55"
            ]
          },
          "icon": {
            "data": "🥀",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "hôm nay tôi buồn",
          "text_color": "#FFFFFF",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:xinh_dep_tuyet_voi",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#FC5C7D",
              "#6A82FB"
            ]
          },
          "icon": {
            "data": "💅",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Xinh đẹp tuyệt vời",
          "text_color": "#FFFFFFE6",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:tram_cam_nhe",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#1F1C2C",
              "#928DAB"
            ]
          },
          "icon": {
            "data": "🫠",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Trầm cảm nhẹ",
          "text_color": "#FFFFFFE6",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:chua_du_wow",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#FF5349",
              "#EB0C00"
            ]
          },
          "icon": {
            "data": "⭐",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Chưa đủ wow",
          "text_color": "#FFFFFFE6",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:boc_trung_sit_rit",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#9C27B0",
              "#7B1FA2"
            ]
          },
          "icon": {
            "data": "🎁",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Bóc trúng sít rịt",
          "text_color": "#FFFFFFE6",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:hen_lam_moi_xui_duoc_vay_a",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#00BCD4",
              "#0097A7"
            ]
          },
          "icon": {
            "data": "😅",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Hèn lắm mới xui được vậy á",
          "text_color": "#FFFFFFE6",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:ra_duong_ne_moi_anh",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#2196F3",
              "#1976D2"
            ]
          },
          "icon": {
            "data": "👤",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Ra đường nể mỗi anh",
          "text_color": "#FFFFFFE6",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:cung_cung_di",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#FFC107",
              "#FFA000"
            ]
          },
          "icon": {
            "data": "🚀",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Cũng cứng đi",
          "text_color": "#FFFFFFE6",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:tuyet_doi_dien_anh",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#455A64",
              "#263238"
            ]
          },
          "icon": {
            "data": "📷",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Tuyệt đối điện ảnh",
          "text_color": "#FFFFFFE6",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:du_ba_khi_chua",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#FF5722",
              "#E64A19"
            ]
          },
          "icon": {
            "data": "⚡",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Đủ bá khí chưa",
          "text_color": "#FFFFFFE6",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:ua_alo",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#9C27B0",
              "#7B1FA2"
            ]
          },
          "icon": {
            "data": "❓",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Ủa alo?",
          "text_color": "#FFFFFFE6",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:cai_gi_vay_troi",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#F44336",
              "#D32F2F"
            ]
          },
          "icon": {
            "data": "❗",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Cái gì vậy trời",
          "text_color": "#FFFFFFE6",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:nay_la_het_cuu",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#607D8B",
              "#455A64"
            ]
          },
          "icon": {
            "data": "❌",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Này là hết cứu",
          "text_color": "#FFFFFFE6",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:qua_la_dien_anh",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#26A69A",
              "#00897B"
            ]
          },
          "icon": {
            "data": "📷",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Quá là điện ảnh",
          "text_color": "#FFFFFFE6",
          "type": "static_content"
        }
      }
    ]
  },
  {
    "section": "Gen Z Life 🩻",
    "items": [
      {
        "overlay_id": "caption:hao_han",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#114357",
              "#F29492"
            ]
          },
          "icon": {
            "data": "🗡️",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Hảo hán",
          "text_color": "#FFFFFF",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:cam_lanh",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#2193B0",
              "#6DD5ED"
            ]
          },
          "icon": {
            "data": "🤧",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Cảm lạnh",
          "text_color": "#FFFFFF",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:bat_luc",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#2C3E50",
              "#3498DB"
            ]
          },
          "icon": {
            "data": "🏳️",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Bất lực",
          "text_color": "#FFFFFF",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:xin_lui_duoc_chua",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#F6D365",
              "#FDA085"
            ]
          },
          "icon": {
            "data": "🥺",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Xin lũi được chưa",
          "text_color": "#000000",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:rot_nuoc_mat",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#1CB5E0",
              "#000046"
            ]
          },
          "icon": {
            "data": "😭",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Rớt nước mắt",
          "text_color": "#FFFFFF",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:guc_nga",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#3A1C71",
              "#D76D77"
            ]
          },
          "icon": {
            "data": "📉",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Gục ngã",
          "text_color": "#FFFFFF",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:tien_dinh",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#C33764",
              "#1D2671"
            ]
          },
          "icon": {
            "data": "🌪️",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Tiền đình",
          "text_color": "#FFFFFF",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:che_manh",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#FF4E50",
              "#F9D423"
            ]
          },
          "icon": {
            "data": "👎",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Chê mạnh",
          "text_color": "#FFFFFF",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:xinh_gai_an_phim_1",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#F77062",
              "#FE5196"
            ]
          },
          "icon": {
            "data": "💅",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Xinh gái ấn phím 1",
          "text_color": "#FFFFFF",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:di_lam_vi_dam_me",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#FDC830",
              "#F37335"
            ]
          },
          "icon": {
            "data": "🤡",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Đi làm vì đam mê",
          "text_color": "#FFFFFF",
          "type": "static_content"
        }
      }
    ]
  },
  {
    "section": "🌸 Meme vui nhộn",
    "items": [
      {
        "overlay_id": "caption:cuoi_xiu",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#FFEB3B",
              "#FF9800"
            ]
          },
          "icon": {
            "data": "😎",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Cười xỉu",
          "text_color": "#000000E6",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:toang_that_roi",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#F44336",
              "#B71C1C"
            ]
          },
          "icon": {
            "data": "🐉",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Toang thật rồi",
          "text_color": "#FFFFFFE6",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:toi_roi_toi_roi",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#673AB7",
              "#512DA8"
            ]
          },
          "icon": {
            "data": "❗",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Tới rồi tới rồi",
          "text_color": "#FFFFFFE6",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:khong_the_tin_noi",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#00BCD4",
              "#0097A7"
            ]
          },
          "icon": {
            "data": "❓",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Không thể tin nổi",
          "text_color": "#FFFFFFE6",
          "type": "static_content"
        }
      }
    ]
  },
  {
    "section": "🌸 Đời sống",
    "items": [
      {
        "overlay_id": "caption:ngay_moi_vui_ve",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#4CAF50",
              "#2E7D32"
            ]
          },
          "icon": {
            "data": "☀️",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Ngày mới vui vẻ",
          "text_color": "#FFFFFFE6",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:ngu_ngon",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#3F51B5",
              "#1A237E"
            ]
          },
          "icon": {
            "data": "🌙",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Ngủ ngon",
          "text_color": "#FFFFFFE6",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:an_com_chua",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#FF9800",
              "#F57C00"
            ]
          },
          "icon": {
            "data": "🍽️",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Ăn cơm chưa?",
          "text_color": "#FFFFFFE6",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:di_choi_khong",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#E91E63",
              "#C2185B"
            ]
          },
          "icon": {
            "data": "✈️",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Đi chơi không?",
          "text_color": "#FFFFFFE6",
          "type": "static_content"
        }
      }
    ]
  },
  {
    "section": "🌸 Gen Z Slay",
    "items": [
      {
        "overlay_id": "caption:tinh_hoa_hoi_tu",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#FFD700",
              "#FF8C00"
            ]
          },
          "icon": {
            "data": "✨",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Tinh hoa hội tụ",
          "text_color": "#000000E6",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:phu_tinh_khong_phu_ban",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#8E2DE2",
              "#4A00E0"
            ]
          },
          "icon": {
            "data": "🕶️",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Phụ tình không phụ bản",
          "text_color": "#FFFFFFE6",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:ngoan_xinh_yeu",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#FFAFBD",
              "#FFC3A0"
            ]
          },
          "icon": {
            "data": "🌸",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Ngoan xinh yêu của ai?",
          "text_color": "#000000E6",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:nhin_la_biet_uy_tin",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#2980B9",
              "#2C3E50"
            ]
          },
          "icon": {
            "data": "👌",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Nhìn là biết uy tín",
          "text_color": "#FFFFFFE6",
          "type": "static_content"
        }
      }
    ]
  },
  {
    "section": "🌸 Bất ổn & Khó đỡ",
    "items": [
      {
        "overlay_id": "caption:luon_vui_tuoi",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#00F2FE",
              "#4FACFE"
            ]
          },
          "icon": {
            "data": "🤡",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Luôn vui tươi",
          "text_color": "#FFFFFFE6",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:bat_on_that_su",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#636363",
              "#A2AB58"
            ]
          },
          "icon": {
            "data": "🫠",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Bất ổn thật sự",
          "text_color": "#FFFFFFE6",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:khong_cam_xuc",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#434343",
              "#000000"
            ]
          },
          "icon": {
            "data": "🗿",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Không cảm xúc",
          "text_color": "#FFFFFFE6",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:phu_huynh_dung_xem",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#FF0844",
              "#FFB199"
            ]
          },
          "icon": {
            "data": "🙈",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Phụ huynh đừng xem",
          "text_color": "#FFFFFFE6",
          "type": "static_content"
        }
      }
    ]
  },
  {
    "section": "🌸 Check VAR & Hóng hớt",
    "items": [
      {
        "overlay_id": "caption:check_var",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#11998E",
              "#38EF7D"
            ]
          },
          "icon": {
            "data": "📺",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Check VAR liền",
          "text_color": "#FFFFFFE6",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:qua_nhieu_su_de_thuong",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#F38181",
              "#FCE38A"
            ]
          },
          "icon": {
            "data": "🎀",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Quá nhiều sự dễ thương",
          "text_color": "#000000E6",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:mac_bay_tinh_yeu",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#EE9CA7",
              "#FFDDE1"
            ]
          },
          "icon": {
            "data": "💘",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Mắc bẫy tình yêu",
          "text_color": "#000000E6",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:song_gio_phu_doi_trai",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#3A1C71",
              "#D76D77"
            ]
          },
          "icon": {
            "data": "🌪️",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Sóng gió phủ đời trai",
          "text_color": "#FFFFFFE6",
          "type": "static_content"
        }
      }
    ]
  },
  {
    "section": "🌸 Góc Deadline & Đi Làm",
    "items": [
      {
        "overlay_id": "caption:deadline_ruot",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#ED213A",
              "#93291E"
            ]
          },
          "icon": {
            "data": "🔥",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Deadline dí tụt quần",
          "text_color": "#FFFFFFE6",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:tien_dau_ma_tieu",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#11998E",
              "#38EF7D"
            ]
          },
          "icon": {
            "data": "💸",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Tiền đâu mà tiêu",
          "text_color": "#FFFFFFE6",
          "type": "static_content"
        }
      },
      {
        "overlay_id": "caption:nghien_cuu_khoa_hoc",
        "source": "remote",
        "caption": {
          "background": {
            "colors": [
              "#0F2027",
              "#2C5364"
            ]
          },
          "icon": {
            "data": "☕",
            "type": "emoji"
          },
          "max_lines": 1,
          "text": "Cần nạp cafein gấp",
          "text_color": "#FFFFFFE6",
          "type": "static_content"
        }
      }
    ]
  }
];

// =============================================================================
// ⚡ PHẦN 4: TOÀN BỘ CẤU HÌNH HỆ THỐNG MỞ KHÓA TÍNH NĂNG GOLD
// =============================================================================
const remoteEntries = {
  "feature_gates": JSON.stringify({
    "holiday_filters": "enabled",
    "holiday_filter": "enabled",
    "camera_filter": "enabled",
    "camera_filters": "enabled",
    "filters": "enabled",
    "camera_filter_sheet": "enabled",
    "camera_filters_sheet": "enabled",
    "camera_filter_picker": "enabled",
    "camera_theme": "enabled",
    "camera_themes": "enabled",
    "camera_themes_config": "enabled",
    "camera_theme_sheet": "enabled",
    "camera_themes_sheet": "enabled",
    "camera_theme_picker": "enabled",
    "camera_color": "enabled",
    "camera_colors": "enabled",
    "custom_widget_frames": "enabled",
    "widget_frames": "enabled",
    "widget_frame": "enabled",
    "frames": "enabled",
    "ai_filter": "enabled",
    "ai_filters": "enabled",
    "ai_camera_filter": "enabled",
    "ai_moments": "enabled",
    "ai_moment": "enabled",
    "ai_generation": "enabled",
    "ai_camera_mode": "enabled",
    "ai_styles": "enabled",
    "locket_ai": "enabled",
    "locket_ai_generation": "enabled",
    "unblur_moments": "enabled",
    "unblur_photos": "enabled",
    "view_gold_photos": "enabled",
    "view_ai_photos": "enabled",
    "gold_moments_viewing": "enabled",
    "gold_moments": "enabled",
    "exclusive_moments": "enabled",
    "app_icon_picker": "enabled",
    "app_icons": "enabled",
    "camera_roll": "enabled",
    "locket_views": "enabled",
    "long_captions": "enabled",
    "longer_video": "enabled",
    "unlimited_friends": "enabled",
    "priority_support": "enabled",
    "profile_badge": "enabled",
    "remove_ads": "enabled",
    "video": "enabled",
    "streak_recovery": "enabled"
  }),
  "upsell_features": JSON.stringify({
    "app_icon_picker": true,
    "camera_roll": true,
    "camera_theme": true,
    "camera_themes": true,
    "camera_color": true,
    "locket_views": true,
    "remove_ads": true,
    "custom_widget_frames": true,
    "widget_frames": true,
    "camera_filter": true,
    "camera_filters": true,
    "filters": true,
    "holiday_filter": true,
    "holiday_filters": true
  }),
  "paywall_presentation_config": "{\"uid\":\"paywall_disabled\",\"onboarding\":false,\"after_sent_moment\":false,\"on_foreground\":false,\"interval\":0,\"profile_banner\":false}",
  "profile_badge_visible": "true",
  "beta_features_enabled": "true",
  "camera_filters_enabled": "true",
  "camera_filter_enabled": "true",
  "camera_filter_sheet_enabled": "true",
  "camera_filter_picker_enabled": "true",
  "holiday_filters_enabled": "true",
  "holiday_filters_free": "true",
  "camera_theme_enabled": "true",
  "camera_themes_enabled": "true",
  "camera_theme_sheet_enabled": "true",
  "camera_theme_picker_enabled": "true",
  "camera_color_enabled": "true",
  "camera_colors_enabled": "true",
  "custom_widget_frames_enabled": "true",
  "widget_frames_enabled": "true",
  "widget_frame_enabled": "true",
  "widget_frames": "true",
  "app_icon_picker_enabled": "true",
  "app_icons_enabled": "true",
  "allows_custom_filters": "true",
  "camera_themes": "[\"sakura\",\"snowflake\",\"sunset\",\"surfboard\",\"ootd\"]",
  "camera_themes_config": "{\"enabled\":true,\"themes\":[\"sakura\",\"snowflake\",\"sunset\",\"surfboard\",\"ootd\"]}",
  "camera_theme_config": "{\"enabled\":true,\"themes\":[\"sakura\",\"snowflake\",\"sunset\",\"surfboard\",\"ootd\"]}",
  "link_caption_link_enabled": "true",
  "music_caption_enabled": "true",
  "music_caption_song_preview_enabled": "true",
  "unsend_message_enabled": "true",
  "lunar_new_year_app_icon_enabled": "true",
  "year_of_the_horse_icon_enabled": "true",
  "settings_instagram_url": "https://github.com/vinh123az123az2-ship-it/locket-gold",
  "settings_tiktok_url": "https://github.com/vinh123az123az2-ship-it/locket-gold",
  "settings_twitter_url": "https://github.com/vinh123az123az2-ship-it/locket-gold",
  "help_center_url": "https://github.com/vinh123az123az2-ship-it/locket-gold",
  "safety_center_url": "https://github.com/vinh123az123az2-ship-it/locket-gold",
  "parent_center_url": "https://github.com/vinh123az123az2-ship-it/locket-gold",
  "rewarded_referral_rule_url": "https://github.com/vinh123az123az2-ship-it/locket-gold",
  "history_ads_mode": "off",
  "history_ads_prefetch_count": "0",
  "history_ads_prefetch_immediate": "false",
  "history_ads_prefetch_reroute": "false",
  "history_ads_dynamic_insertion": "false",
  "history_ads_refresh_prefetch_on_foreground": "false",
  "history_ads_floor_price": "0",
  "history_ads_floor_price_att": "0",
  "history_ad_log_displayed_on_background": "false",
  "history_ads_debug_menu": "false",
  "sentry_sample_rate": "0",
  "sentry_network_tracing": "false",
  "sentry_performance_tracking": "false",
  "sentry_trace_sample_rate": "0",
  "sentry_profiles_sample_rate": "0",
  "camera": "{\"gold_max_duration\":60,\"goldMaxDuration\":60,\"max_duration\":60,\"maxDuration\":60,\"ultra_wide\":true,\"ultraWide\":true,\"volume_button\":true,\"volumeButton\":true,\"flash_button\":true,\"telephoto\":true,\"srgb\":true,\"lanczos\":true,\"quality_mbps\":2.5,\"qualityMbps\":2.5}",
  "camera_roll": "{\"gold_max_duration\":60,\"goldMaxDuration\":60,\"video_max_duration\":60,\"videoMaxDuration\":60,\"max_duration\":60,\"maxDuration\":60,\"trim_max_duration\":60,\"trimMaxDuration\":60,\"camera_roll_max_duration\":60,\"max_file_size\":104857600,\"max_upload_bytes\":104857600,\"max_size_bytes\":104857600,\"quality_mbps\":0.9,\"qualityMbps\":0.9,\"flash_button\":true}",
  "live_photos": "{\"capture\":true,\"viewing\":true,\"catch_up\":true,\"widget_looping_mode\":\"never\"}",
  "ai_filters_enabled": "true",
  "ai_filters_free": "true",
  "all_filters_free": "true",
  "free_filters_enabled": "true",
  "unlocked_filters": "true",
  "sheet_filters_selectable": "true",
  "camera_filter_sheet_selection_enabled": "true",
  "dismiss_filter_sheet_on_select": "true",
  "filter_selection_enabled": "true",
  "camera_filter_enabled": "true",
  "gold_active": "true",
  "gold_user": "true",
  "is_gold_user": "true",
  "user_is_gold": "true",
  "filter_paywall_enabled": "false",
  "camera_filter_paywall_enabled": "false",
  "filter_upsell_enabled": "false",
  "require_gold_for_filters": "false",
  "require_gold_for_filter": "false",
  "requires_gold_for_filters": "false",
  "requires_gold_for_filter": "false",
  "requires_gold_for_camera_filters": "false",
  "camera_filter_requires_gold": "false",
  "camera_filters_require_gold": "false",
  "ai_filter_requires_gold": "false",
  "ai_filters_require_gold": "false",
  "filter_requires_gold": "false",
  "filters_require_gold": "false",
  "filtered_image_requires_gold": "false",
  "filtered_images_require_gold": "false",
  "filter_gold_only": "false",
  "filters_gold_only": "false",
  "ai_filter_gold_only": "false",
  "ai_filters_gold_only": "false",
  "camera_filter_gold_only": "false",
  "camera_filters_gold_only": "false",
  "holiday_filters_gold_only": "false",
  "filtered_image_gold_only": "false",
  "filtered_images_gold_only": "false",
  "ai_moments_enabled": "true",
  "ai_moments_viewing_enabled": "true",
  "ai_moments_free_viewing": "true",
  "ai_viewing_requires_gold": "false",
  "lock_ai_moments_behind_gold": "false",
  "show_ai_gold_upsell": "false",
  "show_gold_upsell_on_view": "false",
  "unblur_ai_moments": "true",
  "unblur_gold_moments": "true",
  "ai_paywall_enabled": "false",
  "unlock_all_ai_styles": "true",
  "ai_camera_mode": "true",
  "ai_generation_daily_limit": "99999",
  "ai_free_generations_per_day": "99999",
  "locket_ai_generation_enabled": "true",
  "gold_moments_enabled": "true",
  "gold_moments_free_viewing": "true",
  "exclusive_moments_free": "true",
  "camera_filter_config": JSON.stringify({
    "allows_custom_filters": true,
    "show_filter_button": true,
    "sheet_enabled": true,
    "open_sheet_immediately": false,
    "can_use_all_filters": true,
    "all_filters_free": true,
    "is_subscriber": true,
    "unlocked": true,
    "allow_saving_all": true,
    "free_filters": ["all"],
    "holiday_filters_enabled": true,
    "holiday_filters_free": true,
    "sheet_filters": [
      {
        "title": { "en": "AI Hot Trend 🔥 (TikTok)", "vn": "AI Hot Trend 🔥 (TikTok)" },
        "filter_ids": ["ai_anime", "ai_ghibli", "ai_vintage", "ai_cyberpunk", "ai_cartoon", "ai_tiktok_trend", "ai_glamour", "ai_sketch", "ai_y2k", "ai_polaroid", "ai_claymation", "vintage_film", "anime_art", "cyber_langtucamau"]
      },
      {
        "title": { "en": "langtucamau VIP ✨", "vn": "langtucamau VIP ✨" },
        "filter_ids": ["vintage_film", "anime_art", "cyber_langtucamau", "flower_crown", "princess", "disco_lights", "cutesy", "looks_maxxing"]
      },
      {
        "title": { "en": "Cute ✨" },
        "filter_ids": ["cutesy", "sticker_face", "flower_crown", "love_bug"]
      },
      {
        "title": { "en": "Celebrate 🎉" },
        "filter_ids": ["slimed", "princess", "disco_lights", "cash_money", "happy_birthday"]
      },
      {
        "title": { "en": "Costumes 🎭" },
        "filter_ids": ["wedding", "cowboy_cowgirl", "giraffe", "clown"]
      },
      {
        "title": { "en": "Looks 💇" },
        "filter_ids": ["bowling_ball", "blonde_bleached", "beard", "bob_cut", "buns", "tatted", "mohawk", "braces"]
      },
      {
        "title": { "en": "Goofy 😂" },
        "filter_ids": ["okay_wig", "influencer", "looks_maxxing", "toothless", "bye_brows"]
      }
    ],
    "picker_filters": [
      "ai_anime", "ai_ghibli", "ai_vintage", "ai_cyberpunk", "ai_cartoon", "ai_tiktok_trend", "ai_glamour", "ai_sketch", "ai_y2k", "ai_polaroid", "ai_claymation",
      "vintage_film", "anime_art", "cyber_langtucamau",
      "flower_crown", "princess", "disco_lights", "cutesy", "looks_maxxing",
      "sticker_face", "love_bug", "slimed", "cash_money", "happy_birthday",
      "wedding", "cowboy_cowgirl", "giraffe", "clown",
      "bowling_ball", "blonde_bleached", "beard", "bob_cut", "buns", "tatted", "mohawk", "braces",
      "okay_wig", "influencer", "toothless", "bye_brows"
    ]
  }),
  "camera_roll_preview_enabled": "true",
  "camera_roll_video_enabled": "true",
  "camera_roll_video_upload_enabled": "true",
  "internal_camera_roll_video_upload_enabled": "true",
  "longer_camera_roll_videos_enabled": "true",
  "longer_videos": "true",
  "camera_roll_video_max_duration": "60.0",
  "camera_roll_max_duration": "60.0",
  "camera_roll_duration": "60.0",
  "max_video_duration": "60.0",
  "video_max_duration": "60.0",
  "video_trim_max_duration": "60.0",
  "trim_max_duration": "60.0",
  "gold_max_duration": "60.0",
  "goldMaxDuration": "60.0",
  "max_file_size": "104857600",
  "max_upload_bytes": "104857600",
  "max_size_bytes": "104857600",
  "max_video_file_size": "104857600",
  "camera_video_recording": "{\"default\":{\"maximum_duration\":60000,\"size\":1080,\"file_type\":\"mp4\",\"video_codec\":\"h265\"},\"gold\":{\"maximum_duration\":60000,\"size\":1080,\"file_type\":\"mp4\",\"video_codec\":\"h265\"}}",
  "android_camera_video_recording": "{\"default\":{\"maximum_duration\":60000,\"size\":1080,\"file_type\":\"mp4\",\"video_codec\":\"h265\"},\"gold\":{\"maximum_duration\":60000,\"size\":1080,\"file_type\":\"mp4\",\"video_codec\":\"h265\"}}",
  "photo_quality_balance": "quality",
  "android_photo_quality_balance": "quality",
  "video_quality_mbps": "2.5",
  "video_sound_enabled": "true",
  "microphone_enabled": "true",
  "camera_microphone_enabled": "true",
  "audio_session_deactivation_enabled": "true",
  "zoom_enabled": "true",
  "upload_main": "true",
  "upload_main_image_quality": "1.0",
  "upload_main_image_size": "2560",
  "upload_thumbnail_image_quality": "1.0",
  "upload_thumbnail_image_size": "2048",
  "upload_use_webp_thumbnail": "true",
  "android_upload_use_webp_thumbnail": "true",
  "max_friends_count": "999999",
  "friend_limit_mode": "0",
  "soft_friend_limit_threshold_count": "999999",
  "show_friend_limit_on_cam": "false",
  "signup_max_friends_count": "999999",
  "celebrity_inbox_limit": "999999",
  "friend_limit_geo_override": "{\"experiments\":{},\"area_code_overrides\":{}}",
  "friends_sheet_locket_count_config": "{\"items\":[{\"threshold\":0,\"icon_name\":\"heart\"},{\"threshold\":1,\"icon_name\":\"heart.fill\"},{\"threshold\":10,\"emoji\":\"🤍\"},{\"threshold\":100,\"emoji\":\"💛\"},{\"threshold\":500,\"emoji\":\"❤️‍🔥\"},{\"threshold\":1000,\"emoji\":\"🌟🫶🌟\"},{\"threshold\":2000,\"emoji\":\"✨💟✨\"},{\"threshold\":5000,\"emoji\":\"⚡️😵‍💫⚡\"},{\"threshold\":10000,\"emoji\":\"✨⚡️😱⚡✨\"}]}",
  "friend_locket_count_config": "{\"items\":[{\"threshold\":0,\"icon_name\":\"heart\"},{\"threshold\":1,\"icon_name\":\"heart.fill\"},{\"threshold\":10,\"emoji\":\"🤍\"},{\"threshold\":100,\"emoji\":\"💛\"},{\"threshold\":500,\"emoji\":\"❤️‍🔥\"},{\"threshold\":1000,\"emoji\":\"✨💗✨\"},{\"threshold\":2000,\"emoji\":\"✨️⭐️✨\"},{\"threshold\":5000,\"emoji\":\"✨💎✨\"},{\"threshold\":10000,\"emoji\":\"✨🔐💛✨\"}]}",
  "new_friends_monitoring_enabled": "true",
  "improved_friend_suggestions": "true",
  "show_friend_suggestions_by_default": "true",
  "emoji_friend_suggestions": "true",
  "prompt_contact_permissions_on_search": "true",
  "populate_phone_numbers_from_suggest_friends": "true",
  "hide_friends_enabled": "true",
  "hide_invite_links": "false",
  "hide_skip_contacts": "true",
  "show_all_contacts": "true",
  "show_invite_suggestions": "true",
  "show_no_friends_bottom_sheet": "false",
  "signup_allow_skip_add_friends": "true",
  "streak_config": "{\"minimum_recovery_count\":0,\"minimum_display_count\":0}",
  "moment_views_enabled": "true",
  "moment_views_v2": "true",
  "record_moment_views": "true",
  "notify_moment_views": "true",
  "get_moment_views_as_cloud_function": "true",
  "moment_reactions_v2": "true",
  "chat_reactions_enabled": "true",
  "conversation_reactions": "true",
  "typing_indicators_enabled": "true",
  "reply_prototype_enabled": "true",
  "messages_integration": "true",
  "conversations_enabled": "true",
  "fetch_moments_in_conversation": "true",
  "hide_chat_button": "false",
  "groups_enabled": "true",
  "send_to_self_only_mode": "always_enabled",
  "time_travel_rewind_v2_enabled": "true",
  "calendar_delete_moment_enabled": "true",
  "calendar_rewind_enabled": "false",
  "locket_yearbook_story_sharing_encouraged": "true",
  "rollcall_enabled": "true",
  "rollcall_comment_actions": "true",
  "rollcall_profile_button": "true",
  "rollcall_prompt_export_after_share": "true",
  "rollcall_confirm_skip_tagging": "false",
  "rollcall_tap_to_tag_enabled": "false",
  "widget_frame_event_max_images": "5",
  "android_widget_frame_event_enabled": "true",
  "widget_badge_enabled": "true",
  "widget_badge_v2": "true",
  "widget_stale_state_enabled": "false",
  "widget_last_sent_indicator": "false",
  "widget_sync_token_reload_mode": "clearTokenNever",
  "widget_frame_event": JSON.stringify(widgetFrameConfig),
  "live_activity_onboarding": "true",
  "live_activity_onboarding_variant": "friending",
  "register_live_activity_push_to_start_token": "true",
  "live_activity_remove_stale_start_token": "true",
  "notification_preferences_live_activities": "true",
  "notification_preferences": "true",
  "notification_reply_body_visible": "true",
  "prompt_notification_permissions_after_friending": "true",
  "activity_bar_enabled": "true",
  "journal_activity_bar_enabled": "true",
  "journal_settings": "{\"debug_menu_enabled\":false,\"focus_animation\":true,\"compact_header\":true,\"friends_button\":true,\"reverse_scroll_direction\":false,\"streak_visualization\":true,\"streak_visualization_style\":\"gradient\",\"streak_header_minimum_count\":0,\"streak_visualization_minimum_count\":2,\"overlay_indicators\":{\"location\":true,\"music\":true,\"static_content\":true,\"weather\":true}}",
  "qr_code_config": "{\"profile_enabled\":true,\"scanning_enabled\":true}",
  "custom_profile_pics": "true",
  "profile_menu_v2_enabled": "true",
  "cdn_domain_replacements": "{\"firebasestorage.googleapis.com\":\"cdn.locketcamera.com\"}",
  "cdn_domain_replacements_video": "true",
  "storage_bucket": "gs://locket-img",
  "storage_bucket_video": "gs://locket-video",
  "image_cache_max_age_sec": "157680000",
  "image_cache_max_size": "400000000",
  "history_cache_age_days": "1000",
  "user_cache_max_age_sec": "691200",
  "friends_cache_max_age_sec": "2592000",
  "image_fetch_cache": "true",
  "image_cache_use_shared": "true",
  "use_doc_dir_for_image_cache": "true",
  "efficient_history_cache_invalidation": "true",
  "timestamp_based_history_fetches": "true",
  "get_latest_moment_v2": "true",
  "fetch_users_from_cloud_function": "true",
  "refresh_interval": "60",
  "firestore_refresh_v2": "true",
  "firestore_refresh_v3": "true",
  "keychain_access_retries": "true",
  "blocked_users_cached_sync_enabled": "true",
  "join_testflight_enabled": "true",
  "safety_center": "true",
  "help_center": "true",
  "support_v2": "true",
  "privacy_choices_setting": "true",
  "request_att_permission": "true",
  "invite_link_preview_variant": "4",
  "share_history_config": "{\"prompt_enabled\":false,\"fetching_enabled\":true}",
  "share_history_prompt_enabled": "false",
  "use_thumbnails_for_sharing": "true",
  "use_thumbnails_in_timeline": "true",
  "persist_onboarding_step": "true",
  "onboarding_contact_permission_step": "true",
  "overlay_navigator_enabled": "true",
  "overlays_v2_config": "{\"suggestions_enabled\":true}",
  "captions_enabled": "true"
};

// Gắn các phần cấu hình tùy biến vào Remote Config
remoteEntries['feature_discovery_popup_config'] = JSON.stringify(popupConfig);
remoteEntries['overlay_dynamic_captions'] = JSON.stringify(overlayDynamicCaptions);
remoteEntries['overlay_items'] = JSON.stringify(overlayItems);

// Gán toàn bộ vào phản hồi trả về cho ứng dụng Locket

// === THANH FILTER (replicate minhthoaine): objects NGAY trong camera_filter_config ===
var __fobjs = [{"uid": "stk_tai_tho", "id": "stk_tai_tho", "name": "B\u1eddm Tai Th\u1ecf \ud83d\udc30", "category": "Hi\u1ec7u \u1ee8ng AI 3D Hot \ud83d\udd25", "prompt": "Keep the person's exact face, expression, pose, and background from the photo, and realistically place a cute fluffy white and soft pink plush bunny ears headband sitting naturally on top of their head with matching soft lighting and natural shadows. If there are multiple people, put a matching bunny ears headband on each person cleanly.", "style": "cutout", "type": "normal", "filterType": "normal", "overlay": true, "imageUrl": "https://filter.phong200614.workers.dev/assets/ai/stk_tai_tho.png", "iconUrl": "https://filter.phong200614.workers.dev/assets/ai/stk_tai_tho.png", "overlayImageUrl": "https://filter.phong200614.workers.dev/assets/ai/stk_tai_tho.png", "overlayImageURL": "https://filter.phong200614.workers.dev/assets/ai/stk_tai_tho.png", "tintColor": "#FFB6C1", "colors": ["#FFB6C1", "#FF69B4"], "captureButtonColors": ["#FFB6C1", "#FF69B4"], "icon": {"url": "https://filter.phong200614.workers.dev/assets/ai/stk_tai_tho.png", "iconUrl": "https://filter.phong200614.workers.dev/assets/ai/stk_tai_tho.png", "remoteImage": "https://filter.phong200614.workers.dev/assets/ai/stk_tai_tho.png", "sfSymbol": "sparkles", "symbol": "sparkles", "emoji": "\ud83d\udc30"}, "outputUrl": null, "productUrl": null, "textColor": "#FFFFFF", "referenceImages": [], "requires_gold": false, "requiresGold": false, "is_gold": false, "isGold": false, "unlocked": true, "is_unlocked": true, "isUnlocked": true, "free": true, "allowsTryFilter": true, "allows_try_filter": true, "tryButtonEnabled": true, "try_button_enabled": true}, {"uid": "stk_mu_ngu_khoc", "id": "stk_mu_ngu_khoc", "name": "M\u0169 Ng\u1ee7 Kh\u00f3c Nh\u00e8 \ud83d\ude2d", "category": "Hi\u1ec7u \u1ee8ng AI 3D Hot \ud83d\udd25", "prompt": "Apply the exact cartoon face filter from the reference image to the person's face.\n\n**FILTER ELEMENTS:**\n1. A cream-colored pixel-art sleeping hat with thick black pixel outlines and a light cyan fluffy pom-pom on the left side.\n2. Large, thin, perfectly round black wire-frame glasses positioned over both eyes. Keep both circular lenses clearly visible and symmetrical.\n3. Two exaggerated glossy cyan-blue anime crying streams extending outward from the inner corners of both eyes, with small floating water droplets.\n4. A tiny black spiral doodle on the nose.\n5. Two small curved black whisker-like lines on each cheek.\n\n**FACE BEAUTIFICATION:**\n- Make the face slightly smaller and slimmer.\n- Gently reduce cheek width.\n- Create a naturally slim V-shaped jawline.\n- Keep the face proportions realistic and symmetrical.\n- Do not distort the eyes, nose, mouth, or facial identity.\n\n**IMPORTANT REQUIREMENTS:**\n- Precisely align the hat, glasses, tears, nose doodle, and cheek details with the person's facial features.\n- The glasses MUST be included and clearly visible.\n- Preserve the original person's identity, hairstyle, clothing, pose, and background.\n- Use a combination of cute 8-bit pixel art and glossy 3D cartoon effects.\n- High-quality, clean edges, realistic face tracking, polished selfie filter aesthetic.\n- Do not add extra accessories or text.", "style": "cutout", "type": "normal", "filterType": "normal", "overlay": true, "imageUrl": "https://filter.phong200614.workers.dev/assets/ai/stk_mu_ngu_khoc.png", "iconUrl": "https://filter.phong200614.workers.dev/assets/ai/stk_mu_ngu_khoc.png", "overlayImageUrl": "https://filter.phong200614.workers.dev/assets/ai/stk_mu_ngu_khoc.png", "overlayImageURL": "https://filter.phong200614.workers.dev/assets/ai/stk_mu_ngu_khoc.png", "tintColor": "#67E8F9", "colors": ["#67E8F9", "#FEF3C7"], "captureButtonColors": ["#67E8F9", "#FEF3C7"], "icon": {"url": "https://filter.phong200614.workers.dev/assets/ai/stk_mu_ngu_khoc.png", "iconUrl": "https://filter.phong200614.workers.dev/assets/ai/stk_mu_ngu_khoc.png", "remoteImage": "https://filter.phong200614.workers.dev/assets/ai/stk_mu_ngu_khoc.png", "sfSymbol": "sparkles", "symbol": "sparkles", "emoji": "\ud83d\ude2d"}, "outputUrl": null, "productUrl": null, "textColor": "#FFFFFF", "referenceImages": [], "requires_gold": false, "requiresGold": false, "is_gold": false, "isGold": false, "unlocked": true, "is_unlocked": true, "isUnlocked": true, "free": true, "allowsTryFilter": true, "allows_try_filter": true, "tryButtonEnabled": true, "try_button_enabled": true}, {"uid": "stk_jollibee", "id": "stk_jollibee", "name": "Nh\u00e2n Vi\u00ean Jollibee \ud83d\udc1d", "category": "Hi\u1ec7u \u1ee8ng AI 3D Hot \ud83d\udd25", "prompt": "Edit the uploaded photograph. Keep the exact same person from the original image.\n\nChange ONLY the person's clothing into a realistic Jollibee restaurant employee uniform, as if the person is genuinely wearing it in a real photograph.\n\n**JOLLIBEE UNIFORM:**\n- A bright red short-sleeved polo shirt.\n- Yellow panels running along both shoulders and sleeves.\n- Blue and yellow striped collar.\n- Authentic Jollibee bee mascot logo embroidered on the left chest.\n- A small employee name tag on the right chest.\n- Dark navy blue waist apron with the Jollibee logo and branding.\n- Matching dark navy trousers.\n\n**REALISTIC CLOTHING DETAILS:**\n- Make the uniform fit naturally on the person's actual body.\n- Realistic fabric texture, stitching, wrinkles and folds.\n- Natural interaction between the clothing and the person's arms, shoulders and body.\n- The shirt and apron must look physically worn, not digitally pasted onto the person.\n\n**PRESERVE THE ORIGINAL PHOTO:**\n- Keep the person's original face, identity, hairstyle, skin tone and facial expression exactly unchanged.\n- Keep the original body shape, pose, hands and proportions.\n- Keep the original background, lighting, camera angle and image composition.\n- Do not change the person's age or facial features.\n\n**FINAL RESULT:**\nUltra-photorealistic real-life photograph, indistinguishable from an actual photo of the same person wearing a Jollibee employee uniform at the time the original photo was taken.\n\nNo sticker, no cartoon, no illustration, no white outline, no cutout, no transparent background, no 3D rendering.", "style": "cutout", "type": "normal", "filterType": "normal", "overlay": true, "imageUrl": "https://filter.phong200614.workers.dev/assets/ai/stk_jollibee.png", "iconUrl": "https://filter.phong200614.workers.dev/assets/ai/stk_jollibee.png", "overlayImageUrl": "https://filter.phong200614.workers.dev/assets/ai/stk_jollibee.png", "overlayImageURL": "https://filter.phong200614.workers.dev/assets/ai/stk_jollibee.png", "tintColor": "#E31837", "colors": ["#E31837", "#FFC72C"], "captureButtonColors": ["#E31837", "#FFC72C"], "icon": {"url": "https://filter.phong200614.workers.dev/assets/ai/stk_jollibee.png", "iconUrl": "https://filter.phong200614.workers.dev/assets/ai/stk_jollibee.png", "remoteImage": "https://filter.phong200614.workers.dev/assets/ai/stk_jollibee.png", "sfSymbol": "sparkles", "symbol": "sparkles", "emoji": "\ud83d\udc1d"}, "outputUrl": null, "productUrl": null, "textColor": "#FFFFFF", "referenceImages": [], "requires_gold": false, "requiresGold": false, "is_gold": false, "isGold": false, "unlocked": true, "is_unlocked": true, "isUnlocked": true, "free": true, "allowsTryFilter": true, "allows_try_filter": true, "tryButtonEnabled": true, "try_button_enabled": true}, {"uid": "stk_nak_ve_than", "id": "stk_nak_ve_than", "name": "Nak V\u1ec7 Th\u1ea7n \u2694\ufe0f", "category": "Hi\u1ec7u \u1ee8ng AI 3D Hot \ud83d\udd25", "prompt": "Transform the person in the uploaded photograph into a photorealistic real-life cosplay version of Nakroth \u2013 Dimensional Guardian from Arena of Valor.\nIMPORTANT: Create the hairstyle and costume entirely from the written description below. Do not require or rely on any additional reference images.\nHAIRSTYLE \u2013 SIGNATURE SILVER-WHITE HAIR\nReplace the person's original hairstyle with an elaborate silver-white hairstyle inspired by Nakroth's iconic in-game appearance.\n- Bright metallic silver-white hair.\n- Extremely voluminous, spiky and layered hairstyle.\n- Multiple large, sharp, outward-swept hair spikes on the top and both sides of the head.\n- Distinctive middle-parted hairstyle, with hair naturally divided into two sections.\n- Long, flowing side locks on BOTH sides of the face, extending down to the shoulders.\n- Two clearly visible long sections framing the cheeks and neck.\n- Additional layered strands flowing behind both ears.\n- Slightly messy, dynamic, luxurious anime-inspired hairstyle recreated with realistic human hair.\n- Every strand must look natural, detailed and physically realistic.\n- Do not make the hair short, flat, straight or a simple long wig.\nCOSTUME \u2013 NAKROTH DIMENSIONAL GUARDIAN\nReplace the person's original outfit with the complete signature costume:\n- Cropped black fitted blazer with a structured fashion silhouette.\n- Thin, elegant white piping outlining the blazer's lapels, front edges and pockets.\n- White dress shirt underneath.\n- Deep royal-blue necktie.\n- A distinctive metallic GOLD FOUR-POINT STAR ORNAMENT positioned at the tie knot. It must have four clearly defined pointed ends, NOT a triangle.\n- Light lavender-blue tailored trousers.\n- Black belt with a metallic buckle.\n- Decorative silver chains attached to both sides of the waist, hanging naturally over the trousers.\n- Small metallic clips and hanging accessories attached to the chains.\n- Black fingerless leather gloves with metallic studs and details.\n- Rolled-up or slightly visible white shirt cuffs beneath the black blazer sleeves.\nRecreate the exact recognizable color combination: black, white, royal blue, lavender-blue and gold.\nPHOTOREALISTIC COSPLAY QUALITY\nThe result must look like an actual person wearing an expensive, professionally tailored cosplay costume in a real-world photoshoot.\nReal human hair, realistic individual hair strands, natural fabric texture, detailed stitching, realistic leather gloves, authentic metallic accessories, natural shadows and professional fashion photography quality.\nThe result must NOT look like an anime drawing, cartoon, video game screenshot or CGI character.\nSTRICT ORIGINAL PHOTO PRESERVATION\nThis is an image EDITING task, NOT a new image generation task.\nPreserve the original photograph exactly:\n- Keep the person's original face and identity unchanged.\n- Do not modify facial features, eyes, nose, lips, jawline or skin.\n- Keep the original facial expression.\n- Keep the exact original body shape and proportions.\n- Keep the exact original pose and hand positions.\n- Keep the original camera angle and perspective.\n- Keep the exact original image dimensions and aspect ratio.\n- Keep the original crop and framing.\n- Keep the original background and every object in the environment.\n- Preserve the original lighting direction and photographic atmosphere.\nONLY change TWO things:\n1. The person's hairstyle.\n2. The person's clothing and accessories.\nDo not alter anything else.\nFINAL OUTPUT: The same person in the original photograph, with an extremely detailed, realistic silver-white Nakroth-inspired hairstyle featuring a center part and two long shoulder-length side locks, wearing the complete Nakroth Dimensional Guardian costume as a believable real-life cosplay.", "style": "cutout", "type": "normal", "filterType": "normal", "overlay": true, "imageUrl": "https://filter.phong200614.workers.dev/assets/ai/stk_nak_ve_than.png", "iconUrl": "https://filter.phong200614.workers.dev/assets/ai/stk_nak_ve_than.png", "overlayImageUrl": "https://filter.phong200614.workers.dev/assets/ai/stk_nak_ve_than.png", "overlayImageURL": "https://filter.phong200614.workers.dev/assets/ai/stk_nak_ve_than.png", "tintColor": "#3B82F6", "colors": ["#3B82F6", "#93C5FD"], "captureButtonColors": ["#3B82F6", "#93C5FD"], "icon": {"url": "https://filter.phong200614.workers.dev/assets/ai/stk_nak_ve_than.png", "iconUrl": "https://filter.phong200614.workers.dev/assets/ai/stk_nak_ve_than.png", "remoteImage": "https://filter.phong200614.workers.dev/assets/ai/stk_nak_ve_than.png", "sfSymbol": "sparkles", "symbol": "sparkles", "emoji": "\u2694\ufe0f"}, "outputUrl": null, "productUrl": null, "textColor": "#FFFFFF", "referenceImages": [], "requires_gold": false, "requiresGold": false, "is_gold": false, "isGold": false, "unlocked": true, "is_unlocked": true, "isUnlocked": true, "free": true, "allowsTryFilter": true, "allows_try_filter": true, "tryButtonEnabled": true, "try_button_enabled": true}, {"uid": "stk_gojo_satoru", "id": "stk_gojo_satoru", "name": "Gojo Satoru cosplay", "category": "Hi\u1ec7u \u1ee8ng AI 3D Hot \ud83d\udd25", "prompt": "Edit the provided reference image while strictly preserving its original framing and crop.\n\n**CRITICAL: ORIGINAL HALF-BODY COMPOSITION MUST REMAIN UNCHANGED.**\n\n- The original image is a HALF-BODY PORTRAIT.\n- Keep exactly the same half-body framing as the reference image.\n- Preserve the original crop, showing the character from the head down to the same waist/torso area as the original.\n- Do NOT extend the image downward.\n- Do NOT generate legs, knees, feet or full-body content.\n- Do NOT zoom out or change the camera distance.\n- Do NOT change the image aspect ratio or canvas dimensions.\n- Keep the exact original camera angle, perspective and character position.\n\n**COSPLAY TRANSFORMATION ONLY:**\n\nReplace the original person's hairstyle and clothing with a realistic Satoru Gojo cosplay:\n- Spiky silver-white hair.\n- Black blindfold covering both eyes.\n- Black high-collar Gojo uniform jacket.\n- Realistic wearable cosplay materials and natural fabric folds.\n\n**PRESERVE EVERYTHING ELSE:**\n- Original person's body shape and proportions.\n- Original shoulder width and arm positions.\n- Original posture and head position.\n- Original background and lighting.\n- Original image composition and boundaries.\n\n**FINAL OUTPUT:**\nA photorealistic half-body Satoru Gojo cosplay portrait with exactly the same crop, framing, dimensions and camera perspective as the original reference image.\n\nThis is a localized character appearance and outfit replacement, NOT a full-body reconstruction or image expansion.", "style": "cutout", "type": "normal", "filterType": "normal", "overlay": true, "imageUrl": "https://filter.phong200614.workers.dev/assets/ai/stk_gojo_satoru.png", "iconUrl": "https://filter.phong200614.workers.dev/assets/ai/stk_gojo_satoru.png", "overlayImageUrl": "https://filter.phong200614.workers.dev/assets/ai/stk_gojo_satoru.png", "overlayImageURL": "https://filter.phong200614.workers.dev/assets/ai/stk_gojo_satoru.png", "tintColor": "#6366F1", "colors": ["#6366F1", "#A5B4FC"], "captureButtonColors": ["#6366F1", "#A5B4FC"], "icon": {"url": "https://filter.phong200614.workers.dev/assets/ai/stk_gojo_satoru.png", "iconUrl": "https://filter.phong200614.workers.dev/assets/ai/stk_gojo_satoru.png", "remoteImage": "https://filter.phong200614.workers.dev/assets/ai/stk_gojo_satoru.png", "sfSymbol": "sparkles", "symbol": "sparkles", "emoji": "\ud83e\udd1e"}, "outputUrl": null, "productUrl": null, "textColor": "#FFFFFF", "referenceImages": [], "requires_gold": false, "requiresGold": false, "is_gold": false, "isGold": false, "unlocked": true, "is_unlocked": true, "isUnlocked": true, "free": true, "allowsTryFilter": true, "allows_try_filter": true, "tryButtonEnabled": true, "try_button_enabled": true}, {"uid": "stk_shopee_food", "id": "stk_shopee_food", "name": "Nh\u00e2n Vi\u00ean ShopeeFood \ud83d\udef5", "category": "Hi\u1ec7u \u1ee8ng AI 3D Hot \ud83d\udd25", "prompt": "Edit the uploaded photograph. Transform the person into a realistic real-life ShopeeFood delivery employee wearing an authentic ShopeeFood rider uniform.\n\n**UNIFORM DETAILS:**\n- A vibrant orange ShopeeFood delivery jacket.\n- Signature bright orange color with white branding details.\n- ShopeeFood logo printed or embroidered clearly on the left chest.\n- Long-sleeved delivery jacket with a front zipper.\n- Matching orange delivery uniform shirt.\n- Dark navy or black trousers.\n- An orange ShopeeFood motorcycle helmet with recognizable white branding.\n- Optional orange ShopeeFood insulated delivery backpack with the official logo.\n\n**REALISTIC CLOTHING DETAILS:**\n- Natural fabric folds and realistic stitching.\n- Realistic zipper, collar, cuffs and jacket material.\n- Authentic motorcycle helmet with glossy reflections and chin strap.\n- The uniform must look genuinely worn by the person, not digitally pasted onto the body.\n- Accurate orange and white brand colors.\n\n**PRESERVE THE ORIGINAL PERSON:**\n- Keep the exact original face, identity, hairstyle and skin tone.\n- Preserve the original facial expression and body proportions.\n- Keep the original pose and hand gestures.\n- Only replace the clothing and add the ShopeeFood helmet and accessories.\n- Preserve the original background, camera angle and composition.\n\n**PHOTOGRAPHY STYLE:**\nUltra-photorealistic commercial photography, realistic human skin, natural lighting, professional DSLR quality, detailed fabric textures, authentic real-world appearance.\n\nNo cartoon, no anime, no sticker, no illustration, no white outline, no face replacement, no artificial CGI.", "style": "cutout", "type": "normal", "filterType": "normal", "overlay": true, "imageUrl": "https://filter.phong200614.workers.dev/assets/ai/stk_shopee_food.png", "iconUrl": "https://filter.phong200614.workers.dev/assets/ai/stk_shopee_food.png", "overlayImageUrl": "https://filter.phong200614.workers.dev/assets/ai/stk_shopee_food.png", "overlayImageURL": "https://filter.phong200614.workers.dev/assets/ai/stk_shopee_food.png", "tintColor": "#EE4D2D", "colors": ["#EE4D2D", "#FFA07A"], "captureButtonColors": ["#EE4D2D", "#FFA07A"], "icon": {"url": "https://filter.phong200614.workers.dev/assets/ai/stk_shopee_food.png", "iconUrl": "https://filter.phong200614.workers.dev/assets/ai/stk_shopee_food.png", "remoteImage": "https://filter.phong200614.workers.dev/assets/ai/stk_shopee_food.png", "sfSymbol": "sparkles", "symbol": "sparkles", "emoji": "\ud83d\udef5"}, "outputUrl": null, "productUrl": null, "textColor": "#FFFFFF", "referenceImages": [], "requires_gold": false, "requiresGold": false, "is_gold": false, "isGold": false, "unlocked": true, "is_unlocked": true, "isUnlocked": true, "free": true, "allowsTryFilter": true, "allows_try_filter": true, "tryButtonEnabled": true, "try_button_enabled": true}, {"uid": "hom_nay_an_gi", "id": "hom_nay_an_gi", "name": "H\u00f4m Nay \u0102n G\u00ec?", "category": "Tr\u00f2 Ch\u01a1i Locket", "prompt": "hom_nay_an_gi", "style": "cutout", "type": "normal", "filterType": "normal", "overlay": true, "imageUrl": "https://filter.phong200614.workers.dev/assets/frames/hom_nay_an_gi.png", "iconUrl": "https://filter.phong200614.workers.dev/assets/frames/hom_nay_an_gi.png", "overlayImageUrl": "https://filter.phong200614.workers.dev/assets/frames/hom_nay_an_gi.png", "overlayImageURL": "https://filter.phong200614.workers.dev/assets/frames/hom_nay_an_gi.png", "tintColor": "#FF8A3D", "colors": ["#FF9A3C", "#4FC3F7"], "captureButtonColors": ["#FF9A3C", "#4FC3F7"], "icon": {"url": "https://filter.phong200614.workers.dev/assets/frames/hom_nay_an_gi.png", "iconUrl": "https://filter.phong200614.workers.dev/assets/frames/hom_nay_an_gi.png", "remoteImage": "https://filter.phong200614.workers.dev/assets/frames/hom_nay_an_gi.png", "sfSymbol": "fork.knife", "symbol": "fork.knife", "emoji": "\ud83c\udf5c"}, "outputUrl": null, "productUrl": null, "textColor": "#FFFFFF", "referenceImages": [], "requires_gold": false, "requiresGold": false, "is_gold": false, "isGold": false, "unlocked": true, "is_unlocked": true, "isUnlocked": true, "free": true, "allowsTryFilter": true, "allows_try_filter": true, "tryButtonEnabled": true, "try_button_enabled": true}, {"uid": "pb_cortis_4cut", "id": "pb_cortis_4cut", "name": "Photobooth Cortis", "category": "Photobooth \ud83d\udcf8", "prompt": "pb_cortis_4cut", "style": "cutout", "type": "normal", "filterType": "normal", "overlay": true, "imageUrl": "https://filter.phong200614.workers.dev/assets/frames/pb_cortis_4cut.png", "iconUrl": "https://filter.phong200614.workers.dev/assets/frames/pb_cortis_4cut.png", "overlayImageUrl": "https://filter.phong200614.workers.dev/assets/frames/pb_cortis_4cut.png", "overlayImageURL": "https://filter.phong200614.workers.dev/assets/frames/pb_cortis_4cut.png", "tintColor": "#1D4ED8", "colors": ["#1D4ED8", "#93C5FD"], "captureButtonColors": ["#1D4ED8", "#93C5FD"], "icon": {"url": "https://filter.phong200614.workers.dev/assets/frames/pb_cortis_4cut.png", "iconUrl": "https://filter.phong200614.workers.dev/assets/frames/pb_cortis_4cut.png", "remoteImage": "https://filter.phong200614.workers.dev/assets/frames/pb_cortis_4cut.png", "sfSymbol": "square.grid.2x2", "symbol": "square.grid.2x2", "emoji": "\ud83d\udcf8"}, "outputUrl": null, "productUrl": null, "textColor": "#FFFFFF", "referenceImages": [], "requires_gold": false, "requiresGold": false, "is_gold": false, "isGold": false, "unlocked": true, "is_unlocked": true, "isUnlocked": true, "free": true, "allowsTryFilter": true, "allows_try_filter": true, "tryButtonEnabled": true, "try_button_enabled": true}, {"uid": "pb_shinchan_4cut", "id": "pb_shinchan_4cut", "name": "Photobooth Shin-chan 4-Cut", "category": "Photobooth \ud83d\udcf8", "prompt": "pb_shinchan_4cut", "style": "cutout", "type": "normal", "filterType": "normal", "overlay": true, "imageUrl": "https://filter.phong200614.workers.dev/assets/frames/pb_shinchan_4cut.png", "iconUrl": "https://filter.phong200614.workers.dev/assets/frames/pb_shinchan_4cut.png", "overlayImageUrl": "https://filter.phong200614.workers.dev/assets/frames/pb_shinchan_4cut.png", "overlayImageURL": "https://filter.phong200614.workers.dev/assets/frames/pb_shinchan_4cut.png", "tintColor": "#1D4ED8", "colors": ["#1D4ED8", "#93C5FD"], "captureButtonColors": ["#1D4ED8", "#93C5FD"], "icon": {"url": "https://filter.phong200614.workers.dev/assets/frames/pb_shinchan_4cut.png", "iconUrl": "https://filter.phong200614.workers.dev/assets/frames/pb_shinchan_4cut.png", "remoteImage": "https://filter.phong200614.workers.dev/assets/frames/pb_shinchan_4cut.png", "sfSymbol": "square.grid.2x2", "symbol": "square.grid.2x2", "emoji": "\ud83d\udcf8"}, "outputUrl": null, "productUrl": null, "textColor": "#FFFFFF", "referenceImages": [], "requires_gold": false, "requiresGold": false, "is_gold": false, "isGold": false, "unlocked": true, "is_unlocked": true, "isUnlocked": true, "free": true, "allowsTryFilter": true, "allows_try_filter": true, "tryButtonEnabled": true, "try_button_enabled": true}, {"uid": "pb_supperman_4cut", "id": "pb_supperman_4cut", "name": "Photobooth Superman 4-Cut", "category": "Photobooth \ud83d\udcf8", "prompt": "pb_supperman_4cut", "style": "cutout", "type": "normal", "filterType": "normal", "overlay": true, "imageUrl": "https://filter.phong200614.workers.dev/assets/frames/pb_supperman_4cut.png", "iconUrl": "https://filter.phong200614.workers.dev/assets/frames/pb_supperman_4cut.png", "overlayImageUrl": "https://filter.phong200614.workers.dev/assets/frames/pb_supperman_4cut.png", "overlayImageURL": "https://filter.phong200614.workers.dev/assets/frames/pb_supperman_4cut.png", "tintColor": "#1D4ED8", "colors": ["#1D4ED8", "#93C5FD"], "captureButtonColors": ["#1D4ED8", "#93C5FD"], "icon": {"url": "https://filter.phong200614.workers.dev/assets/frames/pb_supperman_4cut.png", "iconUrl": "https://filter.phong200614.workers.dev/assets/frames/pb_supperman_4cut.png", "remoteImage": "https://filter.phong200614.workers.dev/assets/frames/pb_supperman_4cut.png", "sfSymbol": "square.grid.2x2", "symbol": "square.grid.2x2", "emoji": "\ud83d\udcf8"}, "outputUrl": null, "productUrl": null, "textColor": "#FFFFFF", "referenceImages": [], "requires_gold": false, "requiresGold": false, "is_gold": false, "isGold": false, "unlocked": true, "is_unlocked": true, "isUnlocked": true, "free": true, "allowsTryFilter": true, "allows_try_filter": true, "tryButtonEnabled": true, "try_button_enabled": true}, {"uid": "pb_meo_dang_yeu_4cut", "id": "pb_meo_dang_yeu_4cut", "name": "Photobooth M\u00e8o \u0110\u00e1ng Y\u00eau", "category": "Photobooth \ud83d\udcf8", "prompt": "pb_meo_dang_yeu_4cut", "style": "cutout", "type": "normal", "filterType": "normal", "overlay": true, "imageUrl": "https://filter.phong200614.workers.dev/assets/frames/pb_meo_dang_yeu_4cut.png", "iconUrl": "https://filter.phong200614.workers.dev/assets/frames/pb_meo_dang_yeu_4cut.png", "overlayImageUrl": "https://filter.phong200614.workers.dev/assets/frames/pb_meo_dang_yeu_4cut.png", "overlayImageURL": "https://filter.phong200614.workers.dev/assets/frames/pb_meo_dang_yeu_4cut.png", "tintColor": "#1D4ED8", "colors": ["#1D4ED8", "#93C5FD"], "captureButtonColors": ["#1D4ED8", "#93C5FD"], "icon": {"url": "https://filter.phong200614.workers.dev/assets/frames/pb_meo_dang_yeu_4cut.png", "iconUrl": "https://filter.phong200614.workers.dev/assets/frames/pb_meo_dang_yeu_4cut.png", "remoteImage": "https://filter.phong200614.workers.dev/assets/frames/pb_meo_dang_yeu_4cut.png", "sfSymbol": "square.grid.2x2", "symbol": "square.grid.2x2", "emoji": "\ud83d\udcf8"}, "outputUrl": null, "productUrl": null, "textColor": "#FFFFFF", "referenceImages": [], "requires_gold": false, "requiresGold": false, "is_gold": false, "isGold": false, "unlocked": true, "is_unlocked": true, "isUnlocked": true, "free": true, "allowsTryFilter": true, "allows_try_filter": true, "tryButtonEnabled": true, "try_button_enabled": true}, {"uid": "frame_ba_khi", "id": "frame_ba_khi", "name": "Khung B\u00e1 Kh\u00ed", "category": "Khung Vi\u1ec1n \ud83d\uddbc\ufe0f", "prompt": "frame_ba_khi", "style": "cutout", "type": "normal", "filterType": "normal", "overlay": true, "imageUrl": "https://filter.phong200614.workers.dev/assets/frames/frame_ba_khi.png", "iconUrl": "https://filter.phong200614.workers.dev/assets/frames/frame_ba_khi.png", "overlayImageUrl": "https://filter.phong200614.workers.dev/assets/frames/frame_ba_khi.png", "overlayImageURL": "https://filter.phong200614.workers.dev/assets/frames/frame_ba_khi.png", "tintColor": "#1D4ED8", "colors": ["#1D4ED8", "#93C5FD"], "captureButtonColors": ["#1D4ED8", "#93C5FD"], "icon": {"url": "https://filter.phong200614.workers.dev/assets/frames/frame_ba_khi.png", "iconUrl": "https://filter.phong200614.workers.dev/assets/frames/frame_ba_khi.png", "remoteImage": "https://filter.phong200614.workers.dev/assets/frames/frame_ba_khi.png", "sfSymbol": "square.grid.2x2", "symbol": "square.grid.2x2", "emoji": "\ud83d\udcf8"}, "outputUrl": null, "productUrl": null, "textColor": "#FFFFFF", "referenceImages": [], "requires_gold": false, "requiresGold": false, "is_gold": false, "isGold": false, "unlocked": true, "is_unlocked": true, "isUnlocked": true, "free": true, "allowsTryFilter": true, "allows_try_filter": true, "tryButtonEnabled": true, "try_button_enabled": true}, {"uid": "pb_cortis_v1", "id": "pb_cortis_v1", "name": "Photobooth Cortis V1", "category": "Photobooth \ud83d\udcf8", "prompt": "pb_cortis_v1", "style": "cutout", "type": "normal", "filterType": "normal", "overlay": true, "imageUrl": "https://filter.phong200614.workers.dev/assets/frames/pb_cortis_v1.png", "iconUrl": "https://filter.phong200614.workers.dev/assets/frames/pb_cortis_v1.png", "overlayImageUrl": "https://filter.phong200614.workers.dev/assets/frames/pb_cortis_v1.png", "overlayImageURL": "https://filter.phong200614.workers.dev/assets/frames/pb_cortis_v1.png", "tintColor": "#1D4ED8", "colors": ["#1D4ED8", "#93C5FD"], "captureButtonColors": ["#1D4ED8", "#93C5FD"], "icon": {"url": "https://filter.phong200614.workers.dev/assets/frames/pb_cortis_v1.png", "iconUrl": "https://filter.phong200614.workers.dev/assets/frames/pb_cortis_v1.png", "remoteImage": "https://filter.phong200614.workers.dev/assets/frames/pb_cortis_v1.png", "sfSymbol": "square.grid.2x2", "symbol": "square.grid.2x2", "emoji": "\ud83d\udcf8"}, "outputUrl": null, "productUrl": null, "textColor": "#FFFFFF", "referenceImages": [], "requires_gold": false, "requiresGold": false, "is_gold": false, "isGold": false, "unlocked": true, "is_unlocked": true, "isUnlocked": true, "free": true, "allowsTryFilter": true, "allows_try_filter": true, "tryButtonEnabled": true, "try_button_enabled": true}, {"uid": "pb_cortis_v2", "id": "pb_cortis_v2", "name": "Photobooth Cortis V2", "category": "Photobooth \ud83d\udcf8", "prompt": "pb_cortis_v2", "style": "cutout", "type": "normal", "filterType": "normal", "overlay": true, "imageUrl": "https://filter.phong200614.workers.dev/assets/frames/pb_cortis_v2.png", "iconUrl": "https://filter.phong200614.workers.dev/assets/frames/pb_cortis_v2.png", "overlayImageUrl": "https://filter.phong200614.workers.dev/assets/frames/pb_cortis_v2.png", "overlayImageURL": "https://filter.phong200614.workers.dev/assets/frames/pb_cortis_v2.png", "tintColor": "#1D4ED8", "colors": ["#1D4ED8", "#93C5FD"], "captureButtonColors": ["#1D4ED8", "#93C5FD"], "icon": {"url": "https://filter.phong200614.workers.dev/assets/frames/pb_cortis_v2.png", "iconUrl": "https://filter.phong200614.workers.dev/assets/frames/pb_cortis_v2.png", "remoteImage": "https://filter.phong200614.workers.dev/assets/frames/pb_cortis_v2.png", "sfSymbol": "square.grid.2x2", "symbol": "square.grid.2x2", "emoji": "\ud83d\udcf8"}, "outputUrl": null, "productUrl": null, "textColor": "#FFFFFF", "referenceImages": [], "requires_gold": false, "requiresGold": false, "is_gold": false, "isGold": false, "unlocked": true, "is_unlocked": true, "isUnlocked": true, "free": true, "allowsTryFilter": true, "allows_try_filter": true, "tryButtonEnabled": true, "try_button_enabled": true}, {"uid": "pb_denim_ripped_2x2", "id": "pb_denim_ripped_2x2", "name": "Photobooth Denim Ripped 2x2", "category": "Photobooth \ud83d\udcf8", "prompt": "pb_denim_ripped_2x2", "style": "cutout", "type": "normal", "filterType": "normal", "overlay": true, "imageUrl": "https://filter.phong200614.workers.dev/assets/frames/pb_denim_ripped_2x2.png", "iconUrl": "https://filter.phong200614.workers.dev/assets/frames/pb_denim_ripped_2x2.png", "overlayImageUrl": "https://filter.phong200614.workers.dev/assets/frames/pb_denim_ripped_2x2.png", "overlayImageURL": "https://filter.phong200614.workers.dev/assets/frames/pb_denim_ripped_2x2.png", "tintColor": "#1D4ED8", "colors": ["#1D4ED8", "#93C5FD"], "captureButtonColors": ["#1D4ED8", "#93C5FD"], "icon": {"url": "https://filter.phong200614.workers.dev/assets/frames/pb_denim_ripped_2x2.png", "iconUrl": "https://filter.phong200614.workers.dev/assets/frames/pb_denim_ripped_2x2.png", "remoteImage": "https://filter.phong200614.workers.dev/assets/frames/pb_denim_ripped_2x2.png", "sfSymbol": "square.grid.2x2", "symbol": "square.grid.2x2", "emoji": "\ud83d\udcf8"}, "outputUrl": null, "productUrl": null, "textColor": "#FFFFFF", "referenceImages": [], "requires_gold": false, "requiresGold": false, "is_gold": false, "isGold": false, "unlocked": true, "is_unlocked": true, "isUnlocked": true, "free": true, "allowsTryFilter": true, "allows_try_filter": true, "tryButtonEnabled": true, "try_button_enabled": true}, {"uid": "pb_ech_xanh", "id": "pb_ech_xanh", "name": "Photobooth \u1ebech Xanh", "category": "Photobooth \ud83d\udcf8", "prompt": "pb_ech_xanh", "style": "cutout", "type": "normal", "filterType": "normal", "overlay": true, "imageUrl": "https://filter.phong200614.workers.dev/assets/frames/pb_ech_xanh.png", "iconUrl": "https://filter.phong200614.workers.dev/assets/frames/pb_ech_xanh.png", "overlayImageUrl": "https://filter.phong200614.workers.dev/assets/frames/pb_ech_xanh.png", "overlayImageURL": "https://filter.phong200614.workers.dev/assets/frames/pb_ech_xanh.png", "tintColor": "#1D4ED8", "colors": ["#1D4ED8", "#93C5FD"], "captureButtonColors": ["#1D4ED8", "#93C5FD"], "icon": {"url": "https://filter.phong200614.workers.dev/assets/frames/pb_ech_xanh.png", "iconUrl": "https://filter.phong200614.workers.dev/assets/frames/pb_ech_xanh.png", "remoteImage": "https://filter.phong200614.workers.dev/assets/frames/pb_ech_xanh.png", "sfSymbol": "square.grid.2x2", "symbol": "square.grid.2x2", "emoji": "\ud83d\udcf8"}, "outputUrl": null, "productUrl": null, "textColor": "#FFFFFF", "referenceImages": [], "requires_gold": false, "requiresGold": false, "is_gold": false, "isGold": false, "unlocked": true, "is_unlocked": true, "isUnlocked": true, "free": true, "allowsTryFilter": true, "allows_try_filter": true, "tryButtonEnabled": true, "try_button_enabled": true}, {"uid": "pb_galaxy", "id": "pb_galaxy", "name": "Photobooth Galaxy Y2K", "category": "Photobooth \ud83d\udcf8", "prompt": "pb_galaxy", "style": "cutout", "type": "normal", "filterType": "normal", "overlay": true, "imageUrl": "https://filter.phong200614.workers.dev/assets/frames/pb_galaxy.png", "iconUrl": "https://filter.phong200614.workers.dev/assets/frames/pb_galaxy.png", "overlayImageUrl": "https://filter.phong200614.workers.dev/assets/frames/pb_galaxy.png", "overlayImageURL": "https://filter.phong200614.workers.dev/assets/frames/pb_galaxy.png", "tintColor": "#1D4ED8", "colors": ["#1D4ED8", "#93C5FD"], "captureButtonColors": ["#1D4ED8", "#93C5FD"], "icon": {"url": "https://filter.phong200614.workers.dev/assets/frames/pb_galaxy.png", "iconUrl": "https://filter.phong200614.workers.dev/assets/frames/pb_galaxy.png", "remoteImage": "https://filter.phong200614.workers.dev/assets/frames/pb_galaxy.png", "sfSymbol": "square.grid.2x2", "symbol": "square.grid.2x2", "emoji": "\ud83d\udcf8"}, "outputUrl": null, "productUrl": null, "textColor": "#FFFFFF", "referenceImages": [], "requires_gold": false, "requiresGold": false, "is_gold": false, "isGold": false, "unlocked": true, "is_unlocked": true, "isUnlocked": true, "free": true, "allowsTryFilter": true, "allows_try_filter": true, "tryButtonEnabled": true, "try_button_enabled": true}, {"uid": "pb_holo_4cut", "id": "pb_holo_4cut", "name": "Photobooth Hologram 4-Cut", "category": "Photobooth \ud83d\udcf8", "prompt": "pb_holo_4cut", "style": "cutout", "type": "normal", "filterType": "normal", "overlay": true, "imageUrl": "https://filter.phong200614.workers.dev/assets/frames/pb_holo_4cut.png", "iconUrl": "https://filter.phong200614.workers.dev/assets/frames/pb_holo_4cut.png", "overlayImageUrl": "https://filter.phong200614.workers.dev/assets/frames/pb_holo_4cut.png", "overlayImageURL": "https://filter.phong200614.workers.dev/assets/frames/pb_holo_4cut.png", "tintColor": "#1D4ED8", "colors": ["#1D4ED8", "#93C5FD"], "captureButtonColors": ["#1D4ED8", "#93C5FD"], "icon": {"url": "https://filter.phong200614.workers.dev/assets/frames/pb_holo_4cut.png", "iconUrl": "https://filter.phong200614.workers.dev/assets/frames/pb_holo_4cut.png", "remoteImage": "https://filter.phong200614.workers.dev/assets/frames/pb_holo_4cut.png", "sfSymbol": "square.grid.2x2", "symbol": "square.grid.2x2", "emoji": "\ud83d\udcf8"}, "outputUrl": null, "productUrl": null, "textColor": "#FFFFFF", "referenceImages": [], "requires_gold": false, "requiresGold": false, "is_gold": false, "isGold": false, "unlocked": true, "is_unlocked": true, "isUnlocked": true, "free": true, "allowsTryFilter": true, "allows_try_filter": true, "tryButtonEnabled": true, "try_button_enabled": true}, {"uid": "pb_photobooth_hello_kitty", "id": "pb_photobooth_hello_kitty", "name": "Photobooth Hello Kitty Cute", "category": "Photobooth \ud83d\udcf8", "prompt": "pb_photobooth_hello_kitty", "style": "cutout", "type": "normal", "filterType": "normal", "overlay": true, "imageUrl": "https://filter.phong200614.workers.dev/assets/frames/pb_photobooth_hello_kitty.png", "iconUrl": "https://filter.phong200614.workers.dev/assets/frames/pb_photobooth_hello_kitty.png", "overlayImageUrl": "https://filter.phong200614.workers.dev/assets/frames/pb_photobooth_hello_kitty.png", "overlayImageURL": "https://filter.phong200614.workers.dev/assets/frames/pb_photobooth_hello_kitty.png", "tintColor": "#1D4ED8", "colors": ["#1D4ED8", "#93C5FD"], "captureButtonColors": ["#1D4ED8", "#93C5FD"], "icon": {"url": "https://filter.phong200614.workers.dev/assets/frames/pb_photobooth_hello_kitty.png", "iconUrl": "https://filter.phong200614.workers.dev/assets/frames/pb_photobooth_hello_kitty.png", "remoteImage": "https://filter.phong200614.workers.dev/assets/frames/pb_photobooth_hello_kitty.png", "sfSymbol": "square.grid.2x2", "symbol": "square.grid.2x2", "emoji": "\ud83d\udcf8"}, "outputUrl": null, "productUrl": null, "textColor": "#FFFFFF", "referenceImages": [], "requires_gold": false, "requiresGold": false, "is_gold": false, "isGold": false, "unlocked": true, "is_unlocked": true, "isUnlocked": true, "free": true, "allowsTryFilter": true, "allows_try_filter": true, "tryButtonEnabled": true, "try_button_enabled": true}, {"uid": "pb_ripped_paper_4cut", "id": "pb_ripped_paper_4cut", "name": "Photobooth Gi\u1ea5y X\u00e9 Ripped", "category": "Photobooth \ud83d\udcf8", "prompt": "pb_ripped_paper_4cut", "style": "cutout", "type": "normal", "filterType": "normal", "overlay": true, "imageUrl": "https://filter.phong200614.workers.dev/assets/frames/pb_ripped_paper_4cut.png", "iconUrl": "https://filter.phong200614.workers.dev/assets/frames/pb_ripped_paper_4cut.png", "overlayImageUrl": "https://filter.phong200614.workers.dev/assets/frames/pb_ripped_paper_4cut.png", "overlayImageURL": "https://filter.phong200614.workers.dev/assets/frames/pb_ripped_paper_4cut.png", "tintColor": "#1D4ED8", "colors": ["#1D4ED8", "#93C5FD"], "captureButtonColors": ["#1D4ED8", "#93C5FD"], "icon": {"url": "https://filter.phong200614.workers.dev/assets/frames/pb_ripped_paper_4cut.png", "iconUrl": "https://filter.phong200614.workers.dev/assets/frames/pb_ripped_paper_4cut.png", "remoteImage": "https://filter.phong200614.workers.dev/assets/frames/pb_ripped_paper_4cut.png", "sfSymbol": "square.grid.2x2", "symbol": "square.grid.2x2", "emoji": "\ud83d\udcf8"}, "outputUrl": null, "productUrl": null, "textColor": "#FFFFFF", "referenceImages": [], "requires_gold": false, "requiresGold": false, "is_gold": false, "isGold": false, "unlocked": true, "is_unlocked": true, "isUnlocked": true, "free": true, "allowsTryFilter": true, "allows_try_filter": true, "tryButtonEnabled": true, "try_button_enabled": true}, {"uid": "pb_scrapbook_ripped_4cut", "id": "pb_scrapbook_ripped_4cut", "name": "Photobooth Scrapbook Vintage", "category": "Photobooth \ud83d\udcf8", "prompt": "pb_scrapbook_ripped_4cut", "style": "cutout", "type": "normal", "filterType": "normal", "overlay": true, "imageUrl": "https://filter.phong200614.workers.dev/assets/frames/pb_scrapbook_ripped_4cut.png", "iconUrl": "https://filter.phong200614.workers.dev/assets/frames/pb_scrapbook_ripped_4cut.png", "overlayImageUrl": "https://filter.phong200614.workers.dev/assets/frames/pb_scrapbook_ripped_4cut.png", "overlayImageURL": "https://filter.phong200614.workers.dev/assets/frames/pb_scrapbook_ripped_4cut.png", "tintColor": "#1D4ED8", "colors": ["#1D4ED8", "#93C5FD"], "captureButtonColors": ["#1D4ED8", "#93C5FD"], "icon": {"url": "https://filter.phong200614.workers.dev/assets/frames/pb_scrapbook_ripped_4cut.png", "iconUrl": "https://filter.phong200614.workers.dev/assets/frames/pb_scrapbook_ripped_4cut.png", "remoteImage": "https://filter.phong200614.workers.dev/assets/frames/pb_scrapbook_ripped_4cut.png", "sfSymbol": "square.grid.2x2", "symbol": "square.grid.2x2", "emoji": "\ud83d\udcf8"}, "outputUrl": null, "productUrl": null, "textColor": "#FFFFFF", "referenceImages": [], "requires_gold": false, "requiresGold": false, "is_gold": false, "isGold": false, "unlocked": true, "is_unlocked": true, "isUnlocked": true, "free": true, "allowsTryFilter": true, "allows_try_filter": true, "tryButtonEnabled": true, "try_button_enabled": true}, {"uid": "pb_single_denim_ripped", "id": "pb_single_denim_ripped", "name": "Photobooth Denim 1 \u00d4", "category": "Photobooth \ud83d\udcf8", "prompt": "pb_single_denim_ripped", "style": "cutout", "type": "normal", "filterType": "normal", "overlay": true, "imageUrl": "https://filter.phong200614.workers.dev/assets/frames/pb_single_denim_ripped.png", "iconUrl": "https://filter.phong200614.workers.dev/assets/frames/pb_single_denim_ripped.png", "overlayImageUrl": "https://filter.phong200614.workers.dev/assets/frames/pb_single_denim_ripped.png", "overlayImageURL": "https://filter.phong200614.workers.dev/assets/frames/pb_single_denim_ripped.png", "tintColor": "#1D4ED8", "colors": ["#1D4ED8", "#93C5FD"], "captureButtonColors": ["#1D4ED8", "#93C5FD"], "icon": {"url": "https://filter.phong200614.workers.dev/assets/frames/pb_single_denim_ripped.png", "iconUrl": "https://filter.phong200614.workers.dev/assets/frames/pb_single_denim_ripped.png", "remoteImage": "https://filter.phong200614.workers.dev/assets/frames/pb_single_denim_ripped.png", "sfSymbol": "square.grid.2x2", "symbol": "square.grid.2x2", "emoji": "\ud83d\udcf8"}, "outputUrl": null, "productUrl": null, "textColor": "#FFFFFF", "referenceImages": [], "requires_gold": false, "requiresGold": false, "is_gold": false, "isGold": false, "unlocked": true, "is_unlocked": true, "isUnlocked": true, "free": true, "allowsTryFilter": true, "allows_try_filter": true, "tryButtonEnabled": true, "try_button_enabled": true}, {"uid": "pb_single_film_nostalgia", "id": "pb_single_film_nostalgia", "name": "Photobooth Film Nostalgia", "category": "Photobooth \ud83d\udcf8", "prompt": "pb_single_film_nostalgia", "style": "cutout", "type": "normal", "filterType": "normal", "overlay": true, "imageUrl": "https://filter.phong200614.workers.dev/assets/frames/pb_single_film_nostalgia.png", "iconUrl": "https://filter.phong200614.workers.dev/assets/frames/pb_single_film_nostalgia.png", "overlayImageUrl": "https://filter.phong200614.workers.dev/assets/frames/pb_single_film_nostalgia.png", "overlayImageURL": "https://filter.phong200614.workers.dev/assets/frames/pb_single_film_nostalgia.png", "tintColor": "#1D4ED8", "colors": ["#1D4ED8", "#93C5FD"], "captureButtonColors": ["#1D4ED8", "#93C5FD"], "icon": {"url": "https://filter.phong200614.workers.dev/assets/frames/pb_single_film_nostalgia.png", "iconUrl": "https://filter.phong200614.workers.dev/assets/frames/pb_single_film_nostalgia.png", "remoteImage": "https://filter.phong200614.workers.dev/assets/frames/pb_single_film_nostalgia.png", "sfSymbol": "square.grid.2x2", "symbol": "square.grid.2x2", "emoji": "\ud83d\udcf8"}, "outputUrl": null, "productUrl": null, "textColor": "#FFFFFF", "referenceImages": [], "requires_gold": false, "requiresGold": false, "is_gold": false, "isGold": false, "unlocked": true, "is_unlocked": true, "isUnlocked": true, "free": true, "allowsTryFilter": true, "allows_try_filter": true, "tryButtonEnabled": true, "try_button_enabled": true}, {"uid": "pb_single_y2k_silver_holo", "id": "pb_single_y2k_silver_holo", "name": "Photobooth Y2K Silver Holo", "category": "Photobooth \ud83d\udcf8", "prompt": "pb_single_y2k_silver_holo", "style": "cutout", "type": "normal", "filterType": "normal", "overlay": true, "imageUrl": "https://filter.phong200614.workers.dev/assets/frames/pb_single_y2k_silver_holo.png", "iconUrl": "https://filter.phong200614.workers.dev/assets/frames/pb_single_y2k_silver_holo.png", "overlayImageUrl": "https://filter.phong200614.workers.dev/assets/frames/pb_single_y2k_silver_holo.png", "overlayImageURL": "https://filter.phong200614.workers.dev/assets/frames/pb_single_y2k_silver_holo.png", "tintColor": "#1D4ED8", "colors": ["#1D4ED8", "#93C5FD"], "captureButtonColors": ["#1D4ED8", "#93C5FD"], "icon": {"url": "https://filter.phong200614.workers.dev/assets/frames/pb_single_y2k_silver_holo.png", "iconUrl": "https://filter.phong200614.workers.dev/assets/frames/pb_single_y2k_silver_holo.png", "remoteImage": "https://filter.phong200614.workers.dev/assets/frames/pb_single_y2k_silver_holo.png", "sfSymbol": "square.grid.2x2", "symbol": "square.grid.2x2", "emoji": "\ud83d\udcf8"}, "outputUrl": null, "productUrl": null, "textColor": "#FFFFFF", "referenceImages": [], "requires_gold": false, "requiresGold": false, "is_gold": false, "isGold": false, "unlocked": true, "is_unlocked": true, "isUnlocked": true, "free": true, "allowsTryFilter": true, "allows_try_filter": true, "tryButtonEnabled": true, "try_button_enabled": true}, {"uid": "pb_strawberry", "id": "pb_strawberry", "name": "Photobooth D\u00e2u T\u00e2y Strawberry", "category": "Photobooth \ud83d\udcf8", "prompt": "pb_strawberry", "style": "cutout", "type": "normal", "filterType": "normal", "overlay": true, "imageUrl": "https://filter.phong200614.workers.dev/assets/frames/pb_strawberry.png", "iconUrl": "https://filter.phong200614.workers.dev/assets/frames/pb_strawberry.png", "overlayImageUrl": "https://filter.phong200614.workers.dev/assets/frames/pb_strawberry.png", "overlayImageURL": "https://filter.phong200614.workers.dev/assets/frames/pb_strawberry.png", "tintColor": "#1D4ED8", "colors": ["#1D4ED8", "#93C5FD"], "captureButtonColors": ["#1D4ED8", "#93C5FD"], "icon": {"url": "https://filter.phong200614.workers.dev/assets/frames/pb_strawberry.png", "iconUrl": "https://filter.phong200614.workers.dev/assets/frames/pb_strawberry.png", "remoteImage": "https://filter.phong200614.workers.dev/assets/frames/pb_strawberry.png", "sfSymbol": "square.grid.2x2", "symbol": "square.grid.2x2", "emoji": "\ud83d\udcf8"}, "outputUrl": null, "productUrl": null, "textColor": "#FFFFFF", "referenceImages": [], "requires_gold": false, "requiresGold": false, "is_gold": false, "isGold": false, "unlocked": true, "is_unlocked": true, "isUnlocked": true, "free": true, "allowsTryFilter": true, "allows_try_filter": true, "tryButtonEnabled": true, "try_button_enabled": true}, {"uid": "pb_trung_bac_thao", "id": "pb_trung_bac_thao", "name": "Photobooth Tr\u1ee9ng B\u1eafc Th\u1ea3o", "category": "Photobooth \ud83d\udcf8", "prompt": "pb_trung_bac_thao", "style": "cutout", "type": "normal", "filterType": "normal", "overlay": true, "imageUrl": "https://filter.phong200614.workers.dev/assets/frames/pb_trung_bac_thao.png", "iconUrl": "https://filter.phong200614.workers.dev/assets/frames/pb_trung_bac_thao.png", "overlayImageUrl": "https://filter.phong200614.workers.dev/assets/frames/pb_trung_bac_thao.png", "overlayImageURL": "https://filter.phong200614.workers.dev/assets/frames/pb_trung_bac_thao.png", "tintColor": "#1D4ED8", "colors": ["#1D4ED8", "#93C5FD"], "captureButtonColors": ["#1D4ED8", "#93C5FD"], "icon": {"url": "https://filter.phong200614.workers.dev/assets/frames/pb_trung_bac_thao.png", "iconUrl": "https://filter.phong200614.workers.dev/assets/frames/pb_trung_bac_thao.png", "remoteImage": "https://filter.phong200614.workers.dev/assets/frames/pb_trung_bac_thao.png", "sfSymbol": "square.grid.2x2", "symbol": "square.grid.2x2", "emoji": "\ud83d\udcf8"}, "outputUrl": null, "productUrl": null, "textColor": "#FFFFFF", "referenceImages": [], "requires_gold": false, "requiresGold": false, "is_gold": false, "isGold": false, "unlocked": true, "is_unlocked": true, "isUnlocked": true, "free": true, "allowsTryFilter": true, "allows_try_filter": true, "tryButtonEnabled": true, "try_button_enabled": true}, {"uid": "pb_vien_hello_kitty", "id": "pb_vien_hello_kitty", "name": "Photobooth Vi\u1ec1n Hello Kitty", "category": "Photobooth \ud83d\udcf8", "prompt": "pb_vien_hello_kitty", "style": "cutout", "type": "normal", "filterType": "normal", "overlay": true, "imageUrl": "https://filter.phong200614.workers.dev/assets/frames/pb_vien_hello_kitty.png", "iconUrl": "https://filter.phong200614.workers.dev/assets/frames/pb_vien_hello_kitty.png", "overlayImageUrl": "https://filter.phong200614.workers.dev/assets/frames/pb_vien_hello_kitty.png", "overlayImageURL": "https://filter.phong200614.workers.dev/assets/frames/pb_vien_hello_kitty.png", "tintColor": "#1D4ED8", "colors": ["#1D4ED8", "#93C5FD"], "captureButtonColors": ["#1D4ED8", "#93C5FD"], "icon": {"url": "https://filter.phong200614.workers.dev/assets/frames/pb_vien_hello_kitty.png", "iconUrl": "https://filter.phong200614.workers.dev/assets/frames/pb_vien_hello_kitty.png", "remoteImage": "https://filter.phong200614.workers.dev/assets/frames/pb_vien_hello_kitty.png", "sfSymbol": "square.grid.2x2", "symbol": "square.grid.2x2", "emoji": "\ud83d\udcf8"}, "outputUrl": null, "productUrl": null, "textColor": "#FFFFFF", "referenceImages": [], "requires_gold": false, "requiresGold": false, "is_gold": false, "isGold": false, "unlocked": true, "is_unlocked": true, "isUnlocked": true, "free": true, "allowsTryFilter": true, "allows_try_filter": true, "tryButtonEnabled": true, "try_button_enabled": true}, {"uid": "pb_vintage", "id": "pb_vintage", "name": "Photobooth Vintage Classic", "category": "Photobooth \ud83d\udcf8", "prompt": "pb_vintage", "style": "cutout", "type": "normal", "filterType": "normal", "overlay": true, "imageUrl": "https://filter.phong200614.workers.dev/assets/frames/pb_vintage.png", "iconUrl": "https://filter.phong200614.workers.dev/assets/frames/pb_vintage.png", "overlayImageUrl": "https://filter.phong200614.workers.dev/assets/frames/pb_vintage.png", "overlayImageURL": "https://filter.phong200614.workers.dev/assets/frames/pb_vintage.png", "tintColor": "#1D4ED8", "colors": ["#1D4ED8", "#93C5FD"], "captureButtonColors": ["#1D4ED8", "#93C5FD"], "icon": {"url": "https://filter.phong200614.workers.dev/assets/frames/pb_vintage.png", "iconUrl": "https://filter.phong200614.workers.dev/assets/frames/pb_vintage.png", "remoteImage": "https://filter.phong200614.workers.dev/assets/frames/pb_vintage.png", "sfSymbol": "square.grid.2x2", "symbol": "square.grid.2x2", "emoji": "\ud83d\udcf8"}, "outputUrl": null, "productUrl": null, "textColor": "#FFFFFF", "referenceImages": [], "requires_gold": false, "requiresGold": false, "is_gold": false, "isGold": false, "unlocked": true, "is_unlocked": true, "isUnlocked": true, "free": true, "allowsTryFilter": true, "allows_try_filter": true, "tryButtonEnabled": true, "try_button_enabled": true}, {"uid": "photobooth_4cut", "id": "photobooth_4cut", "name": "Photobooth 4-Cut Classic", "category": "Photobooth \ud83d\udcf8", "prompt": "photobooth_4cut", "style": "cutout", "type": "normal", "filterType": "normal", "overlay": true, "imageUrl": "https://filter.phong200614.workers.dev/assets/frames/photobooth_4cut.png", "iconUrl": "https://filter.phong200614.workers.dev/assets/frames/photobooth_4cut.png", "overlayImageUrl": "https://filter.phong200614.workers.dev/assets/frames/photobooth_4cut.png", "overlayImageURL": "https://filter.phong200614.workers.dev/assets/frames/photobooth_4cut.png", "tintColor": "#1D4ED8", "colors": ["#1D4ED8", "#93C5FD"], "captureButtonColors": ["#1D4ED8", "#93C5FD"], "icon": {"url": "https://filter.phong200614.workers.dev/assets/frames/photobooth_4cut.png", "iconUrl": "https://filter.phong200614.workers.dev/assets/frames/photobooth_4cut.png", "remoteImage": "https://filter.phong200614.workers.dev/assets/frames/photobooth_4cut.png", "sfSymbol": "square.grid.2x2", "symbol": "square.grid.2x2", "emoji": "\ud83d\udcf8"}, "outputUrl": null, "productUrl": null, "textColor": "#FFFFFF", "referenceImages": [], "requires_gold": false, "requiresGold": false, "is_gold": false, "isGold": false, "unlocked": true, "is_unlocked": true, "isUnlocked": true, "free": true, "allowsTryFilter": true, "allows_try_filter": true, "tryButtonEnabled": true, "try_button_enabled": true}, {"uid": "photobooth_cute", "id": "photobooth_cute", "name": "Photobooth Pastel Cute", "category": "Photobooth \ud83d\udcf8", "prompt": "photobooth_cute", "style": "cutout", "type": "normal", "filterType": "normal", "overlay": true, "imageUrl": "https://filter.phong200614.workers.dev/assets/frames/photobooth_cute.png", "iconUrl": "https://filter.phong200614.workers.dev/assets/frames/photobooth_cute.png", "overlayImageUrl": "https://filter.phong200614.workers.dev/assets/frames/photobooth_cute.png", "overlayImageURL": "https://filter.phong200614.workers.dev/assets/frames/photobooth_cute.png", "tintColor": "#1D4ED8", "colors": ["#1D4ED8", "#93C5FD"], "captureButtonColors": ["#1D4ED8", "#93C5FD"], "icon": {"url": "https://filter.phong200614.workers.dev/assets/frames/photobooth_cute.png", "iconUrl": "https://filter.phong200614.workers.dev/assets/frames/photobooth_cute.png", "remoteImage": "https://filter.phong200614.workers.dev/assets/frames/photobooth_cute.png", "sfSymbol": "square.grid.2x2", "symbol": "square.grid.2x2", "emoji": "\ud83d\udcf8"}, "outputUrl": null, "productUrl": null, "textColor": "#FFFFFF", "referenceImages": [], "requires_gold": false, "requiresGold": false, "is_gold": false, "isGold": false, "unlocked": true, "is_unlocked": true, "isUnlocked": true, "free": true, "allowsTryFilter": true, "allows_try_filter": true, "tryButtonEnabled": true, "try_button_enabled": true}, {"uid": "khung_anh_o_kitty_v_sao", "id": "khung_anh_o_kitty_v_sao", "name": "Khung \u00d4 Kitty & Ng\u00f4i Sao", "category": "Khung Vi\u1ec1n \ud83d\uddbc\ufe0f", "prompt": "khung_anh_o_kitty_v_sao", "style": "cutout", "type": "normal", "filterType": "normal", "overlay": true, "imageUrl": "https://filter.phong200614.workers.dev/assets/frames/khung_anh_o_kitty_v_sao.png", "iconUrl": "https://filter.phong200614.workers.dev/assets/frames/khung_anh_o_kitty_v_sao.png", "overlayImageUrl": "https://filter.phong200614.workers.dev/assets/frames/khung_anh_o_kitty_v_sao.png", "overlayImageURL": "https://filter.phong200614.workers.dev/assets/frames/khung_anh_o_kitty_v_sao.png", "tintColor": "#1D4ED8", "colors": ["#1D4ED8", "#93C5FD"], "captureButtonColors": ["#1D4ED8", "#93C5FD"], "icon": {"url": "https://filter.phong200614.workers.dev/assets/frames/khung_anh_o_kitty_v_sao.png", "iconUrl": "https://filter.phong200614.workers.dev/assets/frames/khung_anh_o_kitty_v_sao.png", "remoteImage": "https://filter.phong200614.workers.dev/assets/frames/khung_anh_o_kitty_v_sao.png", "sfSymbol": "square.grid.2x2", "symbol": "square.grid.2x2", "emoji": "\ud83d\udcf8"}, "outputUrl": null, "productUrl": null, "textColor": "#FFFFFF", "referenceImages": [], "requires_gold": false, "requiresGold": false, "is_gold": false, "isGold": false, "unlocked": true, "is_unlocked": true, "isUnlocked": true, "free": true, "allowsTryFilter": true, "allows_try_filter": true, "tryButtonEnabled": true, "try_button_enabled": true}, {"uid": "khung_doraemon_shinchan_kitty", "id": "khung_doraemon_shinchan_kitty", "name": "Khung Doraemon & Shinchan", "category": "Khung Vi\u1ec1n \ud83d\uddbc\ufe0f", "prompt": "khung_doraemon_shinchan_kitty", "style": "cutout", "type": "normal", "filterType": "normal", "overlay": true, "imageUrl": "https://filter.phong200614.workers.dev/assets/frames/khung_doraemon_shinchan_kitty.png", "iconUrl": "https://filter.phong200614.workers.dev/assets/frames/khung_doraemon_shinchan_kitty.png", "overlayImageUrl": "https://filter.phong200614.workers.dev/assets/frames/khung_doraemon_shinchan_kitty.png", "overlayImageURL": "https://filter.phong200614.workers.dev/assets/frames/khung_doraemon_shinchan_kitty.png", "tintColor": "#1D4ED8", "colors": ["#1D4ED8", "#93C5FD"], "captureButtonColors": ["#1D4ED8", "#93C5FD"], "icon": {"url": "https://filter.phong200614.workers.dev/assets/frames/khung_doraemon_shinchan_kitty.png", "iconUrl": "https://filter.phong200614.workers.dev/assets/frames/khung_doraemon_shinchan_kitty.png", "remoteImage": "https://filter.phong200614.workers.dev/assets/frames/khung_doraemon_shinchan_kitty.png", "sfSymbol": "square.grid.2x2", "symbol": "square.grid.2x2", "emoji": "\ud83d\udcf8"}, "outputUrl": null, "productUrl": null, "textColor": "#FFFFFF", "referenceImages": [], "requires_gold": false, "requiresGold": false, "is_gold": false, "isGold": false, "unlocked": true, "is_unlocked": true, "isUnlocked": true, "free": true, "allowsTryFilter": true, "allows_try_filter": true, "tryButtonEnabled": true, "try_button_enabled": true}, {"uid": "khung_hello_kitty_h_ng_pastel", "id": "khung_hello_kitty_h_ng_pastel", "name": "Khung Hello Kitty H\u1ed3ng Pastel", "category": "Khung Vi\u1ec1n \ud83d\uddbc\ufe0f", "prompt": "khung_hello_kitty_h_ng_pastel", "style": "cutout", "type": "normal", "filterType": "normal", "overlay": true, "imageUrl": "https://filter.phong200614.workers.dev/assets/frames/khung_hello_kitty_h_ng_pastel.png", "iconUrl": "https://filter.phong200614.workers.dev/assets/frames/khung_hello_kitty_h_ng_pastel.png", "overlayImageUrl": "https://filter.phong200614.workers.dev/assets/frames/khung_hello_kitty_h_ng_pastel.png", "overlayImageURL": "https://filter.phong200614.workers.dev/assets/frames/khung_hello_kitty_h_ng_pastel.png", "tintColor": "#1D4ED8", "colors": ["#1D4ED8", "#93C5FD"], "captureButtonColors": ["#1D4ED8", "#93C5FD"], "icon": {"url": "https://filter.phong200614.workers.dev/assets/frames/khung_hello_kitty_h_ng_pastel.png", "iconUrl": "https://filter.phong200614.workers.dev/assets/frames/khung_hello_kitty_h_ng_pastel.png", "remoteImage": "https://filter.phong200614.workers.dev/assets/frames/khung_hello_kitty_h_ng_pastel.png", "sfSymbol": "square.grid.2x2", "symbol": "square.grid.2x2", "emoji": "\ud83d\udcf8"}, "outputUrl": null, "productUrl": null, "textColor": "#FFFFFF", "referenceImages": [], "requires_gold": false, "requiresGold": false, "is_gold": false, "isGold": false, "unlocked": true, "is_unlocked": true, "isUnlocked": true, "free": true, "allowsTryFilter": true, "allows_try_filter": true, "tryButtonEnabled": true, "try_button_enabled": true}, {"uid": "khung_hello_kitty_pastel_ng_t_ng_o", "id": "khung_hello_kitty_pastel_ng_t_ng_o", "name": "Khung Hello Kitty Ng\u1ecdt Ng\u00e0o", "category": "Khung Vi\u1ec1n \ud83d\uddbc\ufe0f", "prompt": "khung_hello_kitty_pastel_ng_t_ng_o", "style": "cutout", "type": "normal", "filterType": "normal", "overlay": true, "imageUrl": "https://filter.phong200614.workers.dev/assets/frames/khung_hello_kitty_pastel_ng_t_ng_o.png", "iconUrl": "https://filter.phong200614.workers.dev/assets/frames/khung_hello_kitty_pastel_ng_t_ng_o.png", "overlayImageUrl": "https://filter.phong200614.workers.dev/assets/frames/khung_hello_kitty_pastel_ng_t_ng_o.png", "overlayImageURL": "https://filter.phong200614.workers.dev/assets/frames/khung_hello_kitty_pastel_ng_t_ng_o.png", "tintColor": "#1D4ED8", "colors": ["#1D4ED8", "#93C5FD"], "captureButtonColors": ["#1D4ED8", "#93C5FD"], "icon": {"url": "https://filter.phong200614.workers.dev/assets/frames/khung_hello_kitty_pastel_ng_t_ng_o.png", "iconUrl": "https://filter.phong200614.workers.dev/assets/frames/khung_hello_kitty_pastel_ng_t_ng_o.png", "remoteImage": "https://filter.phong200614.workers.dev/assets/frames/khung_hello_kitty_pastel_ng_t_ng_o.png", "sfSymbol": "square.grid.2x2", "symbol": "square.grid.2x2", "emoji": "\ud83d\udcf8"}, "outputUrl": null, "productUrl": null, "textColor": "#FFFFFF", "referenceImages": [], "requires_gold": false, "requiresGold": false, "is_gold": false, "isGold": false, "unlocked": true, "is_unlocked": true, "isUnlocked": true, "free": true, "allowsTryFilter": true, "allows_try_filter": true, "tryButtonEnabled": true, "try_button_enabled": true}, {"uid": "khung_kh_ng_gian_xanh_pastel", "id": "khung_kh_ng_gian_xanh_pastel", "name": "Khung Kh\u00f4ng Gian Xanh Pastel", "category": "Khung Vi\u1ec1n \ud83d\uddbc\ufe0f", "prompt": "khung_kh_ng_gian_xanh_pastel", "style": "cutout", "type": "normal", "filterType": "normal", "overlay": true, "imageUrl": "https://filter.phong200614.workers.dev/assets/frames/khung_kh_ng_gian_xanh_pastel.png", "iconUrl": "https://filter.phong200614.workers.dev/assets/frames/khung_kh_ng_gian_xanh_pastel.png", "overlayImageUrl": "https://filter.phong200614.workers.dev/assets/frames/khung_kh_ng_gian_xanh_pastel.png", "overlayImageURL": "https://filter.phong200614.workers.dev/assets/frames/khung_kh_ng_gian_xanh_pastel.png", "tintColor": "#1D4ED8", "colors": ["#1D4ED8", "#93C5FD"], "captureButtonColors": ["#1D4ED8", "#93C5FD"], "icon": {"url": "https://filter.phong200614.workers.dev/assets/frames/khung_kh_ng_gian_xanh_pastel.png", "iconUrl": "https://filter.phong200614.workers.dev/assets/frames/khung_kh_ng_gian_xanh_pastel.png", "remoteImage": "https://filter.phong200614.workers.dev/assets/frames/khung_kh_ng_gian_xanh_pastel.png", "sfSymbol": "square.grid.2x2", "symbol": "square.grid.2x2", "emoji": "\ud83d\udcf8"}, "outputUrl": null, "productUrl": null, "textColor": "#FFFFFF", "referenceImages": [], "requires_gold": false, "requiresGold": false, "is_gold": false, "isGold": false, "unlocked": true, "is_unlocked": true, "isUnlocked": true, "free": true, "allowsTryFilter": true, "allows_try_filter": true, "tryButtonEnabled": true, "try_button_enabled": true}, {"uid": "khung_nh_hoa_pastel_vi_n_xanh_m_nh", "id": "khung_nh_hoa_pastel_vi_n_xanh_m_nh", "name": "Khung Nh\u00e0nh Hoa Pastel Vi\u1ec1n Xanh", "category": "Khung Vi\u1ec1n \ud83d\uddbc\ufe0f", "prompt": "khung_nh_hoa_pastel_vi_n_xanh_m_nh", "style": "cutout", "type": "normal", "filterType": "normal", "overlay": true, "imageUrl": "https://filter.phong200614.workers.dev/assets/frames/khung_nh_hoa_pastel_vi_n_xanh_m_nh.png", "iconUrl": "https://filter.phong200614.workers.dev/assets/frames/khung_nh_hoa_pastel_vi_n_xanh_m_nh.png", "overlayImageUrl": "https://filter.phong200614.workers.dev/assets/frames/khung_nh_hoa_pastel_vi_n_xanh_m_nh.png", "overlayImageURL": "https://filter.phong200614.workers.dev/assets/frames/khung_nh_hoa_pastel_vi_n_xanh_m_nh.png", "tintColor": "#1D4ED8", "colors": ["#1D4ED8", "#93C5FD"], "captureButtonColors": ["#1D4ED8", "#93C5FD"], "icon": {"url": "https://filter.phong200614.workers.dev/assets/frames/khung_nh_hoa_pastel_vi_n_xanh_m_nh.png", "iconUrl": "https://filter.phong200614.workers.dev/assets/frames/khung_nh_hoa_pastel_vi_n_xanh_m_nh.png", "remoteImage": "https://filter.phong200614.workers.dev/assets/frames/khung_nh_hoa_pastel_vi_n_xanh_m_nh.png", "sfSymbol": "square.grid.2x2", "symbol": "square.grid.2x2", "emoji": "\ud83d\udcf8"}, "outputUrl": null, "productUrl": null, "textColor": "#FFFFFF", "referenceImages": [], "requires_gold": false, "requiresGold": false, "is_gold": false, "isGold": false, "unlocked": true, "is_unlocked": true, "isUnlocked": true, "free": true, "allowsTryFilter": true, "allows_try_filter": true, "tryButtonEnabled": true, "try_button_enabled": true}, {"uid": "khung_nh_n_pastel_vi_n_ren", "id": "khung_nh_n_pastel_vi_n_ren", "name": "Khung Nh\u1eabn Pastel Vi\u1ec1n Ren", "category": "Khung Vi\u1ec1n \ud83d\uddbc\ufe0f", "prompt": "khung_nh_n_pastel_vi_n_ren", "style": "cutout", "type": "normal", "filterType": "normal", "overlay": true, "imageUrl": "https://filter.phong200614.workers.dev/assets/frames/khung_nh_n_pastel_vi_n_ren.png", "iconUrl": "https://filter.phong200614.workers.dev/assets/frames/khung_nh_n_pastel_vi_n_ren.png", "overlayImageUrl": "https://filter.phong200614.workers.dev/assets/frames/khung_nh_n_pastel_vi_n_ren.png", "overlayImageURL": "https://filter.phong200614.workers.dev/assets/frames/khung_nh_n_pastel_vi_n_ren.png", "tintColor": "#1D4ED8", "colors": ["#1D4ED8", "#93C5FD"], "captureButtonColors": ["#1D4ED8", "#93C5FD"], "icon": {"url": "https://filter.phong200614.workers.dev/assets/frames/khung_nh_n_pastel_vi_n_ren.png", "iconUrl": "https://filter.phong200614.workers.dev/assets/frames/khung_nh_n_pastel_vi_n_ren.png", "remoteImage": "https://filter.phong200614.workers.dev/assets/frames/khung_nh_n_pastel_vi_n_ren.png", "sfSymbol": "square.grid.2x2", "symbol": "square.grid.2x2", "emoji": "\ud83d\udcf8"}, "outputUrl": null, "productUrl": null, "textColor": "#FFFFFF", "referenceImages": [], "requires_gold": false, "requiresGold": false, "is_gold": false, "isGold": false, "unlocked": true, "is_unlocked": true, "isUnlocked": true, "free": true, "allowsTryFilter": true, "allows_try_filter": true, "tryButtonEnabled": true, "try_button_enabled": true}, {"uid": "khung_nh_pastel_vi_n_s_h_i_c_u", "id": "khung_nh_pastel_vi_n_s_h_i_c_u", "name": "Khung Pastel S\u00f2 H\u1ea3i C\u1ea9u", "category": "Khung Vi\u1ec1n \ud83d\uddbc\ufe0f", "prompt": "khung_nh_pastel_vi_n_s_h_i_c_u", "style": "cutout", "type": "normal", "filterType": "normal", "overlay": true, "imageUrl": "https://filter.phong200614.workers.dev/assets/frames/khung_nh_pastel_vi_n_s_h_i_c_u.png", "iconUrl": "https://filter.phong200614.workers.dev/assets/frames/khung_nh_pastel_vi_n_s_h_i_c_u.png", "overlayImageUrl": "https://filter.phong200614.workers.dev/assets/frames/khung_nh_pastel_vi_n_s_h_i_c_u.png", "overlayImageURL": "https://filter.phong200614.workers.dev/assets/frames/khung_nh_pastel_vi_n_s_h_i_c_u.png", "tintColor": "#1D4ED8", "colors": ["#1D4ED8", "#93C5FD"], "captureButtonColors": ["#1D4ED8", "#93C5FD"], "icon": {"url": "https://filter.phong200614.workers.dev/assets/frames/khung_nh_pastel_vi_n_s_h_i_c_u.png", "iconUrl": "https://filter.phong200614.workers.dev/assets/frames/khung_nh_pastel_vi_n_s_h_i_c_u.png", "remoteImage": "https://filter.phong200614.workers.dev/assets/frames/khung_nh_pastel_vi_n_s_h_i_c_u.png", "sfSymbol": "square.grid.2x2", "symbol": "square.grid.2x2", "emoji": "\ud83d\udcf8"}, "outputUrl": null, "productUrl": null, "textColor": "#FFFFFF", "referenceImages": [], "requires_gold": false, "requiresGold": false, "is_gold": false, "isGold": false, "unlocked": true, "is_unlocked": true, "isUnlocked": true, "free": true, "allowsTryFilter": true, "allows_try_filter": true, "tryButtonEnabled": true, "try_button_enabled": true}, {"uid": "khung_nh_shin_chan_vi_n_m_nh", "id": "khung_nh_shin_chan_vi_n_m_nh", "name": "Khung Shinchan Vi\u1ec1n M\u1ea3nh", "category": "Khung Vi\u1ec1n \ud83d\uddbc\ufe0f", "prompt": "khung_nh_shin_chan_vi_n_m_nh", "style": "cutout", "type": "normal", "filterType": "normal", "overlay": true, "imageUrl": "https://filter.phong200614.workers.dev/assets/frames/khung_nh_shin_chan_vi_n_m_nh.png", "iconUrl": "https://filter.phong200614.workers.dev/assets/frames/khung_nh_shin_chan_vi_n_m_nh.png", "overlayImageUrl": "https://filter.phong200614.workers.dev/assets/frames/khung_nh_shin_chan_vi_n_m_nh.png", "overlayImageURL": "https://filter.phong200614.workers.dev/assets/frames/khung_nh_shin_chan_vi_n_m_nh.png", "tintColor": "#1D4ED8", "colors": ["#1D4ED8", "#93C5FD"], "captureButtonColors": ["#1D4ED8", "#93C5FD"], "icon": {"url": "https://filter.phong200614.workers.dev/assets/frames/khung_nh_shin_chan_vi_n_m_nh.png", "iconUrl": "https://filter.phong200614.workers.dev/assets/frames/khung_nh_shin_chan_vi_n_m_nh.png", "remoteImage": "https://filter.phong200614.workers.dev/assets/frames/khung_nh_shin_chan_vi_n_m_nh.png", "sfSymbol": "square.grid.2x2", "symbol": "square.grid.2x2", "emoji": "\ud83d\udcf8"}, "outputUrl": null, "productUrl": null, "textColor": "#FFFFFF", "referenceImages": [], "requires_gold": false, "requiresGold": false, "is_gold": false, "isGold": false, "unlocked": true, "is_unlocked": true, "isUnlocked": true, "free": true, "allowsTryFilter": true, "allows_try_filter": true, "tryButtonEnabled": true, "try_button_enabled": true}, {"uid": "khung_nh_vu_ng_m_ng_nh_n_b_c", "id": "khung_nh_vu_ng_m_ng_nh_n_b_c", "name": "Khung V\u01b0\u01a1ng Mi\u1ec7n B\u1ea1c", "category": "Khung Vi\u1ec1n \ud83d\uddbc\ufe0f", "prompt": "khung_nh_vu_ng_m_ng_nh_n_b_c", "style": "cutout", "type": "normal", "filterType": "normal", "overlay": true, "imageUrl": "https://filter.phong200614.workers.dev/assets/frames/khung_nh_vu_ng_m_ng_nh_n_b_c.png", "iconUrl": "https://filter.phong200614.workers.dev/assets/frames/khung_nh_vu_ng_m_ng_nh_n_b_c.png", "overlayImageUrl": "https://filter.phong200614.workers.dev/assets/frames/khung_nh_vu_ng_m_ng_nh_n_b_c.png", "overlayImageURL": "https://filter.phong200614.workers.dev/assets/frames/khung_nh_vu_ng_m_ng_nh_n_b_c.png", "tintColor": "#1D4ED8", "colors": ["#1D4ED8", "#93C5FD"], "captureButtonColors": ["#1D4ED8", "#93C5FD"], "icon": {"url": "https://filter.phong200614.workers.dev/assets/frames/khung_nh_vu_ng_m_ng_nh_n_b_c.png", "iconUrl": "https://filter.phong200614.workers.dev/assets/frames/khung_nh_vu_ng_m_ng_nh_n_b_c.png", "remoteImage": "https://filter.phong200614.workers.dev/assets/frames/khung_nh_vu_ng_m_ng_nh_n_b_c.png", "sfSymbol": "square.grid.2x2", "symbol": "square.grid.2x2", "emoji": "\ud83d\udcf8"}, "outputUrl": null, "productUrl": null, "textColor": "#FFFFFF", "referenceImages": [], "requires_gold": false, "requiresGold": false, "is_gold": false, "isGold": false, "unlocked": true, "is_unlocked": true, "isUnlocked": true, "free": true, "allowsTryFilter": true, "allows_try_filter": true, "tryButtonEnabled": true, "try_button_enabled": true}, {"uid": "khung_vu_ng_ng_i_sao_h_ng_pastel", "id": "khung_vu_ng_ng_i_sao_h_ng_pastel", "name": "Khung V\u01b0\u01a1ng Mi\u1ec7n Sao H\u1ed3ng", "category": "Khung Vi\u1ec1n \ud83d\uddbc\ufe0f", "prompt": "khung_vu_ng_ng_i_sao_h_ng_pastel", "style": "cutout", "type": "normal", "filterType": "normal", "overlay": true, "imageUrl": "https://filter.phong200614.workers.dev/assets/frames/khung_vu_ng_ng_i_sao_h_ng_pastel.png", "iconUrl": "https://filter.phong200614.workers.dev/assets/frames/khung_vu_ng_ng_i_sao_h_ng_pastel.png", "overlayImageUrl": "https://filter.phong200614.workers.dev/assets/frames/khung_vu_ng_ng_i_sao_h_ng_pastel.png", "overlayImageURL": "https://filter.phong200614.workers.dev/assets/frames/khung_vu_ng_ng_i_sao_h_ng_pastel.png", "tintColor": "#1D4ED8", "colors": ["#1D4ED8", "#93C5FD"], "captureButtonColors": ["#1D4ED8", "#93C5FD"], "icon": {"url": "https://filter.phong200614.workers.dev/assets/frames/khung_vu_ng_ng_i_sao_h_ng_pastel.png", "iconUrl": "https://filter.phong200614.workers.dev/assets/frames/khung_vu_ng_ng_i_sao_h_ng_pastel.png", "remoteImage": "https://filter.phong200614.workers.dev/assets/frames/khung_vu_ng_ng_i_sao_h_ng_pastel.png", "sfSymbol": "square.grid.2x2", "symbol": "square.grid.2x2", "emoji": "\ud83d\udcf8"}, "outputUrl": null, "productUrl": null, "textColor": "#FFFFFF", "referenceImages": [], "requires_gold": false, "requiresGold": false, "is_gold": false, "isGold": false, "unlocked": true, "is_unlocked": true, "isUnlocked": true, "free": true, "allowsTryFilter": true, "allows_try_filter": true, "tryButtonEnabled": true, "try_button_enabled": true}, {"uid": "khung_xanh_v_tay_sao_v_ng", "id": "khung_xanh_v_tay_sao_v_ng", "name": "Khung Xanh V\u1ebd Tay Sao V\u00e0ng", "category": "Khung Vi\u1ec1n \ud83d\uddbc\ufe0f", "prompt": "khung_xanh_v_tay_sao_v_ng", "style": "cutout", "type": "normal", "filterType": "normal", "overlay": true, "imageUrl": "https://filter.phong200614.workers.dev/assets/frames/khung_xanh_v_tay_sao_v_ng.png", "iconUrl": "https://filter.phong200614.workers.dev/assets/frames/khung_xanh_v_tay_sao_v_ng.png", "overlayImageUrl": "https://filter.phong200614.workers.dev/assets/frames/khung_xanh_v_tay_sao_v_ng.png", "overlayImageURL": "https://filter.phong200614.workers.dev/assets/frames/khung_xanh_v_tay_sao_v_ng.png", "tintColor": "#1D4ED8", "colors": ["#1D4ED8", "#93C5FD"], "captureButtonColors": ["#1D4ED8", "#93C5FD"], "icon": {"url": "https://filter.phong200614.workers.dev/assets/frames/khung_xanh_v_tay_sao_v_ng.png", "iconUrl": "https://filter.phong200614.workers.dev/assets/frames/khung_xanh_v_tay_sao_v_ng.png", "remoteImage": "https://filter.phong200614.workers.dev/assets/frames/khung_xanh_v_tay_sao_v_ng.png", "sfSymbol": "square.grid.2x2", "symbol": "square.grid.2x2", "emoji": "\ud83d\udcf8"}, "outputUrl": null, "productUrl": null, "textColor": "#FFFFFF", "referenceImages": [], "requires_gold": false, "requiresGold": false, "is_gold": false, "isGold": false, "unlocked": true, "is_unlocked": true, "isUnlocked": true, "free": true, "allowsTryFilter": true, "allows_try_filter": true, "tryButtonEnabled": true, "try_button_enabled": true}];
var __fsheet = [{"id": "group_hi_u_ng_ai_3d_hot", "title": {"en": "Hi\u1ec7u \u1ee8ng AI 3D Hot \ud83d\udd25", "vi": "Hi\u1ec7u \u1ee8ng AI 3D Hot \ud83d\udd25"}, "filterIds": ["stk_tai_tho", "stk_mu_ngu_khoc", "stk_jollibee", "stk_nak_ve_than", "stk_gojo_satoru", "stk_shopee_food"], "filter_ids": ["stk_tai_tho", "stk_mu_ngu_khoc", "stk_jollibee", "stk_nak_ve_than", "stk_gojo_satoru", "stk_shopee_food"]}, {"id": "group_photobooth", "title": {"en": "Photobooth \ud83d\udcf8", "vi": "Photobooth \ud83d\udcf8"}, "filterIds": ["pb_cortis_4cut", "pb_cortis_v1", "pb_cortis_v2", "pb_denim_ripped_2x2", "pb_ech_xanh", "pb_galaxy", "pb_holo_4cut", "pb_meo_dang_yeu_4cut", "pb_photobooth_hello_kitty", "pb_ripped_paper_4cut", "pb_scrapbook_ripped_4cut", "pb_shinchan_4cut", "pb_single_denim_ripped", "pb_single_film_nostalgia", "pb_single_y2k_silver_holo", "pb_strawberry", "pb_supperman_4cut", "pb_trung_bac_thao", "pb_vien_hello_kitty", "pb_vintage", "photobooth_4cut", "photobooth_cute"], "filter_ids": ["pb_cortis_4cut", "pb_cortis_v1", "pb_cortis_v2", "pb_denim_ripped_2x2", "pb_ech_xanh", "pb_galaxy", "pb_holo_4cut", "pb_meo_dang_yeu_4cut", "pb_photobooth_hello_kitty", "pb_ripped_paper_4cut", "pb_scrapbook_ripped_4cut", "pb_shinchan_4cut", "pb_single_denim_ripped", "pb_single_film_nostalgia", "pb_single_y2k_silver_holo", "pb_strawberry", "pb_supperman_4cut", "pb_trung_bac_thao", "pb_vien_hello_kitty", "pb_vintage", "photobooth_4cut", "photobooth_cute"]}, {"id": "group_khung_vi_n", "title": {"en": "Khung Vi\u1ec1n \ud83d\uddbc\ufe0f", "vi": "Khung Vi\u1ec1n \ud83d\uddbc\ufe0f"}, "filterIds": ["frame_ba_khi", "khung_anh_o_kitty_v_sao", "khung_doraemon_shinchan_kitty", "khung_hello_kitty_h_ng_pastel", "khung_hello_kitty_pastel_ng_t_ng_o", "khung_kh_ng_gian_xanh_pastel", "khung_nh_hoa_pastel_vi_n_xanh_m_nh", "khung_nh_n_pastel_vi_n_ren", "khung_nh_pastel_vi_n_s_h_i_c_u", "khung_nh_shin_chan_vi_n_m_nh", "khung_nh_vu_ng_m_ng_nh_n_b_c", "khung_vu_ng_ng_i_sao_h_ng_pastel", "khung_xanh_v_tay_sao_v_ng"], "filter_ids": ["frame_ba_khi", "khung_anh_o_kitty_v_sao", "khung_doraemon_shinchan_kitty", "khung_hello_kitty_h_ng_pastel", "khung_hello_kitty_pastel_ng_t_ng_o", "khung_kh_ng_gian_xanh_pastel", "khung_nh_hoa_pastel_vi_n_xanh_m_nh", "khung_nh_n_pastel_vi_n_ren", "khung_nh_pastel_vi_n_s_h_i_c_u", "khung_nh_shin_chan_vi_n_m_nh", "khung_nh_vu_ng_m_ng_nh_n_b_c", "khung_vu_ng_ng_i_sao_h_ng_pastel", "khung_xanh_v_tay_sao_v_ng"]}, {"id": "group_tr_ch_i_locket", "title": {"en": "Tr\u00f2 Ch\u01a1i Locket", "vi": "Tr\u00f2 Ch\u01a1i Locket"}, "filterIds": ["hom_nay_an_gi"], "filter_ids": ["hom_nay_an_gi"]}, {"id": "group_goofy", "title": {"en": "Goofy", "vi": "H\u00e0i h\u01b0\u1edbc"}, "filterIds": ["okay_wig", "influencer", "looks_maxxing", "toothless", "bye_brows"], "filter_ids": ["okay_wig", "influencer", "looks_maxxing", "toothless", "bye_brows"]}, {"id": "group_looks", "title": {"en": "Looks", "vi": "Ngo\u1ea1i h\u00ecnh"}, "filterIds": ["bowling_ball", "blonde_bleached", "beard", "bob_cut", "buns", "tatted", "mohawk", "braces", "bye_brows"], "filter_ids": ["bowling_ball", "blonde_bleached", "beard", "bob_cut", "buns", "tatted", "mohawk", "braces", "bye_brows"]}, {"id": "group_celebrate", "title": {"en": "Celebrate", "vi": "Ti\u1ec7c t\u00f9ng"}, "filterIds": ["slimed", "princess", "disco_lights", "cash_money", "happy_birthday"], "filter_ids": ["slimed", "princess", "disco_lights", "cash_money", "happy_birthday"]}, {"id": "group_cute", "title": {"en": "Cute", "vi": "\u0110\u00e1ng y\u00eau"}, "filterIds": ["cutesy", "sticker_face", "flower_crown", "love_bug"], "filter_ids": ["cutesy", "sticker_face", "flower_crown", "love_bug"]}, {"id": "group_costumes", "title": {"en": "Costumes", "vi": "Trang ph\u1ee5c"}, "filterIds": ["wedding", "cowboy_cowgirl", "giraffe", "clown"], "filter_ids": ["wedding", "cowboy_cowgirl", "giraffe", "clown"]}, {"id": "group_holidays", "title": {"en": "Holidays", "vi": "L\u1ec5 h\u1ed9i"}, "filterIds": ["easter_bunney_cutout", "easter_chick_cutout", "bearded", "leprechaun", "lucky_face", "sweet_hearts", "elf_cutout", "santa_cutout", "frosty"], "filter_ids": ["easter_bunney_cutout", "easter_chick_cutout", "bearded", "leprechaun", "lucky_face", "sweet_hearts", "elf_cutout", "santa_cutout", "frosty"]}];
var __fpick = ["pb_cortis_4cut", "pb_cortis_v1", "pb_cortis_v2", "pb_denim_ripped_2x2", "pb_ech_xanh", "pb_galaxy", "pb_holo_4cut", "pb_meo_dang_yeu_4cut", "pb_photobooth_hello_kitty", "pb_ripped_paper_4cut", "pb_scrapbook_ripped_4cut", "pb_shinchan_4cut", "pb_single_denim_ripped", "pb_single_film_nostalgia", "pb_single_y2k_silver_holo", "pb_strawberry", "pb_supperman_4cut", "pb_trung_bac_thao", "pb_vien_hello_kitty", "pb_vintage", "photobooth_4cut", "photobooth_cute", "frame_ba_khi", "khung_anh_o_kitty_v_sao", "khung_doraemon_shinchan_kitty", "khung_hello_kitty_h_ng_pastel", "khung_hello_kitty_pastel_ng_t_ng_o", "khung_kh_ng_gian_xanh_pastel", "khung_nh_hoa_pastel_vi_n_xanh_m_nh", "khung_nh_n_pastel_vi_n_ren", "khung_nh_pastel_vi_n_s_h_i_c_u", "khung_nh_shin_chan_vi_n_m_nh", "khung_nh_vu_ng_m_ng_nh_n_b_c", "khung_vu_ng_ng_i_sao_h_ng_pastel", "khung_xanh_v_tay_sao_v_ng", "stk_tai_tho", "stk_mu_ngu_khoc", "stk_jollibee", "stk_nak_ve_than", "stk_gojo_satoru", "stk_shopee_food", "hom_nay_an_gi", "okay_wig", "influencer", "looks_maxxing", "toothless", "bye_brows", "bowling_ball", "blonde_bleached", "beard", "bob_cut", "buns", "tatted", "mohawk", "braces", "slimed", "princess", "disco_lights", "cash_money", "happy_birthday", "cutesy", "sticker_face", "flower_crown", "love_bug", "wedding", "cowboy_cowgirl", "giraffe", "clown", "easter_bunney_cutout", "easter_chick_cutout", "bearded", "leprechaun", "lucky_face", "sweet_hearts", "elf_cutout", "santa_cutout", "frosty"];
var __cfc = {
  showFilterButton:true, show_filter_button:true, allowsCustomFilters:true, allows_custom_filters:true,
  referenceImageAttachmentEnabled:true, reference_image_attachment_enabled:true,
  sheetEnabled:true, sheet_enabled:true, openSheetImmediately:false, open_sheet_immediately:false,
  pickerFilters:__fpick, picker_filters:__fpick,
  filterGroups:__fsheet, filter_groups:__fsheet, sheetFilters:__fsheet, sheet_filters:__fsheet,
  remoteFilters:__fobjs, remote_filters:__fobjs, filters:__fobjs
};
remoteEntries["camera_filter_config"] = JSON.stringify(__cfc);
remoteEntries["cameraFilterConfig"] = remoteEntries["camera_filter_config"];
// ★ NGUYÊN BỘ CỜ minhthoaine (gồm GEO US — filter có thể khóa theo vùng) + gold/paywall.
["camera_filters_enabled","camera_filter_enabled","camera_filter_sheet_enabled","camera_filter_picker_enabled",
 "holiday_filters_enabled","ai_filters_enabled","ai_filters_free","holiday_filters_free",
 "free_filters_enabled","filter_selection_enabled","camera_filter_sheet_selection_enabled","sheet_filters_selectable",
 "dismiss_filter_sheet_on_select","allows_custom_filters","all_filters_free","unlocked_filters","is_us_user",
 "is_gold","has_gold","is_gold_user","user_is_gold","gold_user","gold_active"
].forEach(function (k) { remoteEntries[k] = "true"; });
["camera_filter_gold_only","camera_filters_gold_only","holiday_filters_gold_only","filter_gold_only","filters_gold_only",
 "ai_filter_gold_only","ai_filters_gold_only","filter_paywall_enabled","camera_filter_paywall_enabled","filter_upsell_enabled",
 "require_gold_for_filters","require_gold_for_filter","requires_gold_for_filters","requires_gold_for_filter",
 "requires_gold_for_camera_filters","camera_filter_requires_gold","camera_filters_require_gold","ai_filter_requires_gold",
 "ai_filters_require_gold","filter_requires_gold","filters_require_gold","filtered_image_requires_gold",
 "filtered_images_require_gold","filtered_image_gold_only","filtered_images_gold_only"
].forEach(function (k) { remoteEntries[k] = "false"; });
remoteEntries["country_code"] = "US"; remoteEntries["region_code"] = "US";
remoteEntries["camera_filter_max_count"] = "50"; remoteEntries["max_camera_filters"] = "50";
remoteEntries["celebrity_filter_config"] = JSON.stringify({celebrityUid:"locket_admin_custom", cameraFilterConfig:__cfc});
remoteEntries["cache_ttl_seconds"] = "0";
remoteEntries["client_cache_ttl_sec"] = "0";

Object.assign(obj.entries, remoteEntries);

// ⛔ CHỐNG MẤT ICON SAU 1 NGÀY: ép app không cache config → mỗi lần fetch đều
// lấy bản đã vá (không bao giờ xài lại bản free cũ trong cache).
obj.entries['cache_ttl_seconds'] = "0";
obj.entries['client_cache_ttl_sec'] = "0";
obj.entries['minimum_fetch_interval_seconds'] = "0";

obj['state'] = "UPDATE";
obj['templateVersion'] = String(Date.now());
obj['Attention'] = "Chúc mừng bạn! Bản quyền thuộc về langtucamau.";

// TẠM: beacon RC thật giao gì (gỡ sau khi debug xong thanh filter)
try {
  $httpClient.post({
    url: "https://locket-gold.locket-gold.workers.dev/capture-resp",
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify({
      tag: "RC_DELIVER",
      url: (typeof $request !== "undefined" && $request && $request.url) ? String($request.url).split("?")[0] : "",
      entryCount: Object.keys(obj.entries || {}).length,
      hasCFC: !!(obj.entries && obj.entries.camera_filter_config),
      cfcLen: (obj.entries && obj.entries.camera_filter_config) ? obj.entries.camera_filter_config.length : 0,
      hasCelebrity: !!(obj.entries && obj.entries.celebrity_filter_config),
      hasVideoDur: !!(obj.entries && obj.entries.camera_roll_video_max_duration),
      hasFileSize: !!(obj.entries && obj.entries.max_file_size),
      state: obj.state,
      keysSample: Object.keys(obj.entries || {}).filter(function (k) { return /filter|camera_roll|video/i.test(k); }).slice(0, 30)
    })
  }, function () { $done({ body: JSON.stringify(obj) }); });
} catch (e) { $done({ body: JSON.stringify(obj) }); }
