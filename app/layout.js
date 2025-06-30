// app/layout.js
import "./globals.css";
import Sidebar from "./components/Sidebar"; // if universal
import ToastProvider from "./components/ToastProvider";

export const metadata = {
  title: "Senti",
  description: "Smart savings and chama platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ToastProvider />
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 ml-0 md:ml-64 p-4">{children}</main>
        </div>
      </body>
    </html>
  );
}
