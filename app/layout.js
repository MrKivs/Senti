// app/layout.js
import "./globals.css";
import { Inter } from "next/font/google";
import { UserProvider } from "../context/UserContext";
import ToastProvider from "../components/ToastProvider";
import Sidebar from "../components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Senti",
  description: "Smart savings and chama platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          <ToastProvider />
          <div className="flex min-h-screen bg-white">
            {/* Static Sidebar container for md+ */}
            <div className="hidden md:block">
              <Sidebar />
            </div>

            {/* Mobile Sidebar (positioned fixed inside Sidebar itself) */}
            <div className="md:hidden">
              <Sidebar />
            </div>

            {/* Main content */}
            <main className="flex-1 p-4">{children}</main>
          </div>
        </UserProvider>
      </body>
    </html>
  );
}
