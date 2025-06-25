import React from "react";

const ProfileHeader = ({ user, isEditing, setIsEditing, handleSave }) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8 pt-6">
      {/* Avatar & Info */}
      <div className="flex items-center gap-4">
        <div className="p-3 bg-white border border-emerald-100 rounded-2xl shadow-sm">
          <div className="bg-gradient-to-r from-green-400 to-emerald-500 w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-3xl">
            {user.name[0]}
          </div>
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-emerald-700">
            {user.name}
          </h1>
          <p className="text-emerald-500 mt-1 text-sm">
            Member since {new Date(user.joinedDate).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Edit / Save Buttons */}
      <div className="flex gap-3">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white px-5 py-2 rounded-xl font-semibold shadow transition-all"
            >
              Save Changes
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-5 py-2 rounded-xl font-semibold shadow transition-all"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white px-5 py-2 rounded-xl font-semibold shadow transition-all"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;
