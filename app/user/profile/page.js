"use client";
import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import ProfileHeader from "./components/ProfileHeader";
import PersonalInfo from "./components/PersonalInfo";
import AccountSecurity from "./components/AccountSecurity";
import Preferences from "./components/Preferences";
import AccountActions from "./components/AccountActions";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";

export default function ProfilePage() {
  const [user, setUser] = useState({
    name: "John Doe",
    phone: "0722 345 678",
    email: "like@senti.app",
    location: "Nairobi, Kenya",
    joinedDate: "2023-01-15",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [language, setLanguage] = useState("en");
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSave = () => {
    setIsEditing(false);
    showToast("Profile updated successfully.");
  };

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      showToast("Passwords do not match", "error");
      return;
    }
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    showToast("Password changed successfully");
  };

  return (
    <div className="relative flex min-h-screen bg-white">
      <Sidebar />

      <motion.main
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex-1 overflow-y-auto md:pl-64 bg-gradient-to-br from-sky-50 to-indigo-100 p-4 pb-24"
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <ProfileHeader
              user={user}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              handleSave={handleSave}
            />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <PersonalInfo
                user={user}
                setUser={setUser}
                isEditing={isEditing}
              />
            </motion.div>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <AccountSecurity
                currentPassword={currentPassword}
                setCurrentPassword={setCurrentPassword}
                newPassword={newPassword}
                setNewPassword={setNewPassword}
                confirmPassword={confirmPassword}
                setConfirmPassword={setConfirmPassword}
                handlePasswordChange={handlePasswordChange}
              />
            </motion.div>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Preferences
                notificationsEnabled={notificationsEnabled}
                setNotificationsEnabled={setNotificationsEnabled}
                language={language}
                setLanguage={setLanguage}
              />
            </motion.div>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <AccountActions />
            </motion.div>
          </div>
        </motion.div>
      </motion.main>

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
