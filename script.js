const STORAGE_KEY = "interview-preflight-checklist";

const screens = [
  {
    id: "home",
    title: "打工面試工具箱",
    cta: "",
    next: "",
    render: () => `
      <section class="screen-panel" aria-labelledby="home-title">
        <h1 class="screen-title" id="home-title">面試快速檢查清單<br><span class="title-subline">打工版</span></h1>
        <p class="index-subtitle">快速查找</p>
        <nav class="index-list" aria-label="功能索引">
          ${[
            { label: "面試前快速檢查", desc: "準備確認", next: "checklist" },
            { label: "簡易自我介紹模板", desc: "重點整理", next: "intro-template" },
            { label: "常見問題模板", desc: "標準回答", next: "template" },
            { label: "救援語句", desc: "卡住使用", next: "rescue" },
            { label: "安心小語", desc: "緊張時用", next: "complete" },
            { label: "招呼用語", desc: "保持禮貌", next: "greetings" },
            { label: "面試禮儀 Flow", desc: "動作順序", next: "etiquette-flow" },
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
    title: "面試前快速檢查",
    cta: "回首頁",
    next: "home",
    render: () => `
      <section class="screen-panel" aria-labelledby="checklist-title">
        <h1 class="screen-title" id="checklist-title">面試前快速檢查</h1>
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
    id: "intro-template",
    title: "簡易自我介紹模板",
    cta: "返回首頁",
    next: "home",
    render: () => `
      <section class="screen-panel" aria-labelledby="intro-title">
        <h1 class="screen-title" id="intro-title">簡易自我介紹模板</h1>
        <p class="description">不用完整背下來，只要把重點整理好即可。</p>
        <div class="form-list" aria-label="自我介紹欄位">
          ${introField("名前", "", "")}
          ${introField("國籍", "", "例：台湾から来ました。／台湾出身です。")}
          ${introField("身分", "", "例：日本語学校に通っています。／留学生です。")}
          ${introField("強み", "", "例：明るくて話すことが好きです。／真面目に頑張れます。")}
          ${introField("応募理由", "", "例：家から近いので応募しました。／シフトが合いやすいです。")}
        </div>
      </section>
    `,
  },
  {
    id: "template",
    title: "常見問題模板",
    cta: "回首頁",
    next: "home",
    render: () => `
      <section class="screen-panel" aria-labelledby="template-title">
        <h1 class="screen-title" id="template-title">常見問題模板</h1>
        <div class="qa-list" aria-label="常見問題清單">
          ${qaCard("問題①", "為什麼想來這裡？", ["<ruby>接客<rt>せっきゃく</rt></ruby>を学びたいと思い、家からも近いので<ruby>応募<rt>おうぼ</rt></ruby>しました。", "働きたいからです。"])}
          ${qaCard("問題②", "日文程度？", ["まだ分からないこともありますが、<ruby>頑張<rt>がんば</rt></ruby>ります。", "まだ<ruby>勉強中<rt>べんきょうちゅう</rt></ruby>ですが、<ruby>頑張<rt>がんば</rt></ruby>ります。"])}
          ${qaCard("問題③", "通勤沒問題嗎？", ["家から近いです。", "はい、<ruby>大丈夫<rt>だいじょうぶ</rt></ruby>です。"])}
          ${qaCard("問題④", "排班有什麼要求嗎？", ["<ruby>週<rt>しゅう</rt></ruby>○<ruby>日<rt>にち</rt></ruby>できます。", "<ruby>土日曜日<rt>どにちようび</rt></ruby>も大丈夫です。"])}
          ${qaCard("問題⑤", "什麼時候可以開始上班？", ["○<ruby>月<rt>がつ</rt></ruby>○<ruby>日<rt>にち</rt></ruby>からすぐに<ruby>働<rt>はたら</rt></ruby>けます。"])}
          ${qaCard("問題⑥", "萬用保命句", ["少し考えます。", "もう一度お願いします。"])}
          <div class="card qa-note">
            <p>不確定時：はい、頑張ります。</p>
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
    title: "安心小語",
    cta: "回首頁",
    next: "home",
    render: () => `
      <section class="screen-panel completion-panel" aria-labelledby="complete-title">
        <h1 class="screen-title" id="complete-title">安心小語</h1>
        <p class="index-subtitle">緊張時可以看</p>
        <div class="card phrase-card">
          <p class="phrase-zh">日文不用完美</p>
        </div>
        <div class="card phrase-card">
          <p class="phrase-zh">簡單短句也沒關係</p>
        </div>
        <div class="card phrase-card">
          <p class="phrase-zh">卡住正常</p>
        </div>
        <div class="card phrase-card">
          <p class="phrase-zh">深呼吸緩解一下</p>
        </div>
        <div class="card phrase-card">
          <p class="phrase-zh">展現自己比正確日語重要</p>
        </div>
        <div class="card phrase-card">
          <p class="phrase-zh">忘詞就道歉來調整</p>
        </div>
      </section>
    `,
  },
  {
    id: "greetings",
    title: "招呼用語",
    cta: "回首頁",
    next: "home",
    render: () => `
      <section class="screen-panel" aria-labelledby="greetings-title">
        <h1 class="screen-title" id="greetings-title">招呼用語</h1>
        <p class="index-subtitle">進門/離開/坐下</p>

        <div class="phrase-section" aria-labelledby="greetings-entry">
          <h2 class="phrase-title" id="greetings-entry">入場</h2>
          ${phraseOnlyCard("失礼します。")}
        </div>

        <div class="phrase-section" aria-labelledby="greetings-start">
          <h2 class="phrase-title" id="greetings-start">面試前打招呼</h2>
          ${phraseOnlyCard("はじめまして。OOと申します。本日はよろしくお願いいたします。")}
        </div>

        <div class="phrase-section" aria-labelledby="greetings-end">
          <h2 class="phrase-title" id="greetings-end">面試結束時</h2>
          ${phraseOnlyCard("本日はありがとうございました。よろしくお願いいたします。")}
        </div>
      </section>
    `,
  },
  {
    id: "etiquette-flow",
    title: "面試禮儀 Flow",
    cta: "回首頁",
    next: "home",
    render: () => `
      <section class="screen-panel" aria-labelledby="etiquette-flow-title">
        <h1 class="screen-title" id="etiquette-flow-title">面試禮儀 Flow</h1>

        <div class="phrase-section" aria-labelledby="etiquette-entry">
          <h2 class="phrase-title" id="etiquette-entry">🚪 入室</h2>
          ${phraseOnlyCard("ノック<br>↓<br>「失礼します」<br>↓<br>入る・ドアを閉める<br>↓<br>「〇〇です。よろしくお願いします」")}
        </div>

        <div class="phrase-section" aria-labelledby="etiquette-seat">
          <h2 class="phrase-title" id="etiquette-seat">🪑 着席</h2>
          ${phraseOnlyCard("「どうぞ」<br>↓<br>「失礼します」<br>↓<br>座る")}
        </div>

        <div class="phrase-section" aria-labelledby="etiquette-end">
          <h2 class="phrase-title" id="etiquette-end">🙇 終了</h2>
          ${phraseOnlyCard("立つ<br>↓<br>「ありがとうございました」<br>↓<br>「失礼します」<br>↓<br>退室")}
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
  { id: "greeting", label: "招呼用語" },
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

function introField(label, blank, example) {
  return `
    <article class="card intro-field">
      <p class="intro-label">${label}：<span class="intro-blank">${blank}</span></p>
      ${example ? `<p class="intro-example">${example}</p>` : ""}
    </article>
  `;
}

function qaCard(order, title, lines) {
  return `
    <article class="card qa-card">
      <p class="section-label">${order}</p>
      <p class="question">${title}</p>
      <p class="section-label">日文例句</p>
      <div class="qa-lines" lang="ja">
        ${lines.map((line) => `<p>${line}</p>`).join("")}
      </div>
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
