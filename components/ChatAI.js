"use client";

import { useState, useRef, useEffect } from "react";
import { showError } from "../lib/toast";
import { motion } from "framer-motion";

export default function ChatAI() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg = { role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: trimmed }),
      });

      const data = await res.json();
      if (res.ok) {
        const aiReply = { role: "assistant", content: data.answer };
        setMessages((prev) => [...prev, aiReply]);
      } else {
        showError(data?.message || "AI Assistant failed to respond");
      }
    } catch (err) {
      showError("Something went wrong while contacting the AI.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Auto-scroll to bottom with smooth behavior
    if (chatRef.current) {
      chatRef.current.scrollTo({
        top: chatRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      {/* Messages container with scrollable area */}
      <div
        ref={chatRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
      >
        {messages.length === 0 && !loading && (
          <div className="h-full flex flex-col items-center justify-center text-center p-4 text-gray-500">
            <div className="mb-4 p-3 bg-emerald-100 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-emerald-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-emerald-800">
              AI Assistant
            </h3>
            <p className="mt-2 max-w-md">
              Ask about saving strategies, disbursement rules, or financial
              planning
            </p>
          </div>
        )}

        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-3 rounded-lg max-w-[85%] ${
              msg.role === "user"
                ? "ml-auto bg-emerald-100 text-gray-800"
                : "mr-auto bg-white text-gray-700 border border-gray-200"
            }`}
          >
            {msg.content}
          </motion.div>
        ))}

        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mr-auto p-3 bg-white border border-gray-200 rounded-lg max-w-[85%]"
          >
            <div className="flex space-x-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce"></div>
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce delay-100"></div>
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce delay-200"></div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input area */}
      <form
        onSubmit={handleSubmit}
        className="p-2 border-t border-gray-200 bg-white flex gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          placeholder="Ask about saving strategies, disbursement rules..."
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 text-sm rounded-lg transition disabled:opacity-50 flex items-center justify-center"
        >
          {loading ? (
            <svg
              className="animate-spin h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            "Send"
          )}
        </button>
      </form>
    </div>
  );
}
