"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@supabase/auth-helpers-react";

export default function AuthRedirect({ requireAuth = true, redirectTo = "/" }) {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (requireAuth && !session) {
      router.push(redirectTo); // not logged in
    } else if (!requireAuth && session) {
      router.push(redirectTo); // already logged in
    }
  }, [session, requireAuth, redirectTo]);

  return null; // this component doesn't render anything
}
