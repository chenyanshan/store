const app = document.querySelector("#app");

const RESULT_INFO = {
  all: { label: "全部", tone: "all" },
  success: { label: "成功", tone: "success" },
  failure: { label: "失败", tone: "failure" },
  warning: { label: "警示", tone: "warning" }
};

const DETAIL_SECTIONS = [
  { label: "背景", key: "background" },
  { label: "问题", key: "problem" },
  { label: "过程", key: "process" },
  { label: "结果详情", key: "resultDetail" },
  { label: "复盘建议", key: "reflection" }
];

const STUDY_STORAGE_KEYS = {
  learningId: "study_learning_id",
  secret: "study_learning_secret"
};

const STUDY_MODES = {
  all: "全部案例",
  favorites: "仅看收藏"
};

const SUMMARY_DATA = {
  coreQuote: "开实体店的本质是一场「基于真实客流数据的成本收益算账游戏」。",
  formula:
    "成功 = (精准选址锁定有效客流 + 烟草/快递等核心引流资源加持) - (严控租金投入成本 + 避开盲目跨界与加盟陷阱) + 持续优化的商品结构与亲力亲为的精细化运营",
  sections: [
    {
      number: "一",
      title: "开店的核心思想观念",
      tone: "default",
      cards: [
        {
          title: "选址决定下限，运营决定上限",
          content:
            "一个好的位置（如小区唯一出入口的A点铺、垄断性铺位）甚至可以掩盖运营上的粗糙；而一个存在硬伤的位置（如阴街、死角），再怎么努力营销也无济于事。"
        },
        {
          title: "用真实数据做决策，拒绝凭感觉",
          content:
            "不能盲目相信转让方声称的营业额，也不能凭主观感觉判断人流。必须亲自蹲点、分时段、分客群精确统计有效人流量。"
        },
        {
          title: "租售比是生死线",
          content:
            "租金成本必须与当地实际客流量和预估营业额严格匹配。高租金必须有极高的客流和转化率支撑，否则就是给房东打工。"
        },
        {
          title: "敬畏行业，忌外行盲目跨界",
          content:
            "没有零售经验的新手，切忌抱着“打发时间”“当甩手掌柜”或“花钱买个店就能赚钱”的心态盲目重资产投入。"
        }
      ]
    },
    {
      number: "二",
      title: "选址是核心，如何选？",
      tone: "default",
      cards: [
        {
          title: "辨别有效客流与人流动线",
          content:
            "人流大不等于生意好。必须看店铺是否在目标客群的必经之路（主动线）上。避开被提前截流、被物理隔断阻挡的死角，以及人流复杂但转化率低的快速通道。"
        },
        {
          title: "警惕开荒铺陷阱",
          content:
            "避免在新交付、入住率极低的新小区当开荒牛。前期漫长空窗期和客流不足会耗干资金，不要为远期规划买单。"
        },
        {
          title: "考察社区体量与消费力",
          content:
            "明确周边有效覆盖住户数量。体量太小或老龄化严重、消费力弱的小区，无法支撑高额投资或大型店铺。"
        },
        {
          title: "锁定独家与排他性",
          content:
            "封闭园区、高校、高密度小区的独家点位价值最高。在写字楼或商场开店时，合同中必须落实独家经营条款，防止后期被插店。"
        },
        {
          title: "重视可视性与可达性",
          content:
            "店铺必须容易被发现（门头要大、招牌要亮），且进店方便，不能藏在偏僻负一楼、二楼深处或被其他门店完全遮挡的位置。"
        }
      ]
    },
    {
      number: "三",
      title: "哪些问题是失败的核心？",
      tone: "danger",
      cards: [
        {
          title: "致命的选址硬伤",
          content: "选在客流进不来的阴街，或被成熟强对手包围且严重分流的劣势位置。"
        },
        {
          title: "高杠杆、重资产盲目投资",
          content:
            "预算分配不合理，大量资金被高租金、押金和虚高转让费占用，导致后期缺乏铺货与运转现金流。"
        },
        {
          title: "跌入加盟与转让骗局",
          content:
            "轻信快招公司的夸大承诺，被收割高额加盟费；或未尽调接盘了数据造假、合同风险高、续签不稳的烂铺。"
        },
        {
          title: "核心引流资质缺失",
          content:
            "例如便利店办不下烟草证，直接损失关键营业额；或没整合快递驿站资源，缺乏稳定自然客流。"
        },
        {
          title: "品类错配与结构混乱",
          content:
            "在错误客群卖错误商品，滞销品堆积，核心流量品反而缺货，动线设计反人性，导致体验和复购双降。"
        }
      ]
    },
    {
      number: "四",
      title: "如何才能大幅度提高成功率？",
      tone: "success",
      cards: [
        {
          title: "拿准核心引流王牌",
          content:
            "开店前务必确认烟草证可行性；尽最大努力整合周边快递驿站业务，用高频刚需锁定社区基础客流。"
        },
        {
          title: "严控成本，灵活分租",
          content:
            "如果店铺面积过大、租金过高，可将多余空间分租给不冲突业态，显著降低固定成本压力。"
        },
        {
          title: "精细化品类与空间管理",
          content:
            "果断砍掉低效品类，利用鲜食和季节爆品提升进店率与毛利率；优化收银台和货架布局，把黄金展示位留给高毛利商品。"
        },
        {
          title: "主动出击，深耕私域",
          content:
            "通过送水、拿快递等场景积累私域用户，结合配送、打印、生鲜团购等增值服务，构建社区流量护城河。"
        },
        {
          title: "亲力亲为，拒绝托管",
          content:
            "创业初期老板必须亲自守店，摸透消费习惯、进货渠道与损耗规律，打稳基本盘后再考虑放大。"
        }
      ]
    }
  ]
};

