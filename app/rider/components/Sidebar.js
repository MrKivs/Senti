"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MapPin,
  Clock,
  User,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { motion } from "framer-motion";

// Navigation items specific to the rider role
const riderNav = [
  { href: "/rider/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/rider/tracking", label: "Tracking", icon: MapPin },
  { href: "/rider/history", label: "History", icon: Clock },
  { href: "/rider/profile", label: "Profile", icon: User },
];

export default function RiderSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    setCollapsed(true); // auto-close on route change
  }, [pathname]);

  return (
    <>
      {/* Mobile toggle */}
      <button
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-white text-gray-800 shadow-md md:hidden"
        onClick={() => setCollapsed(!collapsed)}
        aria-label="Toggle Sidebar"
      >
        {collapsed ? <Menu size={24} /> : <X size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out md:translate-x-0 ${
          collapsed ? "-translate-x-full" : "translate-x-0"
        } md:block`}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Rider Header */}
          <div className="p-5 border-b border-gray-200 flex items-center gap-3">
            <div className="bg-gradient-to-br from-emerald-400 to-green-500 text-white w-10 h-10 flex items-center justify-center rounded-full font-semibold">
              L
            </div>
            <div>
              <h1 className="text-sm font-bold text-green-600">Senti Rider</h1>
              <p className="text-xs text-gray-500">Lewis</p>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-3 py-4 space-y-1">
            {riderNav.map(({ href, label, icon: Icon }) => {
              const isActive = pathname.startsWith(href);

              return (
                <Link
                  key={href}
                  href={href}
                  className={`group flex items-center gap-3 p-3 rounded-lg text-sm font-medium relative transition ${
                    isActive
                      ? "bg-green-100 text-green-600 font-semibold"
                      : "text-gray-600 hover:bg-green-50"
                  }`}
                >
                  {isActive && (
                    <span className="absolute left-0 top-0 h-full w-1 bg-green-500 rounded-r-lg" />
                  )}
                  <motion.div
                    whileHover={{ scale: 1.15 }}
                    className="flex items-center"
                  >
                    <Icon
                      className={`w-5 h-5 ${
                        isActive
                          ? "text-green-600"
                          : "text-gray-500 group-hover:text-green-600"
                      }`}
                      strokeWidth={isActive ? 2 : 1.5}
                    />
                  </motion.div>
                  <span>{label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Footer Actions */}
          <div className="p-4 border-t border-gray-200">
            <button className="flex w-full items-center gap-3 p-3 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition">
              <LogOut className="h-5 w-5" strokeWidth={1.5} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
