"use client";

import Sidebar from "./components/Sidebar";

export default function RiderLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 ml-0 md:ml-64 p-4 sm:p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
