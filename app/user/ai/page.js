"use client";
import { useState, useRef, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import ChatHeader from "./components/ChatHeader";
import ChatMessages from "./components/ChatMessages";
import ChatInput from "./components/ChatInput";

export default function AIChatPage() {
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "Hello! I'm Senti, your AI financial assistant. How can I help you with your finances today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = { type: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    setIsTyping(true);
    setTimeout(() => {
      const botMessage = {
        type: "bot",
        text: `I understand you're asking about "${input}". Let's explore that topic.`,
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="flex flex-col flex-1 h-full md:ml-64">
        <ChatHeader />

        {/* Scrollable messages area */}
        <div className="flex-1 overflow-y-auto bg-gradient-to-br from-gray-50 to-emerald-50 px-4 py-6">
          <div className="max-w-4xl mx-auto w-full">
            <ChatMessages
              messages={messages}
              isTyping={isTyping}
              messagesEndRef={messagesEndRef}
            />
          </div>
        </div>

        {/* Chat input pinned at bottom */}
        <div className="bg-white border-t border-emerald-100 py-3 px-4">
          <div className="max-w-4xl mx-auto w-full">
            <ChatInput
              input={input}
              setInput={setInput}
              handleSend={handleSend}
              handleKeyPress={handleKeyPress}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
