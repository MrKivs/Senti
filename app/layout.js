// app/layout.js
import "./globals.css";

export const metadata = {
  title: "Senti | Smart Delivery & Savings",
  description:
    "Empowering riders and users with intelligent tools for delivery and savings management.",
  themeColor: "#059669", // Emerald
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased text-gray-800 bg-white dark:bg-gray-900 dark:text-white">
        {children}
      </body>
    </html>
  );
}
