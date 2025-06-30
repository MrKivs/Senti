"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function DisbursementPage({ params }) {
  const chamaId = params.chamas;
  const [disbursements, setDisbursements] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from("disbursements")
        .select("id, member_id, amount, status, disbursed_at")
        .eq("chama_id", chamaId)
        .order("disbursed_at", { ascending: false });
      if (data) setDisbursements(data);
    }

    fetchData();
  }, [chamaId]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Disbursements</h2>
      <ul className="space-y-4">
        {disbursements.map((d) => (
          <li key={d.id} className="p-4 bg-white shadow rounded-md border">
            <p>Recipient: {d.member_id}</p>
            <p>Amount: Ksh {d.amount}</p>
            <p>Status: {d.status}</p>
            <p>Date: {new Date(d.disbursed_at).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
