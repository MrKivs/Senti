"use client";
import { useState } from "react";
import { ArrowDownCircle, Loader2, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { showSuccess, showError } from "../lib/toast";

export default function DisbursementTrigger({ chamaId, chamaName }) {
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [success, setSuccess] = useState(false);

  const triggerDisbursement = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/disburse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chama_id: chamaId }),
      });

      const result = await res.json();

      if (res.ok) {
        showSuccess(
          `Successfully disbursed Ksh ${result.amount} to ${result.disbursed_to}`,
          {
            description: `Disbursement from ${chamaName} completed`,
          }
        );
        setSuccess(true);
        // Reset success state after 3 seconds
        setTimeout(() => setSuccess(false), 3000);
      } else {
        showError("Disbursement failed", {
          description: result.error || "An error occurred during disbursement",
        });
      }
    } catch (err) {
      showError("Network error", {
        description: "Could not connect to the server",
      });
    } finally {
      setLoading(false);
      setShowConfirmation(false);
    }
  };

  return (
    <>
      <div className="relative">
        <button
          onClick={() => setShowConfirmation(true)}
          disabled={loading || success}
          className={`relative flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
            success
              ? "bg-emerald-100 text-emerald-700 cursor-default"
              : loading
              ? "bg-amber-500/80 cursor-not-allowed"
              : "bg-amber-600 hover:bg-amber-700 text-white"
          }`}
        >
          {success ? (
            <>
              <CheckCircle2 className="w-5 h-5" />
              <span>Disbursed</span>
            </>
          ) : loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <ArrowDownCircle className="w-5 h-5" />
              <span>Trigger Disbursement</span>
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

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmation && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6"
            >
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
                  <ArrowDownCircle className="w-8 h-8 text-amber-600" />
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Confirm Disbursement
                </h3>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to trigger disbursement for{" "}
                  <span className="font-semibold">{chamaName}</span>? This
                  action will distribute funds according to the chama rules.
                </p>

                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => setShowConfirmation(false)}
                    className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 font-medium transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={triggerDisbursement}
                    disabled={loading}
                    className="px-5 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-medium flex items-center transition disabled:opacity-75"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : null}
                    Confirm Disbursement
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
