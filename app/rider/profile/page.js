"use client";

import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
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

  // Optional: Load saved profile from localStorage
  // useEffect(() => {
  //   const stored = localStorage.getItem("riderProfile");
  //   if (stored) setRider(JSON.parse(stored));
  // }, []);

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
    // Optional: Persist to localStorage
    // localStorage.setItem("riderProfile", JSON.stringify(rider));
  };

  return (
    <div className="flex min-h-screen bg-white">
      <main className="flex-1 md:ml-64 p-6 bg-gradient-to-br from-yellow-50 to-amber-100 overflow-y-auto">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="flex items-center gap-6">
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md bg-amber-100">
              {avatar ? (
                <Image
                  src={avatar}
                  alt="Avatar"
                  className="object-cover w-full h-full"
                />
              ) : (
                <span className="flex items-center justify-center w-full h-full text-amber-500 text-4xl font-semibold">
                  {rider.name.charAt(0)}
                </span>
              )}
              <button
                onClick={() => fileInputRef.current?.click()}
                title="Change photo"
                aria-label="Change profile photo"
                className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full shadow text-amber-600 hover:text-amber-800"
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

            <div>
              <h2 className="text-2xl font-bold text-amber-800">
                {rider.name}
              </h2>
              <p className="text-sm text-amber-600">{rider.email}</p>
              <p className="text-sm text-amber-600">
                Joined: {rider.joinedDate}
              </p>
            </div>
          </div>

          <div className="bg-amber-50 p-5 rounded-xl shadow space-y-4 border border-amber-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {["name", "phone", "email", "location"].map((field) => (
                <div key={field}>
                  <label className="text-sm text-amber-700 capitalize">
                    {field}
                  </label>
                  <input
                    type="text"
                    value={rider[field]}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setRider((prev) => ({ ...prev, [field]: e.target.value }))
                    }
                    className="w-full px-3 py-2 mt-1 rounded-md border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-400 text-amber-800"
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3 pt-4">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-5 py-2 rounded-md bg-amber-600 text-white hover:bg-amber-700"
                >
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 rounded-md text-amber-600 border border-amber-300 hover:bg-amber-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-5 py-2 rounded-md bg-amber-700 text-white hover:bg-amber-800"
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
                  ? "bg-amber-600"
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
