/* 国际旅行总目录：三大签证类型 + 各国打卡点。 */
window.INTERNATIONAL_DATA = {
  baseline: "2025.06",
  categories: [
    {
      id: "free",
      name: "免签",
      en: "VISA FREE",
      short: "拿起护照就走",
      desc: "持中国普通护照可免签入境，但仍需准备返程票、住宿和资金证明；最终能否入境由边检决定。",
      note: "免签政策会随双边协议调整，出发前务必复核官方公告。",
      color: "#2f6b4f"
    },
    {
      id: "interview",
      name: "面签",
      en: "INTERVIEW",
      short: "需要本人面谈",
      desc: "通常需要在线申请后本人到使领馆面谈，回答旅行目的、资金来源和回国计划。材料真实、回答一致最重要。",
      note: "面签通过不等于保证入境，最终由口岸边检决定。",
      color: "#b05a3c"
    },
    {
      id: "apply",
      name: "申签",
      en: "APPLICATION",
      short: "递材料等审核",
      desc: "需要提前向使领馆或签证中心递交申请，部分国家需录指纹、面试或体检。建议至少提前 1–2 个月办理。",
      note: "各领区材料清单不同，先查自己所属领区的最新要求。",
      color: "#8a6a2f"
    }
  ],
  countries: [
    ...window.INTL_FREE,
    ...window.INTL_INTERVIEW,
    ...window.INTL_APPLY
  ]
};
