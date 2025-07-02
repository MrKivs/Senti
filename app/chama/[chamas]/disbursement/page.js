"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../../lib/supabaseClient";

export default function DisbursementPage({ params }) {
  const chamaId = params.chamas;
  const [disbursements, setDisbursements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (chamaId) fetchDisbursements();
  }, [chamaId]);

  const fetchDisbursements = async () => {
    try {
      const { data, error } = await supabase
        .from("disbursements")
        .select("id, member_id, amount, status, disbursed_at")
        .eq("chama_id", chamaId)
        .order("disbursed_at", { ascending: false });

      if (error) {
        console.error("Error fetching disbursements:", error);
        return;
      }

      setDisbursements(data || []);
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-emerald-800 mb-6">
        Disbursement History
      </h2>

      {loading ? (
        <p className="text-gray-500">Loading disbursements...</p>
      ) : disbursements.length === 0 ? (
        <p className="text-gray-500">No disbursements found for this chama.</p>
      ) : (
        <ul className="space-y-4">
          {disbursements.map((d) => (
            <li
              key={d.id}
              className="p-5 bg-white shadow-sm rounded-xl border border-emerald-100"
            >
              <div className="text-sm text-gray-600">
                <p>
                  <span className="font-semibold text-gray-800">
                    Recipient:
                  </span>{" "}
                  {d.member_id}
                </p>
                <p>
                  <span className="font-semibold text-gray-800">Amount:</span>{" "}
                  Ksh {d.amount?.toLocaleString()}
                </p>
                <p>
                  <span className="font-semibold text-gray-800">Status:</span>{" "}
                  {d.status}
                </p>
                <p>
                  <span className="font-semibold text-gray-800">Date:</span>{" "}
                  {new Date(d.disbursed_at).toLocaleString()}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
