"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";

export default function UserLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    localStorage.setItem("role", "user");
    localStorage.setItem("email", email);
    router.push("/user/dashboard");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-emerald-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-6 border border-emerald-100"
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold text-emerald-700">Welcome Back</h1>
          <p className="text-sm text-emerald-500">
            Log in to access your dashboard
          </p>
        </div>

        <div className="space-y-3">
          <label htmlFor="email" className="block text-sm text-emerald-700">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            placeholder="you@example.com"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-300 text-emerald-800 placeholder-emerald-400"
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>

        <button
          onClick={handleLogin}
          className="w-full py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white font-semibold rounded-lg shadow hover:from-emerald-600 hover:to-green-600 transition-all"
        >
          Log In
        </button>
      </motion.div>
    </main>
  );
}
