import React, { useState } from "react";

const ChatInput = ({ input, setInput, handleSend, handleKeyPress }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={`relative transition-all duration-300 ${
        isFocused ? "ring-2 ring-emerald-300" : ""
      } rounded-xl bg-white p-1 border border-emerald-200 shadow-sm mx-2 sm:mx-0 `}
    >
      <div className="flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="flex-1 bg-transparent text-gray-800 placeholder-emerald-400 px-3 py-2.5 focus:outline-none text-sm"
          placeholder="Ask about savings, investments, loans..."
          aria-label="Type your message"
        />

        <button
          onClick={handleSend}
          disabled={!input.trim()}
          aria-label="Send message"
          className={`flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-300 ml-2 ${
            input.trim()
              ? "bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 shadow-md"
              : "bg-emerald-100 cursor-not-allowed"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={`w-4 h-4 ${
              input.trim() ? "text-white" : "text-emerald-400"
            }`}
          >
            <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
