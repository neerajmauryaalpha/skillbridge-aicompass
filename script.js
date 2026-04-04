const chatBox = document.getElementById("chat-box");
const toggleBtn = document.getElementById("themeToggle");

/* ---------- Dark Mode ---------- */
if (localStorage.theme === "dark") {
  document.body.classList.add("dark");
}

toggleBtn.onclick = () => {
  document.body.classList.toggle("dark");
  localStorage.theme =
    document.body.classList.contains("dark") ? "dark" : "light";
};

/* ---------- Chat ---------- */
function sendMessage() {
  const input = document.getElementById("userInput");
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "user");
  input.value = "";

  respond(text.toLowerCase());
}

function useSuggestion(text) {
  document.getElementById("userInput").value = text;
  sendMessage();
}

function addMessage(text, sender) {
  const div = document.createElement("div");
  div.className = sender;
  div.innerText = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function respond(text) {
  let reply =
    "You can ask about AI, ethics, bias, risks, or try the quiz.";

  if (text.includes("ai")) reply =
    "AI systems learn from data to make predictions and decisions.";
  if (text.includes("bias")) reply =
    "AI bias arises from biased data leading to unfair outcomes.";
  if (text.includes("ethics")) reply =
    "Ethical AI focuses on fairness, accountability, transparency, and human oversight.";
  if (text.includes("risk")) reply =
    "AI risks include misinformation, surveillance misuse, and over‑automation.";
  if (text.includes("quiz")) {
    startQuiz();
    reply = "Let’s begin the AI literacy quiz!";
  }

  setTimeout(() => addMessage(reply, "bot"), 500);
}

/* ---------- Quiz ---------- */
const quizData = [
  { q: "What does AI learn from?", o: ["Data","Luck","Emotions"], a: "Data" },
  { q: "Key AI ethical issue?", o: ["Bias","Speed","Cost"], a: "Bias" },
  { q: "Who is accountable for AI?", o: ["AI","Humans","No one"], a: "Humans" }
];

let qi = 0;

function startQuiz() {
  qi = 0;
  loadQuiz();
}

function loadQuiz() {
  if (qi >= quizData.length) {
    document.getElementById("quiz-question").innerText =
      "✅ Quiz Complete!";
    document.getElementById("quiz-options").innerHTML = "";
    return;
  }

  const q = quizData[qi];
  document.getElementById("quiz-question").innerText = q.q;
  const box = document.getElementById("quiz-options");
  box.innerHTML = "";

  q.o.forEach(opt => {
    const b = document.createElement("button");
    b.innerText = opt;
    b.onclick = () => {
      qi++;
      loadQuiz();
    };
    box.appendChild(b);
  });
}
