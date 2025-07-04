"use client";
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { ArrowDownCircle, Loader2, CheckCircle2, Coins } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { showSuccess, showError } from "../lib/toast";

export default function ContributionForm({ chamaId, chamaName }) {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleContribute = async (e) => {
    e.preventDefault();
    setError("");
    if (!amount || isNaN(parseFloat(amount))) {
      setError("Please enter a valid amount");
      return;
    }
    if (parseFloat(amount) <= 0) {
      setError("Amount must be greater than 0");
      return;
    }
    setLoading(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");
      const { error } = await supabase.from("contributions").insert([
        {
          user_id: user.id,
          chama_id: chamaId,
          amount: parseFloat(amount),
          status: "completed",
          date: new Date().toISOString(),
        },
      ]);
      if (error) throw error;
      showSuccess("Contribution successful!");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      showError("Contribution failed", { description: err.message });
      setError(err.message);
    } finally {
      setLoading(false);
      if (!success) setAmount("");
    }
  };

  return (
    <form onSubmit={handleContribute} className="space-y-4">
      <div>
        <label
          htmlFor="contribution-amount"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Contribution Amount (KES)
        </label>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Coins className="h-5 w-5 text-gray-400" />
          </div>

          <input
            id="contribution-amount"
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className={`block w-full pl-10 pr-12 py-3 border ${
              error ? "border-red-300" : "border-gray-300"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500`}
            disabled={loading || success}
            min="1"
            step="100"
          />

          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-gray-500">Ksh</span>
          </div>
        </div>

        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>

      <div className="relative">
        <button
          type="submit"
          disabled={loading || success || !amount}
          className={`relative w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
            success
              ? "bg-emerald-100 text-emerald-700 cursor-default"
              : loading
              ? "bg-emerald-500/80 cursor-not-allowed"
              : "bg-emerald-600 hover:bg-emerald-700 text-white"
          }`}
        >
          {success ? (
            <>
              <CheckCircle2 className="w-5 h-5" />
              <span>Contribution Sent</span>
            </>
          ) : loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <ArrowDownCircle className="w-5 h-5" />
              <span>Make Contribution</span>
            </>
          )}
        </button>

        {/* Success indicator animation */}
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-1 -right-1"
            >
              <div className="w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="text-center text-xs text-gray-500 mt-2">
        <p>Funds will be added to the chama&apos;s account immediately</p>
      </div>
    </form>
  );
}
