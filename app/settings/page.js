"use client";

import { useState } from "react";
import { showSuccess } from "@/lib/toast";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    chamaUpdates: true,
    dailyReminders: false,
  });

  const handleToggle = (key) => {
    setNotifications({ ...notifications, [key]: !notifications[key] });
    showSuccess("Settings updated!");
  };

  const handleDeactivate = () => {
    // Add confirmation modal later
    alert("Account deactivation coming soon...");
  };

  return (
    <div className="min-h-screen p-6 md:p-10 bg-gray-50">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow border border-gray-100">
        <h1 className="text-2xl font-bold text-emerald-700 mb-6">Settings</h1>

        {/* Notifications */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">
            Notifications
          </h2>
          <div className="space-y-4">
            <SettingToggle
              label="Receive chama updates"
              checked={notifications.chamaUpdates}
              onChange={() => handleToggle("chamaUpdates")}
            />
            <SettingToggle
              label="Daily savings reminders"
              checked={notifications.dailyReminders}
              onChange={() => handleToggle("dailyReminders")}
            />
          </div>
        </section>

        {/* Placeholder Security Section */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">Security</h2>
          <p className="text-sm text-gray-500 mb-2">
            Password updates coming soon.
          </p>
          <button
            className="bg-gray-200 text-gray-600 px-4 py-2 rounded-md text-sm"
            disabled
          >
            Change Password
          </button>
        </section>

        {/* Deactivate */}
        <section>
          <h2 className="text-lg font-semibold text-red-600 mb-3">
            Danger Zone
          </h2>
          <button
            onClick={handleDeactivate}
            className="bg-red-50 text-red-600 border border-red-200 px-4 py-2 rounded-md text-sm font-semibold hover:bg-red-100"
          >
            Deactivate My Account
          </button>
        </section>
      </div>
    </div>
  );
}

// Toggle Switch UI
function SettingToggle({ label, checked, onChange }) {
  return (
    <label className="flex items-center justify-between">
      <span className="text-sm text-gray-600">{label}</span>
      <button
        type="button"
        onClick={onChange}
        className={`w-10 h-6 flex items-center rounded-full p-1 transition ${
          checked ? "bg-emerald-500" : "bg-gray-300"
        }`}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full shadow transform transition ${
            checked ? "translate-x-4" : ""
          }`}
        ></div>
      </button>
    </label>
  );
}
