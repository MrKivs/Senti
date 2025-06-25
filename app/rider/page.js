"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";


export default function RiderHomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // replace this with your auth logic

  // Simulate auth check
  useEffect(() => {
    const checkAuth = async () => {
      // TODO: Replace with real auth logic (e.g. Firebase, Supabase, JWT)
      const token = localStorage.getItem("rider_token");

      if (token) {
        setIsAuthenticated(true);
      } else {
        router.replace("/login"); // Redirect to login page if not authenticated
      }

      setLoading(false);
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-6 w-6 animate-spin text-emerald-600" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold text-emerald-700">Welcome, Rider</h1>
      <p className="text-gray-600">
        Here's your delivery overview and real-time updates.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow border border-emerald-100">
          <p className="text-sm text-gray-500">Deliveries Today</p>
          <h2 className="text-2xl font-semibold text-emerald-700">12</h2>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border border-emerald-100">
          <p className="text-sm text-gray-500">Pending Deliveries</p>
          <h2 className="text-2xl font-semibold text-emerald-700">4</h2>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border border-emerald-100">
          <p className="text-sm text-gray-500">Completed This Week</p>
          <h2 className="text-2xl font-semibold text-emerald-700">34</h2>
        </div>
      </div>
    </div>
  );
}
