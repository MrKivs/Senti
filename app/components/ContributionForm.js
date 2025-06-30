"use client";

import { useState } from "react";
import { showSuccess, showError } from "@/lib/toast";
import { motion } from "framer-motion";

export default function ContributionForm({ chamaId = null }) {
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount)) {
      return showError("Please enter a valid amount");
    }

    setLoading(true);
    try {
      const res = await fetch("/api/contributions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: parseFloat(amount),
          note,
          chama_id: chamaId, // can be null for personal savings
        }),
      });

      const data = await res.json();

      if (res.ok) {
        showSuccess("Contribution added successfully!");
        setAmount("");
        setNote("");
      } else {
        showError(data?.message || "Failed to add contribution");
      }
    } catch (err) {
      showError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto space-y-4 border border-emerald-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-lg font-semibold text-emerald-700">
        {chamaId ? "Contribute to Chama" : "Add Personal Contribution"}
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Amount (KES)
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
          placeholder="e.g. 500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Note (optional)
        </label>
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
          placeholder="e.g. June contribution"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full bg-emerald-600 text-white py-2 px-4 rounded-md transition ${
          loading ? "opacity-50 cursor-not-allowed" : "hover:bg-emerald-700"
        }`}
      >
        {loading ? "Saving..." : "Submit Contribution"}
      </button>
    </motion.form>
  );
}
