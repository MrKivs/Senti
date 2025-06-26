"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AuthRedirect } from "@/components/AuthRedirect";
import Sidebar from "@/components/Sidebar";
import StatCard from "@/components/StatCard";
import { Truck, Clock, MapPin, User as UserIcon } from "lucide-react";

export default function UserDashboardPage() {
  const [contributions, setContributions] = useState([]);
  const [amount, setAmount] = useState("");
  const [savingsTarget, setSavingsTarget] = useState(10000);
  const [isEditingTarget, setIsEditingTarget] = useState(false);
  const [tempTarget, setTempTarget] = useState("");

  useEffect(() => {
    async function load() {
      // simulate load
      const stored = JSON.parse(localStorage.getItem("contributions") || "[]");
      setContributions(stored);
    }
    load();
  }, []);

  useEffect(() => {
    localStorage.setItem("contributions", JSON.stringify(contributions));
  }, [contributions]);

  const handleAdd = () => {
    if (!amount) return;
    const newEntry = {
      date: new Date().toISOString().split("T")[0],
      amount: parseInt(amount),
      id: Date.now(),
    };
    setContributions((prev) => [newEntry, ...prev]);
    setAmount("");
  };

  const handleDelete = (id) =>
    setContributions((prev) => prev.filter((c) => c.id !== id));

  const handleSaveTarget = () => {
    setSavingsTarget(parseInt(tempTarget) || savingsTarget);
    setIsEditingTarget(false);
  };

  const total = contributions.reduce((s, c) => s + c.amount, 0);
  const progress = Math.min(100, (total / savingsTarget) * 100);

  return (
    <AuthRedirect role="user">
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />

        <main className="flex-1 md:ml-64 p-6 overflow-y-auto">
          <div className="space-y-6">
            <header>
              <h1 className="text-3xl font-bold text-gray-800">My Dashboard</h1>
              <p className="text-gray-500">Your savings and progress</p>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <StatCard
                icon={UserIcon}
                label="Contributions"
                value={contributions.length}
              />
              <StatCard
                icon={Clock}
                label="Average Daily"
                value={`KES ${
                  contributions.length
                    ? Math.round(total / contributions.length)
                    : 0
                }`}
              />
              <StatCard
                icon={MapPin}
                label="Days Active"
                value={new Set(contributions.map((c) => c.date)).size}
              />
            </div>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow p-6"
            >
              {/* Total Savings & Target */}
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    Total Savings
                  </h2>
                  <p className="text-4xl font-bold text-gray-700">
                    KES {total.toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  {isEditingTarget ? (
                    <div className="flex gap-2 items-center">
                      <input
                        type="number"
                        value={tempTarget}
                        onChange={(e) => setTempTarget(e.target.value)}
                        className="w-24 border rounded px-2 py-1"
                      />
                      <button
                        onClick={handleSaveTarget}
                        className="bg-amber-900 text-white px-3 py-1 rounded"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <button
                      className="text-amber-900 font-semibold text-lg"
                      onClick={() => {
                        setTempTarget(savingsTarget);
                        setIsEditingTarget(true);
                      }}
                    >
                      KES {savingsTarget.toLocaleString()}
                    </button>
                  )}
                </div>
              </div>
              <div className="h-3 w-full bg-gray-200 rounded-full">
                <div
                  className="h-full bg-amber-900 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>{progress.toFixed(0)}% Complete</span>
                <span>
                  KES {total.toLocaleString()} of KES{" "}
                  {savingsTarget.toLocaleString()}
                </span>
              </div>
            </motion.section>

            {/* Add & Recent Contributions */}
            {/* ...analogous to your rider page, animated sections for input & list */}
          </div>
        </main>
      </div>
    </AuthRedirect>
  );
}
