const STORAGE_KEY = "interview-preflight-checklist";

const screens = [
  {
    id: "home",
    title: "打工面試快速檢查",
    cta: "開始準備",
    next: "checklist",
    render: () => `
      <section class="screen-panel" aria-labelledby="home-title">
        <h1 class="screen-title" id="home-title">打工面試快速檢查</h1>
        <p class="screen-subtitle">用 5 分鐘完成準備，讓自己更有把握。</p>
        <div class="card benefit-list" aria-label="準備重點">
          ${["確認是否準備完成", "查看常見問題回答模板", "找到聽不懂時的應對句"]
            .map(
              (item) => `
                <div class="benefit-item">
                  <span class="benefit-icon" aria-hidden="true">✓</span>
                  <span>${item}</span>
                </div>
              `,
            )
            .join("")}
        </div>
      </section>
    `,
  },
  {
    id: "checklist",
    title: "面試前快速檢查",
    cta: "查看回答模板",
    next: "template",
    render: () => `
      <section class="screen-panel" aria-labelledby="checklist-title">
        <h1 class="screen-title" id="checklist-title">面試前快速檢查</h1>
        <p class="description">請確認以下內容是否已準備好。</p>
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
    title: "常見問題模板",
    cta: "查看救援語句",
    next: "rescue",
    render: () => `
      <section class="screen-panel" aria-labelledby="template-title">
        <h1 class="screen-title" id="template-title">常見問題模板</h1>
        <div class="card question-card">
          <p class="section-label">問題</p>
          <p class="question">為什麼想在這裡工作？</p>
          <ul class="key-points" aria-label="回答重點">
            <li>想學習接客服務</li>
            <li>喜歡這家店</li>
            <li>通勤方便</li>
          </ul>
        </div>
        <div class="answer-block" aria-label="回答範例">
          <div class="card answer-card">
            <p class="section-label">中文整理</p>
            <p>我想學習接客服務，而且這裡離我住的地方很近，所以想在這裡工作。</p>
          </div>
          <div class="card answer-card japanese" lang="ja">
            <p class="section-label">日文例句</p>
            <p>接客を学びたいと思い、家からも近いので応募しました。</p>
          </div>
        </div>
        <p class="hint">不需要完全照背，只要抓住重點即可。</p>
      </section>
    `,
  },
  {
    id: "rescue",
    title: "救援語句",
    cta: "完成準備",
    next: "complete",
    render: () => `
      <section class="screen-panel" aria-labelledby="rescue-title">
        <h1 class="screen-title" id="rescue-title">救援語句</h1>
        <div class="phrase-section" aria-labelledby="listen-title">
          <h2 class="phrase-title" id="listen-title">聽不懂時</h2>
          ${phraseCard("可以請您再說一次嗎？", "もう一度お願いします。")}
          ${phraseCard("可以請您說慢一點嗎？", "ゆっくりお願いします。")}
        </div>
        <div class="phrase-section" aria-labelledby="thinking-title">
          <h2 class="phrase-title" id="thinking-title">需要思考時</h2>
          ${phraseCard("我可以想一下嗎？", "少し考えてもいいですか。")}
        </div>
        <div class="reassurance-card card">
          <p>聽不懂時請對方重複，是很正常的。</p>
        </div>
      </section>
    `,
  },
  {
    id: "complete",
    title: "你已完成面試準備",
    cta: "重新查看內容",
    next: "checklist",
    secondary: "回到首頁",
    render: () => `
      <section class="screen-panel completion-panel" aria-labelledby="complete-title">
        <div class="completion-mark" aria-hidden="true">✓</div>
        <h1 class="screen-title" id="complete-title">你已完成面試準備</h1>
        <p class="completion-message">不需要完美的日文。<br>只要讓對方理解你的意思，就已經很好了。</p>
      </section>
    `,
  },
];

const checklistItems = [
  { id: "intro", label: "我已準備好自我介紹" },
  { id: "motivation", label: "我已準備好應徵動機" },
  { id: "schedule", label: "我知道可上班的時間" },
  { id: "commute", label: "我知道從住處到店裡的通勤時間" },
  { id: "questions", label: "我已準備好想問店家的問題" },
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
          ? `<button class="secondary-link" type="button" data-next="home">${screen.secondary}</button>`
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
