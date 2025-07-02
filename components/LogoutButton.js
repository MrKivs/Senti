"use client";

import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabaseClient";


export default function LogoutButton() {
  const router = useRouter();
 

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition"
    >
      Logout
    </button>
  );
}
