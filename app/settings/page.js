"use client";

import { useState } from "react";
import { showSuccess, showError } from "../../lib/toast";
import { createClient } from "../../lib/supabaseClient"; // ✅ FIXED
const supabase = createClient(); // ✅ instantiate inside client component

import {
  BellIcon,
  LockClosedIcon,
  UserCircleIcon,
  MoonIcon,
  SunIcon,
  ArrowPathIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    notifications: {
      chamaUpdates: true,
      dailyReminders: false,
      paymentReminders: true,
    },
    theme: "light", // 'light' or 'dark'
    language: "en",
  });

  const [isDeactivating, setIsDeactivating] = useState(false);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [password, setPassword] = useState("");

  const handleToggle = (category, key) => {
    setSettings({
      ...settings,
      [category]: {
        ...settings[category],
        [key]: !settings[category][key],
      },
    });
    showSuccess("Setting updated!");
  };

  const handleThemeChange = () => {
    const newTheme = settings.theme === "light" ? "dark" : "light";
    setSettings({ ...settings, theme: newTheme });
    showSuccess(`Theme changed to ${newTheme} mode`);
  };

  const handleDeactivate = () => {
    setShowDeactivateModal(true);
  };

  const confirmDeactivation = async () => {
    if (!password) {
      showError("Please enter your password");
      return;
    }

    setIsDeactivating(true);

    try {
      // Simulate deactivation process
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // In a real app, you would make an API call here
      // await fetch("/api/account/deactivate", {
      //   method: "POST",
      //   body: JSON.stringify({ password })
      // });

      showSuccess("Account deactivated successfully");
      // Redirect to login or home page
      // router.push("/");
    } catch (err) {
      showError("Failed to deactivate account");
    } finally {
      setIsDeactivating(false);
      setShowDeactivateModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-cyan-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-emerald-800 flex items-center justify-center gap-2">
            <UserCircleIcon className="h-8 w-8" />
            Account Settings
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your preferences and security
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow p-5 border border-emerald-100">
              <h2 className="font-semibold text-gray-700 mb-3">
                Settings Categories
              </h2>
              <ul className="space-y-2">
                <li className="px-3 py-2 bg-emerald-50 text-emerald-700 rounded-lg font-medium">
                  <a href="#notifications">Notifications</a>
                </li>
                <li className="px-3 py-2 hover:bg-gray-50 rounded-lg">
                  <a href="#appearance">Appearance</a>
                </li>
                <li className="px-3 py-2 hover:bg-gray-50 rounded-lg">
                  <a href="#security">Security</a>
                </li>
                <li className="px-3 py-2 hover:bg-gray-50 rounded-lg">
                  <a href="#account">Account</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column - Settings Content */}
          <div className="lg:col-span-2">
            {/* Notifications Section */}
            <div
              id="notifications"
              className="bg-white rounded-xl shadow p-6 mb-6 border border-emerald-100"
            >
              <div className="flex items-center gap-3 mb-5">
                <BellIcon className="h-6 w-6 text-emerald-600" />
                <h2 className="text-xl font-semibold text-emerald-800">
                  Notifications
                </h2>
              </div>

              <div className="space-y-4">
                <SettingToggle
                  label="Chama updates"
                  description="Get notified about group activities and announcements"
                  checked={settings.notifications.chamaUpdates}
                  onChange={() => handleToggle("notifications", "chamaUpdates")}
                />
                <SettingToggle
                  label="Daily savings reminders"
                  description="Receive daily reminders to save"
                  checked={settings.notifications.dailyReminders}
                  onChange={() =>
                    handleToggle("notifications", "dailyReminders")
                  }
                />
                <SettingToggle
                  label="Payment reminders"
                  description="Get reminders about upcoming contributions"
                  checked={settings.notifications.paymentReminders}
                  onChange={() =>
                    handleToggle("notifications", "paymentReminders")
                  }
                />
              </div>
            </div>

            {/* Appearance Section */}
            <div
              id="appearance"
              className="bg-white rounded-xl shadow p-6 mb-6 border border-emerald-100"
            >
              <div className="flex items-center gap-3 mb-5">
                {settings.theme === "light" ? (
                  <SunIcon className="h-6 w-6 text-amber-500" />
                ) : (
                  <MoonIcon className="h-6 w-6 text-indigo-600" />
                )}
                <h2 className="text-xl font-semibold text-emerald-800">
                  Appearance
                </h2>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-700">Theme</h3>
                  <p className="text-sm text-gray-500">
                    {settings.theme === "light" ? "Light theme" : "Dark theme"}{" "}
                    enabled
                  </p>
                </div>
                <button
                  onClick={handleThemeChange}
                  className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition"
                >
                  <div className="relative w-12 h-6 flex items-center">
                    <div
                      className={`absolute w-12 h-6 rounded-full transition ${
                        settings.theme === "light"
                          ? "bg-amber-400"
                          : "bg-indigo-600"
                      }`}
                    ></div>
                    <div
                      className={`absolute w-5 h-5 bg-white rounded-full shadow transform transition ${
                        settings.theme === "light"
                          ? "translate-x-1"
                          : "translate-x-7"
                      }`}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">
                    {settings.theme === "light" ? "Light" : "Dark"}
                  </span>
                </button>
              </div>

              <div className="mt-6">
                <h3 className="font-medium text-gray-700 mb-2">Language</h3>
                <select
                  value={settings.language}
                  onChange={(e) =>
                    setSettings({ ...settings, language: e.target.value })
                  }
                  className="w-full max-w-xs border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="en">English</option>
                  <option value="sw">Swahili</option>
                  <option value="fr">French</option>
                </select>
              </div>
            </div>

            {/* Security Section */}
            <div
              id="security"
              className="bg-white rounded-xl shadow p-6 mb-6 border border-emerald-100"
            >
              <div className="flex items-center gap-3 mb-5">
                <LockClosedIcon className="h-6 w-6 text-amber-600" />
                <h2 className="text-xl font-semibold text-emerald-800">
                  Security
                </h2>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-700">
                      Two-factor authentication
                    </h3>
                    <p className="text-sm text-gray-500">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <button className="text-sm text-emerald-600 hover:text-emerald-800 font-medium">
                    Enable
                  </button>
                </div>

                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-700">Login history</h3>
                    <p className="text-sm text-gray-500">
                      View your recent login activity
                    </p>
                  </div>
                  <button className="text-sm text-emerald-600 hover:text-emerald-800 font-medium">
                    View history
                  </button>
                </div>

                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-700">Password</h3>
                    <p className="text-sm text-gray-500">
                      Change your account password
                    </p>
                  </div>
                  <button className="text-sm text-emerald-600 hover:text-emerald-800 font-medium">
                    Change password
                  </button>
                </div>
              </div>
            </div>

            {/* Account Section */}
            <div
              id="account"
              className="bg-white rounded-xl shadow p-6 border border-emerald-100"
            >
              <div className="flex items-center gap-3 mb-5">
                <UserCircleIcon className="h-6 w-6 text-emerald-600" />
                <h2 className="text-xl font-semibold text-emerald-800">
                  Account
                </h2>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-700">Export data</h3>
                    <p className="text-sm text-gray-500">
                      Download a copy of your personal data
                    </p>
                  </div>
                  <button className="text-sm text-emerald-600 hover:text-emerald-800 font-medium">
                    Request export
                  </button>
                </div>

                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-700">
                      Refresh account data
                    </h3>
                    <p className="text-sm text-gray-500">
                      Sync with the latest information
                    </p>
                  </div>
                  <button className="p-2 bg-emerald-100 hover:bg-emerald-200 rounded-full text-emerald-700">
                    <ArrowPathIcon className="h-5 w-5" />
                  </button>
                </div>

                <div className="p-4 bg-red-50 border border-red-100 rounded-lg mt-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-red-700 flex items-center gap-2">
                        <ExclamationTriangleIcon className="h-5 w-5" />
                        Deactivate account
                      </h3>
                      <p className="text-sm text-red-600 mt-1">
                        This will disable your account and remove your personal
                        information
                      </p>
                    </div>
                    <button
                      onClick={handleDeactivate}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
                    >
                      Deactivate
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Deactivation Modal */}
      {showDeactivateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
            <div className="flex items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Deactivate your account?
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    This action will permanently deactivate your account. You
                    will lose access to all your data and chama groups.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm your password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter your password"
              />
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowDeactivateModal(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeactivation}
                disabled={isDeactivating}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition disabled:opacity-75"
              >
                {isDeactivating ? "Deactivating..." : "Confirm Deactivation"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Enhanced Toggle Switch Component
function SettingToggle({ label, description, checked, onChange }) {
  return (
    <div className="flex items-start justify-between">
      <div>
        <label className="block font-medium text-gray-700">{label}</label>
        {description && (
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        )}
      </div>
      <button
        type="button"
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          checked ? "bg-emerald-600" : "bg-gray-300"
        }`}
        role="switch"
        aria-checked={checked}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}
