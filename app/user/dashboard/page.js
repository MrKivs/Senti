"use client";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { db } from "@/app/lib/db";
import Sidebar from "../../components/Sidebar";
import AuthRedirect from "@/app/components/AuthRedirect";

export default function UserDashboard() {
  const [contributions, setContributions] = useState([]);
  const [amount, setAmount] = useState("");
  const [savingsTarget, setSavingsTarget] = useState(10000);
  const [isEditingTarget, setIsEditingTarget] = useState(false);
  const [tempTarget, setTempTarget] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const all = await db.contributions.toArray();
      setContributions(all.reverse());
    };

    fetchData();
  }, []);

  const handleAdd = async () => {
    if (!amount) return;
    const newEntry = {
      date: new Date().toISOString().split("T")[0],
      amount: parseInt(amount),
      id: Date.now(),
    };

    await db.contributions.add(newEntry);
    setContributions([newEntry, ...contributions]);
    setAmount("");
  };

  const handleDelete = async (id) => {
    await db.contributions.delete(id);
    setContributions(contributions.filter((item) => item.id !== id));
  };

  const handleSaveTarget = () => {
    const target = parseInt(tempTarget) || savingsTarget;
    setSavingsTarget(target);
    setIsEditingTarget(false);
  };

  const total = contributions.reduce((sum, item) => sum + item.amount, 0);
  const progress = Math.min(100, (total / savingsTarget) * 100);

  return (
    <AuthRedirect role="user">
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar />

      <main className="flex-1 h-screen overflow-y-auto bg-gradient-to-br from-sky-50 to-indigo-100 p-4 pb-24 md:ml-64 ">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6 pt-4">
            <div className="p-2 rounded-xl bg-white border border-emerald-200 shadow">
              <div className="bg-gradient-to-r from-green-400 to-emerald-500 w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                ₿
              </div>
            </div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-emerald-600">
              Savings Dashboard
            </h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded-2xl shadow border border-emerald-100">
              <p className="text-sm text-emerald-600">Total Contributions</p>
              <p className="text-2xl font-bold text-emerald-700">
                {contributions.length}
              </p>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow border border-emerald-100">
              <p className="text-sm text-emerald-600">Average Daily</p>
              <p className="text-2xl font-bold text-emerald-700">
                KES{" "}
                {contributions.length > 0
                  ? Math.round(total / contributions.length)
                  : 0}
              </p>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow border border-emerald-100">
              <p className="text-sm text-emerald-600">Days Active</p>
              <p className="text-2xl font-bold text-emerald-700">
                {new Set(contributions.map((c) => c.date)).size}
              </p>
            </div>
          </div>
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-2xl p-5 mb-6 shadow border border-emerald-100"
          >
            <section className="bg-white rounded-2xl p-5 mb-6 shadow border border-emerald-100">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-emerald-700 mb-2">
                    Total Savings
                  </h2>
                  <p className="text-4xl font-bold text-emerald-600">
                    KES {total.toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-1 justify-end">
                    <p className="text-sm text-emerald-600">Target</p>
                    <motion.button
                      whileHover={{ scalr: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setTempTarget(savingsTarget);
                        setIsEditingTarget(true);
                      }}
                      className="text-emerald-500 hover:text-emerald-700"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </motion.button>
                  </div>
                  {isEditingTarget ? (
                    <div className="flex gap-1">
                      <input
                        type="number"
                        value={tempTarget}
                        onChange={(e) => setTempTarget(e.target.value)}
                        className="w-24 border border-emerald-200 text-emerald-700 rounded-md px-2 py-1 text-sm"
                      />
                      <button
                        onClick={handleSaveTarget}
                        className="bg-emerald-500 text-white px-2 py-1 rounded-md text-sm"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <p className="text-lg font-semibold text-emerald-600">
                      KES {savingsTarget.toLocaleString()}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <div className="flex justify-between text-sm text-emerald-600 mb-1">
                  <span>{progress.toFixed(0)}% Complete</span>
                  <span>
                    KES {total.toLocaleString()} of{" "}
                    {savingsTarget.toLocaleString()}
                  </span>
                </div>
                <div className="h-3 bg-emerald-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            </section>
          </motion.section>
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-white rounded-2xl p-5 mb-6 shadow border border-emerald-100"
          >
            <section className="bg-white rounded-2xl p-5 mb-6 shadow border border-emerald-100">
              <h2 className="text-lg font-semibold text-emerald-700 mb-3">
                Add Contribution
              </h2>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="flex-1 bg-white border border-emerald-200 text-emerald-700 placeholder-emerald-400 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                  placeholder="Enter amount"
                  onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdd}
                  disabled={!amount}
                  className="bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white px-5 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Add
                </motion.button>
              </div>
            </section>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="bg-white rounded-2xl p-5 mb-6 shadow border border-emerald-100"
          >
            <section className="bg-white rounded-2xl p-5 shadow border border-emerald-100">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-emerald-700">
                  Recent Contributions
                </h2>
                <span className="text-sm text-emerald-500">
                  {contributions.length} records
                </span>
              </div>

              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                <AnimatePresence>
                  {contributions.length > 0 ? (
                    contributions.map((contribution) => (
                      <div
                        key={contribution.id}
                        className="p-4 rounded-xl bg-emerald-50 flex flex-col sm:flex-row justify-between items-start sm:items-center"
                      >
                        <div className="flex items-center gap-3">
                          <div className="bg-gradient-to-r from-green-100 to-emerald-100 w-10 h-10 rounded-full flex items-center justify-center">
                            <span className="text-emerald-500 font-bold">
                              +
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-emerald-800">
                              {contribution.date}
                            </p>
                            <p className="text-sm text-emerald-500">
                              {new Date(contribution.date).toLocaleDateString(
                                "en-US",
                                { weekday: "long" }
                              )}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 mt-2 sm:mt-0">
                          <p className="text-lg font-bold text-emerald-700">
                            +KES {contribution.amount.toLocaleString()}
                          </p>
                          <button
                            onClick={() => handleDelete(contribution.id)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-8 text-emerald-500"
                    >
                      <div className="text-center py-8 text-emerald-500">
                        <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8 text-emerald-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <p>No contributions yet</p>
                        <p className="text-sm mt-2">
                          Add your first contribution above
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </section>
          </motion.section>
        </div>
      </main>
    </div>
    </AuthRedirect>
  );
}
