"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { supabase } from "../../lib/supabaseClient";

export default function ChamaMainPage() {
  const [chamas, setChamas] = useState([]);
  const [loading, setLoading] = useState(true);

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
        toast.error("You must be logged in to view your chamas.");
        return;
      }

      const { data, error } = await supabase
        .from("chamas")
        .select("id, name, description, members ( name, email )")
        .contains("member_ids", [user.id]); // Ensure your DB uses an array column &apos;member_ids&apos;

      if (error) {
        toast.error("Failed to load chamas.");
        return;
      }

      setChamas(data || []);
    } catch (err) {
      toast.error("Could not fetch chamas.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 md:p-10 bg-gray-50">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-emerald-700">Your Chamas</h1>
        <Link href="/chama/create">
          <button className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md">
            + Create Chama
          </button>
        </Link>
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
