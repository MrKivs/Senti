// supabase/functions/disburse/index.ts
import { serve } from "https://deno.land/std@0.192.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  const { chama_id } = await req.json();

  if (!chama_id) {
    return new Response(JSON.stringify({ error: "Missing chama_id" }), {
      status: 400,
    });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const today = new Date().toISOString().slice(0, 10);

  const { data: members, error: memberError } = await supabase
    .from("chama_members")
    .select("user_id")
    .eq("chama_id", chama_id);

  if (memberError) {
    return new Response(JSON.stringify({ error: memberError.message }), {
      status: 500,
    });
  }

  const { data: contributions } = await supabase
    .from("contributions")
    .select("user_id, amount")
    .eq("chama_id", chama_id)
    .eq("contribution_date", today);

  const memberIds = members.map((m) => m.user_id);
  const contributedIds = new Set(contributions.map((c) => c.user_id));

  const allContributed = memberIds.every((id) => contributedIds.has(id));
  if (!allContributed) {
    return new Response(
      JSON.stringify({ error: "Not all members have contributed today" }),
      { status: 400 }
    );
  }

  const { data: disbursedToday } = await supabase
    .from("disbursements")
    .select("member_id")
    .eq("chama_id", chama_id)
    .gte("disbursed_at", `${today}T00:00:00Z`);

  const alreadyPaidIds = disbursedToday?.map((d) => d.member_id) || [];
  const nextMember = memberIds.find((id) => !alreadyPaidIds.includes(id));

  if (!nextMember) {
    return new Response(JSON.stringify({ message: "All members paid today" }), {
      status: 200,
    });
  }

  const amount = contributions.reduce((sum, c) => sum + c.amount, 0);

  const { error: insertError } = await supabase.from("disbursements").insert([
    {
      chama_id,
      member_id: nextMember,
      amount,
      disbursed_at: new Date().toISOString(),
      status: "paid",
    },
  ]);

  if (insertError) {
    return new Response(JSON.stringify({ error: insertError.message }), {
      status: 500,
    });
  }

  return new Response(
    JSON.stringify({ success: true, disbursed_to: nextMember, amount }),
    { status: 200 }
  );
});
