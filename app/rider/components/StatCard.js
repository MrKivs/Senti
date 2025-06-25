"use client";

import React from "react";

export default function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow border border-gray-100 flex items-center gap-4">
      <div className="bg-emerald-100 text-emerald-700 w-12 h-12 rounded-full flex items-center justify-center">
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
}
