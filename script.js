function toggleChat() {
  const chat = document.getElementById("chatPopup");
  chat.style.display = chat.style.display === "block" ? "none" : "block";
}

function send(text) {
  const body = document.getElementById("chatBody");

  const userMsg = document.createElement("div");
  userMsg.className = "user";
  userMsg.innerText = text;
  body.appendChild(userMsg);

  const botMsg = document.createElement("div");
  botMsg.className = "bot";

  const replies = {
    "What is AI?": "AI means machines performing tasks that normally require human intelligence.",
    "AI bias": "AI bias occurs when systems learn unfair patterns from data.",
    "AI ethics": "Ethical AI focuses on fairness, privacy, and human control.",
    "AI in daily life": "AI powers maps, recommendations, voice assistants, and spam filters."
  };

  botMsg.innerText = replies[text] || "That’s a great question!";
  body.appendChild(botMsg);

  body.scrollTop = body.scrollHeight;
}
