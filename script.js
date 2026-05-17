    secondary: "安心提示",
    secondaryNext: "complete",
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
    secondaryNext: "checklist",
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
  const isHome = screen.id === "home";
  progressText.textContent = isHome ? "工具箱" : screen.title;
  progressFill.style.width = isHome ? "100%" : "100%";

  app.innerHTML = `
    ${screen.render()}
    ${
      screen.id === "home"
        ? ""
        : `<nav class="sticky-actions" aria-label="下一步">
      <button class="primary-button" type="button" data-next="${screen.next}">${screen.cta}</button>
      ${
        screen.secondary
          ? `<button class="secondary-link" type="button" data-next="${screen.secondaryNext ?? "home"}">${screen.secondary}</button>`
          : ""
      }
    </nav>`
    }
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
    count.textContent = `${completed} / ${total}`;
  }

  if (meter) {
    meter.style.width = `${(completed / total) * 100}%`;
  }
}

render();
