import { cases } from '../data.js';

const appHtml = `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>创业案例库</title>
  <style>
    :root { --bg:#f4f5f7; --card:#fff; --text:#1f2937; --muted:#6b7280; --line:#e5e7eb; --success:#2fbf71; --warning:#f59e0b; --failure:#e24a3b; --brand:#2563eb; }
    * { box-sizing: border-box; }
    body { margin:0; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','PingFang SC','Microsoft YaHei',sans-serif; color:var(--text); background:var(--bg); }
    .container { max-width:1200px; margin:0 auto; padding:20px 14px 40px; }
    .header { background:linear-gradient(120deg,#1d4ed8,#2563eb 55%,#3b82f6); color:#fff; border-radius:16px; padding:24px 20px; }
    .header h1 { margin:0; font-size:28px; }
    .header p { margin:8px 0 0; opacity:.9; }
    .tabs { display:flex; gap:10px; margin:16px 0 18px; }
    .tab { border:0; border-radius:999px; padding:10px 16px; cursor:pointer; background:#fff; color:#334155; font-weight:700; }
    .tab.active { background:var(--brand); color:#fff; }
    .toolbar { display:grid; gap:12px; margin-bottom:14px; background:var(--card); border:1px solid var(--line); border-radius:14px; padding:14px; }
    .chips { display:flex; flex-wrap:wrap; gap:8px; }
    .chip { border:1px solid #d1d5db; background:#fff; color:#374151; border-radius:999px; padding:6px 12px; cursor:pointer; font-size:13px; }
    .chip.active { border-color:var(--brand); color:var(--brand); background:#eff6ff; }
    .search { border:1px solid #d1d5db; border-radius:10px; padding:10px 12px; font-size:14px; width:100%; }
    .list { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:16px; }
    .card { background:var(--card); border:1px solid var(--line); border-radius:14px; overflow:hidden; box-shadow:0 3px 12px rgba(0,0,0,.06); }
    .card-head { color:#fff; padding:14px 16px; }
    .card-head.success { background:var(--success); } .card-head.warning { background:var(--warning); } .card-head.failure { background:var(--failure); }
    .badge { display:inline-block; font-size:12px; font-weight:700; padding:4px 10px; background:rgba(255,255,255,.24); border-radius:999px; }
    .title { margin:10px 0 0; font-size:28px; line-height:1.25; font-weight:800; }
    .card-body { padding:14px 16px 16px; display:grid; gap:10px; }
    .meta { color:#374151; line-height:1.8; }
    .muted { color:var(--muted); }
    .tags { display:flex; flex-wrap:wrap; gap:6px; }
    .tag { background:#f3f4f6; color:#4b5563; border-radius:999px; padding:4px 10px; font-size:12px; }
    .summary-grid { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:12px; margin-bottom:14px; }
    .stat,.panel { background:#fff; border:1px solid var(--line); border-radius:14px; padding:16px; margin-bottom:12px; }
    .stat .v { font-size:26px; font-weight:800; margin-top:8px; }
    .panel h3 { margin:0 0 10px; }
    .panel ul { margin:0; padding-left:18px; line-height:1.7; color:#374151; }
    .empty { text-align:center; color:#6b7280; padding:40px 12px; }
    @media (max-width:980px){ .list,.summary-grid{ grid-template-columns:repeat(2,minmax(0,1fr)); } }
    @media (max-width:680px){ .container{ padding:14px 10px 26px; } .header h1{ font-size:22px; } .list,.summary-grid{ grid-template-columns:1fr; } .title{ font-size:22px; } }
  </style>
</head>
<body>
  <div class="container">
    <div class="header"><h1>创业案例决策库</h1><p>Cloudflare Workers 双页面站点：案例展示 + 总结经验</p></div>
    <div class="tabs"><button class="tab" data-view="cases">案例展示</button><button class="tab" data-view="insights">总结经验</button></div>
    <section id="cases-view">
      <div class="toolbar"><input id="search" class="search" placeholder="搜索标题 / 地点 / 标签 / 摘要" /><div id="result-chips" class="chips"></div><div id="category-chips" class="chips"></div></div>
      <div id="list" class="list"></div><div id="empty" class="empty" style="display:none;">没有找到匹配案例，请更换筛选条件。</div>
    </section>
    <section id="insights-view" style="display:none;"></section>
  </div>
  <script>
    var state = { cases: [], category: '全部', result: '全部', search: '', view: 'cases' };
    var listEl = document.getElementById('list');
    var emptyEl = document.getElementById('empty');
    var categoryEl = document.getElementById('category-chips');
    var resultEl = document.getElementById('result-chips');
    var searchEl = document.getElementById('search');
    var casesView = document.getElementById('cases-view');
    var insightsView = document.getElementById('insights-view');

    function topItems(items, key, size) {
      var m = new Map();
      for (var i = 0; i < items.length; i++) {
        var values = Array.isArray(items[i][key]) ? items[i][key] : [items[i][key]];
        for (var j = 0; j < values.length; j++) {
          var val = values[j];
          if (!val) continue;
          m.set(val, (m.get(val) || 0) + 1);
        }
      }
      return Array.from(m.entries()).sort(function(a, b){ return b[1] - a[1]; }).slice(0, size || 8);
    }

    function li(items, suffix) {
      return items.map(function(it){ return '<li>' + it[0] + suffix(it[1]) + '</li>'; }).join('');
    }

    function renderInsights() {
      var total = state.cases.length;
      var success = state.cases.filter(function(x){ return x.result === 'success'; }).length;
      var warning = state.cases.filter(function(x){ return x.result === 'warning'; }).length;
      var failure = state.cases.filter(function(x){ return x.result === 'failure'; }).length;
      var topCategories = topItems(state.cases, 'category', 10);
      var riskPoints = topItems(state.cases.filter(function(x){ return x.result !== 'success'; }), 'keyPoints', 10);
      var goodSignals = topItems(state.cases.filter(function(x){ return x.result === 'success'; }), 'keyPoints', 8);
      insightsView.innerHTML =
        '<div class="summary-grid">'
        + '<div class="stat"><div>总案例数</div><div class="v">' + total + '</div></div>'
        + '<div class="stat"><div>成功案例</div><div class="v" style="color:var(--success)">' + success + '</div></div>'
        + '<div class="stat"><div>警示 + 失败</div><div class="v" style="color:var(--failure)">' + (warning + failure) + '</div></div>'
        + '</div>'
        + '<div class="panel"><h3>高频行业分类（TOP10）</h3><ul>' + li(topCategories, function(v){ return '：' + v + ' 条'; }) + '</ul></div>'
        + '<div class="panel"><h3>常见风险信号（建议重点排查）</h3><ul>' + li(riskPoints, function(v){ return '（' + v + ' 次）'; }) + '</ul></div>'
        + '<div class="panel"><h3>成功案例中的正向信号</h3><ul>' + li(goodSignals, function(v){ return '（' + v + ' 次）'; }) + '</ul></div>'
        + '<div class="panel"><h3>我的建议（加分项）</h3><ul><li>优先验证“人流 × 转化率 × 客单价”三要素，再决定是否签约。</li><li>对“独家经营、租金递增、违约责任”等核心条款做合同锁定。</li><li>将每个案例沉淀为“可复制检查清单”，开店前逐条核对。</li></ul></div>';
    }

    function filteredCases() {
      var q = state.search.trim().toLowerCase();
      return state.cases.filter(function(item){
        var byCategory = state.category === '全部' || item.category === state.category;
        var byResult = state.result === '全部' || item.resultText === state.result;
        var text = [item.title, item.location, item.summary].concat(item.tags || []).join(' ').toLowerCase();
        var bySearch = !q || text.indexOf(q) >= 0;
        return byCategory && byResult && bySearch;
      });
    }

    function renderCases() {
      var list = filteredCases();
      listEl.innerHTML = list.map(function(item){
        var tags = (item.tags || []).slice(0,5).map(function(tag){ return '<span class="tag">' + tag + '</span>'; }).join('');
        return '<article class="card">'
          + '<div class="card-head ' + item.result + '"><span class="badge">' + item.resultText + '</span><h2 class="title">' + item.title + '</h2></div>'
          + '<div class="card-body"><div class="meta"><b>品类：</b>' + (item.category || '未知') + ' &nbsp; <b>地点：</b>' + (item.location || '未知') + ' &nbsp; <b>投资：</b>' + (item.investment || '未知') + '</div><div class="muted">' + (item.summary || '暂无摘要') + '</div><div class="tags">' + tags + '</div></div>'
          + '</article>';
      }).join('');
      emptyEl.style.display = list.length ? 'none' : 'block';
    }

    function buildChips(el, options, current, onClick) {
      el.innerHTML = options.map(function(x){ return '<button class="chip ' + (x === current ? 'active' : '') + '" data-value="' + x + '">' + x + '</button>'; }).join('');
      el.querySelectorAll('.chip').forEach(function(btn){ btn.addEventListener('click', function(){ onClick(btn.dataset.value); }); });
    }

    function syncTabs(push) {
      document.querySelectorAll('.tab').forEach(function(btn){ btn.classList.toggle('active', btn.dataset.view === state.view); });
      casesView.style.display = state.view === 'cases' ? 'block' : 'none';
      insightsView.style.display = state.view === 'insights' ? 'block' : 'none';
      if (push) {
        history.pushState({}, '', state.view === 'cases' ? '/' : '/insights');
      }
    }

    function render() {
      var categories = ['全部'].concat(Array.from(new Set(state.cases.map(function(x){ return x.category; }).filter(Boolean))).slice(0,80));
      var results = ['全部','成功案例','警示案例','失败案例'];
      function onCategory(v){ state.category = v; renderCases(); buildChips(categoryEl, categories, state.category, onCategory); }
      function onResult(v){ state.result = v; renderCases(); buildChips(resultEl, results, state.result, onResult); }
      buildChips(categoryEl, categories, state.category, onCategory);
      buildChips(resultEl, results, state.result, onResult);
      renderCases();
      renderInsights();
      syncTabs();
    }

    searchEl.addEventListener('input', function(e){ state.search = e.target.value; renderCases(); });
    document.querySelectorAll('.tab').forEach(function(btn){ btn.addEventListener('click', function(){ state.view = btn.dataset.view; syncTabs(true); }); });
    fetch('/api/cases').then(function(r){ return r.json(); }).then(function(data){ state.cases = data; if (location.pathname.indexOf('insights') >= 0) state.view = 'insights'; render(); });
  </script>
</body>
</html>`;

export default {
  async fetch(request) {
    const url = new URL(request.url);
    if (url.pathname === '/api/cases') {
      return Response.json(cases, { headers: { 'Cache-Control': 'public, max-age=3600' } });
    }
    if (['/', '/cases', '/insights'].includes(url.pathname)) {
      return new Response(appHtml, { headers: { 'content-type': 'text/html; charset=UTF-8', 'Cache-Control': 'public, max-age=600' } });
    }
    return new Response('Not Found', { status: 404 });
  },
};
