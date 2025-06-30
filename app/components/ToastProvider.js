"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        style: {
          fontSize: "0.875rem",
          padding: "12px 16px",
          borderRadius: "0.5rem",
        },
        success: {
          style: {
            background: "#D1FAE5", // emerald-100
            color: "#065F46", // emerald-800
            border: "1px solid #6EE7B7",
          },
        },
        error: {
          style: {
            background: "#FEE2E2", // red-100
            color: "#991B1B", // red-800
            border: "1px solid #FCA5A5",
          },
        },
      }}
    />
  );
}
