"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { supabase } from "../../lib/supabaseClient";
import { showSuccess, showError } from "../../lib/toast";
import CreateChamaModal from "../../components/CreateChamaModal";

export default function ChamaMainPage() {
  const [chamas, setChamas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    fetchChamas();
  }, []);

  const fetchChamas = async () => {
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError || !user) {
        showError("You must be logged in to view your chamas.");
        return;
      }
      console.log("[ChamaMainPage] user.id:", user.id);
      const { data: chamas, error } = await supabase
        .from("chamas")
        .select("*")
        .contains("member_ids", [user.id]);
      if (error) {
        showError("Failed to load chamas.");
        return;
      }
      console.log("[ChamaMainPage] fetched chamas:", chamas);
      setChamas(chamas || []);
    } catch (err) {
      showError("Could not fetch chamas.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 md:p-10 bg-gray-50">
      <CreateChamaModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={fetchChamas}
      />
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-emerald-700">Your Chamas</h1>
        <button
          className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md"
          onClick={() => setShowCreateModal(true)}
        >
          + Create Chama
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading chamas...</p>
      ) : chamas.length === 0 ? (
        <p className="text-gray-500">
          You haven&apos;t joined or created any chamas yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {chamas.map((chama) => (
            <motion.div
              key={chama.id}
              whileHover={{ y: -4 }}
              className="bg-white p-5 rounded-xl shadow border border-emerald-100 transition"
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                {chama.name}
              </h2>
              <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                {chama.description}
              </p>

              <div className="flex justify-between items-center">
                <span className="text-sm text-emerald-600 font-medium">
                  Members: {chama.members?.length ?? "N/A"}
                </span>
                <Link
                  href={`/chama/${chama.id}`}
                  className="text-sm text-amber-600 hover:underline font-semibold"
                >
                  View →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
