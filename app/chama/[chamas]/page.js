"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { showError } from "@/lib/toast";
import ContributionForm from "@/app/components/ContributionForm";

export default function ChamaDetailsPage() {
  const { id } = useParams();
  const [chama, setChama] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChamaDetails();
  }, []);

  const fetchChamaDetails = async () => {
    try {
      const res = await fetch(`/api/chamas/${id}`);
      const data = await res.json();

      if (res.ok) {
        setChama(data);
      } else {
        showError(data?.message || "Failed to load chama");
      }
    } catch (err) {
      showError("Error fetching chama details");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-6">Loading chama details...</div>;
  }

  if (!chama) {
    return <div className="p-6 text-red-500">Chama not found.</div>;
  }

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-emerald-700">{chama.name}</h1>
        <p className="text-gray-600">{chama.description}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Contribution Form */}
        <div className="bg-white p-5 rounded-xl shadow border border-emerald-100">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">
            Add Contribution
          </h2>
          <ContributionForm chamaId={id} />
        </div>

        {/* Members */}
        <div className="bg-white p-5 rounded-xl shadow border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">Members</h2>
          <ul className="space-y-2 text-sm text-gray-600">
            {chama.members?.length > 0 ? (
              chama.members.map((m, i) => (
                <li key={i} className="border-b pb-1">
                  {m.name || m.email || "Unnamed Member"}
                </li>
              ))
            ) : (
              <li className="text-gray-400 italic">No members yet.</li>
            )}
          </ul>
        </div>
      </div>

      {/* Disbursement Rules */}
      <div className="mt-8 bg-white p-5 rounded-xl shadow border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-700 mb-3">
          Disbursement Rules
        </h2>
        <p className="text-sm text-gray-600">
          {chama.disbursement_rules || "No rules defined yet."}
        </p>
      </div>
    </div>
  );
}
