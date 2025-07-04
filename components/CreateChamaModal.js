import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { showSuccess, showError } from "../lib/toast";
import { supabase } from "../lib/supabaseClient";
import Input from "./Input";

export default function CreateChamaModal({ open, onClose, onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    target_amount: "",
    category: "",
    meeting_schedule: "",
    rules_url: "",
    avatar: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.name.trim()) {
      setError("Chama name is required");
      return;
    }
    setLoading(true);
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError || !user) throw new Error("User not authenticated");
      console.log("[CreateChamaModal] user.id:", user.id);
      const chamaData = {
        name: form.name,
        description: form.description,
        member_ids: [user.id],
        created_by: user.id,
        avatar: form.avatar || null,
        target_amount: form.target_amount
          ? parseFloat(form.target_amount)
          : null,
        category: form.category || null,
        meeting_schedule: form.meeting_schedule || null,
        rules_url: form.rules_url || null,
      };
      console.log("[CreateChamaModal] chamaData to insert:", chamaData);
      const { error: insertError } = await supabase
        .from("chamas")
        .insert([chamaData]);
      if (insertError) throw insertError;
      showSuccess("Chama created successfully!");
      onClose();
      if (onSuccess) onSuccess();
    } catch (err) {
      showError("Failed to create chama", { description: err.message });
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 relative"
          >
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl font-bold"
              onClick={onClose}
              disabled={loading}
              aria-label="Close"
            >
              ×
            </button>
            <h2 className="text-xl font-bold text-emerald-700 mb-4 text-center">
              Create New Chama
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Chama Name"
                id="chama-name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Family Savings Group"
                required
              />
              <Input
                label="Description"
                id="chama-description"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Short description (optional)"
              />
              <Input
                label="Target Amount (optional)"
                id="chama-target-amount"
                name="target_amount"
                type="number"
                value={form.target_amount}
                onChange={handleChange}
                placeholder="e.g. 100000"
                min="1"
              />
              <Input
                label="Category (optional)"
                id="chama-category"
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="e.g. Investment, Welfare, etc."
              />
              <Input
                label="Meeting Schedule (optional)"
                id="chama-meeting-schedule"
                name="meeting_schedule"
                value={form.meeting_schedule}
                onChange={handleChange}
                placeholder="e.g. Every 1st Saturday"
              />
              <Input
                label="Rules URL (optional)"
                id="chama-rules-url"
                name="rules_url"
                value={form.rules_url}
                onChange={handleChange}
                placeholder="Link to group rules (optional)"
              />
              <Input
                label="Avatar URL (optional)"
                id="chama-avatar"
                name="avatar"
                value={form.avatar}
                onChange={handleChange}
                placeholder="Image URL (optional)"
              />
              {error && (
                <p className="text-sm text-red-600 text-center">{error}</p>
              )}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-lg font-semibold transition-all text-white ${
                  loading
                    ? "bg-emerald-400"
                    : "bg-emerald-600 hover:bg-emerald-700"
                }`}
              >
                {loading ? "Creating..." : "Create Chama"}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
