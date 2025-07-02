"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
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
  PlusCircle,
  HelpCircle,
  BarChart2,
  ChevronLeft,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import LogoutButton from "./LogoutButton";

const navLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/chama", label: "My Chamas", icon: Users },
  { href: "/ai", label: "AI Assistant", icon: MessageSquare },
  { href: "/history", label: "History", icon: History },
  { href: "/profile", label: "Profile", icon: User },
  { href: "/reports", label: "Reports", icon: BarChart2 },
];

const supportLinks = [
  { href: "/help", label: "Help Center", icon: HelpCircle },
  { href: "/feedback", label: "Send Feedback", icon: MessageSquare },
];

export default function Sidebar() {
  const pathname = usePathname() || "";
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user } = useUser();

  // Manage isOpen based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        // md breakpoint
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Reset isCollapsed when sidebar closes on small screens
  useEffect(() => {
    if (!isOpen) {
      setIsCollapsed(false);
    }
  }, [isOpen]);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-white text-emerald-700 shadow-lg md:hidden"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Sidebar"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          width: isCollapsed ? "5rem" : "16rem",
          x: isOpen ? 0 : "-100%",
        }}
        transition={{ type: "spring", damping: 25 }}
        className="fixed inset-y-0 left-0 z-50 flex flex-col bg-gradient-to-b from-emerald-900 to-emerald-800 shadow-2xl overflow-hidden md:relative md:translate-x-0"
      >
        {/* Header */}
        <div className="p-5 border-b border-emerald-700 flex items-center gap-3 relative">
          <div className="bg-gradient-to-br from-emerald-400 to-amber-400 text-white w-10 h-10 flex items-center justify-center rounded-full font-bold shrink-0">
            {user?.initials || "S"}
          </div>

          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="overflow-hidden"
            >
              <h1 className="text-sm font-bold text-white">Senti</h1>
              <p className="text-xs text-emerald-200">Smart Savings</p>
            </motion.div>
          )}

          {/* Collapse Button */}
          <button
            onClick={toggleCollapse}
            className="absolute top-2 right-2 bg-white text-emerald-700 p-1 rounded-full shadow-lg border border-emerald-200 z-10"
            aria-label={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            <ChevronLeft
              size={20}
              className={`transition-transform ${
                isCollapsed ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
          {navLinks.map(({ href, label, icon: Icon }) => {
            const isActive = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`group flex items-center gap-3 p-3 rounded-lg text-sm font-medium relative transition ${
                  isActive
                    ? "bg-emerald-700 text-white shadow-inner"
                    : "text-emerald-100 hover:bg-emerald-700/50"
                }`}
              >
                <motion.div whileHover={{ scale: 1.1 }}>
                  <Icon
                    className={`w-5 h-5 ${
                      isActive ? "text-white" : "text-emerald-200"
                    }`}
                    strokeWidth={isActive ? 2 : 1.5}
                  />
                </motion.div>
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="whitespace-nowrap"
                  >
                    {label}
                  </motion.span>
                )}
                {isActive && !isCollapsed && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 bg-emerald-300 rounded-full"
                  />
                )}
              </Link>
            );
          })}

          {/* Create New Chama */}
          <Link
            href="/chama/create"
            className="mt-6 group flex items-center gap-3 p-3 rounded-lg text-sm font-medium bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-100 border border-emerald-500/30"
          >
            <motion.div whileHover={{ scale: 1.1 }}>
              <PlusCircle className="w-5 h-5 text-emerald-200" />
            </motion.div>
            {!isCollapsed && (
              <motion.span
                initial
                supervisor={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Create New Chama
              </motion.span>
            )}
          </Link>
        </nav>

        {/* Support Links */}
        <div className="px-3 py-4 border-t border-emerald-700">
          {supportLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="group flex items-center gap-3 p-3 rounded-lg text-sm font-medium text-emerald-200 hover:bg-emerald-700/30 transition"
            >
              <Icon className="w-5 h-5 text-emerald-200" strokeWidth={1.5} />
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="whitespace-nowrap"
                >
                  {label}
                </motion.span>
              )}
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-emerald-700">
          <Link
            href="/settings"
            className={`flex items-center gap-3 p-3 rounded-lg text-sm font-medium transition ${
              pathname.startsWith("/settings")
                ? "bg-emerald-700 text-white"
                : "text-emerald-200 hover:bg-emerald-700/30"
            }`}
          >
            <Settings className="h-5 w-5" strokeWidth={1.5} />
            {!isCollapsed && <span>Settings</span>}
          </Link>

          <Link href="/">
            <LogoutButton />
          </Link>

          {!isCollapsed && user && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 pt-4 border-t border-emerald-700/50 text-center"
            >
              <p className="text-xs text-emerald-300">{user.email}</p>
              <p className="text-xs text-emerald-400 mt-1">
                Last login: {user.lastLogin}
              </p>
            </motion.div>
          )}
        </div>
      </motion.aside>
    </>
  );
}
