import React from "react";

const ChatHeader = () => {
  return (
    <div className="bg-white px-4 py-4 border-b border-emerald-100 shadow-sm">
      <div className="max-w-4xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-r from-emerald-500 to-green-600 p-2 rounded-xl shadow-md">
              <div className="bg-white w-12 h-12 rounded-lg flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-emerald-500"
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
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Financial Assistant
              </h1>
              <p className="text-emerald-500 text-sm flex items-center gap-1 mt-1">
                <span className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse"></span>
                <span>AI-powered financial guidance</span>
              </p>
            </div>
          </div>

          <button className="text-gray-500 hover:text-emerald-500 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
