"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";

export default function RiderLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    localStorage.setItem("role", "rider");
    localStorage.setItem("email", email);
    router.push("/rider/dashboard");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-amber-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-6 border border-amber-100"
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold text-amber-800">Rider Login</h1>
          <p className="text-sm text-amber-600">
            Access your deliveries and profile
          </p>
        </div>

        <div className="space-y-3">
          <label htmlFor="email" className="block text-sm text-amber-700">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            placeholder="you@rider.com"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 text-amber-800 placeholder-amber-400"
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>

        <button
          onClick={handleLogin}
          className="w-full py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-semibold rounded-lg shadow hover:from-amber-700 hover:to-amber-800 transition-all"
        >
          Log In
        </button>
      </motion.div>
    </main>
  );
}