const state = {
  cases: [],
  loading: true,
  error: "",
  category: "all",
  result: "all",
  searchQuery: "",
  activeCaseId: "",
  study: createStudyState()
};

bootstrap();

async function bootstrap() {
  if (!app) {
    return;
  }

  window.addEventListener("popstate", onRouteChange);
  document.addEventListener("click", onLinkClick);
  document.addEventListener("keydown", onGlobalKeyDown);

  syncFiltersFromUrl();
  await loadCases();
  hydrateStudyIdentityFromLocal();
  clampFilters();
  render();
}

function onRouteChange() {
  syncFiltersFromUrl();
  clampFilters();
  render();
}

function onGlobalKeyDown(event) {
  if (event.key === "Escape" && state.activeCaseId) {
    closeDetailModal();
    return;
  }

  const route = getRoute();
  if (route.type !== "study" || !state.study.active) {
    return;
  }

  const targetTag = event.target && event.target.tagName ? String(event.target.tagName).toLowerCase() : "";
  if (targetTag === "input" || targetTag === "textarea" || targetTag === "select") {
    return;
  }

  if (event.key === "ArrowRight") {
    event.preventDefault();
    moveStudyStep(1);
  }

  if (event.key === "ArrowLeft") {
    event.preventDefault();
    moveStudyStep(-1);
  }
}

function onLinkClick(event) {
  const link = event.target.closest("a[data-link]");
  if (!link) {
    return;
  }

  const href = link.getAttribute("href");
  if (!href) {
    return;
  }

  const targetUrl = new URL(href, window.location.origin);
  if (targetUrl.origin !== window.location.origin) {
    return;
  }

  event.preventDefault();
  navigate(targetUrl.pathname + targetUrl.search, { replace: false });
}

function navigate(href, options = {}) {
  const replace = Boolean(options.replace);
  const scroll = options.scroll !== false;
  const targetUrl = new URL(href, window.location.origin);
  const nextPath = targetUrl.pathname + targetUrl.search;

  if (replace) {
    history.replaceState(null, "", nextPath);
  } else {
    history.pushState(null, "", nextPath);
  }

  syncFiltersFromUrl();
  clampFilters();
  render();

  if (scroll) {
    window.scrollTo({ top: 0 });
  }
}

async function loadCases() {
  try {
    const response = await fetch("/data/cases.json", {
      headers: { accept: "application/json" }
    });

    if (!response.ok) {
      throw new Error("加载数据失败，状态码: " + response.status);
    }

    const payload = await response.json();
    if (!Array.isArray(payload)) {
      throw new Error("数据格式异常，cases.json 必须是数组。");
    }

    state.cases = payload.map(normalizeCase);
  } catch (error) {
    state.error = error instanceof Error ? error.message : String(error);
  } finally {
    state.loading = false;
  }
}

function normalizeCase(raw, index) {
  const result = normalizeResult(raw?.result);
  const fallbackTitle = "未命名案例 " + String(index + 1);
  const normalized = {
    id: toText(raw?.id, String(index + 1)),
    title: toText(raw?.title, fallbackTitle),
    category: toText(raw?.category, "未分类"),
    result,
    resultText: toText(raw?.resultText, RESULT_INFO[result].label + "案例"),
    location: toText(raw?.location, ""),
    investment: toText(raw?.investment, ""),
    monthlyProfit: toText(raw?.monthlyProfit, ""),
    monthlyLoss: toText(raw?.monthlyLoss, ""),
    businessTime: toText(raw?.businessTime, ""),
    summary: toText(raw?.summary, ""),
    background: toText(raw?.background, ""),
    problem: toText(raw?.problem, ""),
    process: toText(raw?.process, ""),
    resultDetail: toText(raw?.resultDetail, ""),
    reflection: toText(raw?.reflection, ""),
    keyPoints: normalizeArray(raw?.keyPoints),
    tags: normalizeArray(raw?.tags)
  };

  normalized.searchIndex = buildCaseSearchIndex(normalized);
  return normalized;
}

function normalizeResult(value) {
  const text = String(value ?? "").trim();
  if (text === "success" || text === "failure" || text === "warning") {
    return text;
  }
  return "warning";
}

function toText(value, fallback) {
  if (value === null || value === undefined) {
    return fallback;
  }
  const text = String(value).trim();
  return text || fallback;
}

function normalizeArray(value) {
  if (!Array.isArray(value)) {
    return [];
  }
  return value.map((item) => String(item ?? "").trim()).filter(Boolean);
}

function syncFiltersFromUrl() {
  const params = new URLSearchParams(window.location.search);
  state.category = params.get("category") || "all";
  state.result = params.get("result") || "all";
  state.searchQuery = (params.get("q") || "").trim();
  state.activeCaseId = params.get("detail") || "";
}

function clampFilters() {
  if (!RESULT_INFO[state.result]) {
    state.result = "all";
  }

  const categorySet = new Set(state.cases.map((item) => item.category));
  if (state.category !== "all" && !categorySet.has(state.category)) {
    state.category = "all";
  }

  if (state.activeCaseId && !state.cases.some((item) => item.id === state.activeCaseId)) {
    state.activeCaseId = "";
  }
}

