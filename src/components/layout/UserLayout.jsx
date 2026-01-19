import { Outlet } from "react-router-dom";
import AppNavbar from "./NavbarHeader";

export default function UserLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <AppNavbar />
      <main className="flex-grow pt-[160px]"> 
        <Outlet />
      </main>
    </div>
  );
}