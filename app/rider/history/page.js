"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Sidebar from "@/app/rider/components/Sidebar";

export default function RiderHistoryPage() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Simulate fetching history
    const fetchData = async () => {
      const simulatedData = [
        {
          id: 1,
          from: "CBD",
          to: "Westlands",
          date: "2024-06-19",
          status: "Delivered",
        },
        {
          id: 2,
          from: "Karen",
          to: "Kilimani",
          date: "2024-06-18",
          status: "Delivered",
        },
        {
          id: 3,
          from: "Lavington",
          to: "Upper Hill",
          date: "2024-06-17",
          status: "Cancelled",
        },
      ];
      setHistory(simulatedData);
    };

    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-yellow-50 to-amber-100">
      <main className="flex-1 md:ml-64 p-6">
        <h1 className="text-3xl font-bold text-amber-900 mb-4">
          Delivery History
        </h1>
        <p className="text-sm text-amber-600 mb-6">
          View your completed and cancelled deliveries
        </p>

        <div className="bg-white rounded-xl shadow border border-amber-100 overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="bg-amber-50 border-b border-amber-200">
              <tr className="text-left text-sm text-amber-700">
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Pickup</th>
                <th className="px-4 py-3">Drop-off</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {history.length > 0 ? (
                history.map((item, i) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="hover:bg-amber-50 text-amber-800 text-sm"
                  >
                    <td className="px-4 py-3 font-medium">{item.id}</td>
                    <td className="px-4 py-3">{item.from}</td>
                    <td className="px-4 py-3">{item.to}</td>
                    <td className="px-4 py-3">{item.date}</td>
                    <td
                      className={`px-4 py-3 font-semibold ${
                        item.status === "Delivered"
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {item.status}
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-6 text-center text-amber-400 text-sm"
                  >
                    No delivery history available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
