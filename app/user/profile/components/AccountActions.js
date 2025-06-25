import React from "react";

const AccountActions = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">Account Actions</h2>
        <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-red-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      <div className="space-y-4">
        <ActionButton
          color="yellow"
          iconPath="M10 12a2 2 0 100-4 2 2 0 000 4z M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
          title="Privacy Settings"
          description="Manage your data privacy"
        />
        <ActionButton
          color="blue"
          iconPath="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
          title="Download Data"
          description="Get a copy of your data"
        />
        <ActionButton
          color="red"
          iconPath="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
          title="Deactivate Account"
          description="Temporarily disable your account"
        />
      </div>
    </div>
  );
};

const ActionButton = ({ color, iconPath, title, description }) => (
  <button className="w-full text-left bg-gray-50 hover:bg-gray-100 p-4 rounded-xl transition-all duration-300 flex items-center gap-3">
    <div
      className={`bg-${color}-100 w-10 h-10 rounded-full flex items-center justify-center`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`h-5 w-5 text-${color}-500`}
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d={iconPath} />
      </svg>
    </div>
    <div>
      <h3 className="text-gray-800 font-medium">{title}</h3>
      <p className="text-gray-500 text-sm">{description}</p>
    </div>
  </button>
);

export default AccountActions;
