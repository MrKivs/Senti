"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UserLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleLogin = () => {
    localStorage.setItem("role", "rider");
    localStorage.setItem("email", email);
    router.push("/rider/dashboard");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-sky-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-emerald-700">Rider Login</h1>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full px-4 py-2 border rounded-md"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-emerald-500 text-white py-2 rounded-md hover:bg-emerald-600"
        >
          Login
        </button>
      </div>
    </main>
  );
}
