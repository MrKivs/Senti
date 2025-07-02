"use client";

import { Toaster, ToastIcon, resolveValue } from "react-hot-toast";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      gutter={12}
      containerClassName="mt-4"
      toastOptions={{
        duration: 4000,
        className: "font-sans",
        style: {
          maxWidth: "420px",
          padding: "0",
          borderRadius: "0.75rem",
          boxShadow:
            "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)",
        },
        success: {
          style: {
            background: "#D1FAE5",
            color: "#065F46",
          },
          iconTheme: {
            primary: "#059669",
            secondary: "#fff",
          },
        },
        error: {
          style: {
            background: "#FEE2E2",
            color: "#991B1B",
          },
          iconTheme: {
            primary: "#EF4444",
            secondary: "#fff",
          },
        },
        loading: {
          style: {
            background: "#E0F2FE",
            color: "#0369A1",
          },
        },
        blank: {
          style: {
            background: "#F3F4F6",
            color: "#1F2937",
          },
        },
      }}
    >
      {(t) => (
        <div
          className={`relative flex items-start gap-3 p-4 transition-all duration-300 ${
            t.visible ? "animate-enter" : "animate-leave"
          }`}
          style={t.style}
          role="status"
          aria-live={t.type === "loading" ? "polite" : "assertive"}
          aria-atomic="true"
        >
          <ToastIcon toast={t} />
          <div className="flex-1 min-w-0 py-0.5">
            {t.message && (
              <p className="text-sm font-medium leading-5">
                {resolveValue(t.message, t)}
              </p>
            )}
          </div>
          {t.type !== "loading" && (
            <button
              onClick={() => toast.dismiss(t.id)}
              className="p-1 rounded-full hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              aria-label="Close toast"
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
    </Toaster>
  );
}
