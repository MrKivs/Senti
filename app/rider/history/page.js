"use client";

import Sidebar from "@/components/rider/Sidebar";
import { useEffect, useState } from "react";
import { MapPin, Clock, PackageCheck } from "lucide-react";
import { motion } from "framer-motion";

const mockDeliveries = [
  {
    id: "DL-001",
    date: "2025-06-20",
    time: "13:45",
    from: "Kilimani, Nairobi",
    to: "Westlands, Nairobi",
    status: "Delivered",
  },
  {
    id: "DL-002",
    date: "2025-06-19",
    time: "10:20",
    from: "CBD, Nairobi",
    to: "Kasarani, Nairobi",
    status: "Delivered",
  },
  {
    id: "DL-003",
    date: "2025-06-18",
    time: "17:10",
    from: "Lavington",
    to: "Ngong Road",
    status: "Delivered",
  },
];

export default function RiderHistoryPage() {
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    setDeliveries(mockDeliveries);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <main className="flex-1 overflow-y-auto bg-gradient-to-br from-gray-50 to-emerald-50 p-6 md:pl-64">
        <h1 className="text-2xl font-bold text-emerald-700 mb-6">
          Delivery History
        </h1>

        <div className="space-y-4 max-w-3xl mx-auto">
          {deliveries.map((delivery) => (
            <motion.div
              key={delivery.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl p-5 shadow border border-emerald-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-emerald-600">
                    {delivery.id} — {delivery.status}
                  </p>
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <Clock className="w-4 h-4" /> {delivery.date} at{" "}
                    {delivery.time}
                  </p>
                </div>
                <PackageCheck className="w-6 h-6 text-green-500" />
              </div>

              <div className="mt-3 text-sm text-gray-700 space-y-1">
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-500" /> From:{" "}
                  {delivery.from}
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-red-500" /> To: {delivery.to}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
