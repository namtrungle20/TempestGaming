import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, Users, Package, Copyright, 
  Layers, Settings, ShoppingBag, ChevronDown 
} from "lucide-react";
import { cn } from "@/libs/utils";

const menuGroups = [
  {
    label: "Hệ thống",
    icon: <LayoutDashboard size={18} />,
    items: [
      { name: "Tổng quan", path: "/admin", icon: LayoutDashboard },
      { name: "Người dùng", path: "/admin/users", icon: Users },
    ],
  },
  {
    label: "Quản lý kho",
    icon: <Package size={18} />,
    items: [
      { name: "Sản phẩm", path: "/admin/products", icon: Package },
      { name: "Loại sản phẩm", path: "/admin/categories", icon: Layers },
      { name: "Thương hiệu", path: "/admin/brands", icon: Copyright },
    ],
  },
  {
    label: "Giao dịch",
    icon: <ShoppingBag size={18} />,
    items: [
      { name: "Đơn hàng", path: "/admin/orders", icon: ShoppingBag },
    ],
  },
];

const AdminSidebar = ({ isCollapsed }) => {
  const { pathname } = useLocation();
  const [openGroups, setOpenGroups] = useState(["Quản lý kho"]);

  const toggleGroup = (label) => {
    if (isCollapsed) return;
    setOpenGroups((prev) =>
      prev.includes(label) ? prev.filter((i) => i !== label) : [...prev, label]
    );
  };

  return (
    <aside className={cn(
      "border-r bg-[#020617] h-screen sticky top-0 flex flex-col transition-all duration-300 shadow-xl",
      isCollapsed ? "w-20" : "w-64"
    )}>
      {/* Logo Section */}
      <div className={cn("p-6 border-b border-white/5 flex items-center", isCollapsed ? "justify-center" : "justify-start")}>
        <h2 className="font-black tracking-tighter text-primary italic uppercase text-xl">
          {isCollapsed ? "T" : "Tempest"}
        </h2>
      </div>

      <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-1">
        {menuGroups.map((group) => {
          const isOpen = openGroups.includes(group.label) && !isCollapsed;
          const hasActiveChild = group.items.some((item) => item.path === pathname);

          return (
            <div key={group.label} className="group/parent">
              {/* Menu Button cha */}
              <button
                onClick={() => toggleGroup(group.label)}
                className={cn(
                  "flex items-center w-full px-4 py-3 rounded-lg transition-all outline-none",
                  isCollapsed ? "justify-center" : "justify-between",
                  // MÀU CHỮ: Luôn để màu slate-400 mờ, chỉ hiện màu khi hover hoặc group đang mở
                  isOpen 
                    ? "text-white bg-white/5" 
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                )}
              >
                <div className="flex items-center gap-3">
                  {/* ICON: Mặc định mờ, chỉ đổi màu Primary khi HOVER chuột vào nhóm đó */}
                  <div className={cn(
                    "transition-colors duration-200",
                    // Thay đổi: Chỉ hiện màu primary khi hover vào group/parent hoặc group đang mở
                    "group-hover/parent:text-primary",
                    isOpen ? "text-primary" : "text-slate-400"
                  )}>
                    {group.icon}
                  </div>
                  
                  {!isCollapsed && (
                    <span className={cn(
                      "text-sm font-medium transition-colors",
                      hasActiveChild ? "text-slate-200" : "text-slate-400 group-hover/parent:text-white"
                    )}>
                      {group.label}
                    </span>
                  )}
                </div>
                
                {!isCollapsed && (
                  <ChevronDown 
                    size={14} 
                    className={cn(
                      "transition-transform duration-200 opacity-40 group-hover/parent:opacity-100", 
                      isOpen && "rotate-180 opacity-100"
                    )} 
                  />
                )}
              </button>

              {/* Items con */}
              {!isCollapsed && (
                <div className={cn(
                  "overflow-hidden transition-all duration-300 ease-in-out pl-4 ml-4 border-l border-white/5",
                  isOpen ? "max-h-40 opacity-100 mt-1 mb-2" : "max-h-0 opacity-0"
                )}>
                  {group.items.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={cn(
                          "flex items-center gap-3 px-4 py-2 rounded-md text-sm transition-all",
                          isActive 
                            ? "text-primary font-bold bg-primary/10" 
                            : "text-slate-500 hover:text-slate-200 hover:translate-x-1"
                        )}
                      >
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
};

export default AdminSidebar;