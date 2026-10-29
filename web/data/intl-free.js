/* 国际旅行 · 免签国家。政策会调整，出发前务必以官方最新公告为准。 */
window.INTL_FREE = [
  {
    id: "thailand",
    name: "泰国",
    en: "Thailand",
    flag: "🇹🇭",
    category: "free",
    continent: "东南亚",
    stay: "30 天",
    passport: "6 个月以上",
    currency: "泰铢 THB",
    language: "泰语",
    bestSeason: "11–2 月",
    days: "4–5 天",
    intro: "落地就能闻到香茅和椰浆的味道。曼谷看庙与市集，清迈慢下来，海岛留给下一次。",
    foods: ["冬阴功", "芒果糯米饭", "泰式炒河粉", "青木瓜沙拉", "船面"],
    play: ["大皇宫", "郑王庙", "恰图恰市集", "湄南河游船"],
    visa: {
      type: "中泰互免签证",
      where: "无需事先申请。持中国普通护照从任意口岸入境，走免签通道。",
      processing: "无需办理，入境现场查验",
      fee: "免费",
      validity: "每次停留不超过 30 天，每 180 天累计不超过 90 天",
      steps: [
        "确认护照有效期在 6 个月以上，并有空白页。",
        "订好往返或前往第三国的续程机票，以及全程住宿。",
        "抵达前 3 天内在泰国移民局官网填写 TDAC 电子入境卡（免费）。",
        "抵达机场后按指纹、拍照，向边检出示护照、返程票和住宿订单。",
        "入境后保留入境章与 TDAC 回执，离境时随身携带。"
      ],
      documents: [
        "护照（有效期 6 个月以上）",
        "返程/续程机票",
        "酒店或民宿订单",
        "TDAC 电子入境卡确认页",
        "资金证明（随机抽查，约 10,000 泰铢/人）"
      ],
      entry: [
        "免签入境，目的须为旅游，不得务工。",
        "边检可能抽查现金、住宿和返程票。",
        "逾期停留会按天罚款，并影响再次入境。",
        "电子烟、部分药品和违禁品禁止携带。"
      ],
      notes: [
        "免签不等于保证入境，最终由边检决定。",
        "政策可能随双边协议调整，出发前复核泰国外交部/移民局公告。",
        "曼谷素万那普、廊曼机场入境高峰排队较久，预留转机时间。"
      ],
      official: [
        { label: "泰国移民局", url: "https://www.immigration.go.th/" },
        { label: "泰国电子入境卡 TDAC", url: "https://tdac.immigration.go.th/" }
      ]
    },
    cities: [
      {
        name: "曼谷",
        attractions: [
          {
            id: "th-grandpalace",
            name: "大皇宫",
            en: "The Grand Palace",
            lat: 13.75,
            lng: 100.4914,
            motif: "宫",
            cat: "王室建筑 · 必看",
            duration: "3 小时",
            ticket: "约 ¥100",
            highlight: "金顶、琉璃与玉佛，曼谷最华丽的一页",
            highlights: ["玉佛寺", "节基殿", "金塔"],
            play: ["看玉佛换装", "沿壁画长廊走", "湄南河坐船离开"],
            tips: "需穿长裤/过膝裙和有袖上衣；上午 8:30 开门就进，避开旅行团和高温。",
            best: "清晨"
          },
          {
            id: "th-watarun",
            name: "郑王庙",
            en: "Wat Arun",
            lat: 13.7437,
            lng: 100.4889,
            motif: "塔",
            cat: "古刹 · 河景",
            duration: "1.5 小时",
            ticket: "约 ¥20",
            highlight: "湄南河西岸的瓷片高塔，日落时最美",
            highlights: ["中央塔", "瓷片装饰", "湄南河日落"],
            play: ["爬一段陡梯", "对岸看日落", "坐渡船过河"],
            tips: "台阶很陡，穿防滑鞋；傍晚在对岸餐厅看塔亮灯更出片。",
            best: "日落"
          },
          {
            id: "th-chatuchak",
            name: "恰图恰周末市集",
            en: "Chatuchak Weekend Market",
            lat: 13.7999,
            lng: 100.5502,
            motif: "集",
            cat: "市集 · 购物",
            duration: "3 小时",
            ticket: "免费",
            highlight: "一万多个摊位，从手作到小吃逛到迷路",
            highlights: ["手工艺区", "复古区", "椰子冰淇淋"],
            play: ["按区域逛", "吃椰子冰淇淋", "淘一件手作"],
            tips: "只在周末开放，上午 9 点前人少；带现金、穿轻便鞋，注意防晒。",
            best: "周末上午"
          }
        ]
      }
    ]
  },
  {
    id: "malaysia",
    name: "马来西亚",
    en: "Malaysia",
    flag: "🇲🇾",
    category: "free",
    continent: "东南亚",
    stay: "30 天",
    passport: "6 个月以上",
    currency: "林吉特 MYR",
    language: "马来语 / 英语 / 华语",
    bestSeason: "全年（避开雨季）",
    days: "5–6 天",
    intro: "南洋的多元感在这里最具体：清晨的椰浆饭、午后的骑楼、夜里的沙爹炭火。",
    foods: ["椰浆饭", "叻沙", "炒粿条", "沙爹", "拉茶"],
    play: ["双子塔", "黑风洞", "乔治市壁画", "升旗山"],
    visa: {
      type: "中马互免签证",
      where: "无需事先申请。入境前在线填写马来西亚电子入境卡（MDAC），抵达后走免签通道。",
      processing: "无需办理；MDAC 几分钟即可完成",
      fee: "免费",
      validity: "每次停留不超过 30 天，每 180 天累计不超过 90 天",
      steps: [
        "确认护照有效期 6 个月以上。",
        "出发前 3 天内在马来西亚移民局官网填写 MDAC。",
        "订好返程机票和全程住宿。",
        "抵达后走外国旅客通道，出示护照、MDAC 确认页和返程票。",
        "按指纹、拍照，领取入境章。"
      ],
      documents: [
        "护照（有效期 6 个月以上）",
        "MDAC 电子入境卡确认页",
        "返程/续程机票",
        "酒店订单",
        "资金证明（随机抽查）"
      ],
      entry: [
        "免签入境，停留不超过 30 天。",
        "MDAC 是入境必填项，未填可能被要求现场补填。",
        "边检可能询问行程和住宿。",
        "东马沙巴、砂拉越有单独的入境检查，记得盖入境章。"
      ],
      notes: [
        "免签安排以中马双边协议和马来西亚移民局公告为准。",
        "MDAC 官网免费，警惕收费仿冒网站。",
        "吉隆坡机场到市区可坐 KLIA Ekspres，约 30 分钟。"
      ],
      official: [
        { label: "马来西亚移民局", url: "https://www.imi.gov.my/" },
        { label: "MDAC 电子入境卡", url: "https://imigresen-online.imi.gov.my/mdac/main" }
      ]
    },
    cities: [
      {
        name: "吉隆坡",
        attractions: [
          {
            id: "my-petronas",
            name: "双子塔",
            en: "Petronas Twin Towers",
            lat: 3.1578,
            lng: 101.7112,
            motif: "塔",
            cat: "城市地标",
            duration: "2 小时",
            ticket: "免费（观景台另收）",
            highlight: "两座银色塔楼在夜里亮成一座灯桥",
            highlights: ["KLCC 公园", "空中连桥", "音乐喷泉"],
            play: ["公园水池拍倒影", "登 86 层观景台", "晚上看喷泉"],
            tips: "观景台提前网上订；晚上 7 点后公园喷泉和灯光最好看。",
            best: "夜晚"
          },
          {
            id: "my-merdeka",
            name: "独立广场",
            en: "Merdeka Square",
            lat: 3.1478,
            lng: 101.6935,
            motif: "旗",
            cat: "历史街区",
            duration: "1.5 小时",
            ticket: "免费",
            highlight: "殖民建筑群与 95 米高旗杆",
            highlights: ["苏丹阿都沙末大厦", "皇家雪兰莪俱乐部", "占美清真寺"],
            play: ["拍殖民建筑", "沿巴生河散步", "逛中央艺术坊"],
            tips: "下午 4 点后光线柔和；周边步行可达茨厂街，注意防晒。",
            best: "傍晚"
          },
          {
            id: "my-batucaves",
            name: "黑风洞",
            en: "Batu Caves",
            lat: 3.2379,
            lng: 101.684,
            motif: "洞",
            cat: "宗教 · 自然",
            duration: "2 小时",
            ticket: "免费（洞穴博物馆另收）",
            highlight: "彩虹阶梯尽头的巨大石灰岩洞",
            highlights: ["彩虹阶梯", "神庙洞", "巨型神像"],
            play: ["爬 272 级台阶", "进神庙洞", "看鸽子与猴群"],
            tips: "穿长裤/过膝裙；猴子会抢食物和手机，背包拉好。",
            best: "上午"
          }
        ]
      },
      {
        name: "槟城",
        attractions: [
          {
            id: "my-georgetown",
            name: "乔治市壁画",
            en: "George Town Street Art",
            lat: 5.4141,
            lng: 100.3288,
            motif: "画",
            cat: "世遗街区 · 艺术",
            duration: "2–3 小时",
            ticket: "免费",
            highlight: "骑楼、铁线画和藏在巷子里的壁画",
            highlights: ["姐弟共骑", "姓氏桥", "爱情巷"],
            play: ["租自行车找壁画", "逛姓氏桥", "喝一杯白咖啡"],
            tips: "壁画分散，拿一张地图按片区走；中午很晒，早上或傍晚出门。",
            best: "清晨 / 傍晚"
          },
          {
            id: "my-kekloksi",
            name: "极乐寺",
            en: "Kek Lok Si Temple",
            lat: 5.399,
            lng: 100.273,
            motif: "寺",
            cat: "古刹 · 山景",
            duration: "2 小时",
            ticket: "免费（部分区域另收）",
            highlight: "东南亚最大的佛教寺庙之一，万佛塔层层叠叠",
            highlights: ["万佛塔", "观音像", "放生池"],
            play: ["登塔看槟城", "看琉璃瓦", "吃一碗素面"],
            tips: "下午光线好；上山可坐缆车，着装得体。",
            best: "下午"
          }
        ]
      }
    ]
  },
  {
    id: "singapore",
    name: "新加坡",
    en: "Singapore",
    flag: "🇸🇬",
    category: "free",
    continent: "东南亚",
    stay: "30 天",
    passport: "6 个月以上",
    currency: "新加坡元 SGD",
    language: "英语 / 华语 / 马来语",
    bestSeason: "全年",
    days: "4 天",
    intro: "干净、热、绿，像一座被精心打理的花园。白天看建筑，晚上去河边吃一顿辣椒螃蟹。",
    foods: ["辣椒螃蟹", "海南鸡饭", "叻沙", "咖椰吐司", "肉骨茶"],
    play: ["滨海湾花园", "夜间动物园", "圣淘沙", "牛车水"],
    visa: {
      type: "中新互免签证",
      where: "无需事先申请。出发前 3 天内在新加坡移民局官网填写 SG Arrival Card，抵达后走免签通道。",
      processing: "无需办理；入境卡免费在线填写",
      fee: "免费",
      validity: "每次停留不超过 30 天",
      steps: [
        "确认护照有效期 6 个月以上。",
        "出发前 3 天内在 ICA 官网填写 SG Arrival Card（含健康申报）。",
        "订好返程机票和住宿。",
        "抵达后使用自助通道或人工通道，出示护照和入境卡确认邮件。",
        "保存电子入境记录，离境时无需盖章。"
      ],
      documents: [
        "护照（有效期 6 个月以上）",
        "SG Arrival Card 确认邮件",
        "返程/续程机票",
        "住宿订单",
        "资金证明（随机抽查）"
      ],
      entry: [
        "免签停留不超过 30 天。",
        "入境卡须在抵达前 3 天内填写，过早填写无效。",
        "新加坡对口香糖、电子烟等有严格规定。",
        "自助通关失败时改走人工通道。"
      ],
      notes: [
        "免签政策以中新双方公告为准。",
        "新加坡物价较高，住宿提前订。",
        "地铁和公交可刷 Visa/Mastercard 闪付，未必需要买交通卡。"
      ],
      official: [
        { label: "新加坡移民与关卡局 ICA", url: "https://www.ica.gov.sg/" },
        { label: "SG Arrival Card", url: "https://eservices.ica.gov.sg/sgarrivalcard/" }
      ]
    },
    cities: [
      {
        name: "新加坡",
        attractions: [
          {
            id: "sg-gardens",
            name: "滨海湾花园",
            en: "Gardens by the Bay",
            lat: 1.2816,
            lng: 103.8636,
            motif: "园",
            cat: "城市花园 · 夜景",
            duration: "3 小时",
            ticket: "¥120 起（双馆）",
            highlight: "超级树在夜里亮起，像一片未来森林",
            highlights: ["擎天树", "花穹", "云雾林"],
            play: ["看灯光秀", "云雾林看瀑布", "空中步道散步"],
            tips: "灯光秀每晚 19:45/20:45，免费；双馆空调冷，带薄外套。",
            best: "傍晚"
          },
          {
            id: "sg-merlion",
            name: "鱼尾狮公园",
            en: "Merlion Park",
            lat: 1.2868,
            lng: 103.8545,
            motif: "狮",
            cat: "城市地标",
            duration: "1 小时",
            ticket: "免费",
            highlight: "鱼尾狮吐水，背后就是金沙酒店",
            highlights: ["鱼尾狮", "滨海湾", "金沙天际线"],
            play: ["借位拍接水照", "沿湾步道走到金沙", "晚上看激光秀"],
            tips: "早上人少，晚上有灯光；周末激光秀时间以官网为准。",
            best: "清晨 / 夜晚"
          },
          {
            id: "sg-sentosa",
            name: "圣淘沙",
            en: "Sentosa",
            lat: 1.2494,
            lng: 103.8303,
            motif: "岛",
            cat: "海岛 · 乐园",
            duration: "1 天",
            ticket: "入岛免费，项目另收",
            highlight: "环球影城、沙滩和缆车组成的一天",
            highlights: ["环球影城", "西乐索海滩", "天空缆车"],
            play: ["环球影城", "坐缆车看海", "沙滩看日落"],
            tips: "环球影城提前买票；岛上捷运免费，步行也很舒服。",
            best: "全天"
          },
          {
            id: "sg-chinatown",
            name: "牛车水",
            en: "Chinatown",
            lat: 1.283,
            lng: 103.844,
            motif: "坊",
            cat: "街区 · 美食",
            duration: "2 小时",
            ticket: "免费",
            highlight: "佛牙寺、老店和熟食中心的烟火气",
            highlights: ["佛牙寺", "麦士威熟食中心", "马里安曼兴都庙"],
            play: ["吃天天海南鸡饭", "逛佛牙寺", "买一份林志源肉干"],
            tips: "熟食中心先找座位再买；佛牙寺着装得体。",
            best: "午餐"
          }
        ]
      }
    ]
  },
  {
    id: "uae",
    name: "阿联酋",
    en: "United Arab Emirates",
    flag: "🇦🇪",
    category: "free",
    continent: "西亚",
    stay: "30 天",
    passport: "6 个月以上",
    currency: "迪拉姆 AED",
    language: "阿拉伯语 / 英语",
    bestSeason: "11–3 月",
    days: "5–6 天",
    intro: "一半是沙漠，一半是未来。迪拜看天际线，阿布扎比看清真寺与卢浮宫。",
    foods: ["沙威玛", "马赫布斯饭", "骆驼奶", "阿拉伯咖啡", "椰枣"],
    play: ["哈利法塔", "沙漠冲沙", "大清真寺", "卢浮宫"],
    visa: {
      type: "免签入境",
      where: "无需事先申请。持中国普通护照抵达阿联酋口岸后办理免签入境。",
      processing: "无需办理，入境现场查验",
      fee: "免费",
      validity: "每次停留不超过 30 天",
      steps: [
        "确认护照有效期 6 个月以上。",
        "订好返程机票和酒店。",
        "抵达后走免签通道，按指纹、拍照。",
        "向边检出示护照、返程票和住宿订单。",
        "如需延期，提前在阿联酋移民局官网申请，不要逾期。"
      ],
      documents: [
        "护照（有效期 6 个月以上）",
        "返程/续程机票",
        "酒店订单",
        "资金证明（随机抽查）"
      ],
      entry: [
        "免签停留不超过 30 天。",
        "入境目的须为旅游、探亲或商务。",
        "机场入境可能采集虹膜和指纹。",
        "斋月期间在公共场合注意饮食礼仪。"
      ],
      notes: [
        "阿联酋各酋长国入境规定基本一致，但转机/陆路口岸可能不同。",
        "公共场合禁烟、禁酒规定严格，拍照避开当地女性和军事设施。",
        "夏季 6–9 月极热，户外活动安排在清晨或傍晚。"
      ],
      official: [
        { label: "阿联酋政府门户", url: "https://u.ae/en/information-and-services/visa-and-emirates-id" },
        { label: "迪拜居留与外国人事务局", url: "https://www.gdrfad.gov.ae/" }
      ]
    },
    cities: [
      {
        name: "迪拜",
        attractions: [
          {
            id: "ae-burj",
            name: "哈利法塔",
            en: "Burj Khalifa",
            lat: 25.1972,
            lng: 55.2744,
            motif: "塔",
            cat: "城市地标",
            duration: "2 小时",
            ticket: "¥220 起",
            highlight: "在世界最高楼上看沙漠与城市交界",
            highlights: ["124 层观景台", "迪拜喷泉", "迪拜购物中心"],
            play: ["日落前登塔", "看迪拜喷泉", "逛水族馆"],
            tips: "日落时段票最贵也最值；提前网上订，现场排队久。",
            best: "日落"
          },
          {
            id: "ae-jumeirah",
            name: "朱美拉清真寺",
            en: "Jumeirah Mosque",
            lat: 25.195,
            lng: 55.24,
            motif: "寺",
            cat: "宗教 · 建筑",
            duration: "1.5 小时",
            ticket: "约 ¥50（导览）",
            highlight: "迪拜少数向非穆斯林开放参观的清真寺",
            highlights: ["白色穹顶", "宣礼塔", "文化导览"],
            play: ["参加官方导览", "了解伊斯兰文化", "拍白色建筑"],
            tips: "需提前预约导览；着装保守，女性备头巾。",
            best: "上午"
          },
          {
            id: "ae-olddubai",
            name: "迪拜老城",
            en: "Old Dubai",
            lat: 25.263,
            lng: 55.297,
            motif: "市",
            cat: "历史街区 · 市集",
            duration: "2–3 小时",
            ticket: "免费",
            highlight: "香料市集、黄金市集和迪拜河上的木船",
            highlights: ["香料市集", "黄金市集", "阿法迪历史区"],
            play: ["坐 1 迪拉姆木船过河", "逛香料市集", "喝一杯阿拉伯咖啡"],
            tips: "市集砍价从五折开始；木船备现金，傍晚光线好。",
            best: "傍晚"
          }
        ]
      },
      {
        name: "阿布扎比",
        attractions: [
          {
            id: "ae-grandmosque",
            name: "谢赫扎耶德大清真寺",
            en: "Sheikh Zayed Grand Mosque",
            lat: 24.4129,
            lng: 54.475,
            motif: "穹",
            cat: "宗教 · 建筑",
            duration: "2 小时",
            ticket: "免费预约",
            highlight: "纯白大理石、金色穹顶和世界最大手工地毯",
            highlights: ["主祈祷厅", "白色回廊", "水晶吊灯"],
            play: ["参加免费导览", "看日落亮灯", "拍倒影池"],
            tips: "提前官网预约；女性需覆盖头发和四肢，现场可借袍。",
            best: "日落"
          },
          {
            id: "ae-louvre",
            name: "阿布扎比卢浮宫",
            en: "Louvre Abu Dhabi",
            lat: 24.5337,
            lng: 54.3983,
            motif: "光",
            cat: "博物馆 · 建筑",
            duration: "3 小时",
            ticket: "约 ¥120",
            highlight: "穹顶漏下的“光之雨”，海上的博物馆",
            highlights: ["光之穹顶", "世界文明展", "海边平台"],
            play: ["看穹顶光斑", "逛跨文明展", "海边看日落"],
            tips: "下午 4 点后光线穿过穹顶最漂亮；周一闭馆。",
            best: "下午"
          }
        ]
      }
    ]
  },
  {
    id: "kazakhstan",
    name: "哈萨克斯坦",
    en: "Kazakhstan",
    flag: "🇰🇿",
    category: "free",
    continent: "中亚",
    stay: "30 天",
    passport: "6 个月以上",
    currency: "坚戈 KZT",
    language: "哈萨克语 / 俄语",
    bestSeason: "5–9 月",
    days: "5 天",
    intro: "雪山、苹果和草原。阿拉木图是中亚最容易抵达的入口，城市干净，物价友好。",
    foods: ["别什巴尔马克", "拉条子", "萨姆萨", "马肠", "驼奶"],
    play: ["升天教堂", "大阿拉木图湖", "科克托别", "绿色市场"],
    visa: {
      type: "中哈互免签证",
      where: "无需事先申请。持中国普通护照从阿拉木图等口岸入境，免签停留。",
      processing: "无需办理",
      fee: "免费",
      validity: "每次停留不超过 30 天，每 180 天累计不超过 90 天",
      steps: [
        "确认护照有效期 6 个月以上。",
        "订好返程机票和住宿。",
        "抵达后走免签通道，按指纹、拍照。",
        "保存入境记录，入住酒店时可能需要登记。",
        "如去边境地区，提前确认是否需要额外许可。"
      ],
      documents: [
        "护照（有效期 6 个月以上）",
        "返程/续程机票",
        "酒店订单",
        "资金证明（随机抽查）"
      ],
      entry: [
        "免签停留不超过 30 天。",
        "入境目的须为旅游/商务。",
        "酒店入住会登记护照，离店时保留登记单。",
        "不要逾期停留。"
      ],
      notes: [
        "中哈互免签证政策以使馆和移民局公告为准。",
        "阿拉木图英语普及度一般，备好翻译软件。",
        "大阿拉木图湖海拔约 2500 米，注意高反和天气变化。"
      ],
      official: [
        { label: "哈萨克斯坦外交部", url: "https://www.gov.kz/memleket/entities/mfa?lang=en" },
        { label: "哈萨克斯坦电子签证门户", url: "https://www.vmp.gov.kz/" }
      ]
    },
    cities: [
      {
        name: "阿拉木图",
        attractions: [
          {
            id: "kz-cathedral",
            name: "升天教堂",
            en: "Ascension Cathedral",
            lat: 43.258,
            lng: 76.953,
            motif: "木",
            cat: "宗教 · 木构建筑",
            duration: "1 小时",
            ticket: "免费",
            highlight: "不用一颗钉子、经历地震仍站立的木教堂",
            highlights: ["木构穹顶", "彩绘内部", "潘菲洛夫公园"],
            play: ["看木结构细节", "逛潘菲洛夫公园", "在长明火前停留"],
            tips: "女性进教堂可借头巾；公园里有很多鸽子。",
            best: "上午"
          },
          {
            id: "kz-lake",
            name: "大阿拉木图湖",
            en: "Big Almaty Lake",
            lat: 43.055,
            lng: 76.985,
            motif: "湖",
            cat: "高山湖泊",
            duration: "半天",
            ticket: "免费（包车另计）",
            highlight: "雪山环抱的冰川湖，颜色像一块绿松石",
            highlights: ["湖面观景台", "雪山", "盘山公路"],
            play: ["包车上山", "湖边拍照", "走一段山路"],
            tips: "距市区约 1 小时，海拔 2500 米；天气多变，带外套。",
            best: "6–9 月"
          },
          {
            id: "kz-koktobe",
            name: "科克托别",
            en: "Kok-Tobe",
            lat: 43.233,
            lng: 76.976,
            motif: "山",
            cat: "城市观景",
            duration: "2 小时",
            ticket: "缆车另收",
            highlight: "坐缆车上山，看整座阿拉木图铺在雪山脚下",
            highlights: ["缆车", "观景台", "摩天轮"],
            play: ["坐缆车", "山顶看日落", "喝一杯当地茶"],
            tips: "日落前 1 小时上山；山顶风大，带外套。",
            best: "日落"
          }
        ]
      }
    ]
  },
  {
    id: "serbia",
    name: "塞尔维亚",
    en: "Serbia",
    flag: "🇷🇸",
    category: "free",
    continent: "欧洲",
    stay: "30 天",
    passport: "6 个月以上",
    currency: "第纳尔 RSD",
    language: "塞尔维亚语",
    bestSeason: "4–10 月",
    days: "5–6 天",
    intro: "欧洲的物价，巴尔干的热情。贝尔格莱德的咖啡馆和诺维萨德的要塞，适合慢慢逛。",
    foods: ["切瓦皮", "萨尔马", "烤肉饼", "卡伊马克", "拉基亚"],
    play: ["卡莱梅格丹", "圣萨瓦教堂", "诺维萨德", "多瑙河"],
    visa: {
      type: "中塞互免签证",
      where: "无需事先申请。持中国普通护照入境塞尔维亚，免签停留。",
      processing: "无需办理",
      fee: "免费",
      validity: "每次停留不超过 30 天",
      steps: [
        "确认护照有效期 6 个月以上。",
        "订好返程机票和住宿。",
        "抵达贝尔格莱德机场后走免签通道。",
        "向边检出示护照、返程票和住宿订单。",
        "入住酒店时按当地规定登记。"
      ],
      documents: [
        "护照（有效期 6 个月以上）",
        "返程/续程机票",
        "酒店订单",
        "旅行保险（建议）",
        "资金证明（随机抽查）"
      ],
      entry: [
        "免签停留不超过 30 天。",
        "入境目的须为旅游/商务。",
        "陆路从邻国入境也适用，但需确认口岸。",
        "逾期停留可能被罚款。"
      ],
      notes: [
        "塞尔维亚不是申根国，但持有效申根签证可按规定入境，具体以官方为准。",
        "贝尔格莱德机场到市区约 30 分钟。",
        "当地使用第纳尔，欧元部分地方可用但汇率不划算。"
      ],
      official: [
        { label: "塞尔维亚外交部", url: "https://www.mfa.gov.rs/en" },
        { label: "塞尔维亚入境信息", url: "https://www.mfa.gov.rs/en/citizens/travel-abroad/visas" }
      ]
    },
    cities: [
      {
        name: "贝尔格莱德",
        attractions: [
          {
            id: "rs-kalemegdan",
            name: "卡莱梅格丹城堡",
            en: "Kalemegdan Fortress",
            lat: 44.823,
            lng: 20.45,
            motif: "堡",
            cat: "古堡 · 河景",
            duration: "2 小时",
            ticket: "免费",
            highlight: "萨瓦河与多瑙河交汇处的日落",
            highlights: ["胜利者雕像", "古城墙", "河畔步道"],
            play: ["看两河交汇", "城墙上看日落", "逛城堡里的公园"],
            tips: "傍晚最美；城堡区域免费，个别博物馆另收。",
            best: "日落"
          },
          {
            id: "rs-sava",
            name: "圣萨瓦教堂",
            en: "Church of Saint Sava",
            lat: 44.798,
            lng: 20.469,
            motif: "穹",
            cat: "宗教 · 建筑",
            duration: "1.5 小时",
            ticket: "免费",
            highlight: "巴尔干最大的东正教堂，地下金顶震撼",
            highlights: ["金色穹顶", "地下礼拜堂", "马赛克"],
            play: ["看金顶马赛克", "地下层参观", "广场看城市"],
            tips: "着装得体；地下层开放时间可能不同。",
            best: "上午"
          },
          {
            id: "rs-mihailo",
            name: "米哈伊洛大街",
            en: "Knez Mihailova Street",
            lat: 44.816,
            lng: 20.459,
            motif: "街",
            cat: "步行街 · 咖啡",
            duration: "2 小时",
            ticket: "免费",
            highlight: "贝尔格莱德的主街，咖啡馆和街头艺人",
            highlights: ["步行街", "共和国广场", "斯卡达利亚街"],
            play: ["喝一杯咖啡", "逛书店", "晚上去斯卡达利亚听音乐"],
            tips: "晚上更热闹；餐厅看表演可能加收服务费。",
            best: "傍晚"
          }
        ]
      },
      {
        name: "诺维萨德",
        attractions: [
          {
            id: "rs-petrovaradin",
            name: "彼得罗瓦拉丁要塞",
            en: "Petrovaradin Fortress",
            lat: 45.252,
            lng: 19.862,
            motif: "堡",
            cat: "古堡 · 河景",
            duration: "2 小时",
            ticket: "免费",
            highlight: "多瑙河上的“直布罗陀”，看对岸红屋顶",
            highlights: ["钟楼", "地下隧道", "多瑙河观景台"],
            play: ["看反向钟", "走地下通道", "河边看日落"],
            tips: "从贝尔格莱德坐火车约 40 分钟；要塞风大，带外套。",
            best: "下午"
          }
        ]
      }
    ]
  },
  {
    id: "maldives",
    name: "马尔代夫",
    en: "Maldives",
    flag: "🇲🇻",
    category: "free",
    continent: "南亚",
    stay: "30 天",
    passport: "6 个月以上",
    currency: "拉菲亚 MVR / 美元",
    language: "迪维希语 / 英语",
    bestSeason: "11–4 月",
    days: "5–6 天",
    intro: "一岛一酒店，海是渐变的蓝。选岛比赶景点重要，留白就是最好的行程。",
    foods: ["金枪鱼沙拉", "鱼汤", "烤鱼", "椰子饭", "热带水果"],
    play: ["浮潜", "拖尾沙洲", "追海豚", "水疗"],
    visa: {
      type: "免费落地签证",
      where: "无需事先申请。抵达马累机场后办理 30 天免费落地签，出发前填写 IMUGA 旅客申报。",
      processing: "入境现场办理；IMUGA 在线填写",
      fee: "免费",
      validity: "30 天，可按规定申请延期",
      steps: [
        "确认护照有效期 6 个月以上。",
        "出发前 96 小时内在 IMUGA 官网填写旅客申报。",
        "订好酒店/度假村和返程机票。",
        "抵达马累后走落地签通道，出示护照、申报二维码和住宿确认。",
        "如需水上飞机/快艇转运，提前和酒店确认接驳时间。"
      ],
      documents: [
        "护照（有效期 6 个月以上）",
        "IMUGA 申报二维码",
        "返程/续程机票",
        "酒店/度假村确认单",
        "资金证明（足够支付停留期间费用）"
      ],
      entry: [
        "免费落地签，停留不超过 30 天。",
        "入境目的须为旅游，不得务工。",
        "可能抽查酒店订单和返程票。",
        "度假村接驳通常需提前预约，夜间抵达可能无法当天转岛。"
      ],
      notes: [
        "马尔代夫是穆斯林国家，居民岛着装保守，度假岛相对自由。",
        "水上飞机只在白天运行，晚到建议马累住一晚。",
        "选岛看浮潜等级、餐食和上岛交通，不要只看价格。"
      ],
      official: [
        { label: "马尔代夫移民局", url: "https://www.immigration.gov.mv/" },
        { label: "IMUGA 旅客申报", url: "https://imuga.immigration.gov.mv/" }
      ]
    },
    cities: [
      {
        name: "马累 / 环礁",
        attractions: [
          {
            id: "mv-male",
            name: "马累独立广场",
            en: "Independence Square",
            lat: 4.175,
            lng: 73.509,
            motif: "旗",
            cat: "城市 · 人文",
            duration: "1 小时",
            ticket: "免费",
            highlight: "马累的城市客厅，看当地人的日常",
            highlights: ["独立广场", "总统府", "星期五清真寺"],
            play: ["逛广场", "看珊瑚石清真寺", "去鱼市"],
            tips: "马累很小，步行即可；着装保守，尊重当地习俗。",
            best: "傍晚"
          },
          {
            id: "mv-fishmarket",
            name: "马累鱼市",
            en: "Male Fish Market",
            lat: 4.177,
            lng: 73.51,
            motif: "鱼",
            cat: "市集 · 在地生活",
            duration: "1 小时",
            ticket: "免费",
            highlight: "清晨的金枪鱼交易，腥咸又鲜活",
            highlights: ["金枪鱼", "本地小吃", "港口"],
            play: ["看渔获交易", "吃一份炸鱼球", "逛旁边市场"],
            tips: "早上最热闹；地面湿滑，穿防滑鞋。",
            best: "清晨"
          },
          {
            id: "mv-resort",
            name: "北马累环礁度假岛",
            en: "North Male Atoll",
            lat: 4.2,
            lng: 73.4,
            motif: "海",
            cat: "海岛 · 度假",
            duration: "3–5 天",
            ticket: "按度假村",
            highlight: "水屋、拖尾沙洲和一眼见底的潟湖",
            highlights: ["水上别墅", "珊瑚礁", "拖尾沙洲"],
            play: ["浮潜", "追海豚", "沙滩晚餐", "水疗"],
            tips: "选岛确认上岛方式（快艇/水飞）和餐食计划；水飞行李限重。",
            best: "11–4 月"
          }
        ]
      }
    ]
  },
  {
    id: "georgia",
    name: "格鲁吉亚",
    en: "Georgia",
    flag: "🇬🇪",
    category: "free",
    continent: "西亚 / 高加索",
    stay: "30 天",
    passport: "6 个月以上",
    currency: "拉里 GEL",
    language: "格鲁吉亚语",
    bestSeason: "4–6 月 / 9–10 月",
    days: "6 天",
    intro: "高加索山脚下的小国，葡萄酒、硫磺浴和旧城石板路。第比利斯适合住下来慢慢逛。",
    foods: ["欣卡利", "哈恰普里", "丘尔奇赫拉", "恰查", "Lobio 豆泥"],
    play: ["老城", "硫磺浴", "姆茨赫塔", "葡萄酒庄"],
    visa: {
      type: "中格互免签证",
      where: "无需事先申请。持中国普通护照入境格鲁吉亚，免签停留。",
      processing: "无需办理",
      fee: "免费",
      validity: "每次停留不超过 30 天",
      steps: [
        "确认护照有效期 6 个月以上。",
        "订好返程机票和住宿。",
        "抵达第比利斯机场后走免签通道。",
        "出示护照、返程票和住宿订单。",
        "如自驾，确认驾照翻译件和车辆保险。"
      ],
      documents: [
        "护照（有效期 6 个月以上）",
        "返程/续程机票",
        "酒店订单",
        "旅行保险（建议）",
        "资金证明（随机抽查）"
      ],
      entry: [
        "免签停留不超过 30 天。",
        "入境目的须为旅游/商务。",
        "边检可能询问行程和住宿。",
        "不要逾期停留。"
      ],
      notes: [
        "中格互免签证协定于 2025 年 5 月 28 日生效，具体停留期以官方公告为准。",
        "第比利斯老城坡路多，穿好走的鞋。",
        "当地葡萄酒便宜好喝，但不要酒后驾车。"
      ],
      official: [
        { label: "格鲁吉亚外交部", url: "https://www.mfa.gov.ge/en" },
        { label: "格鲁吉亚签证门户", url: "https://www.geoconsul.gov.ge/en" }
      ]
    },
    cities: [
      {
        name: "第比利斯",
        attractions: [
          {
            id: "ge-oldtown",
            name: "第比利斯老城",
            en: "Tbilisi Old Town",
            lat: 41.693,
            lng: 44.801,
            motif: "城",
            cat: "老城 · 步行",
            duration: "半天",
            ticket: "免费",
            highlight: "木阳台、石板路和库拉河边的硫磺味",
            highlights: ["木阳台", "和平桥", "硫磺浴区"],
            play: ["老城乱走", "坐缆车上纳里卡拉", "泡一次硫磺浴"],
            tips: "老城坡多；硫磺浴需预约，带泳衣。",
            best: "傍晚"
          },
          {
            id: "ge-trinity",
            name: "圣三一主教座堂",
            en: "Holy Trinity Cathedral",
            lat: 41.697,
            lng: 44.816,
            motif: "穹",
            cat: "宗教 · 建筑",
            duration: "1 小时",
            ticket: "免费",
            highlight: "金色穹顶在城市天际线里非常醒目",
            highlights: ["金色穹顶", "广场", "城市全景"],
            play: ["看穹顶", "广场散步", "傍晚看灯"],
            tips: "着装得体；从老城打车约 10 分钟。",
            best: "傍晚"
          },
          {
            id: "ge-mtskheta",
            name: "姆茨赫塔",
            en: "Mtskheta",
            lat: 41.846,
            lng: 44.721,
            motif: "古",
            cat: "古城 · 世界遗产",
            duration: "半天",
            ticket: "免费（部分教堂另收）",
            highlight: "格鲁吉亚的旧都，两河交汇处的修道院",
            highlights: ["生命之柱主教座堂", "季瓦里修道院", "两河交汇"],
            play: ["看季瓦里修道院", "逛老城", "吃一顿格鲁吉亚菜"],
            tips: "距第比利斯约 30 分钟；季瓦里在山顶，日落视野好。",
            best: "下午"
          }
        ]
      }
    ]
  }
];
