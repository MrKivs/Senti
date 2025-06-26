"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-amber-50 to-cyan-50 flex items-center justify-center p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-2xl w-full bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl shadow-emerald-100/50 border border-white"
      >
        {/* Animated Logo Container */}
        <motion.div
          className="flex justify-center mb-6"
          whileHover={{ rotate: 5, scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="bg-gradient-to-r from-emerald-400 to-amber-400 p-1 rounded-full shadow-lg">
            <Image
              src="/logo.png"
              alt="Senti Logo"
              width={100}
              height={100}
              className="rounded-full bg-white p-2 border-4 border-white"
            />
          </div>
        </motion.div>

        {/* Headline with refined gradient */}
        <div className="mb-8">
          <motion.h1
            className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Welcome to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-emerald-600 to-amber-500">
              Senti
            </span>
          </motion.h1>
          <motion.p
            className="text-gray-600 max-w-md mx-auto text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Your journey begins here. Choose your role to access personalized
            tools.
          </motion.p>
        </div>

        {/* Enhanced buttons with icons and animations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-md mx-auto">
          <motion.div whileHover={{ y: -5 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/user/dashboard"
              className="flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white py-4 px-6 rounded-xl font-semibold shadow-lg shadow-emerald-100 transition-all"
            >
              <UserIcon />
              User Panel
            </Link>
          </motion.div>

          <motion.div whileHover={{ y: -5 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/rider/dashboard"
              className="flex items-center justify-center gap-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white py-4 px-6 rounded-xl font-semibold shadow-lg shadow-amber-100 transition-all"
            >
              <RiderIcon />
              Rider Panel
            </Link>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-5 -right-5 w-20 h-20 bg-emerald-300/30 rounded-full blur-xl"></div>
        <div className="absolute -bottom-5 -left-5 w-24 h-24 bg-amber-300/30 rounded-full blur-xl"></div>

        {/* Footer */}
        <motion.p
          className="text-xs text-gray-400 mt-10 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          © 2025 Senti. All rights reserved.
        </motion.p>
      </motion.div>
    </main>
  );
}

// Simple icon components (replace with your actual icons)
const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
      clipRule="evenodd"
    />
  </svg>
);

const RiderIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
    <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-1.382a1 1 0 00.553-.894l.448-.894A1 1 0 0113 11h1.382a1 1 0 00.894-.553l.894-.447A1 1 0 0017 9V5a1 1 0 00-1-1H3z" />
  </svg>
);
