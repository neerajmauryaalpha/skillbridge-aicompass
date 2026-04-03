import { useState } from "react";

export default function App() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello 👋 I am AICompass. Ask me about AI, ethics, bias, or risks." }
  ]);
  const [input, setInput] = useState("");

  const replies = {
    ai: "AI means systems that learn from data to perform tasks like prediction or decision‑making.",
    bias: "AI bias happens when training data is unfair, leading to discrimination.",
    ethics: "Ethical AI focuses on fairness, accountability, and transparency.",
    risk: "AI risks include misinformation, over‑reliance, and lack of transparency."
  };

  const sendMessage = () => {
    if (!input) return;
    const key = Object.keys(replies).find(k => input.toLowerCase().includes(k));
    const reply = key ? replies[key] : "That’s an important topic. AI should always be used responsibly.";

    setMessages([...messages,
      { sender: "user", text: input },
      { sender: "bot", text: reply }
    ]);
    setInput("");
  };

  return (
    <div className="app">
      <h1>SkillBridge – AICompass</h1>
      <div className="chat">
        {messages.map((m, i) => (
          <div key={i} className={m.sender}>{m.text}</div>
        ))}
      </div>
      <div className="input">
        <input value={input} onChange={e => setInput(e.target.value)} placeholder="Ask about AI..." />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
