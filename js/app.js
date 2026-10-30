(() => {
  "use strict";

  const DOMESTIC = window.DOMESTIC_DATA;
  const INTL = window.INTERNATIONAL_DATA;
  const STORAGE_KEY = "journey-plan-v1";
  const LEGACY_STORAGE_KEY = "yuanxing-atlas-plan-v1";
  const GATE_KEY = "journey-gate-until";
  const GATE_HASH = "93e6664d4013d5c4f6dc6e2ebe44b35c33cada963c485633874b9bf3dec3f60b";
  const GATE_DAYS = 30;
  const CAT_MAP = new Map((INTL?.categories || []).map((cat) => [cat.id, cat]));

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  const icon = (name, cls = "") =>
    `<svg class="icon ${cls}" aria-hidden="true"><use href="#i-${name}"></use></svg>`;

  const escapeHtml = (value) =>
    String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");

  const escapeAttr = escapeHtml;

  const formatClock = (date = new Date()) =>
    new Intl.DateTimeFormat("zh-CN", { hour: "2-digit", minute: "2-digit", hour12: false }).format(date);

  const formatDate = (value) => {
    const date = value ? new Date(value) : new Date();
    if (Number.isNaN(date.getTime())) return "";
    return new Intl.DateTimeFormat("zh-CN", { year: "numeric", month: "2-digit", day: "2-digit" }).format(date);
  };

  function hasCoords(point) {
    if (!point) return false;
    const { lat, lng } = point;
    if (lat === null || lat === undefined || lat === "" || lng === null || lng === undefined || lng === "") {
      return false;
    }
    return Number.isFinite(Number(lat)) && Number.isFinite(Number(lng));
  }

  function distanceKm(a, b) {
    if (!hasCoords(a) || !hasCoords(b)) return Infinity;
    const R = 6371;
    const toRad = (deg) => (deg * Math.PI) / 180;
    const dLat = toRad(Number(b.lat) - Number(a.lat));
    const dLng = toRad(Number(b.lng) - Number(a.lng));
    const lat1 = toRad(Number(a.lat));
    const lat2 = toRad(Number(b.lat));
    const h =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
    return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)));
  }

  function formatKm(value, { precise = false } = {}) {
    if (!Number.isFinite(value)) return "—";
    if (value < 1) return `${Math.max(10, Math.round((value * 1000) / 10) * 10)} m`;
    if (value < 10 || precise) return `${value.toFixed(1)} km`;
    if (value < 100) return `${Math.round(value)} km`;
    return `${Math.round(value / 10) * 10} km`;
  }

  function averageCenter(attractions) {
    const points = attractions.filter(hasCoords);
    if (!points.length) return null;
    return {
      lat: points.reduce((sum, point) => sum + Number(point.lat), 0) / points.length,
      lng: points.reduce((sum, point) => sum + Number(point.lng), 0) / points.length
    };
  }

  function nearestOrder(items, anchor) {
    if (items.length <= 1) return [...items];
    const remaining = [...items];
    let start;
    if (hasCoords(anchor)) {
      start = remaining.reduce((best, item) =>
        distanceKm(item, anchor) < distanceKm(best, anchor) ? item : best
      );
    } else {
      start = remaining[0];
    }
    const ordered = [start];
    remaining.splice(remaining.indexOf(start), 1);
    while (remaining.length) {
      let next = remaining[0];
      if (hasCoords(ordered[ordered.length - 1])) {
        next = remaining.reduce((best, item) => {
          if (!hasCoords(item)) return best;
          if (!hasCoords(best)) return item;
          return distanceKm(item, ordered[ordered.length - 1]) <
            distanceKm(best, ordered[ordered.length - 1])
            ? item
            : best;
        });
      }
      ordered.push(next);
      remaining.splice(remaining.indexOf(next), 1);
    }
    return ordered;
  }

  function nearestNeighbors(attr, pool, limit = 2) {
    return pool
      .filter((candidate) => candidate !== attr && hasCoords(candidate))
      .map((candidate) => ({ attr: candidate, km: distanceKm(attr, candidate) }))
      .filter((entry) => Number.isFinite(entry.km))
      .sort((a, b) => a.km - b.km)
      .slice(0, limit);
  }

  function makeId() {
    if (window.crypto?.randomUUID) return window.crypto.randomUUID();
    return `stop-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  // ---------------------------------------------------------
  // Build normalized catalog records
  // ---------------------------------------------------------

  const attractionMap = new Map();
  const domesticCities = [];
  const intlCountries = [];
  const allAttractions = [];

  if (DOMESTIC?.cities) {
    DOMESTIC.cities.forEach((city) => {
      const cityRecord = {
        ...city,
        _type: "domestic",
        _country: "中国",
        _countryId: "china",
        _flag: "🇨🇳",
        _category: "domestic",
        _center: { lat: city.lat, lng: city.lng }
      };
      cityRecord.attractions = city.attractions.map((raw) => {
        const attr = {
          ...raw,
          _key: `d:${raw.id}`,
          _source: "domestic",
          _city: city.name,
          _cityId: city.id,
          _country: "中国",
          _countryId: "china",
          _flag: "🇨🇳",
          _category: "domestic",
          _countryName: "中国"
        };
        attractionMap.set(attr._key, attr);
        allAttractions.push(attr);
        return attr;
      });
      cityRecord._orderedAttractions = nearestOrder(cityRecord.attractions, cityRecord._center);
      cityRecord._orderedAttractions.forEach((attr, index) => {
        attr._suggestIndex = index + 1;
        attr._suggestPrev = index > 0 ? cityRecord._orderedAttractions[index - 1] : null;
      });
      domesticCities.push(cityRecord);
    });
  }

  if (INTL?.countries) {
    INTL.countries.forEach((country) => {
      const countryRecord = {
        ...country,
        _type: "international",
        _center: null,
        _attractions: []
      };
      countryRecord.cities = country.cities.map((city) => {
        const cityRecord = {
          ...city,
          _countryId: country.id,
          _country: country.name,
          _flag: country.flag,
          _category: country.category,
          _source: "international"
        };
        cityRecord.attractions = city.attractions.map((raw) => {
          const attr = {
            ...raw,
            _key: `i:${raw.id}`,
            _source: "international",
            _city: city.name,
            _cityId: `${country.id}-${city.name}`,
            _country: country.name,
            _countryId: country.id,
            _countryName: country.name,
            _flag: country.flag,
            _category: country.category
          };
          attractionMap.set(attr._key, attr);
          allAttractions.push(attr);
          return attr;
        });
        cityRecord._center = averageCenter(cityRecord.attractions);
        cityRecord._orderedAttractions = nearestOrder(cityRecord.attractions, cityRecord._center);
        cityRecord._orderedAttractions.forEach((attr, index) => {
          attr._suggestIndex = index + 1;
          attr._suggestPrev = index > 0 ? cityRecord._orderedAttractions[index - 1] : null;
        });
        countryRecord._attractions.push(...cityRecord.attractions);
        return cityRecord;
      });
      countryRecord._center = averageCenter(countryRecord._attractions);
      countryRecord._orderedAttractions = countryRecord.cities.flatMap(
        (city) => city._orderedAttractions
      );
      intlCountries.push(countryRecord);
    });
  }

  const countryMap = new Map(intlCountries.map((country) => [country.id, country]));
  const domesticCityMap = new Map(domesticCities.map((city) => [city.id, city]));

  // ---------------------------------------------------------
  // State
  // ---------------------------------------------------------

  const emptyPlan = () => ({
    version: 1,
    title: "我的旅行计划",
    items: [],
    updatedAt: null
  });

  const state = {
    view: "domestic",
    region: "all",
    intlCategory: "free",
    domesticQuery: "",
    intlQuery: "",
    collapsedCities: new Set(),
    collapsedCountries: new Set(),
    expandedStops: new Set(),
    plan: emptyPlan(),
    localTouched: false,
    hydrated: false,
    saveState: "local"
  };

  let domesticSearchTimer = null;
  let intlSearchTimer = null;
  let toastTimer = null;
  let syncTimer = null;
  let syncRunning = false;
  let syncPending = false;
  let dirty = false;
  let dragState = null;
  let confirmResolver = null;

  const els = {
    domesticView: $("#domesticView"),
    internationalView: $("#internationalView"),
    domesticSearch: $("#domesticSearch"),
    intlSearch: $("#intlSearch"),
    regionChips: $("#regionChips"),
    routeList: $("#routeList"),
    cityList: $("#cityList"),
    countryList: $("#countryList"),
    domesticEmpty: $("#domesticEmpty"),
    intlEmpty: $("#intlEmpty"),
    domesticCount: $("#domesticCount"),
    domesticCityCount: $("#domesticCityCount"),
    intlCount: $("#intlCount"),
    intlAttractionCount: $("#intlAttractionCount"),
    visaTabs: $("#visaTabs"),
    visaCategoryBanner: $("#visaCategoryBanner"),
    visaBannerTitle: $("#visaBannerTitle"),
    visaBannerDesc: $("#visaBannerDesc"),
    visaBaseline: $("#visaBaseline"),
    intlBaselineText: $("#intlBaselineText"),
    planPanel: $("#planPanel"),
    planList: $("#planList"),
    planEmpty: $("#planEmpty"),
    planTitle: $("#planTitle"),
    planSubtitle: $("#planSubtitle"),
    planTotal: $("#planTotal"),
    planDone: $("#planDone"),
    planDistance: $("#planDistance"),
    progressText: $("#progressText"),
    progressFill: $("#progressFill"),
    optimizeBtn: $("#optimizeBtn"),
    clearBtn: $("#clearBtn"),
    customBtn: $("#customBtn"),
    nextStops: $("#nextStops"),
    nextStopList: $("#nextStopList"),
    saveStatus: $("#saveStatus"),
    heroPlanCount: $("#heroPlanCount"),
    mobilePlanCount: $("#mobilePlanCount"),
    mobilePlanCount2: $("#mobilePlanCount2"),
    mobilePlanBtn: $("#mobilePlanBtn"),
    mobilePlanIconBtn: $("#mobilePlanIconBtn"),
    closePlanBtn: $("#closePlanBtn"),
    drawerBackdrop: $("#drawerBackdrop"),
    visaDialog: $("#visaDialog"),
    visaContent: $("#visaContent"),
    customDialog: $("#customDialog"),
    customForm: $("#customForm"),
    customName: $("#customName"),
    customCity: $("#customCity"),
    customDuration: $("#customDuration"),
    customNote: $("#customNote"),
    confirmDialog: $("#confirmDialog"),
    confirmTitle: $("#confirmTitle"),
    confirmText: $("#confirmText"),
    confirmOk: $("#confirmOk"),
    confirmCancel: $("#confirmCancel"),
    toast: $("#toast"),
    exportBtn: $("#exportBtn"),
    printBtn: $("#printBtn"),
    connectionText: $("#connectionText"),
    logoutBtn: $("#logoutBtn"),
    lockBtn: $("#lockBtn"),
    gateForm: $("#gateForm"),
    gateCode: $("#gateCode"),
    gateError: $("#gateError"),
    searchOpenBtn: $("#searchOpenBtn"),
    heroSearchBtn: $("#heroSearchBtn"),
    searchDialog: $("#searchDialog"),
    globalSearch: $("#globalSearch"),
    searchRecommend: $("#searchRecommend"),
    searchResults: $("#searchResults")
  };

  // ---------------------------------------------------------
  // Plan persistence
  // ---------------------------------------------------------

  function planItemFromAttr(attr) {
    return {
      uid: makeId(),
      refKey: attr._key,
      refId: attr.id,
      source: attr._source,
      title: attr.name,
      en: attr.en || "",
      city: attr._city || "",
      country: attr._country || "",
      flag: attr._flag || "",
      category: attr._category || "",
      motif: attr.motif || "",
      lat: Number(attr.lat),
      lng: Number(attr.lng),
      duration: attr.duration || "",
      ticket: attr.ticket || "",
      checked: false,
      custom: false,
      note: ""
    };
  }

  function normalizePlan(raw) {
    if (!raw || typeof raw !== "object" || !Array.isArray(raw.items)) return null;
    const seen = new Set();
    const items = [];
    raw.items.forEach((stored) => {
      if (!stored || typeof stored.title !== "string") return;
      let item = null;
      const key = stored.refKey || (stored.source && stored.refId ? `${stored.source === "domestic" ? "d" : "i"}:${stored.refId}` : null);
      const attr = key ? attractionMap.get(key) : null;
      if (attr) {
        item = planItemFromAttr(attr);
      } else if (stored.custom) {
        item = {
          uid: stored.uid || makeId(),
          refKey: null,
          refId: null,
          source: "custom",
          title: String(stored.title).slice(0, 80),
          en: "",
          city: String(stored.city || "").slice(0, 40),
          country: "",
          flag: "",
          category: "custom",
          motif: "·",
          lat: null,
          lng: null,
          duration: String(stored.duration || "").slice(0, 30),
          ticket: "",
          checked: !!stored.checked,
          custom: true,
          note: String(stored.note || "").slice(0, 240)
        };
      } else if (stored.title) {
        item = {
          ...stored,
          uid: stored.uid || makeId(),
          refKey: null,
          source: "custom",
          lat: hasCoords(stored) ? Number(stored.lat) : null,
          lng: hasCoords(stored) ? Number(stored.lng) : null,
          checked: !!stored.checked,
          custom: true
        };
      }
      if (!item) return;
      const dedupeKey = item.refKey || `uid:${item.uid}`;
      if (seen.has(dedupeKey)) return;
      seen.add(dedupeKey);
      item.uid = stored.uid || item.uid;
      item.checked = !!stored.checked;
      if (stored.note) item.note = String(stored.note).slice(0, 240);
      items.push(item);
    });
    const title = typeof raw.title === "string" && raw.title.trim() ? raw.title.slice(0, 40) : "我的旅行计划";
    return {
      version: 1,
      title,
      items,
      updatedAt: typeof raw.updatedAt === "string" ? raw.updatedAt : new Date().toISOString()
    };
  }

  function loadLocalPlan() {
    try {
      let raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        raw = localStorage.getItem(LEGACY_STORAGE_KEY);
        if (raw) localStorage.setItem(STORAGE_KEY, raw);
      }
      return raw ? normalizePlan(JSON.parse(raw)) : null;
    } catch {
      return null;
    }
  }

  function persistLocal() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.plan));
    } catch {
      setSaveStatus("浏览器存储不可用");
    }
  }

  function setSaveStatus(text) {
    if (els.saveStatus) els.saveStatus.textContent = text;
  }

  async function sha256Hex(value) {
    const data = new TextEncoder().encode(value);
    const digest = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
  }

  function gateIsOpen() {
    return document.documentElement.classList.contains("gate-locked");
  }

  function lockJourney() {
    try {
      localStorage.removeItem(GATE_KEY);
    } catch {}
    document.documentElement.classList.add("gate-locked");
    if (els.gateCode) {
      els.gateCode.value = "";
      window.setTimeout(() => els.gateCode.focus(), 30);
    }
  }

  function initGate() {
    let unlocked = false;
    try {
      unlocked = Number(localStorage.getItem(GATE_KEY)) > Date.now();
    } catch {}
    if (unlocked) document.documentElement.classList.remove("gate-locked");
    else window.setTimeout(() => els.gateCode?.focus(), 120);

    els.gateForm?.addEventListener("submit", async (event) => {
      event.preventDefault();
      const value = els.gateCode.value.trim();
      if (!value) return;
      try {
        const hash = await sha256Hex(value);
        if (hash !== GATE_HASH) throw new Error("wrong");
        try {
          localStorage.setItem(GATE_KEY, String(Date.now() + GATE_DAYS * 24 * 60 * 60 * 1000));
        } catch {}
        document.documentElement.classList.remove("gate-locked");
        els.gateError.textContent = "";
        els.gateCode.value = "";
        toast("欢迎回来");
      } catch {
        els.gateError.textContent = "密码不正确，请再试一次。";
        els.gateForm.classList.remove("is-error");
        void els.gateForm.offsetWidth;
        els.gateForm.classList.add("is-error");
        els.gateCode.select();
      }
    });

    els.lockBtn?.addEventListener("click", lockJourney);
  }

  function redirectToLogin() {
    if (location.pathname !== "/login") location.assign("/login");
  }

  async function loadSession() {
    try {
      const response = await fetch("api/session", { cache: "no-store" });
      if (!response.ok) return;
      const session = await response.json();
      if (session.authEnabled && els.logoutBtn) els.logoutBtn.hidden = false;
    } catch {
      // Offline preview still works with the local plan.
    }
  }

  function updateConnectionBadge(isOnline) {
    if (!els.connectionText) return;
    els.connectionText.textContent = isOnline ? "ONLINE" : "LOCAL";
  }

  async function loadConnectionStatus() {
    try {
      const response = await fetch("api/health", { cache: "no-store" });
      if (response.ok) {
        const health = await response.json();
        updateConnectionBadge(!!health.online);
        if (health.authEnabled && els.logoutBtn) els.logoutBtn.hidden = false;
        return;
      }
    } catch {
      // fall through to a hostname-based guess
    }
    const localHosts = ["localhost", "127.0.0.1", "::1"];
    updateConnectionBadge(!localHosts.includes(location.hostname));
  }

  function scheduleSync(delay = 550) {
    window.clearTimeout(syncTimer);
    syncTimer = window.setTimeout(syncPlan, delay);
  }

  async function syncPlan() {
    if (!state.plan) return;
    if (syncRunning) {
      syncPending = true;
      return;
    }
    syncRunning = true;
    setSaveStatus("同步中…");
    try {
      const response = await fetch("api/plan", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state.plan),
        keepalive: true
      });
      if (response.status === 401) {
        redirectToLogin();
        return;
      }
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      dirty = false;
      setSaveStatus(`已同步 · ${formatClock()}`);
    } catch {
      setSaveStatus("仅保存在浏览器");
    } finally {
      syncRunning = false;
      if (syncPending) {
        syncPending = false;
        syncPlan();
      }
    }
  }

  async function hydrateFromServer() {
    setSaveStatus("同步中…");
    try {
      const response = await fetch("api/plan", { cache: "no-store" });
      if (response.status === 401) {
        redirectToLogin();
        return;
      }
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const serverPlan = normalizePlan(await response.json());
      state.hydrated = true;
      if (state.localTouched) {
        scheduleSync(0);
        return;
      }
      const localTime = Date.parse(state.plan.updatedAt || "") || 0;
      const serverTime = Date.parse(serverPlan?.updatedAt || "") || 0;
      if (serverPlan && serverPlan.items.length && (!state.plan.items.length || serverTime > localTime)) {
        state.plan = serverPlan;
        persistLocal();
        renderPlan();
        setSaveStatus("已载入上次行程");
      } else if (state.plan.items.length) {
        scheduleSync(0);
      } else {
        setSaveStatus("已同步");
      }
    } catch {
      state.hydrated = true;
      setSaveStatus("仅保存在浏览器");
    }
  }

  function commitPlan({ render = true } = {}) {
    state.plan.updatedAt = new Date().toISOString();
    state.localTouched = true;
    dirty = true;
    persistLocal();
    if (render) renderPlan();
    scheduleSync();
  }

  // ---------------------------------------------------------
  // Rendering helpers
  // ---------------------------------------------------------

  function renderHero() {
    const allCount = allAttractions.length;
    const domesticCount = domesticCities.reduce((sum, city) => sum + city.attractions.length, 0);
    const intlCount = intlCountries.reduce((sum, country) => sum + country._attractions.length, 0);
    const planCount = state.plan.items.length;

    const heroNumbers = $$("#heroStats dd strong");
    if (heroNumbers[0]) heroNumbers[0].textContent = String(domesticCities.length);
    if (heroNumbers[1]) heroNumbers[1].textContent = String(allCount);
    if (heroNumbers[2]) heroNumbers[2].textContent = String(intlCountries.length);
    els.domesticCount.textContent = String(domesticCount);
    els.domesticCityCount.textContent = String(domesticCities.length);
    els.intlCount.textContent = String(intlCountries.length);
    els.intlAttractionCount.textContent = String(intlCount);
    els.heroPlanCount.textContent = String(planCount);
    els.mobilePlanCount.textContent = String(planCount);
    els.mobilePlanCount2.textContent = String(planCount);
    document.title = planCount
      ? `${state.plan.title || "我的旅行计划"} · Journey`
      : "Journey · 私人旅行计划";
  }

  function renderRegionChips() {
    els.regionChips.innerHTML = (DOMESTIC?.regions || []).map((region) => `
      <button class="region-chip${state.region === region.id ? " is-active" : ""}"
        type="button" data-region="${escapeAttr(region.id)}">${escapeHtml(region.name)}</button>
    `).join("");
  }

  function matchCity(city, query) {
    if (!query) return true;
    const haystack = [
      city.name, city.en, city.region, city.subtitle, city.intro, city.bestSeason, city.days,
      ...(city.foods || []), ...(city.play || []),
      ...city.attractions.flatMap((attr) => [
        attr.name, attr.en, attr.cat, attr.highlight, attr.tips,
        ...(attr.highlights || []), ...(attr.play || [])
      ])
    ].join(" ").toLowerCase();
    return haystack.includes(query);
  }

  function routeMatches(route, query) {
    if (!query) return true;
    const stopNames = route.stops.map((id) => domesticCityMap.get(id)).filter(Boolean);
    const names = route.stops.map((id) => {
      const city = domesticCities.find((candidate) => candidate.attractions.some((attr) => attr.id === id));
      return city?.attractions.find((attr) => attr.id === id)?.name || "";
    });
    const haystack = [
      route.title, route.subtitle, route.summary, route.tip, route.region,
      ...(route.foods || []), ...(route.play || []), ...names, ...stopNames.map((s) => s.name)
    ].join(" ").toLowerCase();
    return haystack.includes(query);
  }

  function renderDomestic() {
    const query = state.domesticQuery.trim().toLowerCase();
    const cities = domesticCities.filter((city) =>
      (state.region === "all" || city.region === state.region) && matchCity(city, query)
    );
    const visibleAttractions = cities.reduce((sum, city) => sum + city.attractions.length, 0);
    els.domesticCount.textContent = String(visibleAttractions);
    els.domesticCityCount.textContent = String(cities.length);
    els.domesticEmpty.hidden = cities.length > 0;
    els.cityList.innerHTML = cities.map(renderCityBlock).join("");

    const routes = (DOMESTIC?.routes || []).filter((route) =>
      (state.region === "all" || route.region === state.region) && routeMatches(route, query)
    );
    els.routeList.innerHTML = routes.length
      ? routes.map(renderRouteCard).join("")
      : `<div class="empty-panel compact"><h3>这一段还没有现成线路</h3><p>换个地区，或者直接在下面按城市挑打卡点。</p></div>`;
    updateAddedStates();
  }

  function renderCityBlock(city) {
    const collapsed = state.collapsedCities.has(city.id) && !state.domesticQuery.trim();
    const ordered = city._orderedAttractions;
    const routeText = ordered.map((attr) => attr.name).join(" → ");
    const foods = (city.foods || []).slice(0, 5);
    const plays = (city.play || []).slice(0, 4);

    return `
      <article class="city-block${collapsed ? " is-collapsed" : ""}" data-city-block="${escapeAttr(city.id)}">
        <div class="city-head">
          <div class="city-title-wrap">
            <div class="city-title-line">
              <h3>${escapeHtml(city.name)}</h3>
              <span class="city-en">${escapeHtml(city.en || "")}</span>
            </div>
            <p class="city-sub">${escapeHtml(city.subtitle || "")}</p>
          </div>
          <div class="city-badges">
            <span class="city-badge">${icon("calendar")}${escapeHtml(city.bestSeason || "四季")}</span>
            <span class="city-badge">${icon("clock")}${escapeHtml(city.days || "")}</span>
            <span class="city-badge">${icon("pin")}${city.attractions.length} 个打卡点</span>
          </div>
          <button class="city-collapse" type="button" data-toggle-city="${escapeAttr(city.id)}"
            aria-label="${collapsed ? "展开" : "收起"}${escapeAttr(city.name)}" aria-expanded="${!collapsed}">
            ${icon("chevron")}
          </button>
        </div>
        <div class="city-body">
          <div class="city-intro-row">
            <p class="city-intro">${escapeHtml(city.intro || "")}</p>
            <div class="city-route-order">
              <strong>就近游览顺序 · 从市中心起算</strong>
              ${escapeHtml(routeText)}
            </div>
          </div>
          <div class="city-taste-row">
            <span class="taste-label">吃</span>
            ${foods.map((food) => `<span class="taste-chip">${escapeHtml(food)}</span>`).join("")}
            <span class="taste-label" style="margin-left:8px">玩</span>
            ${plays.map((play) => `<span class="taste-chip play">${escapeHtml(play)}</span>`).join("")}
          </div>
          <div class="attraction-grid">
            ${ordered.map((attr) => renderStopCard(attr, city._orderedAttractions)).join("")}
          </div>
        </div>
      </article>
    `;
  }

  function renderRouteCard(route) {
    const stopAttrs = route.stops
      .map((id) => {
        const city = domesticCities.find((candidate) => candidate.attractions.some((attr) => attr.id === id));
        return city?.attractions.find((attr) => attr.id === id);
      })
      .filter(Boolean);
    const present = stopAttrs.filter((attr) => hasRef(attr._key)).length;
    const total = stopAttrs.length;
    const complete = present === total && total > 0;
    const missing = total - present;
    const routeKm = stopAttrs.reduce((sum, attr, index) => {
      if (index === 0) return sum;
      const distance = distanceKm(stopAttrs[index - 1], attr);
      return Number.isFinite(distance) ? sum + distance : sum;
    }, 0);

    return `
      <article class="route-card-item">
        <div class="route-card-head">
          <span class="route-motif">${escapeHtml(route.motif || "路")}</span>
          <div class="route-title-wrap">
            <h4>${escapeHtml(route.title)}</h4>
            <p>${escapeHtml(route.subtitle || "")}</p>
          </div>
          <span class="route-days-badge">${route.days} 天</span>
        </div>
        <p class="route-summary">${escapeHtml(route.summary || "")}</p>
        <div class="route-stops">
          ${stopAttrs.map((attr, index) => `
            ${index ? `<span class="route-arrow">→</span>` : ""}
            <span class="route-stop">${escapeHtml(attr.name)}</span>
          `).join("")}
        </div>
        <div class="route-meta-row">
          <span>${icon("calendar")}${escapeHtml(route.season || "")}</span>
          <span>${icon("route")}约 ${Math.round(routeKm)} km</span>
          <span>${icon("ticket")}${escapeHtml(route.budget || "")}</span>
        </div>
        <p class="route-tip">${escapeHtml(route.tip || "")}</p>
        <div class="route-actions">
          <span class="route-foods">${escapeHtml((route.foods || []).slice(0, 3).join(" · "))}</span>
          <button class="route-add${complete ? " is-added" : ""}" type="button"
            data-add-route="${escapeAttr(route.id)}" ${complete ? "disabled" : ""}>
            ${icon(complete ? "check" : "plus")}
            ${complete ? "已全部加入" : missing === total ? "整条加入" : `还差 ${missing} 站`}
          </button>
        </div>
      </article>
    `;
  }

  function renderStopCard(attr, pool) {
    const added = hasRef(attr._key);
    const expanded = state.expandedStops.has(attr._key);
    const neighbors = nearestNeighbors(attr, pool, 2);
    const nearestText = neighbors.length
      ? neighbors.map((entry) => `<b>${escapeHtml(entry.attr.name)}</b> ${formatKm(entry.km)}`).join(" · ")
      : "同城仅此一处";

    return `
      <article class="stop-card${added ? " is-added" : ""}" draggable="true"
        data-key="${escapeAttr(attr._key)}" data-drag-card="true">
        <div class="stop-top">
          <span class="stop-motif">${escapeHtml(attr.motif || "·")}</span>
          <div class="stop-title-wrap">
            <h4 class="stop-title">${escapeHtml(attr.name)}</h4>
            <p class="stop-en">${escapeHtml(attr.en || "")}</p>
          </div>
          <span class="stop-order" title="按地理位置的就近顺序">${String(attr._suggestIndex || 1).padStart(2, "0")}</span>
        </div>
        <p class="stop-cat">${escapeHtml(attr.cat || "")}</p>
        <p class="stop-highlight">${escapeHtml(attr.highlight || "")}</p>
        <div class="stop-meta">
          <span>${icon("clock")}${escapeHtml(attr.duration || "")}</span>
          <span>${icon("ticket")}${escapeHtml(attr.ticket || "")}</span>
        </div>
        <div class="stop-nearest">${icon("pin")}<span>近邻：${nearestText}</span></div>
        <div class="stop-actions">
          <button class="add-btn${added ? " is-added" : ""}" type="button"
            data-add-key="${escapeAttr(attr._key)}" ${added ? "disabled" : ""}>
            ${icon(added ? "check" : "plus")}${added ? "已在计划" : "加入"}
          </button>
          <button class="details-btn${expanded ? " is-open" : ""}" type="button"
            data-toggle-details="${escapeAttr(attr._key)}" aria-expanded="${expanded}">
            玩法与贴士 ${icon("chevron")}
          </button>
        </div>
        <div class="stop-details${expanded ? " is-open" : ""}">
          <div class="detail-section">
            <strong>${icon("pin")}值得看</strong>
            <ul>${(attr.highlights || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
          </div>
          <div class="detail-section">
            <strong>${icon("spark")}怎么玩</strong>
            <ul>${(attr.play || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
          </div>
          <p class="detail-tip"><b>提示：</b>${escapeHtml(attr.tips || "出发前查看开放时间与预约规则。")}</p>
        </div>
      </article>
    `;
  }

  function renderInternational() {
    const category = CAT_MAP.get(state.intlCategory) || CAT_MAP.get("free");
    const query = state.intlQuery.trim().toLowerCase();

    els.visaTabs.innerHTML = (INTL?.categories || []).map((cat) => {
      const count = intlCountries.filter((country) => country.category === cat.id).length;
      const active = state.intlCategory === cat.id;
      return `
        <button class="visa-tab${active ? " is-active" : ""}" type="button" role="tab"
          aria-selected="${active}" data-category="${escapeAttr(cat.id)}"
          style="--tab-color:${cat.color};--tab-bg:#eee4d2">
          <div class="visa-tab-top">
            <span class="visa-tab-name">${escapeHtml(cat.name)}</span>
            <span class="visa-tab-count">${count}</span>
          </div>
          <span class="visa-tab-en">${escapeHtml(cat.en)}</span>
          <span class="visa-tab-desc">${escapeHtml(cat.short)}</span>
        </button>
      `;
    }).join("");

    if (category) {
      els.visaBannerTitle.textContent = `${category.name} · ${category.short}`;
      els.visaBannerDesc.textContent = category.desc;
      els.visaBaseline.textContent = `资料基线 ${INTL.baseline || "2025.06"}`;
      els.intlBaselineText.textContent = INTL.baseline || "2025.06";
    }

    const countries = intlCountries.filter((country) => {
      if (country.category !== state.intlCategory) return false;
      if (!query) return true;
      const haystack = [
        country.name, country.en, country.intro, country.stay, country.currency, country.language,
        ...(country.foods || []), ...(country.play || []),
        country.visa?.type, country.visa?.where,
        ...country.cities.flatMap((city) => [
          city.name,
          ...city.attractions.flatMap((attr) => [
            attr.name, attr.en, attr.cat, attr.highlight,
            ...(attr.highlights || []), ...(attr.play || [])
          ])
        ])
      ].join(" ").toLowerCase();
      return haystack.includes(query);
    });

    const attractionCount = countries.reduce((sum, country) => sum + country._attractions.length, 0);
    const allIntlAttractions = intlCountries.reduce((sum, country) => sum + country._attractions.length, 0);
    els.intlCount.textContent = String(query ? countries.length : intlCountries.length);
    els.intlAttractionCount.textContent = String(query ? attractionCount : allIntlAttractions);
    els.intlEmpty.hidden = countries.length > 0;
    els.countryList.innerHTML = countries.map((country) =>
      renderCountryBlock(country, !!query)
    ).join("");
    updateAddedStates();
  }

  function renderCountryBlock(country, forceOpen) {
    const collapsed = state.collapsedCountries.has(country.id) && !forceOpen;
    const allKeys = countryAttractionKeys(country);
    const addedCount = allKeys.filter(hasRef).length;
    const allAdded = addedCount === allKeys.length && allKeys.length > 0;

    return `
      <article class="country-block${collapsed ? " is-collapsed" : ""}" data-country-block="${escapeAttr(country.id)}">
        <div class="country-head" draggable="true" data-drag-country="${escapeAttr(country.id)}" title="拖动标题，可把全国打卡点加入计划">
          <span class="country-flag">${escapeHtml(country.flag || "🌍")}</span>
          <div class="country-title-wrap">
            <div class="country-title-line">
              <h3>${escapeHtml(country.name)}</h3>
              <span class="country-en">${escapeHtml(country.en || "")}</span>
            </div>
            <div class="country-badges">
              <span class="badge ${badgeClass(country.category)}">${escapeHtml(CAT_MAP.get(country.category)?.name || "")}</span>
              <span class="badge">${icon("clock")}${escapeHtml(country.stay || "")}</span>
              <span class="badge">${icon("calendar")}${escapeHtml(country.bestSeason || "")}</span>
              <span class="badge">${escapeHtml(country.days || "")}</span>
            </div>
          </div>
          <div class="country-actions">
            <span class="country-drag-hint">${icon("grip")}拖标题 = 全国加入</span>
            <button class="country-add${allAdded ? " is-added" : ""}" type="button"
              data-add-country="${escapeAttr(country.id)}" ${allAdded ? "disabled" : ""}>
              ${icon(allAdded ? "check" : "plus")}${allAdded ? "已全部加入" : "全部加入"}
            </button>
            <button class="visa-btn" type="button" data-visa-country="${escapeAttr(country.id)}">
              ${icon("doc")}签证教程
            </button>
            <button class="country-collapse" type="button" data-toggle-country="${escapeAttr(country.id)}"
              aria-label="${collapsed ? "展开" : "收起"}${escapeAttr(country.name)}" aria-expanded="${!collapsed}">
              ${icon("chevron")}
            </button>
          </div>
        </div>
        <div class="country-body">
          <div class="country-intro">
            <p>${escapeHtml(country.intro || "")}</p>
            <div class="country-facts">
              <span class="country-fact">${escapeHtml(country.currency || "")}</span>
              <span class="country-fact">${escapeHtml(country.language || "")}</span>
              <span class="country-fact">护照 ${escapeHtml(country.passport || "")}</span>
              <span class="country-fact">${escapeHtml(country.visa?.processing || "")}</span>
            </div>
          </div>
          <div class="country-tastes">
            ${(country.foods || []).slice(0, 4).map((food) => `<span class="taste-chip">${escapeHtml(food)}</span>`).join("")}
            ${(country.play || []).slice(0, 4).map((play) => `<span class="taste-chip play">${escapeHtml(play)}</span>`).join("")}
          </div>
          <div class="country-route-order">
            <strong>城市内由近到远 · 全部加入按此顺序</strong>
            ${country.cities.map((city) => `${escapeHtml(city.name)}：${city._orderedAttractions.map((attr) => escapeHtml(attr.name)).join(" → ")}`).join(" ｜ ")}
          </div>
          ${country.cities.map((city) => renderIntlCity(city)).join("")}
        </div>
      </article>
    `;
  }

  function renderIntlCity(city) {
    return `
      <div class="intl-city">
        <div class="intl-city-head">
          <h4>${escapeHtml(city.name)}</h4>
          <span>${city._orderedAttractions.length} 个打卡点 · 建议由近到远</span>
        </div>
        <div class="intl-grid">
          ${city._orderedAttractions.map((attr) => renderStopCard(attr, city._orderedAttractions)).join("")}
        </div>
      </div>
    `;
  }

  function badgeClass(category) {
    if (category === "free") return "green";
    if (category === "interview") return "terra";
    return "gold";
  }

  function countryAttractionKeys(country) {
    return country._orderedAttractions.map((attr) => attr._key);
  }

  // ---------------------------------------------------------
  // Plan rendering
  // ---------------------------------------------------------

  function hasRef(key) {
    return state.plan.items.some((item) => item.refKey === key);
  }

  function planMetrics() {
    let total = 0;
    state.plan.items.forEach((item, index) => {
      if (index === 0) {
        item._distanceFromPrev = null;
        return;
      }
      const previous = state.plan.items[index - 1];
      const distance = distanceKm(previous, item);
      item._distanceFromPrev = Number.isFinite(distance) ? distance : null;
      if (Number.isFinite(distance)) total += distance;
    });
    return {
      total,
      done: state.plan.items.filter((item) => item.checked).length,
      count: state.plan.items.length
    };
  }

  function planSummaryText(metrics) {
    if (!state.plan.items.length) return "从一座城市开始。";
    const first = state.plan.items[0];
    const firstPlace = first.city || first.country || "自定义";
    const distance = metrics.total > 0 ? ` · 约 ${Math.round(metrics.total)} km` : "";
    return `${state.plan.items.length} 站 · ${firstPlace} 出发${distance}`;
  }

  function renderPlan() {
    const metrics = planMetrics();
    const count = metrics.count;
    const done = metrics.done;

    if (els.planTitle && document.activeElement !== els.planTitle) {
      els.planTitle.value = state.plan.title || "我的旅行计划";
    }
    els.planTotal.textContent = String(count);
    els.planDone.textContent = String(done);
    els.planDistance.textContent = metrics.total > 0 ? String(Math.round(metrics.total)) : "0";
    els.progressText.textContent = `${done} / ${count}`;
    els.progressFill.style.width = count ? `${(done / count) * 100}%` : "0%";
    els.planEmpty.hidden = count > 0;
    els.planList.hidden = count === 0;
    els.optimizeBtn.disabled = count < 2;
    els.clearBtn.disabled = count === 0;
    els.mobilePlanCount.textContent = String(count);
    els.mobilePlanCount2.textContent = String(count);
    els.heroPlanCount.textContent = String(count);

    if (!count) {
      els.planSubtitle.textContent = "从一座城市开始。";
      els.planList.innerHTML = "";
    } else {
      els.planSubtitle.textContent = planSummaryText(metrics);
      els.planList.innerHTML = state.plan.items.map(renderPlanItem).join("");
    }

    renderNextStops();
    updateAddedStates();
    document.title = count
      ? `${state.plan.title || "我的旅行计划"} · Journey`
      : "Journey · 私人旅行计划";
  }

  function renderPlanItem(item, index) {
    const previous = index > 0 ? state.plan.items[index - 1] : null;
    const distance = item._distanceFromPrev;
    let distanceText = "起点站";
    if (index > 0) {
      if (Number.isFinite(distance)) distanceText = `距上一站 ${formatKm(distance)}`;
      else distanceText = previous && !hasCoords(previous) ? "上一站未设坐标" : "未设坐标";
    }
    const meta = [item.city, item.duration].filter(Boolean).join(" · ");
    const flag = item.flag ? `<span class="item-flag">${escapeHtml(item.flag)}</span>` : "";
    return `
      <div class="plan-item${item.checked ? " is-checked" : ""}" data-uid="${escapeAttr(item.uid)}" draggable="true">
        <div class="item-drag" title="拖动排序">${icon("grip")}</div>
        <button class="item-check" type="button" data-check-uid="${escapeAttr(item.uid)}"
          aria-label="${item.checked ? "标记为未完成" : "标记为已完成"}" aria-pressed="${item.checked}">
          ${icon("check")}
        </button>
        <div class="item-main">
          <div class="item-topline">
            <span class="item-index">${String(index + 1).padStart(2, "0")}</span>
            <span class="item-title">${flag}${escapeHtml(item.title)}</span>
          </div>
          <div class="item-meta">${escapeHtml(meta || "自定义行程")}</div>
          <div class="item-distance">${icon(index === 0 ? "pin" : "route")}${escapeHtml(distanceText)}</div>
        </div>
        <div class="item-controls">
          <button class="item-btn" type="button" data-move-uid="${escapeAttr(item.uid)}" data-direction="-1"
            ${index === 0 ? "disabled" : ""} aria-label="上移">${icon("up")}</button>
          <button class="item-btn" type="button" data-move-uid="${escapeAttr(item.uid)}" data-direction="1"
            ${index === state.plan.items.length - 1 ? "disabled" : ""} aria-label="下移">${icon("down")}</button>
          <button class="item-btn delete" type="button" data-delete-uid="${escapeAttr(item.uid)}"
            aria-label="删除这一站">${icon("trash")}</button>
        </div>
      </div>
    `;
  }

  function renderNextStops() {
    if (!state.plan.items.length) {
      els.nextStops.hidden = true;
      return;
    }
    let origin = null;
    let originLabel = "";
    for (let index = state.plan.items.length - 1; index >= 0; index--) {
      if (hasCoords(state.plan.items[index])) {
        origin = state.plan.items[index];
        originLabel = state.plan.items[index].title;
        break;
      }
    }
    if (!origin) {
      els.nextStops.hidden = true;
      return;
    }
    const planned = new Set(state.plan.items.map((item) => item.refKey).filter(Boolean));
    const suggestions = allAttractions
      .filter((attr) => !planned.has(attr._key) && hasCoords(attr))
      .map((attr) => ({ attr, km: distanceKm(origin, attr) }))
      .filter((entry) => Number.isFinite(entry.km))
      .sort((a, b) => a.km - b.km)
      .slice(0, 3);

    if (!suggestions.length) {
      els.nextStops.hidden = true;
      return;
    }
    els.nextStops.hidden = false;
    els.nextStopList.innerHTML = `
      <div class="next-origin">从 <b>${escapeHtml(originLabel)}</b> 出发，按直线距离推荐：</div>
      ${suggestions.map(({ attr, km }) => `
        <div class="suggest-item">
          <div class="suggest-main">
            <strong>${escapeHtml(attr.name)}</strong>
            <small>${escapeHtml(attr._city)} · ${escapeHtml(attr.cat || "")}</small>
          </div>
          <span class="suggest-distance">${formatKm(km)}</span>
          <button class="suggest-add" type="button" data-suggest-key="${escapeAttr(attr._key)}"
            aria-label="加入 ${escapeAttr(attr.name)}">${icon("plus")}</button>
        </div>
      `).join("")}
    `;
  }

  function updateAddedStates() {
    $$("[data-add-key]").forEach((button) => {
      if (button.closest(".plan-panel")) return;
      const added = hasRef(button.dataset.addKey);
      button.classList.toggle("is-added", added);
      button.disabled = added;
      button.innerHTML = `${icon(added ? "check" : "plus")}${added ? "已在计划" : "加入"}`;
      const card = button.closest(".stop-card");
      if (card) card.classList.toggle("is-added", added);
    });

    $$("[data-add-route]").forEach((button) => {
      const route = (DOMESTIC?.routes || []).find((candidate) => candidate.id === button.dataset.addRoute);
      if (!route) return;
      const keys = route.stops.map((id) => `d:${id}`);
      const addedCount = keys.filter(hasRef).length;
      const complete = addedCount === keys.length && keys.length > 0;
      button.classList.toggle("is-added", complete);
      button.disabled = complete;
      const missing = keys.length - addedCount;
      button.innerHTML = `${icon(complete ? "check" : "plus")}${
        complete ? "已全部加入" : missing === keys.length ? "整条加入" : `还差 ${missing} 站`
      }`;
    });

    $$("[data-add-country]").forEach((button) => {
      const country = countryMap.get(button.dataset.addCountry);
      if (!country) return;
      const keys = countryAttractionKeys(country);
      const addedCount = keys.filter(hasRef).length;
      const complete = addedCount === keys.length && keys.length > 0;
      button.classList.toggle("is-added", complete);
      button.disabled = complete;
      button.innerHTML = `${icon(complete ? "check" : "plus")}${complete ? "已全部加入" : "全部加入"}`;
    });
  }

  // ---------------------------------------------------------
  // Plan mutations
  // ---------------------------------------------------------

  function addAttraction(key, { index = null, silent = false } = {}) {
    const attr = attractionMap.get(key);
    if (!attr) return false;
    if (hasRef(key)) {
      if (!silent) toast("这个打卡点已经在计划里了");
      return false;
    }
    const item = planItemFromAttr(attr);
    if (index === null || index < 0 || index > state.plan.items.length) {
      state.plan.items.push(item);
    } else {
      state.plan.items.splice(index, 0, item);
    }
    if (!silent) toast(`已加入「${attr.name}」`);
    return true;
  }

  function addMany(keys, label, { index = null } = {}) {
    let added = 0;
    let cursor = index === null ? state.plan.items.length : index;
    keys.forEach((key) => {
      if (!attractionMap.has(key) || hasRef(key)) return;
      const attr = attractionMap.get(key);
      const item = planItemFromAttr(attr);
      state.plan.items.splice(cursor, 0, item);
      cursor++;
      added++;
    });
    if (!added) {
      toast("这些打卡点已经都在计划里了");
      return;
    }
    commitPlan();
    toast(`已加入「${label}」的 ${added} 个打卡点`);
  }

  function addCustomItem(data) {
    state.plan.items.push({
      uid: makeId(),
      refKey: null,
      refId: null,
      source: "custom",
      title: data.name,
      en: "",
      city: data.city,
      country: "",
      flag: "",
      category: "custom",
      motif: "·",
      lat: null,
      lng: null,
      duration: data.duration,
      ticket: "",
      checked: false,
      custom: true,
      note: data.note
    });
    commitPlan();
    toast("自定义行程已加入");
  }

  function deleteItem(uid) {
    const index = state.plan.items.findIndex((item) => item.uid === uid);
    if (index < 0) return;
    const [removed] = state.plan.items.splice(index, 1);
    commitPlan();
    toast(`已删除「${removed.title}」`);
  }

  function toggleChecked(uid) {
    const item = state.plan.items.find((candidate) => candidate.uid === uid);
    if (!item) return;
    item.checked = !item.checked;
    commitPlan();
  }

  function moveItem(uid, direction) {
    const index = state.plan.items.findIndex((item) => item.uid === uid);
    if (index < 0) return;
    const next = index + Number(direction);
    if (next < 0 || next >= state.plan.items.length) return;
    const [item] = state.plan.items.splice(index, 1);
    state.plan.items.splice(next, 0, item);
    commitPlan();
  }

  function moveItemTo(uid, index) {
    const from = state.plan.items.findIndex((item) => item.uid === uid);
    if (from < 0) return false;
    let target = Math.max(0, Math.min(index, state.plan.items.length));
    if (from < target) target--;
    if (from === target) return false;
    const [item] = state.plan.items.splice(from, 1);
    state.plan.items.splice(target, 0, item);
    commitPlan();
    return true;
  }

  function optimizePlan() {
    if (state.plan.items.length < 2) {
      toast("至少要有 2 站才能排序");
      return;
    }
    const items = [...state.plan.items];
    const ordered = [items[0]];
    const remaining = items.slice(1);
    let current = items[0];
    while (remaining.length) {
      let next = remaining[0];
      if (hasCoords(current)) {
        next = remaining.reduce((best, candidate) => {
          if (!hasCoords(candidate)) return best;
          if (!hasCoords(best)) return candidate;
          return distanceKm(candidate, current) < distanceKm(best, current) ? candidate : best;
        });
      }
      ordered.push(next);
      remaining.splice(remaining.indexOf(next), 1);
      current = next;
    }
    state.plan.items = ordered;
    commitPlan();
    toast("已按直线距离由近到远重排，第 1 站保留");
  }

  async function clearPlan() {
    if (!state.plan.items.length) return;
    const ok = await askConfirm(
      "确认清空计划？",
      "所有站点和勾选状态都会被移除，浏览器与本地文件里的计划会一起清空。此操作无法撤销。",
      "确认清空"
    );
    if (!ok) return;
    state.plan = { ...emptyPlan(), title: state.plan.title || "我的旅行计划" };
    state.localTouched = true;
    commitPlan();
    try {
      await fetch("api/plan", { method: "DELETE" });
    } catch {
      // Local data is already cleared; the next save recreates the file.
    }
    toast("计划已清空");
  }

  // ---------------------------------------------------------
  // Modals
  // ---------------------------------------------------------

  function syncBodyLock() {
    const dialogOpen = !!document.querySelector("dialog[open]");
    const drawerOpen = els.planPanel.classList.contains("is-open");
    document.body.classList.toggle("is-locked", dialogOpen || drawerOpen);
  }

  function openVisa(countryId) {
    const country = countryMap.get(countryId);
    if (!country) return;
    const visa = country.visa || {};
    const category = CAT_MAP.get(country.category);
    const officialLinks = (visa.official || []).map((link) => `
      <a class="official-link" href="${escapeAttr(link.url)}" target="_blank" rel="noopener noreferrer">
        ${icon("external")}${escapeHtml(link.label)}
      </a>
    `).join("");
    const docs = (visa.documents || []).map((doc) => `<li>${icon("check")}${escapeHtml(doc)}</li>`).join("");
    const steps = (visa.steps || []).map((step) => `<li>${escapeHtml(step)}</li>`).join("");
    const entry = (visa.entry || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("");
    const notes = (visa.notes || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("");
    const interviewTips = (visa.interviewTips || []).length
      ? `<div class="interview-box">
          <h4>${icon("spark")}面签提示</h4>
          <ul>${visa.interviewTips.map((tip) => `<li>${escapeHtml(tip)}</li>`).join("")}</ul>
        </div>`
      : "";

    els.visaContent.innerHTML = `
      <div class="visa-hero">
        <span class="visa-hero-flag">${escapeHtml(country.flag || "🌍")}</span>
        <div class="visa-hero-main">
          <p class="visa-hero-kicker">VISA GUIDE · ${escapeHtml(category?.en || "")}</p>
          <h2>${escapeHtml(country.name)}<span>${escapeHtml(country.en || "")}</span></h2>
          <div class="visa-hero-tags">
            <span class="badge ${badgeClass(country.category)}">${escapeHtml(category?.name || "")}</span>
            <span class="badge">${escapeHtml(visa.type || "")}</span>
            <span class="badge">${escapeHtml(country.stay || "")}</span>
          </div>
        </div>
      </div>
      <dl class="visa-meta-grid">
        <div><dt>签证类型</dt><dd>${escapeHtml(visa.type || "—")}</dd></div>
        <div><dt>办理时长</dt><dd>${escapeHtml(visa.processing || "—")}</dd></div>
        <div><dt>费用</dt><dd>${escapeHtml(visa.fee || "—")}</dd></div>
        <div><dt>停留期</dt><dd>${escapeHtml(visa.validity || country.stay || "—")}</dd></div>
      </dl>

      <section class="visa-section">
        <h3 class="visa-section-title">${icon("pin")}去哪里申请 <small>APPLY WHERE</small></h3>
        <div class="visa-where">${escapeHtml(visa.where || "")}</div>
      </section>

      <section class="visa-section">
        <h3 class="visa-section-title">${icon("route")}办理步骤 <small>STEP BY STEP</small></h3>
        <ol class="steps-list">${steps}</ol>
        ${interviewTips}
      </section>

      <section class="visa-section">
        <h3 class="visa-section-title">${icon("doc")}准备材料 <small>DOCUMENTS</small></h3>
        <ul class="doc-list">${docs}</ul>
      </section>

      <section class="visa-section">
        <h3 class="visa-section-title">${icon("check")}入境需要 <small>AT THE BORDER</small></h3>
        <ul class="entry-list">${entry}</ul>
      </section>

      <section class="visa-section">
        <h3 class="visa-section-title">${icon("spark")}注意事项 <small>GOOD TO KNOW</small></h3>
        <ul class="visa-note-list">${notes}</ul>
      </section>

      <section class="visa-section">
        <h3 class="visa-section-title">${icon("external")}官方入口 <small>OFFICIAL LINKS</small></h3>
        <div class="official-links">${officialLinks}</div>
        <p class="visa-disclaimer">资料基线 ${escapeHtml(INTL.baseline || "2025.06")}。签证政策、费用、受理时间和材料清单随时可能调整，请以官方最新公告为准；本页面仅供私人旅行规划参考，不构成法律或签证建议。</p>
      </section>
    `;
    if (!els.visaDialog.open) els.visaDialog.showModal();
    syncBodyLock();
  }

  function openCustom() {
    els.customForm.reset();
    if (!els.customDialog.open) els.customDialog.showModal();
    window.setTimeout(() => els.customName.focus(), 30);
    syncBodyLock();
  }

  function askConfirm(title, text, okLabel = "确认") {
    return new Promise((resolve) => {
      confirmResolver = resolve;
      els.confirmTitle.textContent = title;
      els.confirmText.textContent = text;
      els.confirmOk.textContent = okLabel;
      if (!els.confirmDialog.open) els.confirmDialog.showModal();
      syncBodyLock();
    });
  }

  function resolveConfirm(value) {
    if (confirmResolver) {
      confirmResolver(value);
      confirmResolver = null;
    }
    if (els.confirmDialog.open) els.confirmDialog.close();
    syncBodyLock();
  }

  function openPlanDrawer() {
    els.planPanel.classList.add("is-open");
    els.drawerBackdrop.hidden = false;
    syncBodyLock();
    window.setTimeout(() => els.closePlanBtn.focus(), 50);
  }

  function closePlanDrawer() {
    els.planPanel.classList.remove("is-open");
    els.drawerBackdrop.hidden = true;
    syncBodyLock();
  }

  // ---------------------------------------------------------
  // Toast / view
  // ---------------------------------------------------------

  function toast(message, type = "ok") {
    window.clearTimeout(toastTimer);
    els.toast.textContent = message;
    els.toast.classList.toggle("is-error", type === "error");
    els.toast.classList.add("is-show");
    toastTimer = window.setTimeout(() => els.toast.classList.remove("is-show"), 2600);
  }

  function searchCatalog() {
    return {
      cities: domesticCities.map((city) => ({
        type: "domestic",
        id: city.id,
        title: city.name,
        subtitle: `${city.region} · ${city.subtitle || "城市目的地"}`,
        count: city.attractions.length,
        haystack: [
          city.name, city.en, city.region, city.subtitle, city.intro,
          ...(city.foods || []), ...(city.play || []),
          ...city.attractions.flatMap((attr) => [attr.name, attr.en, attr.cat, attr.highlight])
        ].join(" ").toLowerCase()
      })),
      countries: intlCountries.map((country) => ({
        type: "international",
        id: country.id,
        category: country.category,
        title: country.name,
        subtitle: `${country.continent} · ${country.cities.map((city) => city.name).join(" / ")}`,
        count: country._attractions.length,
        haystack: [
          country.name, country.en, country.intro, country.stay,
          ...(country.foods || []), ...(country.play || []),
          country.visa?.type, country.visa?.where,
          ...country.cities.flatMap((city) => [
            city.name,
            ...city.attractions.flatMap((attr) => [attr.name, attr.en, attr.cat, attr.highlight])
          ])
        ].join(" ").toLowerCase()
      }))
    };
  }

  const searchData = searchCatalog();
  const popularSearchIds = [
    "beijing", "shanghai", "chengdu", "dali", "xiamen", "hongkong",
    "japan", "france", "thailand", "spain", "turkey", "korea"
  ];

  function searchCardMarkup(item) {
    const kind = item.type === "domestic" ? "城市" : "国家";
    const mark = item.type === "domestic" ? item.title.slice(0, 1) : (countryMap.get(item.id)?.flag || "·");
    return `
      <button class="search-city-card" type="button"
        data-search-kind="${item.type}" data-search-id="${escapeAttr(item.id)}">
        <span>
          <strong>${escapeHtml(item.title)}</strong>
          <small>${escapeHtml(kind)} · ${escapeHtml(item.subtitle)}</small>
        </span>
        <span class="search-count">${item.count} 个地点</span>
      </button>
    `;
  }

  function renderSearchRecommendations() {
    if (!els.searchRecommend) return;
    const all = [...searchData.cities, ...searchData.countries];
    const recommendations = popularSearchIds
      .map((id) => all.find((item) => item.id === id))
      .filter(Boolean);
    els.searchRecommend.innerHTML = `
      <div class="search-section-head">
        <h3>推荐目的地</h3>
        <span>CURATED FOR YOU</span>
      </div>
      <div class="search-recommend-grid">
        ${recommendations.map(searchCardMarkup).join("")}
      </div>
    `;
    els.searchResults.hidden = true;
    els.searchRecommend.hidden = false;
  }

  function renderSearchResults(query) {
    const value = query.trim().toLowerCase();
    if (!value) {
      renderSearchRecommendations();
      return;
    }
    const cities = searchData.cities.filter((item) => item.haystack.includes(value)).slice(0, 8);
    const countries = searchData.countries.filter((item) => item.haystack.includes(value)).slice(0, 8);
    els.searchRecommend.hidden = true;
    els.searchResults.hidden = false;
    if (!cities.length && !countries.length) {
      els.searchResults.innerHTML = `<div class="search-empty">没有找到“${escapeHtml(query.trim())}”。试试城市、国家或景点名。</div>`;
      return;
    }
    els.searchResults.innerHTML = `
      ${cities.length ? `
        <div class="search-result-group">
          <h4>国内城市</h4>
          ${cities.map((item) => `
            <button class="search-result" type="button" data-search-kind="domestic" data-search-id="${escapeAttr(item.id)}">
              <span class="search-result-mark">${escapeHtml(item.title.slice(0, 1))}</span>
              <span class="search-result-main"><strong>${escapeHtml(item.title)}</strong><small>${escapeHtml(item.subtitle)}</small></span>
              <span class="search-result-arrow">→</span>
            </button>
          `).join("")}
        </div>
      ` : ""}
      ${countries.length ? `
        <div class="search-result-group">
          <h4>国际目的地</h4>
          ${countries.map((item) => `
            <button class="search-result" type="button" data-search-kind="international" data-search-id="${escapeAttr(item.id)}">
              <span class="search-result-mark">${escapeHtml(countryMap.get(item.id)?.flag || "·")}</span>
              <span class="search-result-main"><strong>${escapeHtml(item.title)}</strong><small>${escapeHtml(item.subtitle)}</small></span>
              <span class="search-result-arrow">→</span>
            </button>
          `).join("")}
        </div>
      ` : ""}
    `;
  }

  function openSearch() {
    if (!els.searchDialog || gateIsOpen()) return;
    if (!els.searchDialog.open) els.searchDialog.showModal();
    els.globalSearch.value = "";
    renderSearchRecommendations();
    window.setTimeout(() => els.globalSearch.focus(), 50);
    syncBodyLock();
  }

  function chooseSearchResult(kind, id) {
    if (kind === "domestic") {
      const city = domesticCityMap.get(id);
      if (!city) return;
      closeDialog(els.searchDialog);
      setView("domestic");
      state.region = "all";
      els.domesticSearch.value = city.name;
      state.domesticQuery = city.name;
      renderRegionChips();
      renderDomestic();
      window.setTimeout(() => {
        const block = document.querySelector(`[data-city-block="${CSS.escape(city.id)}"]`);
        if (block) window.scrollTo({ top: block.getBoundingClientRect().top + window.scrollY - 90, behavior: "smooth" });
      }, 80);
    } else {
      const country = countryMap.get(id);
      if (!country) return;
      closeDialog(els.searchDialog);
      setView("international");
      state.intlCategory = country.category;
      els.intlSearch.value = country.name;
      state.intlQuery = country.name;
      renderInternational();
      window.setTimeout(() => {
        const block = document.querySelector(`[data-country-block="${CSS.escape(country.id)}"]`);
        if (block) window.scrollTo({ top: block.getBoundingClientRect().top + window.scrollY - 90, behavior: "smooth" });
      }, 80);
    }
  }

  function closeDialog(dialog) {
    if (dialog?.open) dialog.close();
    syncBodyLock();
  }

  function setView(view, { scroll = true, updateHash = true } = {}) {
    if (!["domestic", "international"].includes(view)) return;
    state.view = view;
    $$(".nav-link[data-view]").forEach((link) => {
      link.classList.toggle("is-active", link.dataset.view === view);
    });
    els.domesticView.hidden = view !== "domestic";
    els.internationalView.hidden = view !== "international";
    els.domesticView.classList.toggle("is-active", view === "domestic");
    els.internationalView.classList.toggle("is-active", view === "international");
    if (updateHash && window.location.hash !== `#${view}`) {
      history.replaceState(null, "", `#${view}`);
    }
    if (window.matchMedia("(max-width: 1180px)").matches) closePlanDrawer();
    if (scroll) {
      const target = view === "domestic" ? els.domesticView : els.internationalView;
      const top = target.getBoundingClientRect().top + window.scrollY - 82;
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    }
  }

  // ---------------------------------------------------------
  // Search / collapse / details
  // ---------------------------------------------------------

  function setupSearch(input, key, render) {
    if (!input) return;
    input.addEventListener("input", () => {
      state[key] = input.value;
      window.clearTimeout(key === "domesticQuery" ? domesticSearchTimer : intlSearchTimer);
      const timer = window.setTimeout(render, 150);
      if (key === "domesticQuery") domesticSearchTimer = timer;
      else intlSearchTimer = timer;
    });
    input.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        input.value = "";
        state[key] = "";
        render();
      }
    });
  }

  function toggleCity(cityId) {
    if (state.collapsedCities.has(cityId)) state.collapsedCities.delete(cityId);
    else state.collapsedCities.add(cityId);
    const block = document.querySelector(`[data-city-block="${CSS.escape(cityId)}"]`);
    if (!block) return;
    const collapsed = state.collapsedCities.has(cityId);
    block.classList.toggle("is-collapsed", collapsed);
    const button = block.querySelector("[data-toggle-city]");
    if (button) button.setAttribute("aria-expanded", String(!collapsed));
  }

  function toggleCountry(countryId) {
    if (state.collapsedCountries.has(countryId)) state.collapsedCountries.delete(countryId);
    else state.collapsedCountries.add(countryId);
    const block = document.querySelector(`[data-country-block="${CSS.escape(countryId)}"]`);
    if (!block) return;
    const collapsed = state.collapsedCountries.has(countryId);
    block.classList.toggle("is-collapsed", collapsed);
    const button = block.querySelector("[data-toggle-country]");
    if (button) button.setAttribute("aria-expanded", String(!collapsed));
  }

  function toggleDetails(button) {
    const key = button.dataset.toggleDetails;
    const card = button.closest(".stop-card");
    const details = card?.querySelector(".stop-details");
    if (!details) return;
    const isOpen = details.classList.toggle("is-open");
    button.classList.toggle("is-open", isOpen);
    button.setAttribute("aria-expanded", String(isOpen));
    if (isOpen) state.expandedStops.add(key);
    else state.expandedStops.delete(key);
  }

  // ---------------------------------------------------------
  // Drag & drop
  // ---------------------------------------------------------

  function readDragPayload(event) {
    if (dragState) return dragState;
    try {
      const raw = event.dataTransfer?.getData("application/x-atlas") || event.dataTransfer?.getData("text/plain");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  function clearDropStyles() {
    $$(".plan-item.drop-before, .plan-item.drop-after, .plan-item.is-dragging, .country-head.is-dragging, .stop-card.is-dragging")
      .forEach((element) => element.classList.remove("drop-before", "drop-after", "is-dragging"));
    els.planPanel.classList.remove("is-drop-ready");
    els.planList.classList.remove("is-drop-ready");
    document.body.classList.remove("is-dragging");
  }

  function insertExternalPayload(payload, index = null) {
    if (!payload) return;
    if (payload.type === "attraction") {
      const added = addAttraction(payload.key, { index, silent: true });
      const attr = attractionMap.get(payload.key);
      if (added) {
        commitPlan();
        if (attr) toast(`已加入「${attr.name}」`);
      } else {
        toast("这个打卡点已经在计划里了");
      }
    } else if (payload.type === "country") {
      const country = countryMap.get(payload.countryId);
      if (!country) return;
      addMany(countryAttractionKeys(country), country.name, { index });
    }
  }

  // ---------------------------------------------------------
  // Events
  // ---------------------------------------------------------

  function bindEvents() {
    setupSearch(els.domesticSearch, "domesticQuery", renderDomestic);
    setupSearch(els.intlSearch, "intlQuery", renderInternational);

    els.globalSearch?.addEventListener("input", () => {
      renderSearchResults(els.globalSearch.value);
    });
    els.globalSearch?.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        const first = els.searchResults.querySelector("[data-search-kind]") ||
          els.searchRecommend.querySelector("[data-search-kind]");
        if (first) first.click();
      }
    });

    document.addEventListener("click", (event) => {
      const target = event.target;

      if (target.closest("#searchOpenBtn, #heroSearchBtn")) {
        openSearch();
        return;
      }
      const searchHit = target.closest("[data-search-kind]");
      if (searchHit) {
        chooseSearchResult(searchHit.dataset.searchKind, searchHit.dataset.searchId);
        return;
      }

      const navLink = target.closest("[data-view]");
      if (navLink) {
        setView(navLink.dataset.view);
        return;
      }
      const jump = target.closest("[data-jump]");
      if (jump) {
        setView(jump.dataset.jump);
        return;
      }
      const regionButton = target.closest("[data-region]");
      if (regionButton) {
        state.region = regionButton.dataset.region;
        $$(".region-chip").forEach((chip) => chip.classList.toggle("is-active", chip === regionButton));
        renderDomestic();
        return;
      }
      const categoryButton = target.closest("[data-category]");
      if (categoryButton) {
        state.intlCategory = categoryButton.dataset.category;
        renderInternational();
        return;
      }
      const addButton = target.closest("[data-add-key]");
      if (addButton) {
        if (addAttraction(addButton.dataset.addKey, { silent: true })) {
          commitPlan();
          const attr = attractionMap.get(addButton.dataset.addKey);
          toast(`已加入「${attr?.name || "打卡点"}」`);
        } else {
          toast("这个打卡点已经在计划里了");
        }
        return;
      }
      const routeButton = target.closest("[data-add-route]");
      if (routeButton) {
        const route = (DOMESTIC?.routes || []).find((candidate) => candidate.id === routeButton.dataset.addRoute);
        if (route) addMany(route.stops.map((id) => `d:${id}`), route.title);
        return;
      }
      const countryButton = target.closest("[data-add-country]");
      if (countryButton) {
        const country = countryMap.get(countryButton.dataset.addCountry);
        if (country) addMany(countryAttractionKeys(country), country.name);
        return;
      }
      const visaButton = target.closest("[data-visa-country]");
      if (visaButton) {
        openVisa(visaButton.dataset.visaCountry);
        return;
      }
      const cityToggle = target.closest("[data-toggle-city]");
      if (cityToggle) {
        toggleCity(cityToggle.dataset.toggleCity);
        return;
      }
      const countryToggle = target.closest("[data-toggle-country]");
      if (countryToggle) {
        toggleCountry(countryToggle.dataset.toggleCountry);
        return;
      }
      const detailsButton = target.closest("[data-toggle-details]");
      if (detailsButton) {
        toggleDetails(detailsButton);
        return;
      }
      const checkButton = target.closest("[data-check-uid]");
      if (checkButton) {
        toggleChecked(checkButton.dataset.checkUid);
        return;
      }
      const moveButton = target.closest("[data-move-uid]");
      if (moveButton) {
        moveItem(moveButton.dataset.moveUid, moveButton.dataset.direction);
        return;
      }
      const deleteButton = target.closest("[data-delete-uid]");
      if (deleteButton) {
        deleteItem(deleteButton.dataset.deleteUid);
        return;
      }
      const suggestButton = target.closest("[data-suggest-key]");
      if (suggestButton) {
        if (addAttraction(suggestButton.dataset.suggestKey, { silent: true })) {
          commitPlan();
          const attr = attractionMap.get(suggestButton.dataset.suggestKey);
          toast(`已加入「${attr?.name || "下一站"}」`);
        }
        return;
      }
      const closeButton = target.closest("[data-close]");
      if (closeButton) {
        const dialog = document.getElementById(closeButton.dataset.close);
        if (dialog?.open) dialog.close();
        syncBodyLock();
        return;
      }
      if (target.closest("#mobilePlanBtn, #mobilePlanIconBtn")) {
        openPlanDrawer();
        return;
      }
      if (target.closest("#closePlanBtn") || target === els.drawerBackdrop) {
        closePlanDrawer();
        return;
      }
      if (target.closest("#optimizeBtn")) {
        optimizePlan();
        return;
      }
      if (target.closest("#customBtn")) {
        openCustom();
        return;
      }
      if (target.closest("#clearBtn")) {
        clearPlan();
        return;
      }
      if (target.closest("#confirmCancel")) {
        resolveConfirm(false);
        return;
      }
      if (target.closest("#confirmOk")) {
        resolveConfirm(true);
        return;
      }
      if (target.closest("#exportBtn")) {
        exportMarkdown();
        return;
      }
      if (target.closest("#printBtn")) {
        window.print();
      }
    });

    els.planTitle.addEventListener("input", () => {
      state.plan.title = els.planTitle.value.slice(0, 40);
      state.plan.updatedAt = new Date().toISOString();
      state.localTouched = true;
      dirty = true;
      persistLocal();
      scheduleSync(700);
      document.title = `${state.plan.title || "我的旅行计划"} · Journey`;
      if (state.plan.items.length) {
        els.planSubtitle.textContent = planSummaryText(planMetrics());
      }
    });
    els.planTitle.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        els.planTitle.blur();
      }
    });

    els.logoutBtn?.addEventListener("click", async () => {
      try {
        await fetch("api/logout", { method: "POST" });
      } finally {
        location.assign("/login");
      }
    });

    els.customForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const name = els.customName.value.trim();
      if (!name) {
        els.customName.reportValidity();
        return;
      }
      addCustomItem({
        name,
        city: els.customCity.value.trim(),
        duration: els.customDuration.value.trim(),
        note: els.customNote.value.trim()
      });
      els.customDialog.close();
      syncBodyLock();
    });

    $$("dialog").forEach((dialog) => {
      dialog.addEventListener("click", (event) => {
        if (event.target === dialog) dialog.close();
      });
      dialog.addEventListener("close", () => {
        syncBodyLock();
        if (dialog === els.confirmDialog && confirmResolver) {
          confirmResolver(false);
          confirmResolver = null;
        }
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && els.planPanel.classList.contains("is-open") && !document.querySelector("dialog[open]")) {
        closePlanDrawer();
      }
      if (event.key === "/" && !event.ctrlKey && !event.metaKey && !event.altKey) {
        const tag = document.activeElement?.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA" || document.activeElement?.isContentEditable) return;
        event.preventDefault();
        openSearch();
      }
    });

    // Drag from catalog cards and country headings
    document.addEventListener("dragstart", (event) => {
      const planItem = event.target.closest?.(".plan-item");
      if (planItem) {
        if (event.target.closest("button, input")) {
          event.preventDefault();
          return;
        }
        dragState = { type: "plan", uid: planItem.dataset.uid };
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("application/x-atlas", JSON.stringify(dragState));
        event.dataTransfer.setData("text/plain", JSON.stringify(dragState));
        planItem.classList.add("is-dragging");
        document.body.classList.add("is-dragging");
        return;
      }

      const countryHead = event.target.closest?.(".country-head");
      if (countryHead && !event.target.closest("button")) {
        dragState = { type: "country", countryId: countryHead.dataset.dragCountry };
        event.dataTransfer.effectAllowed = "copy";
        event.dataTransfer.setData("application/x-atlas", JSON.stringify(dragState));
        event.dataTransfer.setData("text/plain", JSON.stringify(dragState));
        countryHead.classList.add("is-dragging");
        document.body.classList.add("is-dragging");
        return;
      }

      const card = event.target.closest?.(".stop-card");
      if (card) {
        dragState = { type: "attraction", key: card.dataset.key };
        event.dataTransfer.effectAllowed = "copy";
        event.dataTransfer.setData("application/x-atlas", JSON.stringify(dragState));
        event.dataTransfer.setData("text/plain", JSON.stringify(dragState));
        card.classList.add("is-dragging");
        document.body.classList.add("is-dragging");
      }
    });

    document.addEventListener("dragend", () => {
      dragState = null;
      clearDropStyles();
    });

    // Allow dropping anywhere over the plan panel
    els.planPanel.addEventListener("dragover", (event) => {
      if (!dragState) return;
      event.preventDefault();
      event.dataTransfer.dropEffect = dragState.type === "plan" ? "move" : "copy";
      els.planPanel.classList.add("is-drop-ready");
      els.planList.classList.add("is-drop-ready");
    });

    els.planPanel.addEventListener("dragleave", (event) => {
      if (!els.planPanel.contains(event.relatedTarget)) {
        els.planPanel.classList.remove("is-drop-ready");
        els.planList.classList.remove("is-drop-ready");
      }
    });

    els.planPanel.addEventListener("drop", (event) => {
      if (!dragState) return;
      const planItem = event.target.closest(".plan-item");
      if (planItem) return; // handled by the item listener
      event.preventDefault();
      const payload = readDragPayload(event);
      if (payload?.type === "plan") {
        moveItemTo(payload.uid, state.plan.items.length);
      } else {
        insertExternalPayload(payload, null);
      }
      dragState = null;
      clearDropStyles();
    });

    // Reorder / insert over plan items
    els.planList.addEventListener("dragover", (event) => {
      if (!dragState) return;
      const item = event.target.closest(".plan-item");
      if (!item) return;
      event.preventDefault();
      event.stopPropagation();
      const rect = item.getBoundingClientRect();
      const after = event.clientY > rect.top + rect.height / 2;
      $$(".plan-item.drop-before, .plan-item.drop-after").forEach((element) =>
        element.classList.remove("drop-before", "drop-after")
      );
      item.classList.add(after ? "drop-after" : "drop-before");
      event.dataTransfer.dropEffect = dragState.type === "plan" ? "move" : "copy";
    });

    els.planList.addEventListener("dragleave", (event) => {
      const item = event.target.closest(".plan-item");
      if (item && !item.contains(event.relatedTarget)) {
        item.classList.remove("drop-before", "drop-after");
      }
    });

    els.planList.addEventListener("drop", (event) => {
      if (!dragState) return;
      const item = event.target.closest(".plan-item");
      if (!item) return;
      event.preventDefault();
      event.stopPropagation();
      const rect = item.getBoundingClientRect();
      const after = event.clientY > rect.top + rect.height / 2;
      const list = $$(".plan-item", els.planList);
      let index = list.indexOf(item) + (after ? 1 : 0);
      const payload = readDragPayload(event);
      if (payload?.type === "plan") {
        moveItemTo(payload.uid, index);
      } else {
        insertExternalPayload(payload, index);
      }
      dragState = null;
      clearDropStyles();
    });

    window.addEventListener("beforeunload", () => {
      if (!dirty) return;
      try {
        fetch("api/plan", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(state.plan),
          keepalive: true
        });
      } catch {
        // localStorage is already up to date.
      }
    });

    window.addEventListener("resize", () => {
      if (!window.matchMedia("(max-width: 1180px)").matches && els.planPanel.classList.contains("is-open")) {
        closePlanDrawer();
      }
    });
  }

  // ---------------------------------------------------------
  // Export
  // ---------------------------------------------------------

  function exportMarkdown() {
    if (!state.plan.items.length) {
      toast("计划还是空的，先加入几个打卡点吧");
      return;
    }
    const metrics = planMetrics();
    const lines = [
      `# ${state.plan.title || "我的旅行计划"}`,
      "",
      `> 更新于 ${formatDate(state.plan.updatedAt)} · 共 ${state.plan.items.length} 站 · 已完成 ${metrics.done} 站 · 估算路程 ${
        metrics.total > 0 ? Math.round(metrics.total) : "—"
      } km`,
      "",
      "## 行程清单",
      ""
    ];
    state.plan.items.forEach((item, index) => {
      const meta = [item.city, item.duration].filter(Boolean).join(" · ");
      lines.push(`- [${item.checked ? "x" : " "}] **${String(index + 1).padStart(2, "0")}. ${item.title}**${meta ? ` — ${meta}` : ""}`);
      if (index > 0 && Number.isFinite(item._distanceFromPrev)) {
        lines.push(`  - 距上一站：${formatKm(item._distanceFromPrev)}（直线估算）`);
      }
      if (item.note) lines.push(`  - 备注：${item.note}`);
    });
    lines.push("", "---", "", "由 Journey 生成。距离为经纬度直线估算，实际交通以导航为准。");
    const blob = new Blob([lines.join("\n")], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const safeTitle = (state.plan.title || "travel-plan").replace(/[\\/:*?"<>|]/g, "-");
    link.href = url;
    link.download = `${safeTitle}-${new Date().toISOString().slice(0, 10)}.md`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    toast("Markdown 行程已导出");
  }

  // ---------------------------------------------------------
  // Init
  // ---------------------------------------------------------

  function init() {
    if (!DOMESTIC || !INTL) {
      document.body.innerHTML = `<div style="padding:40px;font-family:sans-serif">
        <h1>数据没有加载成功</h1>
        <p>请确认 web/data 目录完整，并通过 Java 服务访问页面，而不是直接双击 index.html。</p>
      </div>`;
      return;
    }

    const stored = loadLocalPlan();
    state.plan = stored || emptyPlan();
    state.plan.title = state.plan.title || "我的旅行计划";

    $("#currentYear").textContent = String(new Date().getFullYear());
    els.intlBaselineText.textContent = INTL.baseline || "2025.06";
    els.visaBaseline.textContent = `资料基线 ${INTL.baseline || "2025.06"}`;

    renderRegionChips();
    renderHero();
    renderDomestic();
    renderInternational();
    renderPlan();
    bindEvents();
    initGate();

    const initialView = window.location.hash === "#international" ? "international" : "domestic";
    setView(initialView, { scroll: false, updateHash: false });
    setSaveStatus(stored ? "本地记录已载入" : "本地保存");
    loadConnectionStatus();
    loadSession();
    hydrateFromServer();
    if ("serviceWorker" in navigator && window.isSecureContext) {
      navigator.serviceWorker.register("sw.js").catch(() => {});
    }
  }

  init();
})();
