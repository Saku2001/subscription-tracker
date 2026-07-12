import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen bg-indigo-950">
      <Outlet />
    </div>
  );
}
