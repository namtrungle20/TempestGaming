import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Badge,
  Button,
  Dropdown,
  Input,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from "@heroui/react";
import { Search, User, ShoppingCart, LogOut, Settings, ClipboardList } from "lucide-react";
import { ThemeToggle } from "../layout/ThemeToggle";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hook/useAuth";

export default function AppNavbar() {
  const navigate = useNavigate();
  const { handleLogout } = useAuth();
  const rawData = localStorage.getItem('nguoidung');
  const userData = rawData && rawData !== "undefined" ? JSON.parse(rawData) : null;

  return (
    <Navbar
      maxWidth="xl"
      className="nav-glass h-20 fixed top-0"
      classNames={{
        wrapper: "bg-transparent",
      }}
    >
      <NavbarBrand>
        <p className="font-black text-[var(--text-main)] italic uppercase tracking-tighter text-xl">
          Tempest
        </p>
      </NavbarBrand>

      <NavbarContent justify="end" className="gap-5">
        <Input
          classNames={{
            inputWrapper: "bg-[var(--text-main)]/5 border-none w-40 md:w-64",
            input: "text-[var(--text-main)]"
          }}
          placeholder="Search..."
          startContent={<Search size={16} className="opacity-30" />}
        />

        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>

        <Badge content="0" size="sm" color="warning" className="border-none text-white font-bold">
          <ShoppingCart size={22} className="text-[var(--text-main)] cursor-pointer" />
        </Badge>

        {/* --- KHU VỰC USER (SỬA LẠI THEO HÌNH) --- */}
        <NavbarItem>
          {userData ? (
            // KHI ĐÃ ĐĂNG NHẬP: Hiện tên + Icon User trong nút
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Button 
                  disableRipple
                  className="bg-[var(--text-main)]/10 text-[var(--text-main)] font-bold px-4 h-11 rounded-2xl flex items-center gap-3 border border-white/10"
                  variant="flat"
                >
                  <span className="text-sm tracking-tight">
                    {userData?.email?.split('@')[0]}
                  </span>
                  <div className="bg-[var(--text-main)]/20 p-1.5 rounded-full border border-white/20">
                    <User size={16} fill="currentColor" />
                  </div>
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="User Actions"
                variant="flat"
                onAction={(key) => {
                  if (key === "/logout") handleLogout();
                  else navigate(key);
                }}
              >
                <DropdownItem key="/profile" startContent={<User size={18}/>}>Hồ sơ cá nhân</DropdownItem>
                <DropdownItem key="/orders" startContent={<ClipboardList size={18}/>}>Đơn hàng</DropdownItem>
                <DropdownItem key="/settings" startContent={<Settings size={18}/>}>Cài đặt</DropdownItem>
                <DropdownItem key="/logout" color="danger" className="text-danger" startContent={<LogOut size={18}/>}>
                  Đăng xuất
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            // KHI CHƯA ĐĂNG NHẬP: Hiện nút Đăng nhập giống ảnh mẫu
            <Button 
              as={Link}
              href="/login"
              className="bg-[var(--text-main)]/10 text-[var(--text-main)] font-bold px-4 h-11 rounded-2xl flex items-center gap-3 border border-white/10"
              variant="flat"
            >
              <span className="text-sm tracking-tight">Đăng nhập</span>
              <div className="bg-[var(--text-main)]/20 p-1.5 rounded-full border border-white/20">
                <User size={18} fill="currentColor" />
              </div>
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}