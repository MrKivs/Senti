"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/components/rider/Sidebar";
import { MapPin, Clock, Navigation, PackageCheck } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const mockDelivery = {
  id: "DEL-2032",
  pickupLocation: "Senti Station, Nairobi CBD",
  dropoffLocation: "Ngong Road, Nairobi",
  estimatedTime: "12 mins",
  status: "En Route",
};

export default function TrackingPage() {
  const [delivery, setDelivery] = useState(mockDelivery);
  const [tracking, setTracking] = useState(true);

  // Simulate dynamic delivery status
  useEffect(() => {
    const timer = setTimeout(() => {
      setDelivery((prev) => ({
        ...prev,
        status: "Arrived at Drop-off",
        estimatedTime: "Completed",
      }));
      setTracking(false);
    }, 12000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 md:ml-64 p-6 bg-gradient-to-br from-green-50 to-emerald-100">
        <h1 className="text-2xl font-bold text-emerald-800 mb-6">
          Live Tracking
        </h1>

        <div className="bg-white rounded-2xl shadow p-6 max-w-2xl mx-auto space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <PackageCheck className="text-emerald-500" />
              <h2 className="text-lg font-semibold text-gray-700">
                Delivery ID: {delivery.id}
              </h2>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              <span>{delivery.estimatedTime}</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <MapPin className="text-emerald-500 mt-1" />
              <div>
                <p className="text-sm text-gray-500">Pickup</p>
                <p className="font-medium">{delivery.pickupLocation}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Navigation className="text-emerald-500 mt-1" />
              <div>
                <p className="text-sm text-gray-500">Drop-off</p>
                <p className="font-medium">{delivery.dropoffLocation}</p>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-sm text-gray-500 mb-1">Status</p>
            <AnimatePresence mode="wait">
              <motion.div
                key={delivery.status}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.3 }}
                className={`inline-block px-4 py-1 text-sm rounded-full ${
                  tracking
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-emerald-100 text-emerald-700"
                }`}
              >
                {delivery.status}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Placeholder Map */}
          <div className="w-full h-64 bg-emerald-200 rounded-xl flex items-center justify-center text-white font-bold text-xl">
            Map Placeholder
          </div>
        </div>
      </main>
    </div>
  );
}
