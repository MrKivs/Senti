"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MapPin,
  Clock,
  User,
  History,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { href: "/rider/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/rider/tracking", label: "Tracking", icon: MapPin },
  { href: "/rider/history", label: "History", icon: History },
  { href: "/rider/profile", label: "Profile", icon: User },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    setCollapsed(true);
  }, [pathname]);

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="fixed top-4 left-4 z-50 p-2 bg-white text-amber-900 shadow-md rounded md:hidden"
      >
        {collapsed ? <Menu size={24} /> : <X size={24} />}
      </button>

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 bg-white shadow-lg md:translate-x-0 ${
          collapsed ? "-translate-x-full" : "translate-x-0"
        } md:block`}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          <div className="p-5 border-b border-amber-100 flex items-center gap-3">
            <div className="bg-amber-900 text-white w-10 h-10 flex items-center justify-center rounded-full font-bold">
              R
            </div>
            <div>
              <h1 className="text-sm font-bold text-amber-900">Rider</h1>
              <p className="text-xs text-gray-500">Senti</p>
            </div>
          </div>

          <nav className="flex-1 px-3 py-4 space-y-1">
            {navItems.map(({ href, label, icon: Icon }) => {
              const isActive = pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`group flex items-center gap-3 p-3 rounded-lg text-sm font-medium relative transition ${
                    isActive
                      ? "bg-amber-100 text-amber-900 font-semibold"
                      : "text-gray-600 hover:bg-amber-50"
                  }`}
                >
                  {isActive && (
                    <span className="absolute left-0 top-0 h-full w-1 bg-amber-900 rounded-r-lg" />
                  )}

                  <motion.div whileHover={{ scale: 1.2 }}>
                    <Icon
                      className={`w-5 h-5 ${
                        isActive
                          ? "text-amber-900"
                          : "text-gray-400 group-hover:text-amber-900"
                      }`}
                      strokeWidth={isActive ? 2 : 1.5}
                    />
                  </motion.div>

                  <span>{label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-amber-100">
            <Link href={"/"}>
              <button className="flex w-full items-center gap-3 p-3 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition">
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
