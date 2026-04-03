import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

/*
================ UX FLOW (TEXT DIAGRAM) ================
User opens app
  ↓
Bot greeting → Quick options OR Free text input
  ↓
User asks question (intent keywords)
  ├─ AI concept → Explanation response
  ├─ Ethics / Risk → Example + follow‑up
  └─ Start Quiz → Difficulty selection
                ├─ Beginner → Concept checks
                ├─ Intermediate → Scenarios
                └─ Advanced → Ethical dilemmas
  ↓
Quiz feedback → Badge → Suggested next topic
=======================================================
*/


export default function AICompass() {
  /* Chat State */
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! I’m AICompass 👋 Ask me about AI concepts, or type **Start Quiz**." }
  ]);
  const [userInput, setUserInput] = useState("");
  /* Quiz State */
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [lastExplanation, setLastExplanation] = useState("");
  const [quizMode, setQuizMode] = useState(false);
  const [difficulty, setDifficulty] = useState("beginner");


  const quickOptions = [
    "What is AI?",
    "AI bias",
    "AI ethics",
    "AI risks",
    "Start Quiz"
  ];

  /* Keyword‑based free‑text intent handling */
  const detectIntent = (text) => {
    const t = text.toLowerCase();
    if (t.includes("bias")) return "bias";
    if (t.includes("ethic")) return "ethics";
    if (t.includes("risk")) return "risks";
    if (t.includes("quiz")) return "quiz";
    return "general";
  };

  const intentResponses = {
    general: "AI systems learn patterns from data to support decisions. What area would you like to explore next?",
    bias: "AI bias happens when training data reflects unfair patterns. This can affect hiring, finance, and healthcare.",
    ethics: "Ethical AI focuses on fairness, accountability, transparency, and human oversight.",
    risks: "AI risks include misinformation, hallucinations, biased decisions, and over‑reliance on automation."
  };
  /* Difficulty‑Based Quiz Pools */
  const quizzes = {
    beginner: [
      {
        question: "What does AI mainly rely on?",
        options: ["Magic", "Data", "Luck"],
        answer: "Data",
        explanation: "AI learns patterns from data provided to it."
      }
    ],
    intermediate: [
      {
        question: "An AI loan system rejects many similar users. What should be checked?",
        options: ["Screen size", "Training data bias", "App colors"],
        answer: "Training data bias",
        explanation: "Biased data leads to unfair outcomes."
      }
    ],
    advanced: [
      {
        question: "Who is responsible for AI decisions?",
        options: ["The AI", "No one", "Humans and organizations"],
        answer: "Humans and organizations",
        explanation: "Accountability must always remain with people."
      }
    ]
  };
  const activeQuiz = quizzes[difficulty];
  const handleSend = () => {
    if (!userInput.trim()) return;
    const intent = detectIntent(userInput);
    if (intent === "quiz") setQuizMode(true);
    setMessages((prev) => [
      ...prev,
      { sender: "user", text: userInput },
      { sender: "bot", text: intentResponses[intent] }
    ]);
    setUserInput("");
  };

  const handleQuizAnswer = (option) => {
    const current = activeQuiz[quizIndex];
    if (option === current.answer) {
      setQuizScore((p) => p + 1);
      setLastExplanation(`✅ Correct! ${current.explanation}`);
    } else {
      setLastExplanation(`❌ Incorrect. ${current.explanation}`);
    }

    setTimeout(() => {
      setLastExplanation("");
      if (quizIndex + 1 < activeQuiz.length) setQuizIndex((p) => p + 1);
      else setShowResult(true);
    }, 1200);
  };

  const resetQuiz = () => {
    setQuizIndex(0);
    setQuizScore(0);
    setShowResult(false);
    setQuizMode(false);
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-50 to-indigo-100">
      <h1 className="text-3xl font-bold text-center">SkillBridge – AICompass</h1>
      <p className="text-center text-gray-600 mb-6">Conversational AI Literacy Guide</p>
      <div className="grid md:grid-cols-3 gap-6">
        {/* Chat */}
        <Card className="md:col-span-2">
          <CardContent className="p-4 flex flex-col h-[500px]">
            <div className="flex-1 overflow-y-auto space-y-2" aria-live="polite">
              {messages.map((m, i) => (
                <div key={i} className={`p-2 rounded-xl ${m.sender === "bot" ? "bg-indigo-200" : "bg-blue-600 text-white self-end"}`}>
                  {m.text}
                </div>
              ))}
            </div>


            <div className="mt-3 flex gap-2">
              <input
                aria-label="Chat input"
                className="flex-1 p-2 rounded border"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Type a question or 'start quiz'"
              />
              <Button onClick={handleSend}>Send</Button>
            </div>


            <div className="mt-3 flex gap-2 flex-wrap">
              {quickOptions.map((o) => (
                <Button key={o} variant="outline" onClick={() => setUserInput(o)}>{o}</Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quiz */}
        <Card>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold">AI Quiz</h2>
            {!quizMode && (
              <div className="space-y-2">
                <p className="text-sm">Choose difficulty:</p>
                <Button onClick={() => { setDifficulty("beginner"); setQuizMode(true); }}>Beginner</Button>
                <Button onClick={() => { setDifficulty("intermediate"); setQuizMode(true); }}>Intermediate</Button>
                <Button onClick={() => { setDifficulty("advanced"); setQuizMode(true); }}>Advanced</Button>
              </div>
            )}
            {quizMode && !showResult && (
              <>
                <p className="text-sm mb-3">{activeQuiz[quizIndex].question}</p>
                {activeQuiz[quizIndex].options.map((opt) => (
                  <Button key={opt} className="w-full mb-2" variant="outline" onClick={() => handleQuizAnswer(opt)}>
                    {opt}
                  </Button>
                ))}
                {lastExplanation && <p className="text-xs text-gray-600">{lastExplanation}</p>}
              </>
            )}


            {showResult && (
              <>
                <p className="text-sm">Score: {quizScore}</p>
                <Button onClick={resetQuiz}>Restart</Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <footer className="mt-8 text-center text-xs text-gray-500">
        Educational prototype | Conversational, accessible AI literacy demo
      </footer>
    </div>
  );
}
