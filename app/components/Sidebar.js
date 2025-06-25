"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MessageSquare,
  Users,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  Car,
  Bike,
} from "lucide-react";
import { motion } from "framer-motion";

// Role-based configuration
const roleNav = {
  user: [
    { href: "/user/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/user/ai", label: "Chat", icon: MessageSquare },
    { href: "/user/chama", label: "Chama", icon: Users },
    { href: "/user/profile", label: "Profile", icon: User },
  ],
  rider: [
    { href: "/rider/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "rider/tracking", label: "Rides" },
    { href: "rider/tracking", label: "Trips", icon: Bike },
    { href: "rider/profile", label: "Profile", icon: User },
  ],
};

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(true);
  const pathname = usePathname();
  const navItems = roleNav["user"];

  useEffect(() => {
    setCollapsed(true); // Auto-close on route change
  }, [pathname]);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-white text-gray-800 shadow-md md:hidden"
        onClick={() => setCollapsed(!collapsed)}
        aria-label="Toggle Sidebar"
      >
        {collapsed ? <Menu size={24} /> : <X size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 bg-white shadow-lg md:translate-x-0 ${
          collapsed ? "-translate-x-full" : "translate-x-0"
        } md:block`}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Header */}
          <div className="p-5 border-b border-gray-200 flex items-center gap-3">
            <div className="bg-gradient-to-br from-green-400 to-emerald-500 text-white w-10 h-10 flex items-center justify-center rounded-full font-semibold">
              L
            </div>
            <div>
              <h1 className="text-sm font-bold text-green-600">Senti</h1>
              <p className="text-xs text-gray-500">Lewis</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1">
            {navItems.map(({ href, label, icon: Icon }) => {
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
                  {/* Active route indicator */}
                  {isActive && (
                    <span className="absolute left-0 top-0 h-full w-1 bg-green-500 rounded-r-lg"></span>
                  )}

                  {/* Animated Icon */}
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className="flex items-center justify-center"
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

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <Link
              href="/settings"
              className={`flex items-center gap-3 p-3 rounded-lg text-sm font-medium transition ${
                pathname.startsWith("/settings")
                  ? "bg-gray-100 text-green-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Settings className="h-5 w-5" strokeWidth={1.5} />
              <span>Settings</span>
            </Link>

            <button className="flex w-full items-center gap-3 p-3 mt-2 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition">
              <LogOut className="h-5 w-5" strokeWidth={1.5} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
