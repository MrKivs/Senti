"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "@/app/rider/components/Sidebar";

export default function RiderTrackingPage() {
  const [location, setLocation] = useState("Ngong Road, Nairobi");
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    // Simulated queue data
    const simulatedQueue = [
      {
        id: "#452",
        pickup: "CBD",
        dropoff: "Kilimani",
        eta: "3 min",
        status: "In Transit",
      },
      {
        id: "#450",
        pickup: "Kasarani",
        dropoff: "Westlands",
        eta: "12 min",
        status: "Pending",
      },
    ];

    setQueue(simulatedQueue);

    // Simulated location update
    const interval = setInterval(() => {
      setLocation("Mbagathi Way, Nairobi");
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-yellow-50 to-amber-100">
      <main className="flex-1 md:ml-64 p-6 overflow-y-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-amber-900">Tracking</h1>
          <p className="text-sm text-amber-600">
            Live rider location and queue
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white p-6 rounded-xl shadow border border-amber-100 mb-6"
        >
          <h2 className="text-lg font-semibold text-amber-800 mb-2">
            Current Location
          </h2>
          <p className="text-xl text-amber-700 font-bold">{location}</p>
          <p className="text-sm text-amber-500 mt-1">
            Auto-updating every 10 seconds
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-xl shadow border border-amber-100"
        >
          <h2 className="text-lg font-semibold text-amber-800 mb-4">
            Delivery Queue
          </h2>
          {queue.length > 0 ? (
            <ul className="space-y-4">
              {queue.map((item, index) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-amber-50 border border-amber-200 p-4 rounded-lg shadow-sm"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-amber-900 font-medium">
                        {item.id} | Pickup: {item.pickup}
                      </p>
                      <p className="text-sm text-amber-700">
                        Drop-off: {item.dropoff}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-amber-600">ETA: {item.eta}</p>
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded-full ${
                          item.status === "In Transit"
                            ? "bg-amber-200 text-amber-800"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-amber-400">No active deliveries</p>
          )}
        </motion.div>
      </main>
    </div>
  );
}
