"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-amber-50 to-cyan-50 flex items-center justify-center p-4 md:p-8 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-2xl w-full bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl shadow-emerald-100/50 border border-white relative z-10"
      >
        {/* Animated Logo */}
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

        {/* Title */}
        <div className="mb-8 text-center">
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
            Save smarter. Whether alone or in a chama, Senti helps you grow your
            money with AI insights, transparent rules, and secure disbursements.
          </motion.p>
        </div>

        {/* CTA Button */}
        <motion.div
          whileHover={{ y: -5 }}
          whileTap={{ scale: 0.98 }}
          className="max-w-sm mx-auto"
        >
          <Link
            href="/dashboard"
            className="flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white py-4 px-6 rounded-xl font-semibold shadow-lg shadow-emerald-100 transition-all"
          >
            <DashboardIcon />
            Go to Dashboard
          </Link>
        </motion.div>

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

      {/* Background decorative blurs */}
      <div className="absolute -top-5 -right-5 w-20 h-20 bg-emerald-300/30 rounded-full blur-xl z-0"></div>
      <div className="absolute -bottom-5 -left-5 w-24 h-24 bg-amber-300/30 rounded-full blur-xl z-0"></div>
    </main>
  );
}

const DashboardIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M4 3a1 1 0 00-1 1v5h6V3H4zM4 10v7a1 1 0 001 1h4v-8H4zm7 0v8h4a1 1 0 001-1v-7h-5zm5-1V4a1 1 0 00-1-1h-4v6h5z" />
  </svg>
);
