import Sidebar from "../components/Sidebar";

export default function UserLayout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col">{children}</main>
    </div>
  );
}
