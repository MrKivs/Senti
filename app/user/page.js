"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function UserDashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Simulated auth flag

  useEffect(() => {
    const checkAuth = () => {
      // TODO: Replace with your real authentication logic
      const token = localStorage.getItem("user_token");

      if (token) {
        setIsAuthenticated(true);
      } else {
        router.replace("/login"); // Redirect to login if not authenticated
      }

      setLoading(false);
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-blue-800">
        Welcome to Your Dashboard
      </h1>
      <p className="text-gray-600">
        Here's a quick overview of your activity and finances.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-lg shadow border border-blue-100">
          <p className="text-sm text-gray-500">Total Contributions</p>
          <h2 className="text-2xl font-bold text-blue-700">KES 12,300</h2>
        </div>
        <div className="bg-white p-5 rounded-lg shadow border border-blue-100">
          <p className="text-sm text-gray-500">Active Chamas</p>
          <h2 className="text-2xl font-bold text-blue-700">3</h2>
        </div>
        <div className="bg-white p-5 rounded-lg shadow border border-blue-100">
          <p className="text-sm text-gray-500">AI Chat Sessions</p>
          <h2 className="text-2xl font-bold text-blue-700">15</h2>
        </div>
      </div>
    </div>
  );
}