function getRoute() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";

  if (path === "/") {
    return { type: "list" };
  }

  const legacyDetail = path.match(/^\/cases\/([^/]+)$/);
  if (legacyDetail) {
    return { type: "legacy-detail", id: decodeURIComponent(legacyDetail[1]) };
  }

  if (path === "/summary") {
    return { type: "summary" };
  }

  if (path === "/study") {
    return { type: "study" };
  }

  return { type: "not-found" };
}

function buildFilterSearch(options = {}) {
  const includeDetail = options.includeDetail !== false;
  const params = new URLSearchParams();

  if (state.category !== "all") {
    params.set("category", state.category);
  }

  if (state.result !== "all") {
    params.set("result", state.result);
  }

  if (state.searchQuery) {
    params.set("q", state.searchQuery);
  }

  if (includeDetail && state.activeCaseId) {
    params.set("detail", state.activeCaseId);
  }

  const text = params.toString();
  return text ? "?" + text : "";
}

function applyFilters() {
  state.activeCaseId = "";
  navigate("/" + buildFilterSearch({ includeDetail: false }), {
    replace: true,
    scroll: false
  });
}

function openDetailModal(caseId) {
  state.activeCaseId = caseId;
  navigate("/" + buildFilterSearch({ includeDetail: true }), {
    replace: false,
    scroll: false
  });
}

function closeDetailModal() {
  if (!state.activeCaseId) {
    return;
  }

  state.activeCaseId = "";
  navigate("/" + buildFilterSearch({ includeDetail: false }), {
    replace: false,
    scroll: false
  });
}

function getFilteredCases() {
  const searchTokens = tokenizeSearch(state.searchQuery);

  return state.cases.filter((item) => {
    const categoryMatched = state.category === "all" || item.category === state.category;
    const resultMatched = state.result === "all" || item.result === state.result;
    const searchMatched =
      searchTokens.length === 0 ||
      searchTokens.every((token) => item.searchIndex.includes(token));
    return categoryMatched && resultMatched && searchMatched;
  });
}

function getCategoryCounts() {
  const categoryMap = new Map();
  for (const item of state.cases) {
    categoryMap.set(item.category, (categoryMap.get(item.category) ?? 0) + 1);
  }

  return Array.from(categoryMap.entries())
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count || a.category.localeCompare(b.category, "zh-CN"));
}

function countByResult(records) {
  const counts = { success: 0, failure: 0, warning: 0 };
  for (const item of records) {
    if (item.result in counts) {
      counts[item.result] += 1;
    }
  }
  return counts;
}

function render() {
  if (state.loading) {
    document.title = "加载中 | 零售创业案例数据库";
    setModalOpen(false);
    app.innerHTML = renderLoading();
    return;
  }

  if (state.error) {
    document.title = "加载失败 | 零售创业案例数据库";
    setModalOpen(false);
    app.innerHTML = renderError(state.error);
    return;
  }

  const route = getRoute();

  if (route.type === "legacy-detail") {
    const exists = state.cases.some((item) => item.id === route.id);
    state.activeCaseId = exists ? route.id : "";
    navigate("/" + buildFilterSearch({ includeDetail: true }), {
      replace: true,
      scroll: false
    });
    return;
  }

  if (route.type === "summary") {
    renderSummaryPage();
    return;
  }

  if (route.type === "study") {
    renderStudyPage();
    return;
  }

  if (route.type === "not-found") {
    document.title = "页面不存在 | 零售创业案例数据库";
    setModalOpen(false);
    app.innerHTML = renderNotFoundPage();
    return;
  }

  renderList();
}

function renderMainNav(activeTab) {
  const listHref = "/" + buildFilterSearch({ includeDetail: false });
  const listClass = activeTab === "list" ? "nav-link active" : "nav-link";
  const summaryClass = activeTab === "summary" ? "nav-link active" : "nav-link";
  const studyClass = activeTab === "study" ? "nav-link active" : "nav-link";

  return `
    <nav class="main-nav panel">
      <a href="${listHref}" class="${listClass}" data-link>案例列表</a>
      <a href="/summary" class="${summaryClass}" data-link>知识总结</a>
      <a href="/study" class="${studyClass}" data-link>学习模式</a>
    </nav>
  `;
}

function renderLoading() {
  return `
    <main class="shell">
      ${renderMainNav("list")}
      <section class="panel loading-panel">
        <p>正在加载案例数据...</p>
      </section>
    </main>
  `;
}

function renderError(message) {
  return `
    <main class="shell">
      ${renderMainNav("list")}
      <section class="panel error-panel">
        <h1>加载失败</h1>
        <p>${escapeHtml(message)}</p>
      </section>
    </main>
  `;
}

function renderNotFoundPage() {
  return `
    <main class="shell">
      ${renderMainNav("list")}
      <section class="panel error-panel">
        <h1>页面不存在</h1>
        <p>你访问的地址无法匹配当前站点路由。</p>
        <a href="/" class="inline-link" data-link>返回首页</a>
      </section>
    </main>
  `;
}

