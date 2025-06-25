// app/page.js
"use client";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-sky-50 to-emerald-100">
      <div className="text-center p-6">
        <Image
          src="/logo.png"
          alt="Senti Logo"
          width={80}
          height={80}
          className="mx-auto mb-6"
        />
        <h1 className="text-3xl font-bold text-emerald-700 mb-4">
          Welcome to Senti
        </h1>
        <p className="mb-6 text-gray-600">Choose your role to continue</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/login/user">
            <button className="px-6 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600">
              User Login
            </button>
          </Link>
          <Link href="/login/rider">
            <button className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600">
              Rider Login
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
