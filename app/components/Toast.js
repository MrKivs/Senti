"use client";

import { useEffect, useState } from "react";

export default function Toast({ message, type = "success", onCLose }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      onclose();
    }, 3000);

    return () => clearTimeout(timeout);
  }, [onClose]);
  if (!show) return null;

  return (
    <div className="fixed top-6 right-6 z-50">
      <div
        className={`px-6 py-4 rounded-lg shadow-md text-white transition-all duration-300 ${
          type === "success"
            ? "bg-emerald-500"
            : type === "error"
            ? "bg-red-500"
            : "bg-gray-700"
        }`}
      >
        {message}
      </div>
    </div>
  );
}
