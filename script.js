const chatBox = document.getElementById("chat-box");

/* ========================
   CHATBOT FUNCTIONALITY
======================== */

function sendMessage() {
  const input = document.getElementById("userInput");
  const message = input.value.trim();
  if (!message) return;

  addMessage(message, "user");
  input.value = "";

  let reply = "";
  const text = message.toLowerCase();

  if (text.includes("quiz")) {
    startQuiz();
    reply = "✅ Starting AI Literacy Quiz. Answer the questions below!";
  }
  else if (text.includes("ethics")) {
    reply = getEthicsScenario();
  }
  else if (text.includes("bias")) {
    reply =
      "AI bias occurs when training data reflects unfair patterns, leading to discrimination in areas like hiring or lending.";
  }
  else if (text.includes("risk")) {
    reply =
      "AI risks include misinformation, biased decisions, lack of transparency, and over‑reliance on automation.";
  }
  else if (text.includes("regulation")) {
    reply =
      "AI regulations aim to ensure safe, transparent, and responsible use of AI systems, especially in high‑risk domains.";
  }
  else if (text.includes("ai")) {
    reply =
      "Artificial Intelligence (AI) refers to computer systems that learn from data to make predictions or decisions.";
  }
  else {
    reply =
      "That’s an interesting question. You can ask about AI, ethics, bias, risks, regulations, or type 'quiz'.";
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

/* ========================
   AI ETHICS SCENARIOS
======================== */

function getEthicsScenario() {
  const scenarios = [
    "📌 Scenario: An AI hiring tool rejects women applicants due to biased historical data.\n✅ Ethical Issue: Bias and fairness. Data audits and diverse datasets are required.",

    "📌 Scenario: Facial recognition cameras are used without public consent.\n✅ Ethical Issue: Privacy and transparency must be respected.",

    "📌 Scenario: A chatbot gives medical advice without supervision.\n✅ Ethical Issue: Accountability and human oversight are critical in high‑risk systems."
  ];

  return scenarios[Math.floor(Math.random() * scenarios.length)];
}

/* ========================
   QUIZ MODULE
======================== */

const quizData = [
  {
    question: "What does most AI systems learn from?",
    options: ["Data", "Emotions", "Luck"],
    answer: "Data"
  },
  {
    question: "What is a major risk of biased AI?",
    options: ["Faster processing", "Unfair decisions", "Lower cost"],
    answer: "Unfair decisions"
  },
  {
    question: "Who is responsible for AI decisions?",
    options: ["The AI", "Humans and organizations", "No one"],
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
    document.getElementById("quiz-question").innerText =
      "✅ Quiz completed! Well done.";
    document.getElementById("quiz-options").innerHTML = "";
    return;
  }

  const q = quizData[quizIndex];
  document.getElementById("quiz-question").innerText = q.question;

  const optionsDiv = document.getElementById("quiz-options");
  optionsDiv.innerHTML = "";

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.innerText = option;
    btn.onclick = () => checkAnswer(option);
    optionsDiv.appendChild(btn);
  });
}

function checkAnswer(selected) {
  const feedback = document.getElementById("quiz-feedback");

  if (selected === quizData[quizIndex].answer) {
    feedback.innerText = "✅ Correct!";
  } else {
    feedback.innerText =
      "❌ Incorrect. Correct answer: " + quizData[quizIndex].answer;
  }

  quizIndex++;
  setTimeout(() => {
    feedback.innerText = "";
    loadQuestion();
  }, 1000);
}
