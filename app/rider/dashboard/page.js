"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Truck, Clock, MapPin, User } from "lucide-react";
import Sidebar from "@/components/rider/Sidebar";
import AuthRedirect from "../../components/AuthRedirect"; // make sure the path matches your setup
import StatCard from "@/components/rider/StatCard"; // ensure this exists or replace it accordingly

export default function RiderDashboard() {
  const [stats, setStats] = useState({
    deliveriesToday: 5,
    activeDeliveries: 2,
    totalDistance: "34.2 km",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        ...prev,
        deliveriesToday: prev.deliveriesToday + Math.floor(Math.random() * 2),
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AuthRedirect role="rider">
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />

        <main className="flex-1 md:ml-64 p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              Rider Dashboard
            </h1>
            <p className="text-sm text-gray-500">Real-time delivery status</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <StatCard
              icon={Truck}
              label="Deliveries Today"
              value={stats.deliveriesToday}
            />
            <StatCard
              icon={Clock}
              label="Active Deliveries"
              value={stats.activeDeliveries}
            />
            <StatCard
              icon={MapPin}
              label="Distance Covered"
              value={stats.totalDistance}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white p-5 rounded-xl shadow border border-gray-100"
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Delivery Queue
              </h2>
              <ul className="space-y-4">
                <li className="flex justify-between items-center text-gray-700">
                  <span>#232 | Pickup: CBD | Drop: Westlands</span>
                  <span className="text-sm text-gray-400">5 min ago</span>
                </li>
                <li className="flex justify-between items-center text-gray-700">
                  <span>#229 | Pickup: Karen | Drop: Kileleshwa</span>
                  <span className="text-sm text-gray-400">10 min ago</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-5 rounded-xl shadow border border-gray-100"
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Location Summary
              </h2>
              <p className="text-sm text-gray-600">Last known location:</p>
              <p className="text-lg font-bold text-gray-700 mt-1">
                Ngong Road, Nairobi
              </p>
              <p className="text-sm text-gray-400">Updated 2 mins ago</p>
            </motion.div>
          </div>

          <div className="mt-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-5 rounded-xl shadow border border-gray-100 flex items-center gap-4"
            >
              <div className="bg-emerald-100 text-emerald-700 w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold">
                <User size={24} />
              </div>
              <div>
                <p className="font-semibold text-gray-700">Lewis Kivulu</p>
                <p className="text-sm text-gray-500">Rider ID: R1029</p>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </AuthRedirect>
  );
}