function renderList() {
  document.title = "零售创业案例数据库";

  const filteredCases = getFilteredCases();
  const resultCounts = countByResult(state.cases);
  const categories = getCategoryCounts();
  const activeRecord = state.cases.find((item) => item.id === state.activeCaseId) || null;

  setModalOpen(Boolean(activeRecord));

  app.innerHTML = `
    <main class="shell">
      ${renderMainNav("list")}
      <header class="hero">
        <p class="eyebrow">Retail Case Database</p>
        <h1>零售创业案例数据库</h1>
        <p class="lead">聚合成功、失败、警示案例，帮助你在开店前看清关键风险与机会。</p>
        <div class="stats-grid">
          ${renderStatCard("总案例", state.cases.length, "all")}
          ${renderStatCard("成功", resultCounts.success, "success")}
          ${renderStatCard("失败", resultCounts.failure, "failure")}
          ${renderStatCard("警示", resultCounts.warning, "warning")}
        </div>
      </header>

      <section class="panel controls">
        <form class="search-form" id="searchForm">
          <label for="searchInput">关键词搜索</label>
          <div class="search-row">
            <input
              id="searchInput"
              type="search"
              value="${escapeHtml(state.searchQuery)}"
              placeholder="搜索标题、摘要、标签、地点、问题、复盘..."
              autocomplete="off"
            >
            <button class="search-button" type="submit">搜索</button>
            <button class="search-clear" type="button" id="clearSearch">清空</button>
          </div>
        </form>

        <div class="field">
          <label for="categoryFilter">分类筛选</label>
          <select id="categoryFilter">
            <option value="all">全部分类 (${state.cases.length})</option>
            ${categories
              .map((item) => {
                const selected = item.category === state.category ? "selected" : "";
                return `<option value="${escapeHtml(item.category)}" ${selected}>${escapeHtml(item.category)} (${item.count})</option>`;
              })
              .join("")}
          </select>
        </div>

        <div class="chip-row">
          ${renderResultFilterButton("all", state.cases.length)}
          ${renderResultFilterButton("success", resultCounts.success)}
          ${renderResultFilterButton("failure", resultCounts.failure)}
          ${renderResultFilterButton("warning", resultCounts.warning)}
        </div>

        <p class="hint">当前展示 ${filteredCases.length} 条案例${state.searchQuery ? `，关键词：${escapeHtml(state.searchQuery)}` : ""}</p>
      </section>

      <section class="cards">
        ${filteredCases.length > 0 ? filteredCases.map((item) => renderCaseCard(item)).join("") : renderEmptyState()}
      </section>
    </main>
    ${activeRecord ? renderDetailModal(activeRecord) : ""}
  `;

  bindListEvents();
}

function bindListEvents() {
  const searchForm = document.querySelector("#searchForm");
  if (searchForm) {
    searchForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const searchInput = document.querySelector("#searchInput");
      state.searchQuery = searchInput instanceof HTMLInputElement ? searchInput.value.trim() : "";
      applyFilters();
    });
  }

  const clearSearch = document.querySelector("#clearSearch");
  if (clearSearch) {
    clearSearch.addEventListener("click", () => {
      if (!state.searchQuery) {
        return;
      }
      state.searchQuery = "";
      applyFilters();
    });
  }

  const categoryFilter = document.querySelector("#categoryFilter");
  if (categoryFilter) {
    categoryFilter.addEventListener("change", (event) => {
      state.category = event.target.value || "all";
      applyFilters();
    });
  }

  const resultButtons = document.querySelectorAll("[data-result-filter]");
  for (const button of resultButtons) {
    button.addEventListener("click", () => {
      state.result = button.dataset.resultFilter || "all";
      applyFilters();
    });
  }

  const detailButtons = document.querySelectorAll("[data-open-detail]");
  for (const button of detailButtons) {
    button.addEventListener("click", () => {
      const caseId = button.dataset.openDetail || "";
      if (caseId) {
        openDetailModal(caseId);
      }
    });
  }

  const overlay = document.querySelector("[data-modal-overlay]");
  if (overlay) {
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) {
        closeDetailModal();
      }
    });
  }

  const closeButtons = document.querySelectorAll("[data-close-modal]");
  for (const button of closeButtons) {
    button.addEventListener("click", () => {
      closeDetailModal();
    });
  }
}

function renderStatCard(label, count, tone) {
  return `
    <article class="stat-card ${tone}">
      <p>${escapeHtml(label)}</p>
      <strong>${count}</strong>
    </article>
  `;
}

function renderResultFilterButton(result, count) {
  const info = RESULT_INFO[result];
  const active = state.result === result ? "active" : "";
  return `
    <button class="chip ${info.tone} ${active}" type="button" data-result-filter="${result}">
      ${escapeHtml(info.label)} (${count})
    </button>
  `;
}

function renderCaseCard(item) {
  const points = item.keyPoints.slice(0, 3);

  return `
    <article class="card ${item.result}">
      <div class="card-header">
        <span class="result-badge ${item.result}">${escapeHtml(item.resultText)}</span>
        <h2>${escapeHtml(item.title)}</h2>
      </div>
      <p class="meta-line">
        <span>${escapeHtml(item.category)}</span>
        <span>${escapeHtml(item.location || "地区待补充")}</span>
      </p>
      <p class="summary">${escapeHtml(item.summary || "暂无摘要")}</p>
      ${
        points.length > 0
          ? `<ul class="points">${points.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}</ul>`
          : ""
      }
      <div class="tag-row">
        ${renderMetaTag("投资", item.investment)}
        ${renderMetaTag("月盈利", item.monthlyProfit)}
        ${renderMetaTag("月亏损", item.monthlyLoss)}
      </div>
      <button class="detail-button" type="button" data-open-detail="${escapeHtml(item.id)}">查看详情</button>
    </article>
  `;
}

