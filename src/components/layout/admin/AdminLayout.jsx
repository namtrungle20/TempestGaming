import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import ThemeToggle from "../ThemeToggle";
import { useAuthStore } from "@/store/useAuthStore";
import { LogOut, Menu } from "lucide-react"; // Thêm icon Menu
import { Button } from "@/components/ui/button";

const AdminLayout = () => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  
  // State quản lý việc thu gọn Sidebar
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Truyền state xuống Sidebar */}
      <AdminSidebar isCollapsed={isCollapsed} />

      <div className="flex-1 flex flex-col transition-all duration-300">
        <header className="h-16 border-b bg-card flex items-center justify-between px-4 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            {/* Nút ẩn hiện Sidebar */}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="text-muted-foreground"
            >
              <Menu size={20} />
            </Button>
            
            <h1 className="text-sm font-medium text-muted-foreground italic hidden md:block">
              Tempest Gaming Admin
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <div className="h-8 w-[1px] bg-border mx-2" />
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
              A
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-muted-foreground hover:text-destructive gap-2"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Đăng xuất</span>
            </Button>
          </div>
        </header>

        <main className="p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;