"use client";

import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Sidebar from "@/components/rider/Sidebar";
import { CheckCircle, XCircle } from "lucide-react";

export default function RiderProfilePage() {
  const [rider, setRider] = useState({
    name: "Lewis Kivulu",
    phone: "0712 345 678",
    email: "rider@senti.app",
    location: "Nairobi",
    joinedDate: "2024-08-12",
  });

  const [avatar, setAvatar] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [toast, setToast] = useState(null);
  const fileInputRef = useRef(null);

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setAvatar(reader.result);
    reader.readAsDataURL(file);
  };

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2500);
  };

  const handleSave = () => {
    setIsEditing(false);
    showToast("Profile updated successfully.");
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />

      <main className="flex-1 md:ml-64 px-4 sm:px-6 py-6 bg-gradient-to-br from-sky-50 to-indigo-100 overflow-y-auto">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Avatar + Basic Info */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md bg-gray-100">
              {avatar ? (
                <img
                  src={avatar}
                  alt="Avatar"
                  className="object-cover w-full h-full"
                />
              ) : (
                <span className="flex items-center justify-center w-full h-full text-gray-400 text-4xl font-semibold">
                  {rider.name.charAt(0)}
                </span>
              )}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full shadow text-green-600 hover:text-green-800"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536M9 13l6-6 3.536 3.536a2.5 2.5 0 11-3.536 3.536L9 13z"
                  />
                </svg>
              </button>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={handleAvatarChange}
              />
            </div>

            <div className="text-center sm:text-left">
              <h2 className="text-xl sm:text-2xl font-bold text-emerald-700">
                {rider.name}
              </h2>
              <p className="text-sm text-gray-500">{rider.email}</p>
              <p className="text-sm text-gray-500">
                Joined: {rider.joinedDate}
              </p>
            </div>
          </div>

          {/* Editable Info Form */}
          <div className="bg-white p-5 rounded-xl shadow space-y-4 border border-emerald-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">Full Name</label>
                <input
                  type="text"
                  value={rider.name}
                  disabled={!isEditing}
                  onChange={(e) => setRider({ ...rider, name: e.target.value })}
                  className="w-full px-3 py-2 mt-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">Phone</label>
                <input
                  type="text"
                  value={rider.phone}
                  disabled={!isEditing}
                  onChange={(e) =>
                    setRider({ ...rider, phone: e.target.value })
                  }
                  className="w-full px-3 py-2 mt-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">Email</label>
                <input
                  type="email"
                  value={rider.email}
                  disabled={!isEditing}
                  onChange={(e) =>
                    setRider({ ...rider, email: e.target.value })
                  }
                  className="w-full px-3 py-2 mt-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">Location</label>
                <input
                  type="text"
                  value={rider.location}
                  disabled={!isEditing}
                  onChange={(e) =>
                    setRider({ ...rider, location: e.target.value })
                  }
                  className="w-full px-3 py-2 mt-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full sm:w-auto px-5 py-2 rounded-md bg-emerald-500 text-white hover:bg-emerald-600"
                >
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="w-full sm:w-auto px-4 py-2 rounded-md text-gray-600 border border-gray-300 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="w-full sm:w-auto px-5 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700"
                  >
                    Save Changes
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 right-6 z-50"
          >
            <div
              className={`px-6 py-4 rounded-lg shadow-md text-white flex items-center gap-3 transition-all duration-300 ${
                toast.type === "success"
                  ? "bg-emerald-500"
                  : toast.type === "error"
                  ? "bg-red-500"
                  : "bg-gray-700"
              }`}
            >
              {toast.type === "success" ? (
                <CheckCircle className="w-5 h-5" />
              ) : toast.type === "error" ? (
                <XCircle className="w-5 h-5" />
              ) : null}
              <span>{toast.message}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
