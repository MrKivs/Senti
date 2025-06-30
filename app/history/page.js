"use client";

import { useEffect, useState } from "react";
import { showError } from "@/lib/toast";
import Link from "next/link";

export default function ContributionHistoryPage() {
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
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

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-emerald-700">
          Contribution History
        </h1>
        <Link
          href="/dashboard"
          className="text-sm text-amber-600 font-semibold hover:underline"
        >
          ← Back to Dashboard
        </Link>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading history...</p>
      ) : contributions.length === 0 ? (
        <p className="text-gray-500 italic">
          You have not made any contributions yet.
        </p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow border border-gray-100">
          <table className="min-w-full text-sm text-left text-gray-600">
            <thead className="bg-gray-100 text-gray-700 font-semibold">
              <tr>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Chama</th>
              </tr>
            </thead>
            <tbody>
              {contributions.map((item, i) => (
                <tr
                  key={i}
                  className="border-t hover:bg-amber-50 transition duration-100"
                >
                  <td className="px-4 py-2">{item.date}</td>
                  <td className="px-4 py-2 text-emerald-700 font-semibold">
                    {item.amount}
                  </td>
                  <td className="px-4 py-2">{item.type}</td>
                  <td className="px-4 py-2">{item.chama_name || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
