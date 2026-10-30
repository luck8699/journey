/* 国际扩展数据 · 申签 */
window.INTL_APPLY = (window.INTL_APPLY || []).concat([
  {
    id: "spain",
    name: "西班牙",
    en: "Spain",
    flag: "🇪🇸",
    category: "apply",
    continent: "欧洲",
    stay: "90 天/180 天（申根）",
    passport: "6 个月以上",
    currency: "欧元 EUR",
    language: "西班牙语",
    bestSeason: "4–6 月 / 9–10 月",
    days: "8–10 天",
    intro: "高迪的曲线、安达卢西亚的白墙和午后的 tapas。西班牙适合把一天过成两段：上午看建筑，晚上十点吃晚饭。",
    foods: ["Tapas", "海鲜饭", "伊比利亚火腿", "Churros", "Sangria"],
    play: ["圣家堂", "古埃尔公园", "哥特区", "弗拉门戈"],
    visa: {
      type: "申根短期旅游签证（C 类）",
      where: "在西班牙签证中心（BLS International）按领区预约递交；按主要目的地原则，向停留最久的申根国申请。",
      processing: "约 15 个工作日，旺季更久",
      fee: "成人约 €90，以签证中心为准",
      validity: "短期申根签证，任意 180 天内停留不超过 90 天",
      steps: [
        "确认西班牙是主要目的地（停留最久）。",
        "在 BLS 官网选择领区、预约递交时间。",
        "准备护照、照片、行程、住宿、保险和资金材料。",
        "按预约到签证中心递材料、录指纹。",
        "跟踪进度，出签后核对签证页。",
        "入境时携带保险、住宿和返程票。"
      ],
      documents: ["护照（超出离境日至少 3 个月）", "申根签证申请表", "白底照片", "往返机票和住宿订单", "每日行程单", "旅行医疗保险（保额至少 €30,000）", "近 3–6 个月银行流水", "在职证明/在读证明"],
      entry: ["护照 + 有效申根签证。", "180 天内累计停留不超过 90 天。", "入境可能询问行程和住宿。", "随身携带保险单和返程票。", "旅游签证不得工作。"],
      notes: ["申根签证按主要目的地申请，不要只看哪个国家好签。", "巴塞罗那景点需提前官网预约。", "大城市扒手多，背包前背。"],
      official: [
        { label: "西班牙外交部签证", url: "https://www.exteriores.gob.es/en/ServiciosAlCiudadano/Paginas/Visados.aspx" },
        { label: "BLS 西班牙签证中心", url: "https://spainvisa.blsspainvisa.com/" }
      ]
    },
    cities: [
      {
        name: "巴塞罗那",
        attractions: [
          {
            id: "es-sagrada",
            name: "圣家堂",
            en: "Sagrada Família",
            lat: 41.4036,
            lng: 2.1744,
            motif: "穹",
            cat: "建筑 · 世界遗产",
            duration: "2–3 小时",
            ticket: "约 €26",
            highlight: "高迪未完成的教堂，光穿过彩窗像一片森林",
            highlights: ["诞生立面", "受难立面", "塔楼"],
            play: ["预约登塔", "下午看彩窗光", "听语音导览"],
            tips: "官网提前订票，选下午 4 点后光线最好；着装得体。",
            best: "下午"
          },
          {
            id: "es-guell",
            name: "古埃尔公园",
            en: "Park Güell",
            lat: 41.4145,
            lng: 2.1527,
            motif: "园",
            cat: "公园 · 高迪",
            duration: "2 小时",
            ticket: "约 €18",
            highlight: "马赛克蜥蜴、波浪长椅和巴塞罗那全景",
            highlights: ["马赛克蜥蜴", "波浪长椅", "高迪博物馆"],
            play: ["拍马赛克", "山顶看城", "走高迪小径"],
            tips: "收费区需预约；从地铁站上山有扶梯。",
            best: "上午"
          },
          {
            id: "es-gothic",
            name: "哥特区",
            en: "Gothic Quarter",
            lat: 41.3839,
            lng: 2.1762,
            motif: "巷",
            cat: "老城 · 步行",
            duration: "2–3 小时",
            ticket: "免费",
            highlight: "罗马城墙、窄巷和广场，迷路才是正确玩法",
            highlights: ["巴塞罗那大教堂", "国王广场", "兰布拉大道"],
            play: ["老城乱走", "大教堂回廊", "吃 pintxos"],
            tips: "晚上注意随身物品；兰布拉大道偏游客，往哥特区深处走。",
            best: "傍晚"
          }
        ]
      }
    ]
  },
  {
    id: "germany",
    name: "德国",
    en: "Germany",
    flag: "🇩🇪",
    category: "apply",
    continent: "欧洲",
    stay: "90 天/180 天（申根）",
    passport: "6 个月以上",
    currency: "欧元 EUR",
    language: "德语",
    bestSeason: "5–9 月",
    days: "8–10 天",
    intro: "柏林的历史 layers、慕尼黑的啤酒花园和德累斯顿的巴洛克。德国适合坐火车，一站一站看过去。",
    foods: ["香肠", "猪肘", "碱水结", "黑森林蛋糕", "啤酒"],
    play: ["勃兰登堡门", "博物馆岛", "东边画廊", "柏林墙"],
    visa: {
      type: "申根短期旅游签证（C 类）",
      where: "通过德国驻华使领馆指定的签证中心（VFS Global）按领区预约递交；按主要目的地原则申请。",
      processing: "约 15 个工作日，旺季更久",
      fee: "成人约 €90",
      validity: "短期申根签证，任意 180 天内停留不超过 90 天",
      steps: ["确认德国是主要目的地。", "在 VFS 官网预约领区递交。", "准备护照、行程、住宿、保险和资金材料。", "到签证中心递材料、录指纹。", "跟踪进度，出签后核对。", "入境携带保险、住宿和返程票。"],
      documents: ["护照", "申根签证申请表", "照片", "机票和住宿订单", "行程单", "申根保险（€30,000）", "银行流水", "在职证明"],
      entry: ["护照 + 有效申根签证。", "180 天内累计不超过 90 天。", "入境可能询问行程。", "携带保险和返程票。", "不得工作。"],
      notes: ["德国签证按领区划分，先查所属领区。", "博物馆岛建议买联票。", "火车票提前买更便宜。"],
      official: [
        { label: "德国外交部签证", url: "https://www.auswaertiges-amt.de/en/visa-service" },
        { label: "VFS 德国签证中心", url: "https://visa.vfsglobal.com/chn/zh/deu/" }
      ]
    },
    cities: [
      {
        name: "柏林",
        attractions: [
          {
            id: "de-brandenburg",
            name: "勃兰登堡门",
            en: "Brandenburg Gate",
            lat: 52.5163,
            lng: 13.3777,
            motif: "门",
            cat: "地标 · 历史",
            duration: "1 小时",
            ticket: "免费",
            highlight: "柏林最重要的城市符号，见证分裂与统一",
            highlights: ["勃兰登堡门", "国会大厦", "菩提树下大街"],
            play: ["看城门", "国会大厦穹顶", "沿大街散步"],
            tips: "国会大厦穹顶需提前预约；晚上看灯。",
            best: "傍晚"
          },
          {
            id: "de-museum",
            name: "博物馆岛",
            en: "Museum Island",
            lat: 52.5169,
            lng: 13.401,
            motif: "馆",
            cat: "博物馆 · 世界遗产",
            duration: "半天",
            ticket: "联票约 €24",
            highlight: "五座博物馆挤在一座岛上，佩加蒙最震撼",
            highlights: ["佩加蒙博物馆", "新博物馆", "柏林大教堂"],
            play: ["佩加蒙祭坛", "纳芙蒂蒂半身像", "河岸散步"],
            tips: "佩加蒙部分展厅可能整修，先查官网；买博物馆联票。",
            best: "上午"
          },
          {
            id: "de-eastside",
            name: "东边画廊",
            en: "East Side Gallery",
            lat: 52.505,
            lng: 13.4397,
            motif: "墙",
            cat: "历史 · 街头艺术",
            duration: "1.5 小时",
            ticket: "免费",
            highlight: "柏林墙最长的一段，变成露天画廊",
            highlights: ["柏林墙", "涂鸦", "施普雷河"],
            play: ["看壁画", "河边散步", "拍“兄弟之吻”"],
            tips: "早上人少；壁画在户外，免费。",
            best: "上午"
          }
        ]
      }
    ]
  },
  {
    id: "switzerland",
    name: "瑞士",
    en: "Switzerland",
    flag: "🇨🇭",
    category: "apply",
    continent: "欧洲",
    stay: "90 天/180 天（申根）",
    passport: "6 个月以上",
    currency: "瑞士法郎 CHF",
    language: "德语 / 法语 / 意大利语",
    bestSeason: "6–9 月 / 12–3 月",
    days: "7–9 天",
    intro: "雪山、湖泊和准点的火车。瑞士贵，但风景从不打折；一张 Swiss Travel Pass 可以省很多心。",
    foods: ["芝士火锅", " Raclette", "土豆饼", "巧克力", "高山奶酪"],
    play: ["少女峰", "卢塞恩湖", "卡佩尔桥", "因特拉肯"],
    visa: {
      type: "申根短期旅游签证（C 类）",
      where: "通过瑞士驻华使领馆指定的签证中心（VFS Global）按领区预约；按主要目的地原则申请。",
      processing: "约 15 个工作日",
      fee: "成人约 €90",
      validity: "短期申根签证，180 天内停留不超过 90 天",
      steps: ["确认瑞士是主要目的地。", "在 VFS 预约领区递交。", "准备护照、行程、住宿、保险和资金材料。", "到签证中心递材料、录指纹。", "出签后核对签证页。", "入境携带保险和返程票。"],
      documents: ["护照", "申根签证申请表", "照片", "机票和住宿订单", "行程单", "申根保险（€30,000）", "银行流水", "在职证明"],
      entry: ["护照 + 有效申根签证。", "180 天内累计不超过 90 天。", "入境可能询问行程和住宿。", "携带保险和返程票。", "不得工作。"],
      notes: ["瑞士不是欧盟，但属于申根区。", "火车通票按天买，少女峰另收费。", "山区天气多变，带防水外套。"],
      official: [
        { label: "瑞士外交部签证", url: "https://www.eda.admin.ch/eda/en/fdfa/visa.html" },
        { label: "VFS 瑞士签证中心", url: "https://visa.vfsglobal.com/chn/zh/che/" }
      ]
    },
    cities: [
      {
        name: "卢塞恩 / 因特拉肯",
        attractions: [
          {
            id: "ch-chapel",
            name: "卡佩尔桥",
            en: "Chapel Bridge",
            lat: 47.0517,
            lng: 8.3075,
            motif: "桥",
            cat: "古桥 · 地标",
            duration: "1 小时",
            ticket: "免费",
            highlight: "欧洲最古老的木桥之一，桥上画着城市故事",
            highlights: ["木桥", "水塔", "卢塞恩湖"],
            play: ["走木桥", "湖边散步", "看天鹅"],
            tips: "清晨人少；桥边就是老城。",
            best: "清晨"
          },
          {
            id: "ch-jungfrau",
            name: "少女峰",
            en: "Jungfraujoch",
            lat: 46.5474,
            lng: 7.982,
            motif: "雪",
            cat: "雪山 · 火车",
            duration: "1 天",
            ticket: "约 CHF 200",
            highlight: "欧洲最高的火车站，冰川就在窗外",
            highlights: ["少女峰车站", "冰宫", "斯芬克斯观景台"],
            play: ["坐齿轨火车", "冰宫", "雪地徒步"],
            tips: "天气不好别上山；通票有折扣，提前查。",
            best: "6–9 月"
          },
          {
            id: "ch-lucerne",
            name: "卢塞恩湖",
            en: "Lake Lucerne",
            lat: 47.05,
            lng: 8.35,
            motif: "湖",
            cat: "湖泊 · 游船",
            duration: "半天",
            ticket: "船票另计",
            highlight: "雪山倒映在湖里，坐船是最舒服的看法",
            highlights: ["游船", "皮拉图斯山", "湖畔小镇"],
            play: ["坐游船", "上山看全景", "湖边午餐"],
            tips: "持 Swiss Travel Pass 部分船线免费；风大带外套。",
            best: "6–9 月"
          }
        ]
      }
    ]
  },
  {
    id: "turkey",
    name: "土耳其",
    en: "Türkiye",
    flag: "🇹🇷",
    category: "apply",
    continent: "欧亚",
    stay: "30 天",
    passport: "6 个月以上",
    currency: "土耳其里拉 TRY",
    language: "土耳其语",
    bestSeason: "4–6 月 / 9–11 月",
    days: "8–10 天",
    intro: "伊斯坦布尔的宣礼声、卡帕多奇亚的热气球和土耳其浴。东西方在这里相遇，味道很浓。",
    foods: ["烤肉", "土耳其披萨", "Baklava", "土耳其咖啡", "Meze"],
    play: ["圣索菲亚", "蓝色清真寺", "大巴扎", "热气球"],
    visa: {
      type: "土耳其电子签证（e-Visa）",
      where: "在土耳其电子签证官网在线申请，通常几分钟出签；也可通过土耳其驻华使领馆申请。",
      processing: "在线通常几分钟至 24 小时",
      fee: "约 $50（以官网为准）",
      validity: "通常 180 天内停留不超过 30 天",
      steps: ["确认护照 6 个月以上。", "在 evisa.gov.tr 填写申请。", "在线支付签证费。", "保存电子签证 PDF 并打印。", "入境时出示护照和电子签证。"],
      documents: ["护照", "电子签证 PDF", "返程机票", "酒店订单", "资金证明（随机）"],
      entry: ["护照 + 打印的电子签证。", "停留不超过 30 天。", "入境可能询问行程。", "不要逾期停留。"],
      notes: ["只认 evisa.gov.tr 官方站点，警惕仿冒。", "土耳其里拉波动大，刷卡更稳。", "进入清真寺着装保守。"],
      official: [
        { label: "土耳其电子签证", url: "https://www.evisa.gov.tr/" },
        { label: "土耳其驻华使领馆", url: "https://beijing.emb.mfa.gov.tr/" }
      ]
    },
    cities: [
      {
        name: "伊斯坦布尔",
        attractions: [
          {
            id: "tr-hagia",
            name: "圣索菲亚",
            en: "Hagia Sophia",
            lat: 41.0086,
            lng: 28.9802,
            motif: "穹",
            cat: "建筑 · 历史",
            duration: "2 小时",
            ticket: "以现场为准",
            highlight: "拜占庭穹顶与伊斯兰书法叠在同一空间",
            highlights: ["巨大穹顶", "马赛克", "宣礼塔"],
            play: ["看穹顶", "找马赛克", "广场看喷泉"],
            tips: "开放状态和门票可能变化，出发前查官网；着装保守。",
            best: "上午"
          },
          {
            id: "tr-blue",
            name: "蓝色清真寺",
            en: "Blue Mosque",
            lat: 41.0054,
            lng: 28.9768,
            motif: "寺",
            cat: "清真寺 · 建筑",
            duration: "1.5 小时",
            ticket: "免费",
            highlight: "蓝色瓷砖和六根宣礼塔，伊斯坦布尔的天际线",
            highlights: ["蓝色瓷砖", "穹顶", "庭院"],
            play: ["看瓷砖", "庭院散步", "听宣礼"],
            tips: "礼拜时间游客不能入内；女性备头巾。",
            best: "上午"
          },
          {
            id: "tr-bazaar",
            name: "大巴扎",
            en: "Grand Bazaar",
            lat: 41.0108,
            lng: 28.968,
            motif: "集",
            cat: "市集 · 购物",
            duration: "2 小时",
            ticket: "免费",
            highlight: "四千多家店铺，地毯、灯具和香料",
            highlights: ["地毯店", "灯具", "香料"],
            play: ["逛店铺", "喝土耳其咖啡", "砍价"],
            tips: "开价虚高，从五折开始；保管好随身物品。",
            best: "下午"
          }
        ]
      },
      {
        name: "卡帕多奇亚",
        attractions: [
          {
            id: "tr-balloon",
            name: "卡帕多奇亚热气球",
            en: "Cappadocia Balloon",
            lat: 38.6431,
            lng: 34.8289,
            motif: "球",
            cat: "热气球 · 日出",
            duration: "清晨",
            ticket: "约 €180 起",
            highlight: "上百只热气球从仙人烟囱间升起",
            highlights: ["热气球", "仙人烟囱", "日出"],
            play: ["热气球日出", "格雷梅观景台", "红线徒步"],
            tips: "看天气，预留两天；正规公司提前订。",
            best: "4–6 月 / 9–11 月"
          }
        ]
      }
    ]
  },
  {
    id: "egypt",
    name: "埃及",
    en: "Egypt",
    flag: "🇪🇬",
    category: "apply",
    continent: "非洲",
    stay: "30 天",
    passport: "6 个月以上",
    currency: "埃及镑 EGP",
    language: "阿拉伯语",
    bestSeason: "10–4 月",
    days: "8–10 天",
    intro: "金字塔、尼罗河和红海。埃及的震撼很直接，但也很晒、很吵；把节奏放慢，留时间给日落。",
    foods: ["Koshari", "Ful", "烤肉", "埃及饼", "薄荷茶"],
    play: ["金字塔", "埃及博物馆", "哈利利市场", "尼罗河"],
    visa: {
      type: "埃及电子签证（e-Visa）",
      where: "在埃及电子签证官网在线申请；也可在开罗机场办理落地签（条件以官方为准）。",
      processing: "约 5–7 个工作日",
      fee: "单次约 $25",
      validity: "通常 90 天内停留不超过 30 天",
      steps: ["确认护照 6 个月以上。", "在 visa2egypt.gov.eg 填写申请。", "上传护照和照片，支付费用。", "保存电子签证并打印。", "入境时出示护照和签证。"],
      documents: ["护照", "电子签证", "往返机票", "酒店订单", "资金证明（随机）"],
      entry: ["护照 + 有效签证。", "停留不超过 30 天。", "入境可能要求出示住宿和返程票。", "不要逾期停留。"],
      notes: ["只认官方门户 visa2egypt.gov.eg。", "金字塔景区拉客多，提前谈好价格。", "夏季极热，带水和防晒。"],
      official: [
        { label: "埃及电子签证", url: "https://visa2egypt.gov.eg/" },
        { label: "埃及旅游局", url: "https://www.egypt.travel/" }
      ]
    },
    cities: [
      {
        name: "开罗",
        attractions: [
          {
            id: "eg-pyramids",
            name: "吉萨金字塔",
            en: "Pyramids of Giza",
            lat: 29.9792,
            lng: 31.1342,
            motif: "塔",
            cat: "古迹 · 世界遗产",
            duration: "半天",
            ticket: "约 ¥120",
            highlight: "胡夫金字塔、狮身人面和沙漠边缘的城市",
            highlights: ["胡夫金字塔", "狮身人面像", "九塔全景"],
            play: ["进胡夫金字塔", "骑骆驼", "九塔观景台看日落"],
            tips: "早上开门就进；骑骆驼先谈总价，拒绝额外小费。",
            best: "清晨"
          },
          {
            id: "eg-museum",
            name: "埃及博物馆",
            en: "Egyptian Museum",
            lat: 30.0478,
            lng: 31.2336,
            motif: "宝",
            cat: "博物馆 · 必看",
            duration: "3 小时",
            ticket: "约 ¥60",
            highlight: "图坦卡蒙黄金面具和法老时代的珍藏",
            highlights: ["图坦卡蒙展", "木乃伊", "法老雕像"],
            play: ["看黄金面具", "租讲解器", "逛开罗老城"],
            tips: "文物正在向大埃及博物馆转移，先查展陈；拍照规则以现场为准。",
            best: "上午"
          },
          {
            id: "eg-khan",
            name: "哈利利市场",
            en: "Khan el-Khalili",
            lat: 30.0477,
            lng: 31.2622,
            motif: "市",
            cat: "市集 · 老城",
            duration: "2 小时",
            ticket: "免费",
            highlight: "灯笼、香料和百年咖啡馆",
            highlights: ["市场小巷", "费沙维咖啡馆", "清真寺"],
            play: ["买一盏灯", "喝薄荷茶", "抽水烟"],
            tips: "晚上更热闹；砍价从三折开始，注意随身物品。",
            best: "傍晚"
          }
        ]
      }
    ]
  },
  {
    id: "indonesia",
    name: "印度尼西亚",
    en: "Indonesia",
    flag: "🇮🇩",
    category: "apply",
    continent: "东南亚",
    stay: "30 天（e-VOA）",
    passport: "6 个月以上",
    currency: "印尼盾 IDR",
    language: "印尼语",
    bestSeason: "5–9 月",
    days: "7–10 天",
    intro: "巴厘岛的梯田、海神庙和火山。印尼很大，第一次去选巴厘岛或日惹，别想一次跳完。",
    foods: ["Nasi Goreng", "Mie Goreng", "沙嗲", "脏鸭餐", "椰子"],
    play: ["海神庙", "乌布梯田", "乌鲁瓦图", "火山"],
    visa: {
      type: "电子落地签（e-VOA）",
      where: "在印尼移民局官方 e-Visa 门户在线申请 e-VOA，抵达后走落地签通道；也可现场办理落地签。",
      processing: "在线通常几分钟至 24 小时",
      fee: "约 IDR 500,000",
      validity: "停留 30 天，可在线延期一次",
      steps: ["确认护照 6 个月以上。", "在 evisa.imigrasi.go.id 申请 e-VOA。", "在线支付并保存二维码/PDF。", "抵达后走对应通道。", "如需延期，提前在官网申请。"],
      documents: ["护照", "e-VOA 凭证", "返程机票", "酒店订单", "资金证明（随机）"],
      entry: ["停留不超过 30 天。", "入境目的须为旅游。", "巴厘岛会收旅游税，提前在线缴。", "不要逾期停留。"],
      notes: ["只认 evisa.imigrasi.go.id 官方站点。", "巴厘岛交通堵，景点之间留足时间。", "进入寺庙着装保守，系沙龙。"],
      official: [
        { label: "印尼电子签证", url: "https://evisa.imigrasi.go.id/" },
        { label: "印尼移民局", url: "https://www.imigrasi.go.id/" }
      ]
    },
    cities: [
      {
        name: "巴厘岛",
        attractions: [
          {
            id: "id-tanahlot",
            name: "海神庙",
            en: "Tanah Lot",
            lat: -8.6212,
            lng: 115.0868,
            motif: "庙",
            cat: "海神庙 · 日落",
            duration: "2 小时",
            ticket: "约 ¥30",
            highlight: "一座建在海蚀岩上的庙，日落时剪影最美",
            highlights: ["海神庙", "日落", "海边市场"],
            play: ["看日落", "海边散步", "买纪念品"],
            tips: "下午 5 点前到；退潮时可走近，涨潮注意安全。",
            best: "日落"
          },
          {
            id: "id-ubud",
            name: "乌布",
            en: "Ubud",
            lat: -8.5069,
            lng: 115.2625,
            motif: "田",
            cat: "梯田 · 艺术",
            duration: "1 天",
            ticket: "免费（部分景点另收）",
            highlight: "德格拉朗梯田、猴林和手作小店",
            highlights: ["德格拉朗梯田", "圣猴森林公园", "乌布市场"],
            play: ["梯田秋千", "逛市场", "看巴厘舞"],
            tips: "乌布到南部约 1.5 小时；梯田早上光线好。",
            best: "上午"
          },
          {
            id: "id-uluwatu",
            name: "乌鲁瓦图",
            en: "Uluwatu Temple",
            lat: -8.8291,
            lng: 115.0849,
            motif: "崖",
            cat: "悬崖 · 寺庙",
            duration: "2 小时",
            ticket: "约 ¥30",
            highlight: "悬崖上的寺庙和凯卡克火舞",
            highlights: ["悬崖寺庙", "火舞", "印度洋日落"],
            play: ["看火舞", "悬崖步道", "看日落"],
            tips: "猴子会抢眼镜和手机；穿长裤，火舞票提前买。",
            best: "日落"
          }
        ]
      }
    ]
  },
  {
    id: "srilanka",
    name: "斯里兰卡",
    en: "Sri Lanka",
    flag: "🇱🇰",
    category: "apply",
    continent: "南亚",
    stay: "30 天（ETA）",
    passport: "6 个月以上",
    currency: "斯里兰卡卢比 LKR",
    language: "僧伽罗语 / 泰米尔语 / 英语",
    bestSeason: "12–4 月（西南海岸）",
    days: "7–10 天",
    intro: "狮子岩、茶园火车和印度洋的海。斯里兰卡不大，但山路慢；选一条线，别环岛赶路。",
    foods: ["咖喱饭", "Kottu", "Hoppers", "椰子", "红茶"],
    play: ["狮子岩", "佛牙寺", "加勒古堡", "海上火车"],
    visa: {
      type: "斯里兰卡电子旅行许可（ETA）",
      where: "在斯里兰卡移民局官方 ETA 网站在线申请，通常很快出签。",
      processing: "通常 1–3 个工作日",
      fee: "约 $50（以官网为准）",
      validity: "通常 30 天，可申请延期",
      steps: ["确认护照 6 个月以上。", "在官方 ETA 网站填写申请。", "支付费用，保存批准邮件。", "入境时出示护照和 ETA。", "如需延期，提前在移民局申请。"],
      documents: ["护照", "ETA 批准函", "返程机票", "酒店订单", "资金证明（随机）"],
      entry: ["护照 + 有效 ETA。", "停留不超过 30 天。", "入境可能询问行程。", "不要逾期停留。"],
      notes: ["只认官方 ETA 网站，警惕仿冒。", "茶园火车和海上火车都慢，留足时间。", "进入寺庙脱鞋、着装保守。"],
      official: [
        { label: "斯里兰卡 ETA", url: "https://www.srilankaevisa.lk/" },
        { label: "斯里兰卡移民局", url: "https://www.immigration.gov.lk/" }
      ]
    },
    cities: [
      {
        name: "科伦坡 / 康提 / 加勒",
        attractions: [
          {
            id: "lk-sigiriya",
            name: "狮子岩",
            en: "Sigiriya",
            lat: 7.957,
            lng: 80.7603,
            motif: "岩",
            cat: "古城 · 世界遗产",
            duration: "半天",
            ticket: "约 $30",
            highlight: "巨岩上的空中宫殿，爬上去看整片丛林",
            highlights: ["狮子岩", "壁画", "山顶宫殿"],
            play: ["爬岩", "看壁画", "山顶看日落"],
            tips: "早上 7 点开门就进；台阶陡，穿运动鞋。",
            best: "清晨"
          },
          {
            id: "lk-kandy",
            name: "佛牙寺",
            en: "Temple of the Tooth",
            lat: 7.2936,
            lng: 80.6413,
            motif: "寺",
            cat: "佛教 · 古寺",
            duration: "1.5 小时",
            ticket: "约 ¥30",
            highlight: "康提湖畔的佛牙寺，傍晚的鼓声和供奉",
            highlights: ["佛牙舍利", "康提湖", "供奉仪式"],
            play: ["看供奉仪式", "环湖散步", "买莲花"],
            tips: "着装保守、脱鞋；仪式时间以现场为准。",
            best: "傍晚"
          },
          {
            id: "lk-galle",
            name: "加勒古堡",
            en: "Galle Fort",
            lat: 6.0269,
            lng: 80.217,
            motif: "堡",
            cat: "古堡 · 海岸",
            duration: "半天",
            ticket: "免费",
            highlight: "荷兰殖民堡垒里的咖啡馆和印度洋日落",
            highlights: ["古城墙", "灯塔", "老城门"],
            play: ["城墙上走", "灯塔拍照", "海边看日落"],
            tips: "从科伦坡坐海上火车到加勒；城墙下午很晒。",
            best: "傍晚"
          }
        ]
      }
    ]
  },
  {
    id: "nepal",
    name: "尼泊尔",
    en: "Nepal",
    flag: "🇳🇵",
    category: "apply",
    continent: "南亚",
    stay: "30 天",
    passport: "6 个月以上",
    currency: "尼泊尔卢比 NPR",
    language: "尼泊尔语",
    bestSeason: "10–11 月 / 3–4 月",
    days: "8–10 天",
    intro: "加德满都的佛塔、博卡拉的湖和喜马拉雅的雪山。尼泊尔适合徒步，也可以只躺在湖边发呆。",
    foods: ["Momo", "Dal Bhat", "酥油茶", "酸奶", "尼泊尔奶茶"],
    play: ["满愿塔", "猴庙", "费瓦湖", "雪山徒步"],
    visa: {
      type: "落地签证（Visa on Arrival）",
      where: "在加德满都机场抵达后办理落地签；也可提前在尼泊尔移民局官网申请电子签。",
      processing: "入境现场办理，通常 15–30 分钟",
      fee: "30 天约 $50（以现场为准）",
      validity: "30 天，可延期",
      steps: ["确认护照 6 个月以上。", "准备一张证件照和美元现金。", "抵达后在自助机填写申请。", "排队缴费、领取签证。", "入境时出示护照和签证。"],
      documents: ["护照", "证件照", "美元现金", "返程机票", "酒店订单"],
      entry: ["落地签停留 30 天。", "入境目的须为旅游。", "携带现金美元办理签证更方便。", "不要逾期停留。"],
      notes: ["机场排队较长，留足转机时间。", "尼泊尔道路颠簸，加德满都到博卡拉可坐飞机。", "进入寺庙脱鞋，顺时针转塔。"],
      official: [
        { label: "尼泊尔移民局", url: "https://nepaliport.immigration.gov.np/" },
        { label: "尼泊尔旅游局", url: "https://www.welcomenepal.com/" }
      ]
    },
    cities: [
      {
        name: "加德满都",
        attractions: [
          {
            id: "np-boudha",
            name: "满愿塔",
            en: "Boudhanath Stupa",
            lat: 27.7215,
            lng: 85.362,
            motif: "塔",
            cat: "佛塔 · 世界遗产",
            duration: "1.5 小时",
            ticket: "约 ¥20",
            highlight: "巨大的白色佛塔和转经的人群",
            highlights: ["佛塔", "转经", "屋顶咖啡馆"],
            play: ["顺时针转塔", "屋顶喝咖啡", "看酥油灯"],
            tips: "早上和傍晚最有氛围；转塔顺时针。",
            best: "傍晚"
          },
          {
            id: "np-swayambhu",
            name: "猴庙",
            en: "Swayambhunath",
            lat: 27.7149,
            lng: 85.2903,
            motif: "眼",
            cat: "佛塔 · 山丘",
            duration: "1.5 小时",
            ticket: "约 ¥15",
            highlight: "山顶的佛眼俯瞰加德满都谷地",
            highlights: ["佛眼", "猴群", "城市全景"],
            play: ["爬台阶", "看佛眼", "山顶看城"],
            tips: "猴子会抢食物；从东门进台阶较少。",
            best: "下午"
          },
          {
            id: "np-pokhara",
            name: "费瓦湖",
            en: "Phewa Lake",
            lat: 28.2096,
            lng: 83.9856,
            motif: "湖",
            cat: "湖泊 · 雪山",
            duration: "半天",
            ticket: "免费",
            highlight: "博卡拉的湖，晴天能看到鱼尾峰倒影",
            highlights: ["费瓦湖", "世界和平塔", "湖边街区"],
            play: ["划船", "环湖骑行", "和平塔看日落"],
            tips: "加德满都到博卡拉飞行 25 分钟；湖边租船先谈价。",
            best: "10–11 月"
          }
        ]
      }
    ]
  }
]);
