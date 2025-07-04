"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";
import { showSuccess, showError } from "../../lib/toast";

import {
  ArrowPathIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";

export default function DashboardPage() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [userId, setUserId] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const router = useRouter();

  const fetchDashboardData = async (uid) => {
    try {
      if (!uid) return;
      setRefreshing(true);
      const { data, error } = await supabase
        .from("user_dashboard_summary")
        .select("*")
        .eq("user_id", uid)
        .single();

      if (error) {
        showError("Failed to fetch dashboard data");
        setSummary(null);
      } else {
        setSummary(data);
        setLastUpdated(new Date().toLocaleTimeString());
      }
    } catch (err) {
      showError("Could not load dashboard data");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    const checkSessionAndFetch = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      const user = session?.user;

      if (!user || error) {
        setTimeout(() => router.replace("/login"), 100);
      } else {
        setUserId(user.id);
        await fetchDashboardData(user.id);
      }

      setCheckingAuth(false);
    };

    checkSessionAndFetch();
  }, [router]);

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-emerald-700">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 mx-auto border-4 border-emerald-400 border-t-transparent rounded-full mb-3" />
          <p className="text-sm">Checking login...</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-cyan-50 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div className="h-8 bg-gray-200 rounded w-1/3 animate-pulse"></div>
            <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse"></div>
          </div>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-2xl shadow border border-gray-100"
              >
                <div className="h-5 bg-gray-200 rounded w-1/2 mb-4 animate-pulse"></div>
                <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!summary) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-cyan-50 flex items-center justify-center p-4">
        <div className="max-w-md text-center">
          <div className="bg-red-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Dashboard Unavailable
          </h2>
          <p className="text-gray-600 mb-6">
            We couldn&apos;t load your dashboard data. Please try refreshing the
            page.
          </p>
          <button
            onClick={() => fetchDashboardData(userId)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg font-medium flex items-center justify-center mx-auto"
          >
            <ArrowPathIcon className="h-5 w-5 mr-2" />
            Refresh Dashboard
          </button>
        </div>
      </div>
    );
  }

  const savingsPercentage = summary.target_savings
    ? Math.min(
        Math.round((summary.individual_savings / summary.target_savings) * 100),
        100
      )
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-cyan-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap justify-between items-center gap-4 mb-6 md:mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-emerald-800">
              Welcome back, {summary.name || "User"} 👋
            </h1>
            <p className="text-gray-600 mt-1">
              Here&apos;s your financial summary today
              {lastUpdated && (
                <span className="block text-sm text-gray-400">
                  Last updated at {lastUpdated}
                </span>
              )}
            </p>
          </div>
          <button
            onClick={() => fetchDashboardData(userId)}
            disabled={refreshing}
            className="bg-white border border-emerald-200 text-emerald-700 hover:bg-emerald-50 px-4 py-2 rounded-lg flex items-center transition"
          >
            <ArrowPathIcon
              className={`h-5 w-5 mr-2 ${refreshing ? "animate-spin" : ""}`}
            />
            {refreshing ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          <StatCard
            title="Individual Savings"
            value={`Ksh ${summary.individual_savings?.toLocaleString() || 0}`}
            icon={<CurrencyDollarIcon className="h-6 w-6 text-emerald-600" />}
            trend={`${savingsPercentage}% of goal`}
          />
          <StatCard
            title="Chamas Joined"
            value={summary.chamas_count ?? 0}
            icon={<UserGroupIcon className="h-6 w-6 text-amber-600" />}
            trend={`${summary.active_chamas || 0} active`}
          />
          <StatCard
            title="Total Contributions"
            value={`Ksh ${summary.total_contributed?.toLocaleString() || 0}`}
            icon={<ArrowTrendingUpIcon className="h-6 w-6 text-indigo-600" />}
            trend={
              summary.monthly_avg
                ? `Avg: Ksh ${summary.monthly_avg.toLocaleString()}/mo`
                : ""
            }
          />
          <StatCard
            title="Target Savings"
            value={`Ksh ${summary.target_savings?.toLocaleString() || 0}`}
            icon={<CurrencyDollarIcon className="h-6 w-6 text-emerald-400" />}
            trend={
              summary.target_savings
                ? `${savingsPercentage}% achieved`
                : "No target set"
            }
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, trend }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-emerald-100 transition-transform hover:translate-y-[-5px]">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
          <p className="text-xl md:text-2xl font-bold text-emerald-800">
            {value}
          </p>
          {trend && <p className="text-xs text-gray-500 mt-2">{trend}</p>}
        </div>
        <div className="bg-emerald-100 p-2 rounded-lg">{icon}</div>
      </div>
    </div>
  );
}
