const STORAGE_KEY = "interview-preflight-checklist";

const screens = [
  {
    id: "home",
    title: "打工面試工具箱",
    cta: "面試前檢查",
    next: "checklist",
    render: () => `
      <section class="screen-panel" aria-labelledby="home-title">
        <h1 class="screen-title" id="home-title">打工面試工具箱</h1>
        <div class="card benefit-list" aria-label="功能清單">
          ${[
            { label: "面試前檢查", desc: "準備確認", next: "checklist" },
            { label: "常見問題", desc: "標準回答", next: "template" },
            { label: "救援語句", desc: "卡住使用", next: "rescue" },
            { label: "安心提示", desc: "緊張時用", next: "complete" },
          ]
            .map(
              (item) => `
                <button class="benefit-item home-link" type="button" data-next="${item.next}">
                  <span class="benefit-icon" aria-hidden="true">✓</span>
                  <span class="benefit-copy">
                    <span class="benefit-label">${item.label}</span>
                    <span class="benefit-desc">${item.desc}</span>
                  </span>
                </button>
              `,
            )
            .join("")}
        </div>
      </section>
    `,
  },
  {
    id: "checklist",
    title: "面試前檢查",
    cta: "常見問題",
    next: "template",
    render: () => `
      <section class="screen-panel" aria-labelledby="checklist-title">
        <h1 class="screen-title" id="checklist-title">面試前檢查</h1>
        <div class="checklist-meta" aria-live="polite">
          <span id="checklistCount">已完成 0 / 5</span>
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
    cta: "救援語句",
    next: "rescue",
    render: () => `
      <section class="screen-panel" aria-labelledby="template-title">
        <h1 class="screen-title" id="template-title">常見問題</h1>
        <div class="card question-card">
          <p class="section-label">問題</p>
          <p class="question">為什麼想來這裡？</p>
          <ul class="key-points" aria-label="回答重點">
            <li>接客經驗</li>
            <li>喜歡這家店</li>
            <li>通勤方便</li>
          </ul>
        </div>
        <div class="answer-block" aria-label="回答範例">
          <div class="card answer-card">
            <p class="section-label">模板</p>
            <p>想學接客，喜歡這家店，通勤也近。</p>
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
    cta: "安心提示",
    next: "complete",
    render: () => `
      <section class="screen-panel" aria-labelledby="rescue-title">
        <h1 class="screen-title" id="rescue-title">救援語句</h1>
        <div class="phrase-section" aria-labelledby="listen-title">
          <h2 class="phrase-title" id="listen-title">聽不懂時</h2>
          ${phraseCard("再說一次", "もう一度お願いします。")}
          ${phraseCard("說慢一點", "ゆっくりお願いします。")}
          ${phraseCard("聽不懂", "すみません、わかりません。")}
        </div>
        <div class="phrase-section" aria-labelledby="thinking-title">
          <h2 class="phrase-title" id="thinking-title">需要思考時</h2>
          ${phraseCard("想一下", "少し考えてもいいですか。")}
          ${phraseCard("再確認", "確認してもいいですか。")}
        </div>
      </section>
    `,
  },
  {
    id: "complete",
    title: "安心提示",
    cta: "回首頁",
    next: "home",
    secondary: "面試前檢查",
    render: () => `
      <section class="screen-panel completion-panel" aria-labelledby="complete-title">
        <h1 class="screen-title" id="complete-title">安心提示</h1>
        <div class="card phrase-card">
          <p class="phrase-zh">不用完美</p>
        </div>
        <div class="card phrase-card">
          <p class="phrase-zh">短句可以</p>
        </div>
        <div class="card phrase-card">
          <p class="phrase-zh">卡住正常</p>
        </div>
      </section>
    `,
  },
];

const checklistItems = [
  { id: "intro", label: "自我介紹" },
  { id: "motivation", label: "應徵動機" },
  { id: "schedule", label: "可上班時間" },
  { id: "commute", label: "通勤時間" },
  { id: "questions", label: "提問內容" },
];

const app = document.querySelector("#app");
const progressText = document.querySelector("#progressText");
const progressFill = document.querySelector("#progressFill");

let state = loadState();
let activeScreenId = "home";

function phraseCard(zh, ja) {
  return `
    <article class="card phrase-card">
      <p class="phrase-zh">${zh}</p>
      <p class="phrase-ja" lang="ja">${ja}</p>
    </article>
  `;
}

function loadState() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return { checked: stored?.checked ?? {} };
  } catch {
    return { checked: {} };
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function render(screenId = activeScreenId) {
  activeScreenId = screenId;
  const screen = screens.find((item) => item.id === screenId) ?? screens[0];
  const index = screens.indexOf(screen);

  progressText.textContent = `${index + 1} / ${screens.length}`;
  progressFill.style.width = `${((index + 1) / screens.length) * 100}%`;

  app.innerHTML = `
    ${screen.render()}
    <nav class="sticky-actions" aria-label="下一步">
      <button class="primary-button" type="button" data-next="${screen.next}">${screen.cta}</button>
      ${
        screen.secondary
          ? `<button class="secondary-link" type="button" data-next="checklist">${screen.secondary}</button>`
          : ""
      }
    </nav>
  `;

  bindActions();
  if (screen.id === "checklist") {
    bindChecklist();
    updateChecklistProgress();
  }

  app.focus({ preventScroll: true });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function bindActions() {
  app.querySelectorAll("[data-next]").forEach((button) => {
    button.addEventListener("click", () => render(button.dataset.next));
  });
}

function bindChecklist() {
  app.querySelectorAll('input[name="checklist"]').forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      state.checked[checkbox.value] = checkbox.checked;
      saveState();
      updateChecklistProgress();
    });
  });
}

function updateChecklistProgress() {
  const completed = checklistItems.filter((item) => state.checked[item.id]).length;
  const total = checklistItems.length;
  const count = document.querySelector("#checklistCount");
  const meter = document.querySelector("#checklistMeter");

  if (count) {
    count.textContent = `已完成 ${completed} / ${total}`;
  }

  if (meter) {
    meter.style.width = `${(completed / total) * 100}%`;
  }
}

render();