function renderMetaTag(label, value) {
  if (!value) {
    return "";
  }
  return `<span class="meta-tag">${escapeHtml(label)}: ${escapeHtml(value)}</span>`;
}

function renderEmptyState() {
  return `
    <section class="panel empty-panel">
      <h2>当前筛选没有匹配案例</h2>
      <p>请调整分类或结果筛选条件。</p>
    </section>
  `;
}

function renderDetailModal(record) {
  return `
    <div class="modal-overlay" data-modal-overlay role="presentation">
      <article class="modal-dialog panel ${record.result}" role="dialog" aria-modal="true" aria-label="案例详情">
        <button class="modal-close" type="button" aria-label="关闭详情" data-close-modal>&times;</button>
        <header class="detail-header">
          <span class="result-badge ${record.result}">${escapeHtml(record.resultText)}</span>
          <h2>${escapeHtml(record.title)}</h2>
          <p class="meta-line">
            <span>${escapeHtml(record.category)}</span>
            <span>${escapeHtml(record.location || "地区待补充")}</span>
            <span>ID: ${escapeHtml(record.id)}</span>
          </p>
        </header>

        <section class="detail-section">
          <h3>案例摘要</h3>
          <p>${escapeHtml(record.summary || "暂无摘要")}</p>
        </section>

        <section class="detail-grid">
          ${renderDetailMeta("投资金额", record.investment)}
          ${renderDetailMeta("月盈利", record.monthlyProfit)}
          ${renderDetailMeta("月亏损", record.monthlyLoss)}
          ${renderDetailMeta("经营时长", record.businessTime)}
        </section>

        ${
          record.keyPoints.length > 0
            ? `
              <section class="detail-section">
                <h3>关键要点</h3>
                <ul class="points">
                  ${record.keyPoints.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}
                </ul>
              </section>
            `
            : ""
        }

        ${DETAIL_SECTIONS.map((item) => renderDetailSection(item.label, record[item.key])).join("")}

        ${
          record.tags.length > 0
            ? `
              <section class="detail-section">
                <h3>标签</h3>
                <div class="tag-row">
                  ${record.tags.map((tag) => `<span class="meta-tag">${escapeHtml(tag)}</span>`).join("")}
                </div>
              </section>
            `
            : ""
        }
      </article>
    </div>
  `;
}

function renderDetailMeta(label, value) {
  if (!value) {
    return "";
  }
  return `
    <article class="detail-metric">
      <p>${escapeHtml(label)}</p>
      <strong>${escapeHtml(value)}</strong>
    </article>
  `;
}

function renderDetailSection(label, value) {
  if (!value) {
    return "";
  }
  return `
    <section class="detail-section">
      <h3>${escapeHtml(label)}</h3>
      <p>${escapeHtml(value).replace(/\n/g, "<br>")}</p>
    </section>
  `;
}

