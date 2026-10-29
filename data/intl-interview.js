/* 国际旅行 · 面签国家。流程与费用以官方最新公告为准。 */
window.INTL_INTERVIEW = [
  {
    id: "usa",
    name: "美国",
    en: "United States",
    flag: "🇺🇸",
    category: "interview",
    continent: "北美洲",
    stay: "最长 6 个月（入境官决定）",
    passport: "6 个月以上（建议）",
    currency: "美元 USD",
    language: "英语",
    bestSeason: "4–6 月 / 9–11 月",
    days: "8–12 天",
    intro: "纽约看博物馆和天际线，洛杉矶追一场太平洋日落。美国旅行的成本大头是机票和住宿，行程别排太满。",
    foods: ["汉堡", "纽约披萨", "牛排", "龙虾卷", "贝果"],
    play: ["自由女神", "大都会博物馆", "中央公园", "好莱坞"],
    visa: {
      type: "B1/B2 商务/旅游签证",
      where: "美国驻华使领馆（北京、上海、广州、沈阳等，按领区预约）。先在线填写 DS-160，再在 ustraveldocs 预约面签。",
      processing: "面签后通常 1–2 周；行政审查可能数周至数月",
      fee: "签证费以官网实时金额为准（近年约 $185）",
      validity: "通常 10 年多次，以签证为准；单次停留由入境官决定，B1/B2 通常不超过 6 个月",
      steps: [
        "确认申请 B1/B2 旅游签证，准备护照、照片和行程草案。",
        "在 CEAC 官网填写 DS-160，保存 Application ID，上传 5×5 cm 白底照片。",
        "在 ustraveldocs 注册账户，缴纳签证费，选择领区并预约面签时间。",
        "准备在职证明、银行流水、行程、住宿等支持材料，装在透明文件袋里。",
        "按预约时间到使领馆：安检、录指纹、与签证官面谈。",
        "获签后按通知领取护照；若收到 221(g) 行政审查，按邮件补材料。",
        "持 10 年 B1/B2 签证出发前，在 EVUS 官网完成登记（通常 2 年有效）。"
      ],
      documents: [
        "护照（含旧护照）",
        "DS-160 确认页",
        "面签预约确认页",
        "签证费缴费凭证",
        "51×51 mm 白底照片",
        "在职证明/营业执照/学生证明",
        "近 6 个月银行流水与资产证明",
        "行程单、酒店和机票预订单（不必先出票）",
        "户口本、结婚证等家庭关系材料",
        "行程说明与回国约束力说明"
      ],
      entry: [
        "护照 + 有效美国签证。",
        "10 年 B1/B2 签证需在 EVUS 登记，出发前确认状态为 enrolled。",
        "入境时按 CBP 要求录指纹、拍照，回答来访目的和停留时间。",
        "随身携带返程机票、酒店地址和足够资金证明。",
        "B1/B2 不得在美国工作或长期居住。"
      ],
      notes: [
        "签证通过不等于保证入境，最终由 CBP 决定。",
        "不要购买不可退的机票后再等签证；行政审查可能很久。",
        "面签时不要背稿，回答要与 DS-160 一致。",
        "EVUS 仅适用于 10 年 B1/B2 签证，登记免费，警惕收费网站。"
      ],
      interviewTips: [
        "核心问题：去做什么、待多久、谁出钱、为什么回国。",
        "回答简短、具体、真实，和 DS-160/行程单一致。",
        "主动递材料，但不要一次塞一大叠。",
        "不要提“旅游顺便找工作”“帮亲戚带孩子”等容易引起移民倾向的表达。",
        "被行政审查时保持耐心，按邮件要求补材料。"
      ],
      official: [
        { label: "美国驻华使领馆签证处", url: "https://china.usembassy-china.org.cn/visas/" },
        { label: "DS-160 在线申请", url: "https://ceac.state.gov/genniv/" },
        { label: "EVUS 登记", url: "https://www.evus.gov/" }
      ]
    },
    cities: [
      {
        name: "纽约",
        attractions: [
          {
            id: "us-liberty",
            name: "自由女神像",
            en: "Statue of Liberty",
            lat: 40.6892,
            lng: -74.0445,
            motif: "炬",
            cat: "地标 · 渡轮",
            duration: "半天",
            ticket: "渡轮 $25 起",
            highlight: "纽约港入口的铜像，从渡轮上看曼哈顿最完整",
            highlights: ["自由女神", "埃利斯岛", "曼哈顿天际线"],
            play: ["坐渡轮上岛", "登基座看曼哈顿", "逛移民博物馆"],
            tips: "官方渡轮从 Battery Park 出发，提前订票；登冠冕需更早预约。",
            best: "上午"
          },
          {
            id: "us-centralpark",
            name: "中央公园",
            en: "Central Park",
            lat: 40.7829,
            lng: -73.9654,
            motif: "园",
            cat: "城市公园",
            duration: "3 小时",
            ticket: "免费",
            highlight: "曼哈顿中间的一大片绿，四季都值得走",
            highlights: ["毕士达喷泉", "绵羊草坪", "水库"],
            play: ["租自行车", "湖边野餐", "秋天看红叶"],
            tips: "公园很大，选南段或水库环线；晚上避免偏僻区域。",
            best: "上午 / 秋天"
          },
          {
            id: "us-met",
            name: "大都会艺术博物馆",
            en: "The Metropolitan Museum of Art",
            lat: 40.7794,
            lng: -73.9632,
            motif: "艺",
            cat: "博物馆 · 必看",
            duration: "4 小时",
            ticket: "$30（建议票价）",
            highlight: "从埃及神庙到梵高，一天看不完的世界",
            highlights: ["埃及丹铎神庙", "欧洲绘画", "亚洲馆"],
            play: ["先看地图选 3 个馆", "屋顶花园看中央公园", "周五晚场"],
            tips: "官网买票免排队；周五/周六开放较晚，穿舒服的鞋。",
            best: "上午"
          }
        ]
      },
      {
        name: "洛杉矶",
        attractions: [
          {
            id: "us-griffith",
            name: "格里菲斯天文台",
            en: "Griffith Observatory",
            lat: 34.1184,
            lng: -118.3004,
            motif: "星",
            cat: "天文 · 城市全景",
            duration: "2 小时",
            ticket: "免费（球幕另收）",
            highlight: "看洛杉矶盆地和好莱坞标志的最佳位置",
            highlights: ["天文台圆顶", "城市夜景", "好莱坞标志"],
            play: ["日落前到", "看球幕电影", "夜里看城市灯"],
            tips: "停车位紧张，可坐 DASH 巴士；周一闭馆。",
            best: "日落"
          },
          {
            id: "us-santamonica",
            name: "圣莫尼卡海滩",
            en: "Santa Monica Pier",
            lat: 34.009,
            lng: -118.497,
            motif: "海",
            cat: "海岸 · 日落",
            duration: "2–3 小时",
            ticket: "免费（游乐设施另收）",
            highlight: "66 号公路的终点，摩天轮伸进太平洋",
            highlights: ["圣莫尼卡码头", "摩天轮", "海滩"],
            play: ["走 66 号公路终点牌", "坐摩天轮", "海边看日落"],
            tips: "傍晚风大，带外套；码头停车贵，附近找公共停车场。",
            best: "日落"
          },
          {
            id: "us-hollywood",
            name: "好莱坞标志",
            en: "Hollywood Sign",
            lat: 34.1341,
            lng: -118.3215,
            motif: "影",
            cat: "城市地标",
            duration: "1.5 小时",
            ticket: "免费",
            highlight: "洛杉矶最著名的一行字，远看比近看更有戏",
            highlights: ["好莱坞标志", "格里菲斯公园", "Lake Hollywood Park"],
            play: ["Lake Hollywood Park 拍照", "徒步好莱坞山", "逛星光大道"],
            tips: "不要去“Hollywood Sign”导航终点，那里不能停车；选 Lake Hollywood Park。",
            best: "上午"
          }
        ]
      }
    ]
  },
  {
    id: "canada",
    name: "加拿大",
    en: "Canada",
    flag: "🇨🇦",
    category: "interview",
    continent: "北美洲",
    stay: "通常 6 个月",
    passport: "6 个月以上",
    currency: "加元 CAD",
    language: "英语 / 法语",
    bestSeason: "6–9 月 / 12–2 月（滑雪）",
    days: "8–12 天",
    intro: "温哥华的山海、班夫的冰川湖，加拿大适合把节奏放慢，开一段很长很长的公路。",
    foods: ["肉汁奶酪薯条", "三文鱼", "枫糖浆", "黄油挞", "纳奈莫条"],
    play: ["斯坦利公园", "卡皮拉诺吊桥", "露易丝湖", "落基山自驾"],
    visa: {
      type: "Visitor Visa（临时居民签证 TRV）",
      where: "在加拿大移民局 IRCC 官网在线申请（GCKey 账户），到 VFS Global 签证中心录指纹；IRCC 可能要求面试。",
      processing: "通常数周，以 IRCC 官网当前处理时间为准",
      fee: "签证费约 CAD 100 + 生物信息 CAD 85（以官网为准）",
      validity: "最长 10 年或至护照到期；单次停留通常不超过 6 个月",
      steps: [
        "在 IRCC 官网创建 GCKey 账户，选择 Visitor Visa。",
        "在线填写申请表（IMM 5257 等），上传护照、照片、行程和资金材料。",
        "缴纳签证费和生物信息费，保存收据。",
        "收到生物信息采集通知后 30 天内，预约 VFS 签证中心录指纹和拍照。",
        "如收到面试通知，按指定时间到使领馆或签证中心。",
        "收到护照提交请求（OPR）后，把护照送到签证中心贴签。",
        "获签后核对签证有效期、入境次数和停留期。"
      ],
      documents: [
        "护照（有效期覆盖行程）",
        "电子照片（符合 IRCC 规格）",
        "IMM 5257 等申请表",
        "家庭成员信息表",
        "在职证明/在读证明",
        "近 6 个月银行流水与资产证明",
        "行程单、酒店和机票预订单",
        "旅行历史（旧护照/签证页）",
        "邀请函（如探亲访友）",
        "生物信息采集通知"
      ],
      entry: [
        "护照 + 有效加拿大签证。",
        "中国公民不适用 eTA，必须持签证。",
        "入境时向 CBSA 官员说明目的、停留时间和资金。",
        "随身携带返程机票、住宿地址和行程单。",
        "不得在加拿大工作或超期停留。"
      ],
      notes: [
        "加拿大签证通常给到护照有效期，但不保证每次停留 6 个月。",
        "生物信息 10 年有效，过期需重新采集。",
        "IRCC 可能要求补充材料或面试，留意账户消息。",
        "不要通过非官方“加急”中介提交假材料。"
      ],
      interviewTips: [
        "如被要求面试，重点说明旅行目的、资金来源和回国计划。",
        "材料要与在线申请一致，尤其是行程和在职信息。",
        "准备好解释为何选择加拿大、为何此时出行。",
        "回答简洁，不要主动提供未问及的信息。"
      ],
      official: [
        { label: "加拿大 IRCC 访客签证", url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada.html" },
        { label: "VFS Global 加拿大签证中心", url: "https://visa.vfsglobal.com/chn/zh/can/" }
      ]
    },
    cities: [
      {
        name: "温哥华",
        attractions: [
          {
            id: "ca-stanley",
            name: "斯坦利公园",
            en: "Stanley Park",
            lat: 49.3017,
            lng: -123.1417,
            motif: "园",
            cat: "城市公园 · 海岸",
            duration: "3 小时",
            ticket: "免费",
            highlight: "海堤步道一边是森林，一边是太平洋",
            highlights: ["海堤步道", "图腾柱", "展望角"],
            play: ["租自行车环园", "走海堤", "看原住民图腾"],
            tips: "环园骑行约 9 公里；租车按小时计，注意单行道。",
            best: "晴天"
          },
          {
            id: "ca-granville",
            name: "格兰维尔岛",
            en: "Granville Island",
            lat: 49.271,
            lng: -123.135,
            motif: "市",
            cat: "市场 · 艺术",
            duration: "2–3 小时",
            ticket: "免费",
            highlight: "公共市场、手作工坊和海湾里的船",
            highlights: ["公共市场", "艺术区", "水上巴士"],
            play: ["逛市场", "吃一个甜甜圈", "坐水上巴士"],
            tips: "从市中心坐 Aquabus 比开车方便；周末人多。",
            best: "上午"
          },
          {
            id: "ca-capilano",
            name: "卡皮拉诺吊桥",
            en: "Capilano Suspension Bridge",
            lat: 49.3425,
            lng: -123.113,
            motif: "桥",
            cat: "森林 · 体验",
            duration: "2–3 小时",
            ticket: "约 CAD 70",
            highlight: "悬在雨林峡谷上的吊桥，脚下是急流",
            highlights: ["吊桥", "树顶步道", "悬崖步道"],
            play: ["走吊桥", "树顶探险", "看雨林"],
            tips: "门票较贵，网上买略便宜；恐高慎入，雨天路滑。",
            best: "上午"
          }
        ]
      },
      {
        name: "班夫",
        attractions: [
          {
            id: "ca-louise",
            name: "露易丝湖",
            en: "Lake Louise",
            lat: 51.4254,
            lng: -116.1773,
            motif: "湖",
            cat: "冰川湖 · 落基山",
            duration: "半天",
            ticket: "免费（停车/接驳另计）",
            highlight: "维多利亚冰川下的绿松石湖面",
            highlights: ["湖岸步道", "费尔蒙酒店", "冰川"],
            play: ["环湖走到湖尾", "划独木舟", "喝一杯湖边咖啡"],
            tips: "旺季停车极难，坐 Parks Canada 接驳车；清晨最美。",
            best: "6–9 月"
          },
          {
            id: "ca-moraine",
            name: "梦莲湖",
            en: "Moraine Lake",
            lat: 51.321,
            lng: -116.186,
            motif: "峰",
            cat: "冰川湖 · 落基山",
            duration: "3 小时",
            ticket: "免费（接驳另计）",
            highlight: "十峰谷下的蓝，像被调过色",
            highlights: ["十峰谷", "岩石堆观景台", "独木舟"],
            play: ["爬岩石堆看全景", "沿湖步道走", "划船"],
            tips: "2023 年起私家车限制进入，必须坐官方接驳或商业巴士；日出名额难抢。",
            best: "6–9 月"
          }
        ]
      }
    ]
  }
];
