import React, { useEffect, useRef, useState } from "react";
import "../styling/chatstyles.css";
import ReactMarkdown from "react-markdown";
import TypewriterMessage from "../styling/animations/TypewriterMessage";
import { useNavigate } from "react-router-dom";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirect to login if no token is found
    }
  }, [navigate]);

  const handleSignOut = () => {
    localStorage.removeItem("token"); // Remove the token
    navigate("/login"); // Redirect to the login page
  };

  const sendMessage = async () => {
    if (input.trim() === "") return;
    const userMessage: Message = { role: "user", content: input };
    setMessages([...messages, userMessage]);
    setInput("");

    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      if (!response.ok) throw new Error("Failed to fetch AI response");
      const data = await response.json();
      const aiMessage: Message = { role: "assistant", content: data.message };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);
      alert("Error communicating with the server");
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h1 className="chat-header-title">BurgersDev Chat</h1>
        <button onClick={handleSignOut} className="logout-button">
          Sign Out
        </button>
      </div>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message-container ${
              msg.role === "user" ? "message-user" : "message-assistant"
            }`}
          >
            <div
              className={`message-bubble ${
                msg.role === "user"
                  ? "message-user-bubble"
                  : "message-assistant-bubble"
              }`}
            >
              <article className="message-content">
                {msg.role === "assistant" ? (
                  <TypewriterMessage content={msg.content} />
                ) : (
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                )}
              </article>
            </div>
          </div>
        ))}
      </div>
      <div className="input-container">
        <div className="input-wrapper">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyUp={(e) => e.key === "Enter" && sendMessage()}
            className="input-field"
            placeholder="Type your message..."
          />
          <button onClick={sendMessage} className="send-button">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
