"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthRedirect({ role, children }) {
  const router = useRouter();

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole !== role) {
      router.push(`/login/${role}`);
    }
  }, [role, router]);

  return <>{children}</>;
}
