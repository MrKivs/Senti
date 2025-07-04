"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient";

import ContributionForm from "../../../components/ContributionForm";
import DisbursementTrigger from "../../../components/DisbursementTrigger";
import { showSuccess, showError } from "../../../lib/toast";

export default function ChamaDetailsPage() {
  const params = useParams();
  const id = params.chamas;
  const [chama, setChama] = useState(null);
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState([]);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviting, setInviting] = useState(false);
  const [pendingInvites, setPendingInvites] = useState([]);

  const fetchChamaDetails = async () => {
    try {
      const { data: chama, error } = await supabase
        .from("chamas")
        .select("*")
        .eq("id", id)
        .single();
      if (error || !chama) {
        showError("Failed to load chama");
        setChama(null);
        setLoading(false);
        return;
      }
      setChama(chama);
      // Fetch members
      if (chama.member_ids && chama.member_ids.length > 0) {
        const { data: members, error: memberError } = await supabase
          .from("users")
          .select("id, name, email, avatar")
          .in("id", chama.member_ids);
        setMembers(members || []);
      } else {
        setMembers([]);
      }
      // Fetch pending invites
      const { data: invites, error: invitesError } = await supabase
        .from("invitations")
        .select("id, invited_email, status, created_at")
        .eq("chama_id", id)
        .eq("status", "pending");
      setPendingInvites(invites || []);
    } catch (err) {
      showError("Error fetching chama details");
      setChama(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchChamaDetails();
  }, [id]);

  const handleInvite = async (e) => {
    e.preventDefault();
    if (!inviteEmail.trim()) {
      showError("Please enter an email address.");
      return;
    }
    setInviting(true);
    try {
      // Get current user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError || !user) throw new Error("User not authenticated");
      // Check for existing invite
      const { data: existing } = await supabase
        .from("invitations")
        .select("id, status")
        .eq("chama_id", id)
        .eq("invited_email", inviteEmail.trim().toLowerCase());
      if (existing && existing.length > 0) {
        showError("This email has already been invited to this chama.");
        setInviting(false);
        return;
      }
      // Insert invitation
      const { error: inviteError } = await supabase.from("invitations").insert([
        {
          chama_id: id,
          invited_email: inviteEmail.trim().toLowerCase(),
          invited_by: user.id,
          status: "pending",
        },
      ]);
      if (inviteError) throw inviteError;
      showSuccess("Invitation sent!");
      setInviteEmail("");
      fetchChamaDetails(); // Refresh invites
    } catch (err) {
      showError("Failed to send invite", { description: err.message });
    } finally {
      setInviting(false);
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
          {/* Invite by Email */}
          <div className="mt-8">
            <h3 className="text-md font-semibold text-emerald-700 mb-2">
              Invite Member by Email
            </h3>
            <form
              onSubmit={handleInvite}
              className="flex flex-col sm:flex-row gap-2 items-start"
            >
              <input
                type="email"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full sm:w-auto"
                placeholder="Enter email address"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                disabled={inviting}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-semibold transition"
              >
                {inviting ? "Inviting..." : "Send Invite"}
              </button>
            </form>
            {/* Pending Invites */}
            {pendingInvites.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-1">
                  Pending Invitations
                </h4>
                <ul className="list-disc pl-5 text-sm text-gray-600">
                  {pendingInvites.map((invite) => (
                    <li key={invite.id}>
                      {invite.invited_email}{" "}
                      <span className="text-amber-600">(pending)</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Members */}
        <div className="bg-white p-5 rounded-xl shadow border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">Members</h2>
          <ul className="space-y-2 text-sm text-gray-600">
            {members.length > 0 ? (
              members.map((m, i) => (
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
