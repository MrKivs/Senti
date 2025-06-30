"use client";

import { useEffect, useState } from "react";
import { showError } from "@/lib/toast";
import Link from "next/link";

export default function DashboardPage() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const res = await fetch("/api/dashboard/summary");
      const data = await res.json();

      if (res.ok) {
        setSummary(data);
      } else {
        showError(data?.message || "Failed to load dashboard");
      }
    } catch (err) {
      showError("Could not load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-6">Loading your dashboard...</div>;
  if (!summary)
    return <div className="p-6 text-red-500">No data available</div>;

  return (
    <div className="min-h-screen p-6 md:p-10 bg-gray-50">
      <h1 className="text-2xl font-bold text-emerald-700 mb-6">
        Welcome back, {summary.name || "User"} 👋
      </h1>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <StatCard
          title="Individual Savings"
          value={`Ksh ${summary.individual_savings}`}
        />
        <StatCard title="Chamas Joined" value={summary.chamas_count} />
        <StatCard
          title="Total Contributions"
          value={`Ksh ${summary.total_contributed}`}
        />
      </div>

      <div className="mt-8 grid gap-6 grid-cols-1 md:grid-cols-2">
        {/* Progress */}
        <div className="bg-white p-5 rounded-xl shadow border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Savings Goal
          </h2>
          <p className="text-sm text-gray-600 mb-2">
            Goal: Ksh {summary.target_savings}
          </p>
          <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
            <div
              className="bg-emerald-500 h-4"
              style={{
                width: `${
                  (summary.individual_savings / summary.target_savings) * 100
                }%`,
              }}
            />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-5 rounded-xl shadow border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Recent Activity
          </h2>
          <ul className="text-sm text-gray-600 space-y-2">
            {summary.recent_activity?.length > 0 ? (
              summary.recent_activity.map((item, i) => (
                <li key={i} className="border-b pb-1">
                  <span className="font-medium text-emerald-600">
                    {item.amount}
                  </span>{" "}
                  to <span className="font-semibold">{item.chama_name}</span> on{" "}
                  <span className="text-gray-500">{item.date}</span>
                </li>
              ))
            ) : (
              <li className="text-gray-400 italic">No recent contributions</li>
            )}
          </ul>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-10 flex gap-4">
        <Link
          href="/chama"
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow"
        >
          View My Chamas
        </Link>
        <Link
          href="/chama/create"
          className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow"
        >
          + Create New Chama
        </Link>
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow border border-gray-100 text-center">
      <h3 className="text-sm font-medium text-gray-500 mb-2">{title}</h3>
      <p className="text-xl font-bold text-emerald-700">{value}</p>
    </div>
  );
}
