import { Outlet, useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import ThemeToggle from "../ThemeToggle";
import { useAuthStore } from "@/store/useAuthStore"; // Import store để lấy hàm logout
import { LogOut } from "lucide-react"; // Icon đăng xuất
import { Button } from "@/components/ui/button";

const AdminLayout = () => {
  const logout = useAuthStore((state) => state.logout); // Lấy hàm logout từ store
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Xóa token và user trong store/localStorage
    navigate("/login"); // Đẩy về trang đăng nhập
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        {/* Header Admin */}
        <header className="h-16 border-b bg-card flex items-center justify-between px-8 sticky top-0 z-10">
          <h1 className="text-sm font-medium text-muted-foreground italic">
            Tempest Gaming Admin
          </h1>

          <div className="flex items-center gap-4">
            <ThemeToggle />

            <div className="h-8 w-[1px] bg-border mx-2" /> {/* Thanh chia tách */}

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
              <span>Đăng xuất</span>
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