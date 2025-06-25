import React from "react";

const Preferences = ({
  notificationsEnabled,
  setNotificationsEnabled,
  language,
  setLanguage,
}) => {
  return (
    <div className="bg-white border border-purple-100 rounded-2xl p-6 shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-purple-700">Preferences</h2>
        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-purple-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      <div className="space-y-5">
        {/* Notifications Toggle */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-emerald-700 font-semibold">
              Email Notifications
            </h3>
            <p className="text-sm text-emerald-500">
              Receive important updates via email
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={notificationsEnabled}
              onChange={() => setNotificationsEnabled(!notificationsEnabled)}
            />
            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-400 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
          </label>
        </div>

        {/* Language Selector */}
        <div>
          <label className="block text-sm font-medium text-purple-700 mb-1">
            Language Preference
          </label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full border border-purple-200 text-purple-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-300 bg-white"
          >
            <option value="en">English</option>
            <option value="sw">Swahili</option>
            <option value="fr">French</option>
            <option value="es">Spanish</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Preferences;
