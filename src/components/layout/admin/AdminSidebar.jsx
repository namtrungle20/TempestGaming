import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, Package, Copyright } from "lucide-react";
import { cn } from "@/libs/utils";

const menuItems = [
  { name: "Tổng quan", path: "/admin", icon: LayoutDashboard },
  { name: "Người dùng", path: "/admin/users", icon: Users },
  { name: "Thương hiệu", path: "/admin/brands", icon: Copyright },
  { name: "Sản phẩm", path: "/admin/products", icon: Package },
];

const AdminSidebar = () => {
  const { pathname } = useLocation();

  return (
    <aside className="w-64 border-r bg-card h-screen sticky top-0 flex flex-col">
      <div className="p-6 border-b mb-4">
        <h2 className="text-lg font-bold tracking-tighter text-primary italic">TEMPEST ADMIN</h2>
      </div>
      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-md transition-colors",
              pathname === item.path ? "bg-primary text-primary-foreground" : "hover:bg-accent text-muted-foreground"
            )}
          >
            <item.icon size={18} />
            <span className="text-sm font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;