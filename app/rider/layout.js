"use client";

import Sidebar from "./components/Sidebar";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RiderLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "rider") {
      router.push("/login/rider");
    }
  }, [router]);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-yellow-50 to-amber-100 text-amber-900">
      <Sidebar />

      <main className="flex-1 p-4 md:ml-64 overflow-y-auto">{children}</main>
    </div>
  );
}
