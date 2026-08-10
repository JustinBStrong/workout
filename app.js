import {
  controlExposureCount,
  exerciseIndex,
  kneeSensitiveNote,
  programRules,
  sessions
} from "./program.js";

const STORAGE_KEY = "workout-app-v1";
const app = document.querySelector("#app");
let state = loadState();
let toastTimer;

function freshState() {
  return {
    currentSessionId: 1,
    kneeSensitive: false,
    drafts: {},
    history: []
  };
}

function loadState() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!parsed || typeof parsed !== "object") return freshState();

    const currentSessionId = sessions.some((session) => session.id === parsed.currentSessionId)
      ? parsed.currentSessionId
      : 1;

    return {
      currentSessionId,
      kneeSensitive: Boolean(parsed.kneeSensitive),
      drafts: parsed.drafts && typeof parsed.drafts === "object" ? parsed.drafts : {},
      history: Array.isArray(parsed.history) ? parsed.history.slice(0, 100) : []
    };
  } catch {
    return freshState();
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getSession(id) {
  return sessions.find((session) => session.id === Number(id));
}

function getDraft(sessionId) {
  return state.drafts[sessionId] ?? { movements: {} };
}

function getMovementLog(sessionId, movementId) {
  return getDraft(sessionId).movements?.[movementId] ?? {
    done: false,
    weight: "",
    reps: "",
    notes: ""
  };
}

function updateMovementLog(sessionId, movementId, patch) {
  const draft = getDraft(sessionId);
  const current = getMovementLog(sessionId, movementId);
  state.drafts[sessionId] = {
    ...draft,
    movements: {
      ...(draft.movements ?? {}),
      [movementId]: { ...current, ...patch }
    }
  };
  saveState();
}

function progressFor(session) {
  const draft = getDraft(session.id);
  const eligible = session.movements.filter(
    (movement) => !(state.kneeSensitive && movement.kneeSensitiveSkip)
  );
  const complete = eligible.filter((movement) => draft.movements?.[movement.id]?.done).length;
  return { complete, total: eligible.length };
}

function routeFromHash() {
  const raw = location.hash.replace(/^#\/?/, "");
  const [section, value] = raw.split("/");

  if (!section) return { name: "home" };
  if (section === "session" && getSession(value)) {
    return { name: "session", sessionId: Number(value) };
  }
  if (section === "exercise" && exerciseIndex.some((exercise) => exercise.slug === value)) {
    return { name: "exercise", slug: value };
  }
  if (section === "library") return { name: "library" };
  if (section === "history") return { name: "history" };
  return { name: "home" };
}

function cycleRail(activeSessionId = state.currentSessionId) {
  return `
    <nav class="cycle-rail" aria-label="Six-session cycle">
      ${sessions
        .map(
          (session) => `
            <a
              class="cycle-stop ${session.id === activeSessionId ? "active" : ""}"
              style="--active-accent: ${session.accent}"
              href="#/session/${session.id}"
              aria-label="Session ${session.id}: ${escapeHtml(session.shortTitle)}"
              ${session.id === activeSessionId ? 'aria-current="step"' : ""}
            >
              <span class="cycle-number">0${session.id}</span>
              <span class="cycle-name">${escapeHtml(session.shortTitle)}</span>
            </a>
          `
        )
        .join("")}
    </nav>
  `;
}

function bottomNav(active) {
  return `
    <nav class="bottom-nav" aria-label="Primary navigation">
      <a class="${active === "home" ? "active" : ""}" href="#/">Cheat sheet</a>
      <a class="${active === "library" ? "active" : ""}" href="#/library">Exercises</a>
      <a class="${active === "history" ? "active" : ""}" href="#/history">History</a>
    </nav>
  `;
}

function shell(content, { active = "home", activeSessionId = state.currentSessionId } = {}) {
  return `
    <div class="shell">
      <header class="topbar">
        <a class="brand" href="#/" aria-label="Workout cheat sheet">
          Work<span class="brand-slash">/</span>out
        </a>
        <span class="privacy-badge" title="Logs are stored only in this browser">
          <span class="privacy-dot" aria-hidden="true"></span>
          On this device
        </span>
      </header>
      ${cycleRail(activeSessionId)}
      <main class="page" id="main">
        ${content}
        <p class="disclaimer">
          Personal training reference only—not medical diagnosis or treatment. Stop any movement
          that produces a nerve zap or worsening symptoms. Logs remain in this browser and do not sync.
        </p>
      </main>
      ${bottomNav(active)}
    </div>
  `;
}

function kneeNotice() {
  return `
    <aside class="notice" aria-labelledby="knee-notice-title">
      <span class="notice-icon" aria-hidden="true">!</span>
      <div>
        <h2 id="knee-notice-title">${escapeHtml(kneeSensitiveNote.title)}</h2>
        <p>${escapeHtml(kneeSensitiveNote.body)}</p>
      </div>
      <button
        class="switch"
        type="button"
        data-action="toggle-knee"
        aria-pressed="${state.kneeSensitive}"
      >
        <span class="switch-knob" aria-hidden="true"></span>
        ${state.kneeSensitive ? "Mode on" : "Mode off"}
      </button>
    </aside>
  `;
}

function renderHome() {
  const current = getSession(state.currentSessionId);
  const progress = progressFor(current);
  document.title = "Workout · Cheat sheet";

  const content = `
    <section class="hero-grid">
      <article
        class="next-card"
        style="--session-accent: ${current.accent}"
        data-session="0${current.id}"
      >
        <p class="eyebrow">Next in the round-robin · ${progress.complete}/${progress.total} checked</p>
        <h1>${escapeHtml(current.title)}</h1>
        <div class="marker" aria-label="${escapeHtml(current.marker)}">
          ${current.marker
            .split(" / ")
            .map((part) => `<span>${escapeHtml(part)}</span>`)
            .join("<span aria-hidden=\"true\">→</span>")}
        </div>
        <p class="hero-summary">${escapeHtml(current.summary)}</p>
        <div class="button-row">
          <a
            class="primary-button"
            style="--session-accent: ${current.accent}"
            href="#/session/${current.id}"
          >
            Open Session ${current.id}
          </a>
          <a class="secondary-button" href="#/library">Exercise library</a>
        </div>
      </article>

      <aside class="rule-panel" aria-labelledby="rules-title">
        <p class="eyebrow">Program standard</p>
        <h2 id="rules-title">Keep the signal clean</h2>
        <dl class="rule-list">
          ${programRules
            .map(
              (rule) => `
                <div class="rule">
                  <dt>${escapeHtml(rule.label)}</dt>
                  <dd>${escapeHtml(rule.value)}</dd>
                  <small>${escapeHtml(rule.detail)}</small>
                </div>
              `
            )
            .join("")}
        </dl>
      </aside>
    </section>

    ${kneeNotice()}

    <section class="section-block" aria-labelledby="cycle-title">
      <div class="section-header">
        <div>
          <p class="eyebrow">Full cycle</p>
          <h2 id="cycle-title">Six training cards</h2>
        </div>
        <p>
          Tap any card to see the ordered cheat sheet. Every movement name opens its
          program-specific exercise notes.
        </p>
      </div>
      <div class="session-grid">
        ${sessions
          .map((session) => {
            const sessionProgress = progressFor(session);
            return `
              <a
                class="session-card ${session.id === current.id ? "current" : ""}"
                style="--card-accent: ${session.accent}"
                href="#/session/${session.id}"
              >
                <span class="session-card-number">SESSION 0${session.id}</span>
                <h3>${escapeHtml(session.title)}</h3>
                <p>${escapeHtml(session.marker)}</p>
                <span class="session-card-meta">
                  <span>${session.movements.length} movements</span>
                  <span>${sessionProgress.complete}/${sessionProgress.total} checked</span>
                </span>
              </a>
            `;
          })
          .join("")}
      </div>
    </section>
  `;

  app.innerHTML = shell(content);
}

function movementRow(session, movement, index) {
  const log = getMovementLog(session.id, movement.id);
  const skipped = state.kneeSensitive && movement.kneeSensitiveSkip;
  const hasLog = Boolean(log.weight || log.reps || log.notes);

  return `
    <li
      class="movement-row ${log.done ? "done" : ""} ${skipped ? "skipped" : ""}"
      style="--session-accent: ${session.accent}"
    >
      <input
        class="movement-check"
        type="checkbox"
        aria-label="Mark ${escapeHtml(movement.name)} complete"
        data-action="toggle-movement"
        data-session-id="${session.id}"
        data-movement-id="${movement.id}"
        ${log.done ? "checked" : ""}
        ${skipped ? "disabled" : ""}
      />
      <div class="movement-main">
        <a class="movement-name" href="#/exercise/${movement.slug}">
          ${index + 1}. ${escapeHtml(movement.name)}
        </a>
        <span class="movement-prescription">${escapeHtml(movement.prescription)}</span>
        <span class="movement-kind ${movement.kind}">
          ${movement.kind === "control" ? "Rehab / control" : "Lift"}
        </span>
        ${skipped ? '<span class="skip-label">Skip in knee mode</span>' : ""}
      </div>
      <details class="log-disclosure" ${hasLog ? "open" : ""}>
        <summary>${hasLog ? "Edit log" : "Log"}</summary>
        <div class="log-fields">
          <label class="log-field">
            Weight
            <input
              type="text"
              inputmode="decimal"
              autocomplete="off"
              placeholder="e.g. 135 lb"
              value="${escapeHtml(log.weight)}"
              data-log-field="weight"
              data-session-id="${session.id}"
              data-movement-id="${movement.id}"
            />
          </label>
          <label class="log-field">
            Reps / time
            <input
              type="text"
              autocomplete="off"
              placeholder="e.g. 8, 8, 7"
              value="${escapeHtml(log.reps)}"
              data-log-field="reps"
              data-session-id="${session.id}"
              data-movement-id="${movement.id}"
            />
          </label>
          <label class="log-field">
            Note
            <input
              type="text"
              autocomplete="off"
              placeholder="Optional"
              value="${escapeHtml(log.notes)}"
              data-log-field="notes"
              data-session-id="${session.id}"
              data-movement-id="${movement.id}"
            />
          </label>
        </div>
      </details>
    </li>
  `;
}

function renderSession(sessionId) {
  const session = getSession(sessionId);
  const progress = progressFor(session);
  document.title = `Workout · Session ${session.id}`;

  const content = `
    <header class="page-heading">
      <div>
        <p class="eyebrow" style="color: ${session.accent}">
          Session 0${session.id} · ${escapeHtml(session.marker)}
        </p>
        <h1 class="session-title">${escapeHtml(session.title)}</h1>
        <p>${escapeHtml(session.summary)}</p>
      </div>
      <span class="page-count" aria-hidden="true">0${session.id}</span>
    </header>

    ${session.id === 5 ? kneeNotice() : ""}

    <div class="session-layout">
      <ol class="movement-list">
        ${session.movements
          .map((movement, index) => movementRow(session, movement, index))
          .join("")}
      </ol>

      <aside class="side-stack">
        <section class="audit-card" style="--session-accent: ${session.accent}">
          <p class="eyebrow" style="color: ${session.accent}">Session status</p>
          <h2>Checked off</h2>
          <p class="audit-number">${progress.complete}/${progress.total}</p>
          <p>${controlExposureCount(session)} dedicated rehab/control exposures in this card.</p>
        </section>

        <section class="context-card">
          <p class="eyebrow" style="color: ${session.accent}">Why this order</p>
          <h2>Sequence logic</h2>
          <p>${escapeHtml(session.whyOrder)}</p>
          ${session.notes?.length
            ? `<ul>${session.notes.map((note) => `<li>${escapeHtml(note)}</li>`).join("")}</ul>`
            : ""}
        </section>

        <button
          class="finish-button"
          style="--session-accent: ${session.accent}"
          type="button"
          data-action="finish-session"
          data-session-id="${session.id}"
        >
          Finish Session ${session.id}
          <small>Archive locally + advance the cycle</small>
        </button>
      </aside>
    </div>
  `;

  app.innerHTML = shell(content, { active: "home", activeSessionId: session.id });
}

function renderLibrary() {
  document.title = "Workout · Exercises";
  const content = `
    <header class="page-heading">
      <div>
        <p class="eyebrow">Cross-linked reference</p>
        <h1>Exercise library</h1>
        <p>
          These are program-specific roles and cues—not a generic encyclopedia. Each page links
          back to every session where the movement appears.
        </p>
      </div>
      <span class="page-count" aria-hidden="true">${exerciseIndex.length}</span>
    </header>

    <div class="library-tools">
      <input
        class="search-box"
        type="search"
        placeholder="Find an exercise"
        aria-label="Find an exercise"
        data-library-search
      />
      <span class="privacy-badge">${exerciseIndex.length} linked entries</span>
    </div>

    <div class="exercise-grid" data-exercise-grid>
      ${exerciseIndex
        .map(
          (exercise) => `
            <a
              class="exercise-card"
              href="#/exercise/${exercise.slug}"
              data-exercise-card
              data-search="${escapeHtml(exercise.name.toLowerCase())}"
            >
              <span class="movement-kind ${exercise.kind}">
                ${exercise.kind === "control" ? "Rehab / control" : "Lift"}
              </span>
              <h2>${escapeHtml(exercise.name)}</h2>
              <span>
                ${exercise.appearances.length}
                ${exercise.appearances.length === 1 ? "session" : "sessions"} →
              </span>
            </a>
          `
        )
        .join("")}
    </div>
  `;

  app.innerHTML = shell(content, { active: "library" });
}

function renderExercise(slug) {
  const exercise = exerciseIndex.find((entry) => entry.slug === slug);
  const firstAppearance = exercise.appearances[0];
  document.title = `Workout · ${exercise.name}`;

  const content = `
    <header class="page-heading">
      <div>
        <p class="eyebrow">Exercise note</p>
        <a class="quiet-button" href="#/library">← All exercises</a>
      </div>
    </header>

    <div class="exercise-detail">
      <article class="exercise-hero">
        <span class="movement-kind ${exercise.kind}">
          ${exercise.kind === "control" ? "Rehab / control" : "Lift"}
        </span>
        <h1 class="exercise-title">${escapeHtml(exercise.name)}</h1>

        <div class="appearance-list">
          ${exercise.appearances
            .map(
              (appearance) => `
                <section
                  class="appearance"
                  style="--appearance-accent: ${appearance.sessionAccent}"
                >
                  <a href="#/session/${appearance.sessionId}">
                    Session 0${appearance.sessionId} · ${escapeHtml(appearance.sessionTitle)} →
                  </a>
                  <strong>${escapeHtml(appearance.prescription)}</strong>
                  <p><b>Why here:</b> ${escapeHtml(appearance.intent)}</p>
                  <p><b>Plan cue:</b> ${escapeHtml(appearance.cue)}</p>
                </section>
              `
            )
            .join("")}
        </div>
      </article>

      <aside class="side-stack">
        <section class="cue-card">
          <h2>Keep in mind</h2>
          <p>${escapeHtml(firstAppearance.cue)}</p>
        </section>
        <section class="safety-card">
          <h2>Control rule</h2>
          <p>
            Use clean range and a load you control. Do not grind rehabilitation work or continue
            through a nerve zap, worsening pain, or a loss of normal movement quality.
          </p>
        </section>
      </aside>
    </div>
  `;

  app.innerHTML = shell(content, {
    active: "library",
    activeSessionId: firstAppearance.sessionId
  });
}

function renderHistory() {
  document.title = "Workout · History";
  const content = `
    <header class="page-heading">
      <div>
        <p class="eyebrow">Device-only log</p>
        <h1>Recent sessions</h1>
        <p>
          History lives only in this browser. It is intentionally lightweight and does not require
          a backend or account.
        </p>
      </div>
      <span class="page-count" aria-hidden="true">${state.history.length}</span>
    </header>

    ${state.history.length
      ? `
        <div class="history-list">
          ${state.history
            .map((entry) => {
              const session = getSession(entry.sessionId);
              const finished = new Date(entry.finishedAt);
              return `
                <article class="history-row">
                  <time class="history-date" datetime="${escapeHtml(entry.finishedAt)}">
                    ${finished.toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                  </time>
                  <div>
                    <h2>Session ${session.id} · ${escapeHtml(session.title)}</h2>
                    <p>
                      Finished ${finished.toLocaleTimeString(undefined, {
                        hour: "numeric",
                        minute: "2-digit"
                      })}
                    </p>
                  </div>
                  <span class="history-count">${entry.complete}/${entry.total} checked</span>
                </article>
              `;
            })
            .join("")}
        </div>
        <div class="button-row section-block">
          <button class="secondary-button" type="button" data-action="reset-history">
            Clear local history
          </button>
        </div>
      `
      : `
        <div class="empty-state">
          <h2>No finished sessions yet</h2>
          <p>Finish a workout card and it will appear here.</p>
          <a class="primary-button" href="#/session/${state.currentSessionId}">Open next session</a>
        </div>
      `}
  `;

  app.innerHTML = shell(content, { active: "history" });
}

function render() {
  const route = routeFromHash();

  if (route.name === "session") renderSession(route.sessionId);
  else if (route.name === "library") renderLibrary();
  else if (route.name === "exercise") renderExercise(route.slug);
  else if (route.name === "history") renderHistory();
  else renderHome();

  window.scrollTo({ top: 0, behavior: "instant" });
}

function finishSession(sessionId) {
  const session = getSession(sessionId);
  const progress = progressFor(session);
  const draft = getDraft(session.id);

  state.history.unshift({
    id: `${Date.now()}-${session.id}`,
    sessionId: session.id,
    finishedAt: new Date().toISOString(),
    complete: progress.complete,
    total: progress.total,
    movements: draft.movements ?? {}
  });
  state.history = state.history.slice(0, 100);
  delete state.drafts[session.id];
  state.currentSessionId = session.id === sessions.length ? 1 : session.id + 1;
  saveState();

  location.hash = "#/";
  render();
  showToast(`Session ${session.id} archived. Session ${state.currentSessionId} is next.`);
}

function showToast(message) {
  clearTimeout(toastTimer);
  document.querySelector(".toast")?.remove();
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.role = "status";
  toast.textContent = message;
  document.body.append(toast);
  toastTimer = setTimeout(() => toast.remove(), 3000);
}

document.addEventListener("change", (event) => {
  const target = event.target;

  if (target.matches('[data-action="toggle-movement"]')) {
    updateMovementLog(target.dataset.sessionId, target.dataset.movementId, {
      done: target.checked
    });
    render();
    return;
  }

  if (target.matches("[data-log-field]")) {
    updateMovementLog(target.dataset.sessionId, target.dataset.movementId, {
      [target.dataset.logField]: target.value.trim()
    });
  }
});

document.addEventListener("input", (event) => {
  if (!event.target.matches("[data-library-search]")) return;
  const query = event.target.value.trim().toLowerCase();

  document.querySelectorAll("[data-exercise-card]").forEach((card) => {
    card.hidden = !card.dataset.search.includes(query);
  });
});

document.addEventListener("click", (event) => {
  const action = event.target.closest("[data-action]");
  if (!action) return;

  if (action.dataset.action === "toggle-knee") {
    state.kneeSensitive = !state.kneeSensitive;
    saveState();
    render();
    showToast(state.kneeSensitive ? "Knee-sensitive mode on." : "Knee-sensitive mode off.");
    return;
  }

  if (action.dataset.action === "finish-session") {
    finishSession(Number(action.dataset.sessionId));
    return;
  }

  if (action.dataset.action === "reset-history") {
    if (window.confirm("Clear the completed-session history stored in this browser?")) {
      state.history = [];
      saveState();
      render();
      showToast("Local history cleared.");
    }
  }
});

window.addEventListener("hashchange", render);

if ("serviceWorker" in navigator && location.protocol === "https:") {
  navigator.serviceWorker.register("./sw.js").catch(() => {
    // The core app still works online when service-worker registration is unavailable.
  });
}

render();
