"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  History,
  User,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/chama", label: "My Chamas", icon: Users },
  { href: "/ai", label: "AI Assistant", icon: MessageSquare },
  { href: "/history", label: "History", icon: History },
  { href: "/profile", label: "Profile", icon: User },
];

export default function Sidebar() {
  const pathname = usePathname() || "";
  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    setCollapsed(true);
  }, [pathname]);

  return (
    <>
      {/* Toggle Button (Mobile) */}
      <button
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-white text-gray-800 shadow-md md:hidden"
        onClick={() => setCollapsed(!collapsed)}
        aria-label="Toggle Sidebar"
      >
        {collapsed ? <Menu size={24} /> : <X size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 bg-white shadow-xl md:translate-x-0 ${
          collapsed ? "-translate-x-full" : "translate-x-0"
        } md:block`}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Header */}
          <div className="p-5 border-b border-gray-200 flex items-center gap-3">
            <div className="bg-gradient-to-br from-emerald-400 to-amber-400 text-white w-10 h-10 flex items-center justify-center rounded-full font-bold">
              S
            </div>
            <div>
              <h1 className="text-sm font-bold text-emerald-600">Senti</h1>
              <p className="text-xs text-gray-500">Smart Savings</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1">
            {navLinks.map(({ href, label, icon: Icon }) => {
              const isActive = pathname.startsWith(href);

              return (
                <Link
                  key={href}
                  href={href}
                  className={`group flex items-center gap-3 p-3 rounded-lg text-sm font-medium relative transition ${
                    isActive
                      ? "bg-emerald-100 text-emerald-700 font-semibold"
                      : "text-gray-600 hover:bg-emerald-50"
                  }`}
                >
                  {isActive && (
                    <span className="absolute left-0 top-0 h-full w-1 bg-emerald-500 rounded-r-lg"></span>
                  )}
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className="flex items-center justify-center"
                  >
                    <Icon
                      className={`w-5 h-5 ${
                        isActive
                          ? "text-emerald-700"
                          : "text-gray-500 group-hover:text-emerald-700"
                      }`}
                      strokeWidth={isActive ? 2 : 1.5}
                    />
                  </motion.div>
                  <span>{label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <Link
              href="/settings"
              className={`flex items-center gap-3 p-3 rounded-lg text-sm font-medium transition ${
                pathname.startsWith("/settings")
                  ? "bg-gray-100 text-emerald-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Settings className="h-5 w-5" strokeWidth={1.5} />
              <span>Settings</span>
            </Link>

            <Link href="/">
              <button className="flex w-full items-center gap-3 p-3 mt-2 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition">
                <LogOut className="h-5 w-5" strokeWidth={1.5} />
                <span>Logout</span>
              </button>
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
