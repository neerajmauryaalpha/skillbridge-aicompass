const chatBox = document.getElementById("chat-box");

/* ---------------- CHATBOT LOGIC ---------------- */

function sendMessage() {
  const input = document.getElementById("userInput");
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "user");
  input.value = "";

  let reply = "";
  const msg = text.toLowerCase();

  if (msg.includes("quiz")) {
    startQuiz();
    reply = "Great 👍 Let’s test your AI knowledge with a short quiz!";
  } 
  else if (msg.includes("ethics")) {
    reply = ethicsScenario();
  }
  else if (msg.includes("bias")) {
    reply = "AI bias occurs when training data reflects unfair social patterns. This can lead to discrimination in hiring, loans, or healthcare decisions.";
  }
  else if (msg.includes("risk")) {
    reply = "AI risks include misinformation, biased outputs, privacy violations, and over‑reliance on automated decisions.";
  }
  else if (msg.includes("regulation")) {
    reply = "AI regulations aim to ensure transparency, accountability, safety, and human oversight over high‑risk AI systems.";
  }
  else if (msg.includes("ai")) {
    reply = "Artificial Intelligence (AI) refers to systems that learn from data to make predictions or decisions, often mimicking human intelligence.";
  }
  else {
    reply = "That’s an interesting question. Would you like to learn about AI ethics, risks, or try a quiz?";
  }

  setTimeout(() => addMessage(reply, "bot"), 500);
}

function addMessage(text, sender) {
  const div = document.createElement("div");
  div.className = sender;
  div.innerText = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

/* ---------------- ETHICS SCENARIOS ---------------- */

function ethicsScenario() {
  const scenarios = [
    "📌 Scenario: An AI hiring system rejects most female candidates because it was trained on biased historical data.\n✅ Ethical Issue: Bias and fairness. AI systems must be audited and trained on diverse data.",

    "📌 Scenario: Facial recognition cameras are deployed in public spaces without user consent.\n✅ Ethical Issue: Privacy and transparency. Users should be informed and protected.",

    "📌 Scenario: A chatbot provides medical advice without human supervision.\n✅ Ethical Issue: Accountability and human oversight are critical in high‑risk domains."
  ];

  return scenarios[Math.floor(Math.random() * scenarios.length)];
}

/* ---------------- QUIZ MODULE ---------------- */

const quizData = [
  {
    q: "What does AI mainly learn from?",
    options: ["Data", "Emotions", "Luck"],
    answer: "Data"
  },
  {
    q: "What is a major risk of AI bias?",
    options: ["Faster systems", "Unfair decisions", "Lower costs"],
    answer: "Unfair decisions"
  },
  {
    q: "Who is responsible for AI decisions?",
    options: ["AI itself", "Humans and organizations", "No one"],
    answer: "Humans and organizations"
  }
];

let quizIndex = 0;

function startQuiz() {
  document.getElementById("quiz-section").style.display = "block";
  quizIndex = 0;
  loadQuestion();
}

function loadQuestion() {
  if (quizIndex >= quizData.length) {
    document.getElementById("quiz-question").innerText = "✅ Quiz completed! Great job.";
    document.getElementById("quiz-options").innerHTML = "";
    return;
  }

  const q = quizData[quizIndex];
  document.getElementById("quiz-question").innerText = q.q;

  const optionsDiv = document.getElementById("quiz-options");
  optionsDiv.innerHTML = "";

  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.innerText = opt;
    btn.onclick = () => checkAnswer(opt);
    optionsDiv.appendChild(btn);
  });
}

function checkAnswer(option) {
  const feedback = document.getElementById("quiz-feedback");

  if (option === quizData[quizIndex].answer) {
    feedback.innerText = "✅ Correct!";
  } else {
    feedback.innerText = "❌ Incorrect. Correct answer: " + quizData[quizIndex].answer;
  }

  quizIndex++;
  setTimeout(() => {
    feedback.innerText = "";
    loadQuestion();
  }, 1000);
}
