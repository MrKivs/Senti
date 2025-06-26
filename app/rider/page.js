"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default  function RiderEntryPage() {
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem("role");

    // Redirect logged-in rider to dashboard
    if (role === "rider") {
      router.push("/rider/dashboard");
    } else {
      router.push("/login/rider"); // fallback for unauthenticated access
    }
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-yellow-100 to-amber-100">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-amber-800 shadow-md mb-4">
          <span className="text-white text-2xl font-bold">S</span>
        </div>
        <h1 className="text-3xl font-extrabold text-amber-900 mb-2">Rider Panel</h1>
        <p className="text-amber-700 mb-6">
          Redirecting to your dashboard...
        </p>
        <div className="text-sm text-amber-500">Please wait</div>
      </div>
    </div>
  );
}
