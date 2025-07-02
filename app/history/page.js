"use client";

import { useEffect, useState } from "react";
import { showError } from "../../lib/toast";
import Link from "next/link";
import { format } from "date-fns";
import { ArrowLeftIcon, ReceiptPercentIcon } from "@heroicons/react/24/outline";
import { supabase } from "../../lib/supabaseClient";

export default function ContributionHistoryPage() {
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [sortConfig, setSortConfig] = useState({
    key: "date",
    direction: "desc",
  });

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/contributions/history");
      const data = await res.json();

      if (res.ok) {
        setContributions(data);
      } else {
        showError(data?.message || "Failed to load history");
      }
    } catch (err) {
      showError("Unable to load contribution history");
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const filteredContributions = contributions.filter((c) =>
    filter === "all" ? true : c.type === filter
  );

  const sortedContributions = [...filteredContributions].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key])
      return sortConfig.direction === "asc" ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key])
      return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? "↑" : "↓";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-emerald-50 p-4 md:p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <Link
            href="/dashboard"
            className="flex items-center text-amber-700 hover:text-amber-900"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-1" />
            <span className="font-medium">Dashboard</span>
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-emerald-800 flex items-center">
            <ReceiptPercentIcon className="h-8 w-8 mr-2 text-emerald-600" />
            Contribution History
          </h1>
          <div className="w-24"></div>
        </div>

        {/* Filter & Sort */}
        <div className="flex flex-wrap gap-3 mb-6 bg-white p-4 rounded-xl shadow-sm border border-emerald-100">
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Filter by Type
            </label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">All Types</option>
              <option value="deposit">Deposits</option>
              <option value="withdrawal">Withdrawals</option>
              <option value="loan">Loan Payments</option>
              <option value="penalty">Penalties</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={fetchHistory}
              className="bg-emerald-100 hover:bg-emerald-200 text-emerald-800 px-4 py-2 rounded-lg transition flex items-center"
            >
              <svg
                className="h-5 w-5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Refresh
            </button>
          </div>

          <div className="ml-auto flex items-end">
            <div className="bg-emerald-50 px-3 py-1.5 rounded-lg text-sm text-emerald-800">
              Total: {contributions.length} records
            </div>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-4 shadow-sm border border-emerald-100 animate-pulse"
              >
                <div className="flex justify-between">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/6"></div>
                </div>
                <div className="mt-3 flex justify-between">
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : contributions.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center border border-emerald-100">
            <svg
              className="h-16 w-16 mx-auto text-amber-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <h3 className="text-xl font-medium text-gray-700 mt-4">
              No Contributions Found
            </h3>
            <p className="text-gray-500 mt-2 max-w-md mx-auto">
              You haven&apos;t made any contributions yet. Start contributing to
              see your history here.
            </p>
            <Link
              href="/contribute"
              className="mt-4 inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg transition"
            >
              Make a Contribution
            </Link>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto bg-white rounded-xl shadow border border-emerald-100">
              <table className="min-w-full text-sm">
                <thead className="bg-emerald-50 text-emerald-800">
                  <tr>
                    {["date", "amount", "type", "chama_name"].map((key) => (
                      <th
                        key={key}
                        className={`px-4 py-3 font-semibold text-left ${
                          key === "amount" ? "text-right" : ""
                        } cursor-pointer`}
                        onClick={() => handleSort(key)}
                      >
                        <div
                          className={`flex items-center ${
                            key === "amount" ? "justify-end" : ""
                          }`}
                        >
                          {key.charAt(0).toUpperCase() + key.slice(1)}{" "}
                          {getSortIcon(key)}
                        </div>
                      </th>
                    ))}
                    <th className="px-4 py-3 font-semibold text-left">
                      Receipt
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedContributions.map((item, i) => (
                    <tr
                      key={i}
                      className="border-t border-gray-100 hover:bg-emerald-50 transition duration-100"
                    >
                      <td className="px-4 py-3 text-gray-700">
                        {format(new Date(item.date), "dd MMM yyyy")}
                      </td>
                      <td
                        className={`px-4 py-3 text-right font-medium ${
                          item.type === "deposit"
                            ? "text-emerald-700"
                            : "text-amber-700"
                        }`}
                      >
                        {item.type === "deposit" ? "+" : "-"}
                        {Number(item.amount).toLocaleString("en-KE", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            item.type === "deposit"
                              ? "bg-emerald-100 text-emerald-800"
                              : item.type === "withdrawal"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-purple-100 text-purple-800"
                          }`}
                        >
                          {item.type.charAt(0).toUpperCase() +
                            item.type.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-700">
                        {item.chama_name || "Personal"}
                      </td>
                      <td className="px-4 py-3">
                        <button className="text-emerald-600 hover:text-emerald-800 font-medium text-sm">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
              {sortedContributions.map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl p-4 shadow-sm border border-emerald-100"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-gray-500 text-sm">Date</p>
                      <p className="font-medium text-gray-800">
                        {format(new Date(item.date), "dd MMM yyyy")}
                      </p>
                    </div>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        item.type === "deposit"
                          ? "bg-emerald-100 text-emerald-800"
                          : item.type === "withdrawal"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-purple-100 text-purple-800"
                      }`}
                    >
                      {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-500 text-sm">Amount</p>
                      <p
                        className={`font-semibold ${
                          item.type === "deposit"
                            ? "text-emerald-700"
                            : "text-amber-700"
                        }`}
                      >
                        {item.type === "deposit" ? "+" : "-"}
                        {Number(item.amount).toLocaleString("en-KE", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Group</p>
                      <p className="font-medium text-gray-800">
                        {item.chama_name || "Personal"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button className="text-emerald-600 hover:text-emerald-800 font-medium text-sm">
                      View Receipt
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
