import React from "react";

const PersonalInfo = ({ user, setUser, isEditing }) => {
  return (
    <div className="bg-white border border-emerald-100 rounded-2xl p-6 shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-emerald-700">
          Personal Information
        </h2>
        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-emerald-500"
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

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-emerald-600 mb-1">
            Full Name
          </label>
          <input
            type="text"
            className="w-full border border-emerald-200 text-emerald-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-300"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            disabled={!isEditing}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-emerald-600 mb-1">
            Email Address
          </label>
          <input
            type="email"
            className="w-full border border-emerald-200 text-emerald-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-300"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            disabled={!isEditing}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-emerald-600 mb-1">
            Phone Number
          </label>
          <input
            type="text"
            className="w-full border border-emerald-200 text-emerald-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-300"
            value={user.phone}
            onChange={(e) => setUser({ ...user, phone: e.target.value })}
            disabled={!isEditing}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-emerald-600 mb-1">
            Location
          </label>
          <input
            type="text"
            className="w-full border border-emerald-200 text-emerald-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-300"
            value={user.location}
            onChange={(e) => setUser({ ...user, location: e.target.value })}
            disabled={!isEditing}
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
