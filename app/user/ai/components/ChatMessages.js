import React from "react";

const ChatMessages = ({ messages, isTyping, messagesEndRef }) => {
  return (
    <div className="space-y-4 px-2 sm:px-4">
      {messages.map((msg, i) => (
        <div
          key={i}
          className={`flex ${
            msg.type === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`flex items-start gap-3 p-4 rounded-2xl transition-all duration-300 
            ${
              msg.type === "user"
                ? "bg-gradient-to-br from-emerald-100 to-green-100 border border-emerald-200 text-gray-800"
                : "bg-white border border-emerald-100 shadow-sm"
            }
            sm:max-w-[85%] md:max-w-[70%] lg:max-w-[60%]`}
          >
            {/* Bot Avatar */}
            {msg.type === "bot" && (
              <div className="flex-shrink-0">
                <div className="bg-gradient-to-r from-emerald-500 to-green-600 w-9 h-9 rounded-full flex items-center justify-center shadow-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            )}

            {/* Message Content */}
            <div className="flex-1 min-w-0">
              <div
                className={`font-medium text-xs mb-1 ${
                  msg.type === "bot" ? "text-emerald-600" : "text-green-700"
                }`}
              >
                {msg.type === "bot" ? "SENTI AI" : "YOU"}
              </div>
              <div
                className={`whitespace-pre-wrap ${
                  msg.type === "bot"
                    ? "font-light text-gray-700"
                    : "font-medium text-gray-800"
                }`}
              >
                {msg.text}
              </div>
            </div>

            {/* User Avatar */}
            {msg.type === "user" && (
              <div className="flex-shrink-0">
                <div className="bg-gradient-to-r from-emerald-500 to-green-600 w-9 h-9 rounded-full flex items-center justify-center shadow-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Typing Indicator */}
      {isTyping && (
        <div className="flex justify-start">
          <div className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-emerald-100 sm:max-w-[85%] md:max-w-[70%] lg:max-w-[60%]">
            <div className="flex-shrink-0">
              <div className="bg-gradient-to-r from-emerald-500 to-green-600 w-9 h-9 rounded-full flex items-center justify-center shadow-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-xs text-emerald-600 mb-1">
                SENTI AI
              </div>
              <div className="flex space-x-1.5">
                <div className="h-2 w-2 bg-emerald-500 rounded-full animate-bounce"></div>
                <div className="h-2 w-2 bg-emerald-500 rounded-full animate-bounce delay-100"></div>
                <div className="h-2 w-2 bg-emerald-500 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scroll Anchor */}
      <div ref={messagesEndRef} className="h-4" />
    </div>
  );
};

export default ChatMessages;
