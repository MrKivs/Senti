"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { supabase } from "../../../lib/supabaseClient";

import ContributionForm from "../../../components/ContributionForm";
import DisbursementTrigger from "../../../components/DisbursementTrigger";

export default function ChamaDetailsPage() {
  const { id } = useParams();
  const [chama, setChama] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) fetchChamaDetails();
  }, [id]);

  const fetchChamaDetails = async () => {
    try {
      const { data, error } = await supabase
        .from("chamas")
        .select("*, members(name, email)") // if members is a relation
        .eq("id", id)
        .single();

      if (error) {
        toast.error("Failed to load chama");
        return;
      }

      setChama(data);
    } catch (err) {
      toast.error("Error fetching chama details");
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
        {/* Contribution Form + Disbursement */}
        <div className="bg-white p-5 rounded-xl shadow border border-emerald-100 space-y-4">
          <h2 className="text-lg font-semibold text-gray-700">
            Add Contribution
          </h2>
          <ContributionForm chamaId={chama.id} />
          <DisbursementTrigger chamaId={chama.id} />
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