function renderStudyPage() {
  document.title = "学习模式 | 零售创业案例数据库";
  setModalOpen(false);
  maybeAutoResumeStudy();

  const study = state.study;

  if (!study.active) {
    app.innerHTML = `
      <main class="shell study-shell">
        ${renderMainNav("study")}

        <header class="hero">
          <p class="eyebrow">Study Mode</p>
          <h1>学习模式</h1>
          <p class="lead">使用学习 ID 与恢复码，在不同设备上恢复你的学习进度与收藏。</p>
        </header>

        <section class="panel study-auth-panel">
          <h2>打开学习档案</h2>
          <form id="studyOpenForm" class="study-auth-form">
            <label for="studyLearningId">学习 ID</label>
            <input
              id="studyLearningId"
              type="text"
              value="${escapeHtml(study.learningIdInput)}"
              placeholder="例如 learn-a1b2c3d4"
              autocomplete="off"
            >

            <label for="studySecret">恢复码/口令</label>
            <input
              id="studySecret"
              type="password"
              value="${escapeHtml(study.secretInput)}"
              placeholder="4 位数字"
              autocomplete="off"
              inputmode="numeric"
              maxlength="4"
            >

            <div class="study-auth-actions">
              <button type="submit" class="study-primary-button" ${study.loading ? "disabled" : ""}>
                ${study.loading ? "连接中..." : "创建或继续学习"}
              </button>
            </div>
          </form>
          ${renderStudyStatus()}
        </section>
      </main>
    `;
    bindStudyEvents();
    return;
  }

  normalizeStudyPosition();
  const caseIds = getStudyCaseIds(study.mode);
  const currentRecord = getStudyCurrentRecord();
  const total = caseIds.length;
  const position = total === 0 ? 0 : study.currentIndex + 1;
  const isFavorite = currentRecord ? study.favorites.has(currentRecord.id) : false;
  const canPrev = position > 1;
  const canNext = position < total;
  const modeLabel = STUDY_MODES[study.mode] || STUDY_MODES.all;

  app.innerHTML = `
    <main class="shell study-shell">
      ${renderMainNav("study")}

      <header class="hero">
        <p class="eyebrow">Study Mode</p>
        <h1>学习模式</h1>
        <p class="lead">持续学习、收藏重点案例，并跨设备同步进度。</p>
      </header>

      <section class="panel study-profile">
        <div>
          <p class="study-label">学习 ID</p>
          <strong>${escapeHtml(study.learningId)}</strong>
        </div>
        <div>
          <p class="study-label">当前模式</p>
          <strong>${escapeHtml(modeLabel)}</strong>
        </div>
        <div>
          <p class="study-label">收藏数量</p>
          <strong>${study.favorites.size}</strong>
        </div>
        <button type="button" class="study-secondary-button" id="studyLogoutButton">退出当前设备</button>
      </section>

      <section class="panel study-toolbar">
        <div class="study-mode-switch">
          <button type="button" class="chip ${study.mode === "all" ? "active" : ""}" data-study-mode="all">全部案例</button>
          <button type="button" class="chip ${study.mode === "favorites" ? "active" : ""}" data-study-mode="favorites">仅看收藏</button>
        </div>
        <p class="hint">当前进度：第 ${position} 条 / 共 ${total} 条</p>
        ${renderStudyStatus()}
      </section>

      ${
        currentRecord
          ? `
            <article class="panel study-case ${currentRecord.result}">
              <header class="study-case-header">
                <span class="result-badge ${currentRecord.result}">${escapeHtml(currentRecord.resultText)}</span>
                <h2>${escapeHtml(currentRecord.title)}</h2>
                <p class="meta-line">
                  <span>${escapeHtml(currentRecord.category)}</span>
                  <span>${escapeHtml(currentRecord.location || "地区待补充")}</span>
                  <span>ID: ${escapeHtml(currentRecord.id)}</span>
                </p>
              </header>

              <section class="detail-section">
                <h3>案例摘要</h3>
                <p>${escapeHtml(currentRecord.summary || "暂无摘要")}</p>
              </section>

              <section class="detail-grid">
                ${renderDetailMeta("投资金额", currentRecord.investment)}
                ${renderDetailMeta("月盈利", currentRecord.monthlyProfit)}
                ${renderDetailMeta("月亏损", currentRecord.monthlyLoss)}
                ${renderDetailMeta("经营时长", currentRecord.businessTime)}
              </section>

              ${
                currentRecord.keyPoints.length > 0
                  ? `
                    <section class="detail-section">
                      <h3>关键要点</h3>
                      <ul class="points">
                        ${currentRecord.keyPoints.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}
                      </ul>
                    </section>
                  `
                  : ""
              }

              ${DETAIL_SECTIONS.map((item) => renderDetailSection(item.label, currentRecord[item.key])).join("")}

              <section class="study-actions">
                <button type="button" class="study-secondary-button" data-study-nav="-1" ${canPrev ? "" : "disabled"}>
                  上一条
                </button>
                <button type="button" class="study-primary-button" id="studyFavoriteToggle">
                  ${isFavorite ? "取消收藏" : "收藏案例"}
                </button>
                <button type="button" class="study-secondary-button" data-study-nav="1" ${canNext ? "" : "disabled"}>
                  下一条
                </button>
              </section>
            </article>
          `
          : `
            <section class="panel empty-panel">
              <h2>当前模式暂无可学习案例</h2>
              <p>请切换到“全部案例”继续学习，或先收藏一些案例。</p>
            </section>
          `
      }
    </main>
  `;

  bindStudyEvents();
}

function renderStudyStatus() {
  const study = state.study;
  if (study.error) {
    return `<p class="study-status error">${escapeHtml(study.error)}</p>`;
  }

  if (study.syncing) {
    return `<p class="study-status info">正在同步学习进度...</p>`;
  }

  if (study.info) {
    return `<p class="study-status info">${escapeHtml(study.info)}</p>`;
  }

  return "";
}

function bindStudyEvents() {
  const openForm = document.querySelector("#studyOpenForm");
  if (openForm) {
    openForm.addEventListener("submit", (event) => {
      event.preventDefault();
      void openStudySessionFromInputs();
    });
  }

  const learningIdInput = document.querySelector("#studyLearningId");
  if (learningIdInput) {
    learningIdInput.addEventListener("input", (event) => {
      state.study.learningIdInput = String(event.target.value || "");
    });
  }

  const secretInput = document.querySelector("#studySecret");
  if (secretInput) {
    secretInput.addEventListener("input", (event) => {
      state.study.secretInput = String(event.target.value || "");
    });
  }

  const logoutButton = document.querySelector("#studyLogoutButton");
  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      logoutStudyFromCurrentDevice();
    });
  }

  const modeButtons = document.querySelectorAll("[data-study-mode]");
  for (const button of modeButtons) {
    button.addEventListener("click", () => {
      const mode = button.dataset.studyMode || "all";
      setStudyMode(mode);
    });
  }

  const navButtons = document.querySelectorAll("[data-study-nav]");
  for (const button of navButtons) {
    button.addEventListener("click", () => {
      const step = Number(button.dataset.studyNav || "0");
      moveStudyStep(step);
    });
  }

  const favoriteButton = document.querySelector("#studyFavoriteToggle");
  if (favoriteButton) {
    favoriteButton.addEventListener("click", () => {
      void toggleStudyFavorite();
    });
  }
}

async function openStudySessionFromInputs() {
  const learningId = state.study.learningIdInput.trim().toLowerCase();
  const secret = state.study.secretInput.trim();
  await openStudySession({
    learningId,
    secret,
    silent: false
  });
}

