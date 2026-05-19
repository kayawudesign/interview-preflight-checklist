const STORAGE_KEY = "interview-preflight-checklist";

const checklistItems = [
  { id: "arrival", label: "提早 10 分鐘到附近" },
  { id: "route", label: "店名、地址、路線已確認" },
  { id: "clothes", label: "服裝乾淨、頭髮整理好" },
  { id: "intro", label: "自我介紹能說 20 秒" },
  { id: "schedule", label: "可上班時間已想好" },
  { id: "questions", label: "最後想問的問題準備 1 個" },
];

const screens = [
  {
    id: "home",
    title: "面試前快速掃讀",
    progress: "Ready",
    render: () => `
      <section class="screen-panel" aria-labelledby="home-title">
        <h1 class="screen-title" id="home-title">面試前<br><span class="title-subline">快速檢查</span></h1>
        <p class="index-subtitle">緊張時，只看要做什麼。</p>
        <nav class="index-list" aria-label="工具選單">
          ${[
            { label: "準備清單", desc: "到場前確認", next: "checklist" },
            { label: "自我介紹", desc: "20 秒模板", next: "intro-template" },
            { label: "常見回答", desc: "直接套句", next: "template" },
            { label: "禮儀 Flow", desc: "入室到退室", next: "etiquette-flow" },
            { label: "卡住救援", desc: "聽不懂時", next: "rescue" },
            { label: "最後提醒", desc: "穩住狀態", next: "complete" },
          ]
            .map(
              (item) => `
                <button class="index-row" type="button" data-next="${item.next}">
                  <span class="index-label">${item.label}</span>
                  <span class="index-sep" aria-hidden="true">→</span>
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
    title: "準備清單",
    progress: "Check",
    cta: "回首頁",
    next: "home",
    render: () => `
      <section class="screen-panel" aria-labelledby="checklist-title">
        <h1 class="screen-title" id="checklist-title">準備清單</h1>
        <div class="checklist-meta" aria-live="polite">
          <span id="checklistCount">0 / ${checklistItems.length}</span>
          <span class="meter" aria-hidden="true"><span id="checklistMeter"></span></span>
        </div>
        <form class="checklist" aria-label="面試前檢查清單">
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
    id: "intro-template",
    title: "自我介紹模板",
    progress: "Intro",
    cta: "回首頁",
    next: "home",
    render: () => `
      <section class="screen-panel" aria-labelledby="intro-title">
        <h1 class="screen-title" id="intro-title">自我介紹模板</h1>
        <p class="description">照順序填空，面試時慢慢說。</p>
        <div class="form-list" aria-label="自我介紹欄位">
          ${introField("名前", "〇〇です")}
          ${introField("学校・身分", "台湾から来た留学生です")}
          ${introField("応募理由", "接客の仕事に興味があります")}
          ${introField("強み", "明るく、丁寧に対応できます")}
          ${introField("締め", "よろしくお願いします")}
        </div>
      </section>
    `,
  },
  {
    id: "template",
    title: "常見回答",
    progress: "Answer",
    cta: "回首頁",
    next: "home",
    render: () => `
      <section class="screen-panel" aria-labelledby="template-title">
        <h1 class="screen-title" id="template-title">常見回答</h1>
        <div class="qa-list" aria-label="常見面試回答">
          ${qaCard("Q1", "いつから働けますか？", [
            "来週から働けます。",
            "学校の予定に合わせて働きたいです。",
          ])}
          ${qaCard("Q2", "週に何日入れますか？", [
            "週に三日ぐらい入れます。",
            "土日も相談できます。",
          ])}
          ${qaCard("Q3", "なぜ応募しましたか？", [
            "日本語を使う仕事を経験したいと思いました。",
            "お店の雰囲気が良いと思いました。",
          ])}
          ${qaCard("Q4", "質問はありますか？", [
            "最初の研修はどのように進みますか？",
          ])}
        </div>
      </section>
    `,
  },
  {
    id: "etiquette-flow",
    title: "禮儀 Flow",
    progress: "Manner",
    cta: "回首頁",
    next: "home",
    render: () => `
      <section class="screen-panel" aria-labelledby="flow-title">
        <h1 class="screen-title" id="flow-title">禮儀 Flow</h1>
        <p class="index-subtitle">一步一動作，一步一句話。</p>

        ${flowSection("🚪 入室", [
          { action: "ノック" },
          { phrase: "「失礼します」", zh: "（打擾了）" },
          { action: "入る・ドアを閉める" },
          { phrase: "「〇〇です。よろしくお願いします」", zh: "（我是〇〇，請多指教）" },
        ])}

        ${flowSection("🪑 着席", [
          { phrase: "「どうぞ」" },
          { phrase: "「失礼します」" },
          { action: "座る" },
        ])}

        ${flowSection("🙇 終了", [
          { action: "立つ" },
          { phrase: "「ありがとうございました」", zh: "（非常感謝）" },
          { phrase: "「失礼します」" },
          { action: "退室" },
        ])}
      </section>
    `,
  },
  {
    id: "rescue",
    title: "卡住救援",
    progress: "Rescue",
    cta: "回首頁",
    next: "home",
    render: () => `
      <section class="screen-panel" aria-labelledby="rescue-title">
        <h1 class="screen-title" id="rescue-title">卡住救援</h1>
        <div class="phrase-section" aria-labelledby="listen-title">
          <h2 class="phrase-title" id="listen-title">聽不懂</h2>
          ${phraseCard("請再說一次", "もう一度お願いします")}
          ${phraseCard("可以說慢一點嗎", "少しゆっくりお願いします")}
          ${phraseCard("我確認一下", "確認してもよろしいですか")}
        </div>
        <div class="phrase-section" aria-labelledby="thinking-title">
          <h2 class="phrase-title" id="thinking-title">需要時間想</h2>
          ${phraseCard("請稍等一下", "少々お待ちください")}
          ${phraseCard("我想一下", "少し考えてもよろしいですか")}
        </div>
      </section>
    `,
  },
  {
    id: "complete",
    title: "最後提醒",
    progress: "Calm",
    cta: "回首頁",
    next: "home",
    render: () => `
      <section class="screen-panel completion-panel" aria-labelledby="complete-title">
        <h1 class="screen-title" id="complete-title">最後提醒</h1>
        <p class="index-subtitle">進門前看這裡。</p>
        ${phraseOnlyCard("ゆっくり話す")}
        ${phraseOnlyCard("分からない時は聞き返す")}
        ${phraseOnlyCard("最後にお礼を言う")}
        ${phraseOnlyCard("大丈夫。準備できている")}
      </section>
    `,
  },
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

function phraseOnlyCard(text) {
  return `
    <article class="card phrase-card" lang="ja">
      <p class="phrase-ja phrase-ja-only">${text}</p>
    </article>
  `;
}

function introField(label, example) {
  return `
    <article class="card intro-field">
      <p class="intro-label">${label}</p>
      <p class="intro-example" lang="ja">${example}</p>
    </article>
  `;
}

function qaCard(order, title, lines) {
  return `
    <article class="card qa-card">
      <p class="section-label">${order}</p>
      <p class="question" lang="ja">${title}</p>
      <div class="qa-lines" lang="ja">
        ${lines.map((line) => `<p>${line}</p>`).join("")}
      </div>
    </article>
  `;
}

function flowSection(title, steps) {
  return `
    <section class="flow-block" aria-label="${title}">
      <h2 class="flow-title">${title}</h2>
      <ol class="flow-list">
        ${steps
          .map(
            (step) => `
              <li class="flow-step">
                <p class="${step.phrase ? "flow-phrase" : "flow-action"}" lang="ja">${step.phrase ?? step.action}</p>
                ${step.zh ? `<p class="flow-translation">${step.zh}</p>` : ""}
              </li>
            `,
          )
          .join("")}
      </ol>
    </section>
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
  const index = screens.findIndex((item) => item.id === screen.id);

  progressText.textContent = screen.progress;
  progressFill.style.width = `${((index + 1) / screens.length) * 100}%`;

  app.innerHTML = `
    ${screen.render()}
    ${
      screen.id === "home"
        ? ""
        : `<nav class="sticky-actions" aria-label="頁面操作">
            <button class="primary-button" type="button" data-next="${screen.next}">${screen.cta}</button>
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
