const STORAGE_KEY = "interview-preflight-checklist";

const screens = [
  {
    id: "home",
    title: "打工面試工具箱",
    cta: "",
    next: "",
    render: () => `
      <section class="screen-panel" aria-labelledby="home-title">
        <h1 class="screen-title" id="home-title">打工面試工具箱</h1>
        <p class="index-subtitle">快速查找</p>
        <nav class="index-list" aria-label="功能索引">
          ${[
            { label: "面試前檢查", desc: "準備確認", next: "checklist" },
            { label: "常見問題", desc: "標準回答", next: "template" },
            { label: "救援語句", desc: "卡住使用", next: "rescue" },
            { label: "安心提示", desc: "緊張時用", next: "complete" },
          ]
            .map(
              (item) => `
                <button class="index-row" type="button" data-next="${item.next}">
                  <span class="index-label">${item.label}</span>
                  <span class="index-sep" aria-hidden="true">—</span>
                  <span class="index-meaning">${item.desc}</span>
                </button>
              `,
            )
            .join("")}
        </nav>
      </section>
    `,
  },
  {
    id: "checklist",
    title: "面試前檢查",
    cta: "回首頁",
    next: "home",
    secondary: "常見問題",
    secondaryNext: "template",
    render: () => `
      <section class="screen-panel" aria-labelledby="checklist-title">
        <h1 class="screen-title" id="checklist-title">面試前檢查</h1>
        <div class="checklist-meta" aria-live="polite">
          <span id="checklistCount">0 / 5</span>
          <span class="meter" aria-hidden="true"><span id="checklistMeter"></span></span>
        </div>
        <form class="checklist" aria-label="面試前檢查項目">
          ${checklistItems
            .map(
              (item) => `
                <label class="card check-item">
                  <input type="checkbox" name="checklist" value="${item.id}" ${state.checked[item.id] ? "checked" : ""}>
                  <span class="custom-check" aria-hidden="true">✓</span>
                  <span class="check-label">${item.label}</span>
                </label>
              `,
            )
            .join("")}
        </form>
      </section>
    `,
  },
  {
    id: "template",
    title: "常見問題",
    cta: "回首頁",
    next: "home",
    secondary: "救援語句",
    secondaryNext: "rescue",
    render: () => `
      <section class="screen-panel" aria-labelledby="template-title">
        <h1 class="screen-title" id="template-title">常見問題</h1>
        <div class="card question-card">
          <p class="section-label">問題</p>
          <p class="question">為什麼想來這裡？</p>
          <ul class="key-points" aria-label="回答重點">
            <li>學接客</li>
            <li>喜歡這家店</li>
            <li>離家近</li>
          </ul>
        </div>
        <div class="answer-block" aria-label="回答範例">
          <div class="card answer-card">
            <p class="section-label">模板</p>
            <p>想學接客，喜歡這家店，離家近。</p>
          </div>
          <div class="card answer-card japanese" lang="ja">
            <p class="section-label">日文例句</p>
            <p>接客を学びたいと思い、家からも近いので応募しました。</p>
          </div>
        </div>
      </section>
    `,
  },
  {
    id: "rescue",
    title: "救援語句",
    cta: "回首頁",
    next: "home",