async function openStudySession(options) {
  const learningId = String(options.learningId || "")
    .trim()
    .toLowerCase();
  const secret = String(options.secret || "").trim();
  const silent = Boolean(options.silent);

  if (!learningId || !secret) {
    state.study.error = "请输入学习 ID 和恢复码";
    state.study.info = "";
    render();
    return;
  }

  if (!/^\d{4}$/.test(secret)) {
    state.study.error = "恢复码必须是 4 位数字";
    state.study.info = "";
    render();
    return;
  }

  state.study.loading = true;
  state.study.error = "";
  state.study.info = silent ? "" : "正在连接学习档案...";
  render();

  try {
    const data = await requestStudyApi("/api/study/open", {
      method: "POST",
      body: {
        learning_id: learningId,
        secret
      }
    });

    applyStudyStateFromServer(data, learningId, secret);
    persistStudyIdentityToLocal(learningId, secret);
    state.study.info = "学习档案已连接";
  } catch (error) {
    state.study.active = false;
    state.study.error = silent ? "自动恢复失败，请重新输入学习 ID 和恢复码。" : getErrorMessage(error);
    state.study.info = "";
  } finally {
    state.study.loading = false;
    state.study.autoResumeTried = true;
    render();
  }
}

function applyStudyStateFromServer(data, learningId, secret) {
  state.study.active = true;
  state.study.learningId = learningId;
  state.study.secret = secret;
  state.study.learningIdInput = learningId;
  state.study.secretInput = secret;
  state.study.favorites = new Set(
    Array.isArray(data.favorites) ? data.favorites.map((caseId) => String(caseId)) : []
  );
  state.study.mode = data.mode === "favorites" ? "favorites" : "all";
  state.study.currentCaseId = data.current_case_id ? String(data.current_case_id) : "";
  state.study.currentIndex = toPositiveInt(data.current_index);
  state.study.error = "";
  state.study.autoResumeTried = true;
  normalizeStudyPosition();
}

function maybeAutoResumeStudy() {
  if (state.study.active || state.study.loading || state.study.autoResumeTried) {
    return;
  }

  state.study.autoResumeTried = true;
  if (!state.study.learningIdInput || !state.study.secretInput) {
    return;
  }

  void openStudySession({
    learningId: state.study.learningIdInput,
    secret: state.study.secretInput,
    silent: true
  });
}

function getStudyCaseIds(mode) {
  if (mode === "favorites") {
    const ids = [];
    for (const item of state.cases) {
      if (state.study.favorites.has(item.id)) {
        ids.push(item.id);
      }
    }
    return ids;
  }

  return state.cases.map((item) => item.id);
}

function normalizeStudyPosition() {
  const caseIds = getStudyCaseIds(state.study.mode);
  if (caseIds.length === 0) {
    state.study.currentCaseId = "";
    state.study.currentIndex = 0;
    return;
  }

  if (state.study.currentCaseId) {
    const hitIndex = caseIds.indexOf(state.study.currentCaseId);
    if (hitIndex >= 0) {
      state.study.currentIndex = hitIndex;
      return;
    }
  }

  const nextIndex = clampInt(state.study.currentIndex, 0, caseIds.length - 1);
  state.study.currentIndex = nextIndex;
  state.study.currentCaseId = caseIds[nextIndex];
}

function getStudyCurrentRecord() {
  normalizeStudyPosition();
  if (!state.study.currentCaseId) {
    return null;
  }
  return state.cases.find((item) => item.id === state.study.currentCaseId) || null;
}

function moveStudyStep(step) {
  if (!state.study.active) {
    return;
  }

  const caseIds = getStudyCaseIds(state.study.mode);
  if (caseIds.length === 0) {
    return;
  }

  const nextIndex = clampInt(state.study.currentIndex + step, 0, caseIds.length - 1);
  if (nextIndex === state.study.currentIndex) {
    return;
  }

  state.study.currentIndex = nextIndex;
  state.study.currentCaseId = caseIds[nextIndex];
  state.study.error = "";
  state.study.info = "";
  render();
  void syncStudyProgress({ quiet: true });
}

function setStudyMode(mode) {
  if (!state.study.active) {
    return;
  }

  if (mode !== "all" && mode !== "favorites") {
    return;
  }

  if (state.study.mode === mode) {
    return;
  }

  state.study.mode = mode;
  normalizeStudyPosition();
  render();
  void syncStudyProgress({ quiet: true });
}

async function toggleStudyFavorite() {
  if (!state.study.active) {
    return;
  }

  const currentRecord = getStudyCurrentRecord();
  if (!currentRecord) {
    return;
  }

  state.study.error = "";
  state.study.syncing = true;
  render();

  try {
    const result = await requestStudyApi("/api/study/favorites/toggle", {
      method: "POST",
      body: {
        learning_id: state.study.learningId,
        secret: state.study.secret,
        case_id: currentRecord.id
      }
    });

    if (result.favorited) {
      state.study.favorites.add(currentRecord.id);
      state.study.info = "已加入收藏";
    } else {
      state.study.favorites.delete(currentRecord.id);
      state.study.info = "已取消收藏";
    }

    normalizeStudyPosition();
    await syncStudyProgress({ quiet: true });
  } catch (error) {
    state.study.error = getErrorMessage(error);
  } finally {
    state.study.syncing = false;
    render();
  }
}

async function syncStudyProgress(options = {}) {
  if (!state.study.active) {
    return;
  }

  const quiet = Boolean(options.quiet);
  if (!quiet) {
    state.study.syncing = true;
    render();
  }

  try {
    await requestStudyApi("/api/study/progress", {
      method: "POST",
      body: {
        learning_id: state.study.learningId,
        secret: state.study.secret,
        current_case_id: state.study.currentCaseId,
        current_index: state.study.currentIndex,
        mode: state.study.mode
      }
    });
  } catch (error) {
    state.study.error = "学习进度同步失败：" + getErrorMessage(error);
    render();
  } finally {
    if (!quiet) {
      state.study.syncing = false;
      render();
    }
  }
}

