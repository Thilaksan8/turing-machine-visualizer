const TRANSITIONS = {
  "Q0,a": ["Q1","X","R"],
  "Q0,Y": ["Q4","Y","R"],
  "Q1,a": ["Q1","a","R"],
  "Q1,Y": ["Q1","Y","R"],
  "Q1,b": ["Q2","Y","R"],
  "Q2,Y": ["Q2","Y","R"],
  "Q2,b": ["Q3","Y","R"],
  "Q3,Y": ["Q3","Y","R"],
  "Q3,b": ["Q5","Y","L"],
  "Q5,a": ["Q5","a","L"],
  "Q5,b": ["Q5","b","L"],
  "Q5,Y": ["Q5","Y","L"],
  "Q5,X": ["Q0","X","R"],
  "Q4,Y": ["Q4","Y","R"],
  "Q4,c": ["Q6","c","R"],
  "Q4,$": ["ha","$","R"],
  "Q6,c": ["Q6","c","R"],
  "Q6,$": ["ha","$","R"],
};

const STATE_MSGS = {
  Q0: "Looking for an unprocessed 'a'",
  Q1: "Found 'a' (marked X) — finding 1st 'b'",
  Q2: "Found 1st 'b' (marked Y) — finding 2nd 'b'",
  Q3: "Found 2nd 'b' (marked Y) — finding 3rd 'b'",
  Q5: "Matched 3 b's — rewinding left to find next 'a'",
  Q4: "All a's done — checking no leftover b's",
  Q6: "Scanning c's — any number is fine",
  ha: "Accepted!",
};

let tape = [];
let head = 0;
let state = "Q0";
let stepNum = 0;

function initTM(input) {
  tape = input.split("").concat(["$"]);
  head = 0;
  state = "Q0";
  stepNum = 0;
}

function stepTM() {
  if (state === "ha" || state === "rj") return { done: true };
  const sym = tape[head];
  const key = state + "," + sym;
  if (!TRANSITIONS[key]) {
    state = "rj";
    return { done: true, rejected: true, sym, prevState: state };
  }
  const [ns, newSym, dir] = TRANSITIONS[key];
  const prev = { state, sym, newSym, dir, ns };
  tape[head] = newSym;
  state = ns;
  if (dir === "R") head++;
  else head--;
  if (head >= tape.length) tape.push("$");
  stepNum++;
  return { done: state === "ha", prev };
}