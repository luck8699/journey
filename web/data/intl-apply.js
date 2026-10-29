/* 国际旅行 · 申签国家。签证细节以使领馆/移民局最新公告为准。 */
window.INTL_APPLY = [
  {
    id: "korea",
    name: "韩国",
    en: "South Korea",
    flag: "🇰🇷",
    category: "apply",
    continent: "东亚",
    stay: "30 天（单次）",
    passport: "6 个月以上",
    currency: "韩元 KRW",
    language: "韩语",
    bestSeason: "4–5 月 / 9–11 月",
    days: "5–6 天",
    intro: "首尔把宫殿、咖啡和夜市塞进同一条地铁线；秋天有银杏，冬天有滑雪，春天有樱花。",
    foods: ["泡菜", "石锅拌饭", "辣炒年糕", "炸鸡啤酒", "韩牛"],
    play: ["景福宫穿韩服", "北村韩屋", "南山塔", "釜山海云台"],
    visa: {
      type: "C-3-9 个人旅游签证（单次/多次）",
      where: "按户籍或长期居住地所属领区，向韩国驻华使领馆或韩国签证申请中心（KVAC）递交。个人旅游签证通常需通过领区指定的签证中心/代办机构预约递交，具体以各领区公告为准。",
      processing: "约 5–10 个工作日，旺季可能更久",
      fee: "单次约 ¥280 + 签证中心服务费；多次以使领馆公布为准",
      validity: "单次签证有效期通常 3 个月，停留 30 天；多次签证以签发为准",
      steps: [
        "确定自己属于哪个领区（按户籍/居住证/在读证明），并确认申请 C-3-9 个人旅游签证。",
        "在韩国签证门户（visa.go.kr）或所属领区 KVAC 官网查看材料清单、预约方式与受理时间。",
        "准备护照、申请表、照片、身份证、在职/在读证明、银行流水、行程和住宿材料。",
        "按预约时间到签证申请中心递交材料、录指纹、缴费；部分领区需通过指定代办社递交。",
        "保存受理编号，在线查询进度；如需补材料，按通知尽快补交。",
        "出签后核对姓名、护照号、签证类型、停留期和入境次数。",
        "出发前确认签证仍在有效期，准备好入境卡、住宿地址和返程机票。"
      ],
      documents: [
        "护照（有效期 6 个月以上，至少 2 页空白）",
        "签证申请表（领区指定格式）",
        "白底彩色照片 35×45 mm",
        "身份证原件及复印件",
        "户口本/居住证/在读证明（证明领区归属）",
        "在职证明 + 营业执照复印件（在职人员）",
        "近 6 个月银行流水/资产证明",
        "行程单、机票和酒店预订单",
        "旧护照及以往签证页（如有）",
        "探亲/商务邀请材料（如适用）"
      ],
      entry: [
        "护照 + 有效韩国签证。",
        "飞机上填写入境卡和海关申报单，或提前使用电子入境系统。",
        "入境时录指纹、拍照，回答停留目的和住宿地址。",
        "随身携带返程机票、酒店订单和行程单。",
        "持旅游签证不得在韩国工作；逾期停留会影响再次入境。"
      ],
      notes: [
        "韩国对中国团体游客的阶段性免签政策不适用于个人自由行，个人旅游仍需签证（以最新公告为准）。",
        "不同领区材料要求差异较大，先看所属领区官网，不要照搬其他领区清单。",
        "K-ETA 适用于部分免签国家/地区，持韩国签证入境的中国公民通常不需要。",
        "签证中心只负责收件，是否出签由使领馆决定。"
      ],
      official: [
        { label: "韩国签证门户", url: "https://www.visa.go.kr/" },
        { label: "韩国驻华大使馆", url: "https://overseas.mofa.go.kr/cn-zh/index.do" }
      ]
    },
    cities: [
      {
        name: "首尔",
        attractions: [
          {
            id: "kr-gyeongbok",
            name: "景福宫",
            en: "Gyeongbokgung Palace",
            lat: 37.5796,
            lng: 126.977,
            motif: "宫",
            cat: "宫殿 · 历史",
            duration: "3 小时",
            ticket: "约 ¥15（穿韩服免票）",
            highlight: "首尔最完整的朝鲜王朝宫殿，换岗仪式很值得看",
            highlights: ["勤政殿", "庆会楼", "守门将换岗"],
            play: ["穿韩服免票进宫", "看换岗仪式", "逛国立古宫博物馆"],
            tips: "周二闭馆；换岗仪式通常在 10:00/14:00，提前查时间。",
            best: "上午"
          },
          {
            id: "kr-bukchon",
            name: "北村韩屋村",
            en: "Bukchon Hanok Village",
            lat: 37.582,
            lng: 126.985,
            motif: "屋",
            cat: "传统街区",
            duration: "2 小时",
            ticket: "免费",
            highlight: "山坡上的韩屋屋顶，一直铺到南山",
            highlights: ["韩屋巷道", "北村观景台", "三清洞"],
            play: ["沿巷子慢慢走", "三清洞喝咖啡", "租韩服拍照"],
            tips: "这里是居民区，安静参观、不要大声喧哗；上午人少。",
            best: "上午"
          },
          {
            id: "kr-namsan",
            name: "南山首尔塔",
            en: "N Seoul Tower",
            lat: 37.5512,
            lng: 126.9882,
            motif: "塔",
            cat: "城市地标 · 夜景",
            duration: "2 小时",
            ticket: "观景台约 ¥90",
            highlight: "首尔夜景的中心，爱情锁墙和城市灯海",
            highlights: ["观景台", "爱情锁墙", "南山缆车"],
            play: ["坐缆车上山", "傍晚看亮灯", "挂一把爱情锁"],
            tips: "日落前 1 小时上山；山上风大，冬天带外套。",
            best: "日落"
          }
        ]
      },
      {
        name: "釜山",
        attractions: [
          {
            id: "kr-gamcheon",
            name: "甘川文化村",
            en: "Gamcheon Culture Village",
            lat: 35.097,
            lng: 129.01,
            motif: "彩",
            cat: "彩色村落 · 艺术",
            duration: "2–3 小时",
            ticket: "免费",
            highlight: "山坡上的彩色房子和小王子雕像",
            highlights: ["彩色屋顶", "小王子与狐狸", "艺术小店"],
            play: ["找小王子拍照", "收集印章", "在观景台看海"],
            tips: "坡多台阶多，穿好走的鞋；上午光线好、人少。",
            best: "上午"
          },
          {
            id: "kr-haeundae",
            name: "海云台",
            en: "Haeundae Beach",
            lat: 35.158,
            lng: 129.16,
            motif: "海",
            cat: "海滩 · 城市",
            duration: "半天",
            ticket: "免费",
            highlight: "城市边缘的沙滩，晚上有灯光和海风",
            highlights: ["海云台沙滩", "冬柏岛", "广安大桥"],
            play: ["海边散步", "坐海岸列车", "广安里看夜景"],
            tips: "夏天人多；海岸列车提前订票，日落时段最抢手。",
            best: "傍晚"
          }
        ]
      }
    ]
  },
  {
    id: "japan",
    name: "日本",
    en: "Japan",
    flag: "🇯🇵",
    category: "apply",
    continent: "东亚",
    stay: "15 天（单次）",
    passport: "6 个月以上",
    currency: "日元 JPY",
    language: "日语",
    bestSeason: "3–5 月 / 10–11 月",
    days: "7–10 天",
    intro: "东京的秩序、京都的古意和大阪的烟火气，第一次去日本很容易贪心，建议一次只走两座城。",
    foods: ["寿司", "拉面", "天妇罗", "大阪烧", "抹茶"],
    play: ["浅草寺", "涩谷十字路口", "伏见稻荷", "岚山竹林"],
    visa: {
      type: "单次个人旅游签证",
      where: "日本驻华使领馆不直接受理个人旅游签证，必须通过领区指定的代办机构/旅行社递交。先确认领区，再找有资质的代办。",
      processing: "约 5–7 个工作日，旺季可能更久",
      fee: "签证费约 ¥200，代办服务费另计",
      validity: "单次签证有效期 3 个月，停留 15 天（以签证为准）",
      steps: [
        "确认户籍/居住地所属领区，选择领区指定的代办机构。",
        "向代办索取最新材料清单，准备护照、照片、申请表、在职和财力证明。",
        "确定大致行程，准备机票和酒店预订单（不必先出票）。",
        "把材料交给代办，缴纳签证费和服务费。",
        "等待使领馆审核，期间可能被要求补材料或电话核实。",
        "出签后核对签证页，出发前在 Visit Japan Web 填写入境/海关信息。",
        "入境时出示护照、签证和 Visit Japan Web 二维码。"
      ],
      documents: [
        "护照（有效期 6 个月以上）",
        "签证申请表（代办提供）",
        "白底照片 4.5×4.5 cm",
        "身份证/户口本复印件",
        "在职证明 + 营业执照复印件",
        "近 6 个月银行流水/纳税证明",
        "行程单（每日城市与住宿）",
        "机票和酒店预订单",
        "居住证（异地办理时）"
      ],
      entry: [
        "护照 + 有效日本签证。",
        "提前在 Visit Japan Web 登记入境和海关信息，保存二维码。",
        "入境时录指纹、拍照，回答停留目的和天数。",
        "随身携带返程机票和住宿信息。",
        "旅游签证不得从事有收入的活动。"
      ],
      notes: [
        "单次旅游签证必须通过代办，个人不能直接去使馆递签。",
        "不同领区对财力证明要求不同，学生/自由职业者准备亲属关系与资助材料。",
        "三年/五年多次签证有更高收入或出行记录要求，先问代办。",
        "签证有效期不等于停留期，入境时以入境许可为准。"
      ],
      official: [
        { label: "日本驻华大使馆", url: "https://www.cn.emb-japan.go.jp/itpr_zh/visa.html" },
        { label: "Visit Japan Web", url: "https://vjw-lp.digital.go.jp/zh-hans/" }
      ]
    },
    cities: [
      {
        name: "东京",
        attractions: [
          {
            id: "jp-sensoji",
            name: "浅草寺",
            en: "Senso-ji",
            lat: 35.7148,
            lng: 139.7967,
            motif: "寺",
            cat: "古刹 · 市井",
            duration: "2 小时",
            ticket: "免费",
            highlight: "雷门大灯笼、仲见世商店街和东京最老的寺",
            highlights: ["雷门", "仲见世通", "五重塔"],
            play: ["抽一张御神签", "吃人形烧", "租和服拍照"],
            tips: "早上 8 点前到，雷门几乎没人；仲见世 10 点后开齐。",
            best: "清晨"
          },
          {
            id: "jp-shibuya",
            name: "涩谷十字路口",
            en: "Shibuya Crossing",
            lat: 35.6595,
            lng: 139.7005,
            motif: "潮",
            cat: "城市街区",
            duration: "1.5 小时",
            ticket: "免费",
            highlight: "全世界最忙的十字路口，绿灯一亮像潮水",
            highlights: ["十字路口", "忠犬八公像", "涩谷 Sky"],
            play: ["在路口走一次", "涩谷 Sky 看日落", "逛任天堂旗舰店"],
            tips: "涩谷 Sky 提前订日落时段；路口拍照别站到车道上。",
            best: "日落"
          },
          {
            id: "jp-meiji",
            name: "明治神宫",
            en: "Meiji Jingu",
            lat: 35.6764,
            lng: 139.6993,
            motif: "森",
            cat: "神社 · 森林",
            duration: "2 小时",
            ticket: "免费",
            highlight: "东京市中心的一片森林，鸟居一走进去就安静",
            highlights: ["大鸟居", "本殿", "夫妻楠"],
            play: ["走参道", "看传统婚礼", "逛代代木公园"],
            tips: "从原宿站进、代代木出；周末可能遇到婚礼。",
            best: "上午"
          },
          {
            id: "jp-teamlab",
            name: "teamLab Planets",
            en: "teamLab Planets",
            lat: 35.649,
            lng: 139.79,
            motif: "光",
            cat: "数字艺术",
            duration: "2 小时",
            ticket: "约 ¥180",
            highlight: "赤脚走进水里和光里，像掉进一个梦",
            highlights: ["水空间", "无限镜面", "漂浮花园"],
            play: ["赤脚体验", "穿浅色衣服拍照", "提前预约时段"],
            tips: "需脱鞋，部分区域有水；提前网上买票，迟到可能不让进。",
            best: "上午"
          }
        ]
      },
      {
        name: "京都",
        attractions: [
          {
            id: "jp-fushimi",
            name: "伏见稻荷大社",
            en: "Fushimi Inari Shrine",
            lat: 34.9671,
            lng: 135.7727,
            motif: "朱",
            cat: "神社 · 千本鸟居",
            duration: "3 小时",
            ticket: "免费",
            highlight: "成千上万座朱红鸟居，沿山一路排到山顶",
            highlights: ["千本鸟居", "四辻", "山顶"],
            play: ["清晨走鸟居", "到四辻看京都", "买一个狐狸御守"],
            tips: "7 点前人最少；走到四辻约 30 分钟，登顶往返 2–3 小时。",
            best: "清晨"
          },
          {
            id: "jp-kiyomizu",
            name: "清水寺",
            en: "Kiyomizu-dera",
            lat: 34.9949,
            lng: 135.785,
            motif: "阁",
            cat: "古寺 · 世界遗产",
            duration: "2–3 小时",
            ticket: "约 ¥20",
            highlight: "悬空的清水舞台，春天樱花、秋天红叶",
            highlights: ["清水舞台", "音羽瀑布", "二年坂"],
            play: ["舞台看京都", "喝一口音羽瀑布", "逛二年坂三年坂"],
            tips: "早上 7 点开门，早去避开人流；坡路多，穿好走的鞋。",
            best: "清晨"
          },
          {
            id: "jp-arashiyama",
            name: "岚山",
            en: "Arashiyama",
            lat: 35.0094,
            lng: 135.6667,
            motif: "竹",
            cat: "竹林 · 山水",
            duration: "半天",
            ticket: "免费（部分景点另收）",
            highlight: "竹林小径、渡月桥和保津川的慢时光",
            highlights: ["竹林小径", "渡月桥", "天龙寺"],
            play: ["走竹林", "坐保津川游船", "天龙寺看庭园"],
            tips: "竹林 8 点前最安静；从京都站坐 JR 到嵯峨岚山约 15 分钟。",
            best: "清晨"
          }
        ]
      }
    ]
  },
  {
    id: "uk",
    name: "英国",
    en: "United Kingdom",
    flag: "🇬🇧",
    category: "apply",
    continent: "欧洲",
    stay: "通常 6 个月",
    passport: "覆盖行程",
    currency: "英镑 GBP",
    language: "英语",
    bestSeason: "5–9 月",
    days: "7–10 天",
    intro: "伦敦的博物馆大多数免费，剧院和市集要慢慢逛。英国旅行贵在住宿和交通，提前订火车票能省很多。",
    foods: ["炸鱼薯条", "周日烤肉", "下午茶", "肉派", "英式早餐"],
    play: ["大英博物馆", "伦敦塔桥", "西区音乐剧", "博罗市场"],
    visa: {
      type: "Standard Visitor Visa（标准访客签证）",
      where: "在英国政府官网（GOV.UK）在线申请，预约 VFS Global 签证中心递签并录指纹。",
      processing: "通常约 3 周，可选加急服务",
      fee: "6 个月约 £127 起，以 GOV.UK 实时价格为准",
      validity: "6 个月/2 年/5 年/10 年多次，单次停留通常不超过 6 个月",
      steps: [
        "在 GOV.UK 选择 Standard Visitor visa，在线填写申请表。",
        "缴纳签证费，选择签证中心和时间。",
        "准备护照、资金、在职、行程和住宿材料。",
        "按预约到 VFS 签证中心递材料、录指纹和拍照。",
        "等待审核；期间可能收到电话调查或补材料通知。",
        "出签后按通知取回护照，核对签证有效期和入境次数。",
        "出发前准备返程票、住宿地址和旅行保险。"
      ],
      documents: [
        "护照（有效期覆盖行程）",
        "在线申请表和预约确认",
        "近 6 个月银行流水",
        "在职证明/在读证明",
        "行程单、酒店和机票预订单",
        "旅行历史（旧护照/签证页）",
        "邀请函/资助说明（如适用）",
        "旅行保险（建议）"
      ],
      entry: [
        "护照 + 有效英国签证。",
        "入境时边检可能询问目的、停留时间、住宿和资金。",
        "随身携带返程机票、住宿订单和行程单。",
        "旅游签证不得工作或长期居住。",
        "从英国去爱尔兰等周边国家，确认签证是否适用。"
      ],
      notes: [
        "英国不属于申根区，需单独申请英国签证。",
        "签证费不退，材料造假会被拒签并影响未来申请。",
        "护照在审核期间通常留在签证中心，可选“保留护照”服务。",
        "火车票提前买便宜很多，使用 Railcard 可打折。"
      ],
      official: [
        { label: "英国政府访客签证", url: "https://www.gov.uk/standard-visitor" },
        { label: "VFS Global 英国签证中心", url: "https://visa.vfsglobal.com/chn/zh/gbr/" }
      ]
    },
    cities: [
      {
        name: "伦敦",
        attractions: [
          {
            id: "uk-britishmuseum",
            name: "大英博物馆",
            en: "The British Museum",
            lat: 51.5194,
            lng: -0.127,
            motif: "藏",
            cat: "博物馆 · 必看",
            duration: "4 小时",
            ticket: "免费（特展另收）",
            highlight: "罗塞塔石碑、帕特农神庙雕塑和世界文明",
            highlights: ["罗塞塔石碑", "埃及馆", "中国馆"],
            play: ["领一张地图选重点", "看罗塞塔石碑", "参加免费导览"],
            tips: "免费但需预约；周五晚场人少，别试图一天看完。",
            best: "上午"
          },
          {
            id: "uk-towerbridge",
            name: "伦敦塔桥",
            en: "Tower Bridge",
            lat: 51.5055,
            lng: -0.0754,
            motif: "桥",
            cat: "地标 · 河景",
            duration: "2 小时",
            ticket: "约 £13（外观免费）",
            highlight: "泰晤士河上的开合桥，玻璃步道能看河",
            highlights: ["玻璃步道", "维多利亚机房", "泰晤士河"],
            play: ["走玻璃步道", "看桥面开启", "沿河走到碎片大厦"],
            tips: "查开桥时间；傍晚在河对岸拍全景最好。",
            best: "傍晚"
          },
          {
            id: "uk-westminster",
            name: "威斯敏斯特",
            en: "Westminster",
            lat: 51.5007,
            lng: -0.1246,
            motif: "钟",
            cat: "政治 · 地标",
            duration: "2 小时",
            ticket: "外观免费（入内另收）",
            highlight: "大本钟、议会大厦和西敏寺挤在一起",
            highlights: ["大本钟", "议会大厦", "西敏寺"],
            play: ["威斯敏斯特桥拍大本钟", "西敏寺看加冕椅", "圣詹姆斯公园散步"],
            tips: "大本钟维修/活动期间可能围挡；西敏寺周日礼拜时段限制参观。",
            best: "上午"
          },
          {
            id: "uk-borough",
            name: "博罗市场",
            en: "Borough Market",
            lat: 51.5055,
            lng: -0.091,
            motif: "食",
            cat: "市集 · 美食",
            duration: "2 小时",
            ticket: "免费",
            highlight: "伦敦最老的市场，奶酪、面包和热食摊",
            highlights: ["奶酪摊", "生蚝", "街头小吃"],
            play: ["吃一份蘑菇饭", "试英国奶酪", "买面包当早餐"],
            tips: "周三至周六最热闹；先逛一圈再买，现金和卡都备。",
            best: "午餐"
          }
        ]
      }
    ]
  },
  {
    id: "france",
    name: "法国",
    en: "France",
    flag: "🇫🇷",
    category: "apply",
    continent: "欧洲",
    stay: "90 天/180 天（申根）",
    passport: "6 个月以上",
    currency: "欧元 EUR",
    language: "法语",
    bestSeason: "4–6 月 / 9–10 月",
    days: "7–10 天",
    intro: "巴黎适合用走的：从卢浮宫到塞纳河，从咖啡馆到蒙马特。把一天留给博物馆，另一天留给街头。",
    foods: ["可颂", "牛排薯条", "蜗牛", "马卡龙", "葡萄酒"],
    play: ["埃菲尔铁塔", "卢浮宫", "塞纳河游船", "蒙马特"],
    visa: {
      type: "申根短期旅游签证（C 类）",
      where: "在 France-Visas 官网填写申请，预约 VFS Global/TLScontact 签证中心递交。按“主要目的地”原则，向停留时间最长的申根国申请。",
      processing: "约 15 个工作日，旺季可能更久",
      fee: "成人约 €90，以 France-Visas 为准",
      validity: "短期申根签证，任意 180 天内停留不超过 90 天",
      steps: [
        "确定主要目的地和停留天数；如果法国停留最久，向法国申请。",
        "在 France-Visas 填写申请表，保存申请号。",
        "准备护照、照片、行程、住宿、保险和资金材料。",
        "在签证中心官网预约递交时间，缴纳签证费和服务费。",
        "按预约到中心递材料、录指纹、拍照。",
        "在线跟踪进度，出签后核对签证页和停留天数。",
        "入境时携带保险单、住宿订单和返程票。"
      ],
      documents: [
        "护照（有效期至少 3 个月，超出计划离境日）",
        "申根签证申请表和 France-Visas 回执",
        "白底照片（按中心要求）",
        "往返机票和全程住宿订单",
        "每日行程单",
        "旅行医疗保险（保额至少 €30,000）",
        "近 3–6 个月银行流水",
        "在职证明/在读证明",
        "户口本/居住证复印件"
      ],
      entry: [
        "护照 + 有效申根签证。",
        "入境时可能询问行程、住宿和资金。",
        "180 天内累计停留不超过 90 天。",
        "随身携带保险单、酒店订单和返程票。",
        "申根签证不自动允许工作。"
      ],
      notes: [
        "申根签证按主要目的地申请，不是随便选一个更容易的国家。",
        "生物信息 59 个月内有效，过期需重新采集。",
        "法国不承认“先入境国”原则，行程要与申请国一致。",
        "出发前确认 ETIAS 等新规是否已实施（以欧盟官网为准）。"
      ],
      official: [
        { label: "France-Visas", url: "https://france-visas.gouv.fr/" },
        { label: "法国驻华大使馆", url: "https://cn.ambafrance.org/" }
      ]
    },
    cities: [
      {
        name: "巴黎",
        attractions: [
          {
            id: "fr-eiffel",
            name: "埃菲尔铁塔",
            en: "Eiffel Tower",
            lat: 48.8584,
            lng: 2.2945,
            motif: "塔",
            cat: "地标 · 夜景",
            duration: "2–3 小时",
            ticket: "约 €29 登顶",
            highlight: "巴黎的坐标，整点闪灯时整座城市都在看",
            highlights: ["二层观景台", "塔顶", "战神广场"],
            play: ["登塔看塞纳河", "战神广场野餐", "整点看闪灯"],
            tips: "官网提前订票；日落时段最抢手，安检排队久。",
            best: "日落"
          },
          {
            id: "fr-louvre",
            name: "卢浮宫",
            en: "Louvre Museum",
            lat: 48.8606,
            lng: 2.3376,
            motif: "艺",
            cat: "博物馆 · 必看",
            duration: "4 小时",
            ticket: "约 €22",
            highlight: "从蒙娜丽莎到汉谟拉比法典，世界艺术的仓库",
            highlights: ["蒙娜丽莎", "胜利女神", "汉谟拉比法典"],
            play: ["从金字塔进", "先看三大件", "黎塞留馆看法国绘画"],
            tips: "周二闭馆；官网订时段票，从地下入口进排队更短。",
            best: "上午"
          },
          {
            id: "fr-orsay",
            name: "奥赛博物馆",
            en: "Musée d'Orsay",
            lat: 48.86,
            lng: 2.3266,
            motif: "印",
            cat: "博物馆 · 印象派",
            duration: "3 小时",
            ticket: "约 €16",
            highlight: "火车站改造的美术馆，莫奈、梵高和雷诺阿",
            highlights: ["大钟", "印象派展厅", "梵高自画像"],
            play: ["在大钟前拍照", "看印象派", "五楼咖啡厅看塞纳河"],
            tips: "周一闭馆；持巴黎博物馆通票可走快速通道。",
            best: "下午"
          },
          {
            id: "fr-montmartre",
            name: "蒙马特",
            en: "Montmartre",
            lat: 48.8867,
            lng: 2.3431,
            motif: "画",
            cat: "街区 · 艺术",
            duration: "3 小时",
            ticket: "免费（圣心堂登顶另收）",
            highlight: "圣心堂、画家广场和巴黎最浪漫的坡路",
            highlights: ["圣心堂", "小丘广场", "爱墙"],
            play: ["爬上圣心堂", "看街头画家", "在爱墙前拍照"],
            tips: "避开推销手绳的人；傍晚圣心堂台阶上看日落。",
            best: "傍晚"
          }
        ]
      }
    ]
  },
  {
    id: "italy",
    name: "意大利",
    en: "Italy",
    flag: "🇮🇹",
    category: "apply",
    continent: "欧洲",
    stay: "90 天/180 天（申根）",
    passport: "6 个月以上",
    currency: "欧元 EUR",
    language: "意大利语",
    bestSeason: "4–6 月 / 9–10 月",
    days: "8–12 天",
    intro: "罗马的石头、佛罗伦萨的穹顶和托斯卡纳的田野。意大利适合坐火车，一站一站慢慢往南。",
    foods: ["意面", "披萨", "冰淇淋", "浓缩咖啡", "提拉米苏"],
    play: ["斗兽场", "万神殿", "乌菲兹", "圣母百花大教堂"],
    visa: {
      type: "申根短期旅游签证（C 类）",
      where: "通过意大利外交部签证门户填写，预约 VFS Global 意大利签证中心递交。按主要目的地原则申请。",
      processing: "约 15 个工作日，旺季更久",
      fee: "成人约 €90，以签证中心为准",
      validity: "短期申根签证，任意 180 天内停留不超过 90 天",
      steps: [
        "确认意大利是主要目的地（停留最久）。",
        "在意大利签证门户填写申请表，打印并签字。",
        "准备护照、照片、行程、住宿、保险和资金材料。",
        "在 VFS 官网预约递交时间并缴费。",
        "按预约到签证中心递材料、录指纹。",
        "跟踪进度，出签后核对签证页。",
        "入境时携带保险、住宿和返程票。"
      ],
      documents: [
        "护照（有效期超出离境日至少 3 个月）",
        "申根签证申请表",
        "白底照片",
        "往返机票和住宿订单",
        "每日行程单",
        "旅行医疗保险（保额至少 €30,000）",
        "近 3–6 个月银行流水",
        "在职证明/在读证明",
        "户口本/居住证复印件"
      ],
      entry: [
        "护照 + 有效申根签证。",
        "入境可能询问行程和住宿。",
        "180 天内累计停留不超过 90 天。",
        "随身携带保险单和返程票。",
        "旅游签证不得工作。"
      ],
      notes: [
        "意大利签证中心通常按领区划分，先查自己属于哪个领区。",
        "申根保险必须覆盖整个行程和全部申根国。",
        "热门景点（斗兽场、乌菲兹）提前官网预约。",
        "火车站和景点注意扒手，背包前背。"
      ],
      official: [
        { label: "意大利签证门户", url: "https://vistoperitalia.esteri.it/" },
        { label: "VFS Global 意大利签证中心", url: "https://visa.vfsglobal.com/chn/zh/ita/" }
      ]
    },
    cities: [
      {
        name: "罗马",
        attractions: [
          {
            id: "it-colosseum",
            name: "斗兽场",
            en: "Colosseum",
            lat: 41.8902,
            lng: 12.4922,
            motif: "兽",
            cat: "古迹 · 世界遗产",
            duration: "3 小时",
            ticket: "约 €18（联票）",
            highlight: "两千年前的角斗场，站在看台上仍能感到尺度",
            highlights: ["竞技场", "地下层", "君士坦丁凯旋门"],
            play: ["预约地下层导览", "看凯旋门", "傍晚在外围拍全景"],
            tips: "官网提前买联票；夏天中午极晒，带水和帽子。",
            best: "上午"
          },
          {
            id: "it-pantheon",
            name: "万神殿",
            en: "Pantheon",
            lat: 41.8986,
            lng: 12.4769,
            motif: "穹",
            cat: "古建 · 必看",
            duration: "1 小时",
            ticket: "约 €5",
            highlight: "穹顶中央的圆洞，雨会直接落进殿里",
            highlights: ["穹顶", "拉斐尔墓", "青铜门"],
            play: ["看穹顶光柱", "找拉斐尔墓", "广场喝咖啡"],
            tips: "周日上午可能因弥撒限制参观；现场排队但移动快。",
            best: "上午"
          },
          {
            id: "it-trevi",
            name: "特雷维喷泉",
            en: "Trevi Fountain",
            lat: 41.9009,
            lng: 12.4833,
            motif: "泉",
            cat: "喷泉 · 地标",
            duration: "0.5–1 小时",
            ticket: "免费",
            highlight: "许愿池的巴洛克水声，和永远拥挤的人群",
            highlights: ["海神雕像", "许愿池", "夜景"],
            play: ["背对喷泉投一枚硬币", "清晨拍照", "吃一杯冰淇淋"],
            tips: "早上 7 点前几乎没人；不要坐喷泉边缘或下水。",
            best: "清晨"
          }
        ]
      },
      {
        name: "佛罗伦萨",
        attractions: [
          {
            id: "it-duomo",
            name: "圣母百花大教堂",
            en: "Florence Cathedral",
            lat: 43.7731,
            lng: 11.256,
            motif: "穹",
            cat: "教堂 · 世界遗产",
            duration: "3 小时",
            ticket: "联票约 €30",
            highlight: "布鲁内莱斯基的红色穹顶，爬上去看整座城",
            highlights: ["穹顶", "乔托钟楼", "洗礼堂"],
            play: ["爬穹顶", "登钟楼", "看洗礼堂天堂之门"],
            tips: "穹顶需预约时段；爬 463 级台阶，幽闭恐惧慎入。",
            best: "上午"
          },
          {
            id: "it-uffizi",
            name: "乌菲兹美术馆",
            en: "Uffizi Gallery",
            lat: 43.7678,
            lng: 11.2553,
            motif: "画",
            cat: "美术馆 · 文艺复兴",
            duration: "3 小时",
            ticket: "约 €25",
            highlight: "波提切利、达芬奇和拉斐尔的原作",
            highlights: ["维纳斯的诞生", "春", "达芬奇展厅"],
            play: ["看波提切利", "走廊看阿诺河", "买一张复制画"],
            tips: "周一闭馆；提前订早场，租讲解器。",
            best: "上午"
          }
        ]
      }
    ]
  },
  {
    id: "australia",
    name: "澳大利亚",
    en: "Australia",
    flag: "🇦🇺",
    category: "apply",
    continent: "大洋洲",
    stay: "3/6/12 个月（以签证为准）",
    passport: "覆盖行程",
    currency: "澳元 AUD",
    language: "英语",
    bestSeason: "9–11 月 / 3–5 月",
    days: "10–14 天",
    intro: "悉尼的海港、墨尔本的咖啡和大洋路的海岸线。澳大利亚很大，一次选一个州深度玩更舒服。",
    foods: ["肉派", "澳式海鲜", "Flat White", "拉明顿蛋糕", "烧烤"],
    play: ["歌剧院", "海港大桥", "大洋路", "邦迪海滩"],
    visa: {
      type: "Visitor visa（subclass 600）",
      where: "在澳大利亚内政部 ImmiAccount 在线申请，通常无需面试；按需到 VFS 录生物信息或体检。",
      processing: "数周，旺季可能更久，以官网当前时间为准",
      fee: "约 AUD 200 起，以 ImmiAccount 为准",
      validity: "常见 3/6/12 个月，单次停留和入境次数以签证为准",
      steps: [
        "在 ImmiAccount 注册账户，选择 Visitor visa (600)。",
        "在线填写申请表，上传护照、照片、资金和行程材料。",
        "按系统提示完成健康声明；如被要求，预约体检或生物信息。",
        "缴纳签证费，提交申请并保存申请号。",
        "在 ImmiAccount 跟踪进度，及时补材料。",
        "获签后核对签证有效期、停留期和入境次数。",
        "出发前在线填写入境旅客卡（部分航班提供纸质卡）。"
      ],
      documents: [
        "护照（有效期覆盖行程）",
        "电子照片",
        "资金证明（银行流水/存款）",
        "在职证明/在读证明",
        "行程单、酒店和机票预订单",
        "旅行历史",
        "邀请函（如探亲访友）",
        "旅行保险（建议）"
      ],
      entry: [
        "护照 + 有效澳大利亚签证（电子签与护照关联）。",
        "飞机上填写入境旅客卡，申报食品、药品和动植物制品。",
        "澳大利亚生物安全检查严格，未申报可能被罚款。",
        "随身携带返程票、住宿和资金证明。",
        "旅游签证不得工作。"
      ],
      notes: [
        "澳大利亚签证通常为电子签，不需要贴纸。",
        "不要携带未申报的食品、种子、肉类和木制品。",
        "体检/生物信息要求以 ImmiAccount 消息为准。",
        "境内航班距离很远，行程别排太满。"
      ],
      official: [
        { label: "澳大利亚内政部访客签证", url: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/visitor-600" },
        { label: "ImmiAccount", url: "https://online.immi.gov.au/" }
      ]
    },
    cities: [
      {
        name: "悉尼",
        attractions: [
          {
            id: "au-opera",
            name: "悉尼歌剧院",
            en: "Sydney Opera House",
            lat: -33.8568,
            lng: 151.2153,
            motif: "帆",
            cat: "地标 · 表演",
            duration: "2 小时",
            ticket: "外观免费（导览另收）",
            highlight: "白色帆船屋顶，从海港每个角度都好看",
            highlights: ["帆形屋顶", "海港大桥", "环形码头"],
            play: ["参加内部导览", "看一场演出", "环形码头拍全景"],
            tips: "导览提前订；傍晚从 Mrs Macquarie's Chair 拍歌剧院和大桥同框。",
            best: "傍晚"
          },
          {
            id: "au-harbourbridge",
            name: "海港大桥",
            en: "Sydney Harbour Bridge",
            lat: -33.8523,
            lng: 151.2108,
            motif: "桥",
            cat: "地标 · 户外",
            duration: "2 小时",
            ticket: "步行免费（攀桥另收）",
            highlight: "爬上去是悉尼最刺激的视角，走上去也很值",
            highlights: ["桥面步道", "攀桥", "岩石区"],
            play: ["步行过桥", "攀桥看日落", "岩石区逛市集"],
            tips: "攀桥需预约且不能带手机；步行免费，风大带外套。",
            best: "日落"
          },
          {
            id: "au-bondi",
            name: "邦迪海滩",
            en: "Bondi Beach",
            lat: -33.8908,
            lng: 151.2743,
            motif: "浪",
            cat: "海滩 · 徒步",
            duration: "3 小时",
            ticket: "免费",
            highlight: "冲浪者、金色沙滩和邦迪到库吉的海岸步道",
            highlights: ["邦迪沙滩", "冰山泳池", "海岸步道"],
            play: ["海边徒步", "看冲浪", "冰山泳池游泳"],
            tips: "海岸步道单程约 6 公里；游泳在红黄旗之间。",
            best: "上午"
          }
        ]
      },
      {
        name: "墨尔本",
        attractions: [
          {
            id: "au-greatocean",
            name: "大洋路",
            en: "Great Ocean Road",
            lat: -38.68,
            lng: 143.39,
            motif: "岸",
            cat: "海岸公路 · 自驾",
            duration: "1–2 天",
            ticket: "免费（自驾/跟团另计）",
            highlight: "十二门徒岩和南大洋的悬崖海岸",
            highlights: ["十二门徒岩", "洛克阿德峡谷", "阿波罗湾"],
            play: ["自驾海岸线", "看十二门徒日落", "阿波罗湾住一晚"],
            tips: "从墨尔本单程约 3 小时，当天往返很赶；建议住一晚。",
            best: "9–4 月"
          },
          {
            id: "au-federation",
            name: "联邦广场",
            en: "Federation Square",
            lat: -37.818,
            lng: 144.969,
            motif: "艺",
            cat: "城市广场 · 艺术",
            duration: "2 小时",
            ticket: "免费",
            highlight: "墨尔本的会客厅，美术馆和涂鸦巷都在附近",
            highlights: ["联邦广场", "霍西尔巷", "雅拉河"],
            play: ["逛维多利亚国家美术馆", "霍西尔巷看涂鸦", "雅拉河边散步"],
            tips: "墨尔本天气一天四季，带外套；咖啡店早上排队。",
            best: "上午"
          }
        ]
      }
    ]
  },
  {
    id: "newzealand",
    name: "新西兰",
    en: "New Zealand",
    flag: "🇳🇿",
    category: "apply",
    continent: "大洋洲",
    stay: "通常 9 个月（以签证为准）",
    passport: "覆盖行程",
    currency: "新西兰元 NZD",
    language: "英语 / 毛利语",
    bestSeason: "12–2 月 / 6–8 月（滑雪）",
    days: "10–14 天",
    intro: "南岛的湖和山像明信片，北岛的地热和毛利文化更接地气。新西兰适合自驾，但山路要留足时间。",
    foods: ["羊排", "绿唇贻贝", "帕夫洛娃", "Hokey Pokey 冰淇淋", "Flat White"],
    play: ["米尔福德峡湾", "皇后镇缆车", "瓦纳卡湖", "星空"],
    visa: {
      type: "Visitor Visa（访客签证）",
      where: "在新西兰移民局官网在线申请；按需提供生物信息或体检，通常无需面试。",
      processing: "数周，以官网当前处理时间为准",
      fee: "约 NZD 341 起，以官网为准",
      validity: "通常多次入境，单次停留最长 9 个月（以签证为准）",
      steps: [
        "在新西兰移民局官网创建账户，选择 Visitor Visa。",
        "在线填写申请表，上传护照、照片、资金和行程材料。",
        "按系统提示完成健康/品行声明；如被要求，预约体检。",
        "缴纳签证费，提交申请。",
        "跟踪进度，及时补充材料。",
        "获签后核对签证条件、停留期和入境次数。",
        "出发前填写新西兰旅客申报（NZTD）。"
      ],
      documents: [
        "护照（有效期覆盖行程）",
        "电子照片",
        "资金证明（约 NZD 1,000/月/人）",
        "返程/续程机票",
        "行程单和住宿订单",
        "在职证明/在读证明",
        "旅行保险（建议）",
        "旅行历史"
      ],
      entry: [
        "护照 + 有效新西兰签证。",
        "出发前填写 NZTD 旅客申报。",
        "入境时接受生物安全检查，申报食品、药品和户外装备。",
        "随身携带返程票、住宿和资金证明。",
        "旅游签证不得工作。"
      ],
      notes: [
        "新西兰生物安全极严，徒步鞋要清洁申报。",
        "中国公民访客签证不与 NZeTA 混用，需按签证要求入境。",
        "南岛山路多，自驾预留更多时间，冬季注意防滑链。",
        "皇后镇活动受天气影响大，预留备选日。"
      ],
      official: [
        { label: "新西兰移民局", url: "https://www.immigration.govt.nz/new-zealand-visas" },
        { label: "NZTD 旅客申报", url: "https://www.travellerdeclaration.govt.nz/" }
      ]
    },
    cities: [
      {
        name: "皇后镇",
        attractions: [
          {
            id: "nz-milford",
            name: "米尔福德峡湾",
            en: "Milford Sound",
            lat: -44.6414,
            lng: 167.8974,
            motif: "峡",
            cat: "峡湾 · 世界遗产",
            duration: "1 天",
            ticket: "游船约 NZD 100 起",
            highlight: "瀑布从悬崖直接落进峡湾，雨天更像仙境",
            highlights: ["峡湾游船", "瀑布", "米特峰"],
            play: ["坐游船", "看瀑布", "沿途镜湖停车"],
            tips: "从皇后镇单程约 4 小时，建议跟团或住米尔福德；加满油。",
            best: "全年（雨天更壮观）"
          },
          {
            id: "nz-skyline",
            name: "天空缆车",
            en: "Skyline Queenstown",
            lat: -45.0312,
            lng: 168.659,
            motif: "缆",
            cat: "观景 · 体验",
            duration: "2–3 小时",
            ticket: "约 NZD 60",
            highlight: "缆车升到山顶，瓦卡蒂普湖和雪山一起展开",
            highlights: ["山顶观景台", "滑板车", "星空餐厅"],
            play: ["坐缆车", "玩滑板车", "山顶看日落"],
            tips: "滑板车另收费；日落时段人多，提前订。",
            best: "日落"
          },
          {
            id: "nz-wanaka",
            name: "瓦纳卡湖",
            en: "Lake Wanaka",
            lat: -44.7,
            lng: 169.15,
            motif: "树",
            cat: "湖泊 · 徒步",
            duration: "半天",
            ticket: "免费",
            highlight: "湖中那棵孤树，和南阿尔卑斯山的倒影",
            highlights: ["瓦纳卡孤树", "罗伊峰", "湖畔步道"],
            play: ["拍孤树", "罗伊峰徒步", "湖边野餐"],
            tips: "罗伊峰徒步往返 5–6 小时，需体力；孤树停车位少。",
            best: "秋天"
          }
        ]
      },
      {
        name: "奥克兰",
        attractions: [
          {
            id: "nz-skytower",
            name: "天空塔",
            en: "Sky Tower",
            lat: -36.8485,
            lng: 174.7633,
            motif: "塔",
            cat: "城市地标",
            duration: "1.5 小时",
            ticket: "约 NZD 40",
            highlight: "南半球最高的独立建筑之一，看两座海港",
            highlights: ["观景台", "玻璃地板", "天空跳"],
            play: ["登塔看全景", "玻璃地板拍照", "天空跳"],
            tips: "日落前登塔；天空跳需预约，恐高慎入。",
            best: "日落"
          }
        ]
      }
    ]
  },
  {
    id: "vietnam",
    name: "越南",
    en: "Vietnam",
    flag: "🇻🇳",
    category: "apply",
    continent: "东南亚",
    stay: "90 天（电子签）",
    passport: "6 个月以上",
    currency: "越南盾 VND",
    language: "越南语",
    bestSeason: "11–4 月（南越）/ 3–5 月（北越）",
    days: "7–10 天",
    intro: "河内的老街、下龙湾的喀斯特和会安的灯笼。越南适合一路向南，吃一碗粉换一座城。",
    foods: ["河粉", "法棍三明治", "烤肉米线", "会安 cao lầu", "鸡蛋咖啡"],
    play: ["还剑湖", "下龙湾游船", "会安灯笼", "巴拿山金桥"],
    visa: {
      type: "越南电子签证（E-visa）",
      where: "在越南移民局官方电子签证门户在线申请，无需去使馆；也可通过越南驻华使领馆申请贴纸签。",
      processing: "通常 3 个工作日，旺季可能更久",
      fee: "单次约 $25，多次约 $50（以官网为准）",
      validity: "最长 90 天，单次或多次入境，以签证为准",
      steps: [
        "确认护照有效期 6 个月以上，确定入境/出境口岸和日期。",
        "在 evisa.gov.vn 官方门户填写申请，上传护照资料页和电子照片。",
        "填写临时住宿地址（酒店名称和地址），在线支付签证费。",
        "保存申请编号，等待审核，通常 3 个工作日。",
        "收到电子签证 PDF 后打印两份，核对姓名、护照号、日期和口岸。",
        "入境时出示护照、打印的电子签证，按指纹、拍照。",
        "离境时确认签证有效，不要逾期。"
      ],
      documents: [
        "护照（有效期 6 个月以上）",
        "电子照片（白底，按官网规格）",
        "护照资料页照片",
        "入境/出境日期和口岸",
        "酒店名称与地址",
        "国际信用卡（在线支付）"
      ],
      entry: [
        "护照 + 打印的电子签证。",
        "电子签证只能在申请时选择的口岸入境。",
        "入境时可能要求出示返程票和住宿证明。",
        "旅游签证不得工作。",
        "逾期停留会被罚款，离境时可能被盘问。"
      ],
      notes: [
        "只认 evisa.gov.vn 官方门户，警惕仿冒收费网站。",
        "电子签照片和护照信息必须清晰，信息错误可能导致拒绝入境。",
        "陆路口岸也支持电子签，但口岸名单以官网为准。",
        "越南盾面额大，换钱时注意核对。"
      ],
      official: [
        { label: "越南电子签证官方门户", url: "https://evisa.gov.vn/" },
        { label: "越南移民局", url: "https://xuatnhapcanh.gov.vn/" }
      ]
    },
    cities: [
      {
        name: "河内",
        attractions: [
          {
            id: "vn-hoankiem",
            name: "还剑湖",
            en: "Hoan Kiem Lake",
            lat: 21.0285,
            lng: 105.8542,
            motif: "湖",
            cat: "城市湖景",
            duration: "1.5 小时",
            ticket: "免费",
            highlight: "老城中心的一汪湖，清晨有人打太极",
            highlights: ["还剑湖", "玉山祠", "老城区"],
            play: ["清晨环湖", "逛老城三十六行街", "喝一杯鸡蛋咖啡"],
            tips: "周末晚上湖边步行街封路，很热闹；过马路要稳。",
            best: "清晨 / 夜晚"
          },
          {
            id: "vn-halong",
            name: "下龙湾",
            en: "Ha Long Bay",
            lat: 20.9101,
            lng: 107.1839,
            motif: "湾",
            cat: "海岛 · 世界遗产",
            duration: "1–2 天",
            ticket: "游船约 $80 起",
            highlight: "上千座石灰岩岛屿从海里长出来",
            highlights: ["喀斯特岛屿", "洞穴", "海上日落"],
            play: ["坐过夜游船", "划皮划艇", "看溶洞"],
            tips: "从河内单程约 2.5 小时；选正规游船，确认是否含接送。",
            best: "10–4 月"
          }
        ]
      },
      {
        name: "岘港 / 会安",
        attractions: [
          {
            id: "vn-hoian",
            name: "会安古城",
            en: "Hoi An Ancient Town",
            lat: 15.8801,
            lng: 108.338,
            motif: "灯",
            cat: "古城 · 世界遗产",
            duration: "半天",
            ticket: "古城通票约 ¥30",
            highlight: "黄墙、灯笼和秋盆河的夜",
            highlights: ["日本廊桥", "灯笼街", "秋盆河"],
            play: ["夜里看灯笼", "放水灯", "定做一件衣服"],
            tips: "每月农历十四有灯笼节；古城 17:00 后最挤。",
            best: "傍晚"
          },
          {
            id: "vn-bana",
            name: "巴拿山",
            en: "Ba Na Hills",
            lat: 15.995,
            lng: 107.996,
            motif: "桥",
            cat: "山岳 · 主题乐园",
            duration: "1 天",
            ticket: "约 ¥250",
            highlight: "巨手托起的金桥，和山上的法式小镇",
            highlights: ["金桥", "缆车", "法国村"],
            play: ["走金桥", "坐缆车", "逛法国村"],
            tips: "早上上山避开人流和雾；山上温差大，带外套。",
            best: "清晨"
          }
        ]
      }
    ]
  }
];
