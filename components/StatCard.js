import React from "react";

export default function StatCard({ title, value, icon, trend }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow border border-gray-100 flex flex-col gap-2 min-h-[120px]">
      <div className="flex items-center gap-3 mb-2">
        <div className="bg-emerald-50 rounded-full p-2 flex items-center justify-center">
          {icon}
        </div>
        <span className="text-gray-500 text-xs font-medium uppercase tracking-wide">
          {title}
        </span>
      </div>
      <div className="text-2xl font-bold text-gray-800 mb-1">{value}</div>
      {trend && <div className="text-sm text-gray-500">{trend}</div>}
    </div>
  );
}