function logoutStudyFromCurrentDevice() {
  clearStudyIdentityFromLocal();
  state.study = createStudyState();
  state.study.info = "已退出当前设备上的学习档案";
  state.study.autoResumeTried = true;
  render();
}

function hydrateStudyIdentityFromLocal() {
  try {
    const learningId = localStorage.getItem(STUDY_STORAGE_KEYS.learningId) || "";
    const secret = localStorage.getItem(STUDY_STORAGE_KEYS.secret) || "";
    if (!learningId || !secret) {
      return;
    }

    state.study.learningIdInput = learningId;
    state.study.secretInput = secret;
  } catch {
    // Ignore browser storage failures and continue without local resume.
  }
}

function persistStudyIdentityToLocal(learningId, secret) {
  try {
    localStorage.setItem(STUDY_STORAGE_KEYS.learningId, learningId);
    localStorage.setItem(STUDY_STORAGE_KEYS.secret, secret);
  } catch {
    // Ignore local persistence failures and keep the current session in memory.
  }
}

function clearStudyIdentityFromLocal() {
  try {
    localStorage.removeItem(STUDY_STORAGE_KEYS.learningId);
    localStorage.removeItem(STUDY_STORAGE_KEYS.secret);
  } catch {
    // Ignore local persistence failures.
  }
}

async function requestStudyApi(path, options = {}) {
  const method = options.method || "GET";
  const headers = {
    accept: "application/json",
    ...(options.headers || {})
  };
  const requestInit = { method, headers };

  if (options.body !== undefined) {
    headers["content-type"] = "application/json";
    requestInit.body = JSON.stringify(options.body);
  }

  const response = await fetch(path, requestInit);
  let payload = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok || !payload || payload.ok !== true) {
    const message = payload?.error?.message || "请求失败，状态码: " + response.status;
    throw new Error(message);
  }

  return payload.data;
}

function getErrorMessage(error) {
  return error instanceof Error ? error.message : String(error);
}

function clampInt(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function toPositiveInt(value) {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 0) {
    return 0;
  }
  return parsed;
}

function createStudyState() {
  return {
    learningId: "",
    secret: "",
    learningIdInput: "",
    secretInput: "",
    active: false,
    mode: "all",
    favorites: new Set(),
    currentCaseId: "",
    currentIndex: 0,
    autoResumeTried: false,
    loading: false,
    syncing: false,
    error: "",
    info: ""
  };
}

function renderSummaryPage() {
  document.title = "知识总结 | 零售创业案例数据库";
  setModalOpen(false);

  app.innerHTML = `
    <main class="shell summary-shell">
      ${renderMainNav("summary")}

      <header class="hero">
        <p class="eyebrow">Knowledge Summary</p>
        <h1>开店案例知识总结</h1>
        <p class="lead">基于真实连线案例沉淀的选址、成本、运营与风险判断框架。</p>
      </header>

      <section class="core-summary panel">
        <h2>核心总结</h2>
        <p class="core-quote">${escapeHtml(SUMMARY_DATA.coreQuote)}</p>
        <div class="formula">
          <p><strong>成功公式：</strong></p>
          <p>${escapeHtml(SUMMARY_DATA.formula)}</p>
        </div>
      </section>

      ${SUMMARY_DATA.sections.map((section) => renderSummarySection(section)).join("")}

      <footer class="summary-footer panel">
        <p>2026 零售创业案例数据库</p>
      </footer>
    </main>
  `;
}

function renderSummarySection(section) {
  const sectionClass = ["knowledge-section", "panel"];
  if (section.tone === "danger") {
    sectionClass.push("danger-section");
  }
  if (section.tone === "success") {
    sectionClass.push("success-section");
  }

  return `
    <section class="${sectionClass.join(" ")}">
      <div class="section-header">
        <span class="section-number ${section.tone}">${escapeHtml(section.number)}</span>
        <h2>${escapeHtml(section.title)}</h2>
      </div>
      <div class="knowledge-cards">
        ${section.cards.map((card) => renderKnowledgeCard(card, section.tone)).join("")}
      </div>
    </section>
  `;
}

function renderKnowledgeCard(card, tone) {
  const toneClass = tone === "danger" || tone === "success" ? tone : "default";
  return `
    <article class="knowledge-card ${toneClass}">
      <h3>${escapeHtml(card.title)}</h3>
      <p>${escapeHtml(card.content)}</p>
    </article>
  `;
}

function setModalOpen(isOpen) {
  if (isOpen) {
    document.body.classList.add("modal-open");
    return;
  }
  document.body.classList.remove("modal-open");
}

function tokenizeSearch(query) {
  return String(query ?? "")
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);
}

function buildCaseSearchIndex(record) {
  const sources = [
    record.title,
    record.category,
    record.resultText,
    record.location,
    record.investment,
    record.monthlyProfit,
    record.monthlyLoss,
    record.businessTime,
    record.summary,
    record.background,
    record.problem,
    record.process,
    record.resultDetail,
    record.reflection,
    ...record.keyPoints,
    ...record.tags
  ];

  return sources.join(" ").toLowerCase();
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
