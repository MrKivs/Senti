import React from "react";

const AccountSecurity = ({
  currentPassword,
  setCurrentPassword,
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  handlePasswordChange,
}) => {
  return (
    <div className="bg-white border border-blue-100 rounded-2xl p-6 shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-blue-700">Account Security</h2>
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-blue-600"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-blue-600 mb-1">
            Current Password
          </label>
          <input
            type="password"
            className="w-full border border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-300 text-blue-700"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Enter current password"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-blue-600 mb-1">
            New Password
          </label>
          <input
            type="password"
            className="w-full border border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-300 text-blue-700"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-blue-600 mb-1">
            Confirm New Password
          </label>
          <input
            type="password"
            className="w-full border border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-300 text-blue-700"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
          />
        </div>

        <button
          onClick={handlePasswordChange}
          className="w-full bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 text-white px-5 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300"
        >
          Change Password
        </button>
      </div>
    </div>
  );
};

export default AccountSecurity;
