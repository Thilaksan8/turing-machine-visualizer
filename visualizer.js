let currentInput = "abbb";
let running = false;
let timer = null;
const speedMap = { 1: 900, 2: 500, 3: 250, 4: 120, 5: 40 };
let currentSpeed = 3;

function loadExample(s) {
  doPause();
  currentInput = s;
  document.querySelectorAll(".ex-btn").forEach(b => {
    b.classList.toggle("active", b.textContent.startsWith(s));
  });
  document.getElementById("custom-input").value = "";
  resetAndRender();
}

function loadCustom() {
  doPause();
  const val = document.getElementById("custom-input").value.trim();
  if (!val) return;
  if (!/^[abc]+$/.test(val)) {
    setMsg("Only characters a, b, c are allowed!", "reject");
    return;
  }
  document.querySelectorAll(".ex-btn").forEach(b => b.classList.remove("active"));
  currentInput = val;
  resetAndRender();
}

function resetAndRender() {
  initTM(currentInput);
  renderTape();
  document.getElementById("state-display").textContent = "Q0";
  document.getElementById("state-display").className = "state-pill";
  document.getElementById("step-display").textContent = "0";
  setMsg("Press Step or Run to start the simulation.", "");
  document.getElementById("btn-step").disabled = false;
  document.getElementById("btn-run").disabled = false;
  document.getElementById("btn-pause").disabled = true;
}

function renderTape() {
  const tr = document.getElementById("tape-row");
  const ar = document.getElementById("arrow-row");
  tr.innerHTML = "";
  ar.innerHTML = "";
  tape.forEach((sym, i) => {
    let cls = "cell";
    if (i === head) {
      cls += " head";
    } else if (sym === "X") {
      cls += " marked-x";
    } else if (sym === "Y") {
      cls += " marked-y";
    } else if (sym === "$") {
      cls += " end-cell";
    }
    const c = document.createElement("div");
    c.className = cls;
    c.textContent = sym;
    tr.appendChild(c);
    const a = document.createElement("div");
    a.className = "arrow-cell";
    a.textContent = i === head ? "▼" : "";
    ar.appendChild(a);
  });
  document.getElementById("step-display").textContent = stepNum;
}

function setMsg(text, type) {
  const m = document.getElementById("msg-box");
  m.textContent = text;
  m.className = "msg-box" + (type ? " " + type : "");
}

function doStep() {
  const result = stepTM();
  renderTape();
  const pill = document.getElementById("state-display");
  pill.textContent = state === "rj" ? "Rejected" : state;

  if (result.done) {
    if (state === "ha") {
      pill.className = "state-pill accept";
      setMsg("✓ Accepted! The string belongs to L = { aⁿ b³ⁿ cᵐ | n≥1, m≥0 }", "accept");
    } else {
      pill.className = "state-pill reject";
      const p = result.prev;
      setMsg(`✗ Rejected! No transition from (${p ? p.state : '?'}, '${result.sym}')`, "reject");
    }
    document.getElementById("btn-step").disabled = true;
    document.getElementById("btn-run").disabled = true;
    document.getElementById("btn-pause").disabled = true;
    running = false;
  } else {
    pill.className = "state-pill";
    const p = result.prev;
    setMsg(`(${p.state}, '${p.sym}') → write '${p.newSym}', move ${p.dir} → ${p.ns}   |   ${STATE_MSGS[state] || ""}`, "");
  }
}

function doRun() {
  if (running) return;
  running = true;
  document.getElementById("btn-run").disabled = true;
  document.getElementById("btn-pause").disabled = false;
  document.getElementById("btn-step").disabled = true;
  function tick() {
    doStep();
    if (running && state !== "ha" && state !== "rj") {
      timer = setTimeout(tick, speedMap[currentSpeed]);
    } else {
      running = false;
      document.getElementById("btn-pause").disabled = true;
    }
  }
  timer = setTimeout(tick, speedMap[currentSpeed]);
}

function doPause() {
  running = false;
  if (timer) clearTimeout(timer);
  document.getElementById("btn-run").disabled = false;
  document.getElementById("btn-pause").disabled = true;
  document.getElementById("btn-step").disabled = false;
}

function doReset() {
  doPause();
  resetAndRender();
}

function updateSpeed(val) {
  currentSpeed = parseInt(val);
const labels = { 1: "Very Slow", 2: "Slow", 3: "Medium", 4: "Fast", 5: "Very Fast" };
  document.getElementById("speed-label").textContent = labels[val];
}

window.onload = () => resetAndRender();

function toggleTheme() {
  const html = document.documentElement;
  const btn = document.getElementById("theme-btn");
  if (html.getAttribute("data-theme") === "dark") {
    html.removeAttribute("data-theme");
    btn.textContent = "🌙 Dark";
    localStorage.setItem("theme", "light");
  } else {
    html.setAttribute("data-theme", "dark");
    btn.textContent = "☀️ Light";
    localStorage.setItem("theme", "dark");
  }
}

(function() {
  if (localStorage.getItem("theme") === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    document.getElementById("theme-btn").textContent = "☀️ Light";
  }
})();