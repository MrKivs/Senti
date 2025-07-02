"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabaseClient";

export default function AuthRedirect({ requireAuth = true, redirectTo = "/" }) {
  const [session, setSession] = useState(null);
  const router = useRouter();

  // Get current session once on mount
  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Failed to get session", error);
        return;
      }
      setSession(data?.session);
    };

    getSession();
  }, []);

  // Redirect based on session
  useEffect(() => {
    if (requireAuth && session === null) return; // Wait until session is checked
    if (requireAuth && !session) {
      router.push(redirectTo); // not logged in
    } else if (!requireAuth && session) {
      router.push(redirectTo); // already logged in
    }
  }, [session, requireAuth, redirectTo, router]); // ✅ include router here

  return null; // doesn’t render anything
}
