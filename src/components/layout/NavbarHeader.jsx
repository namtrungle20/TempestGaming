import React, { useState } from "react";
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
  Popover,
  PopoverTrigger,
  PopoverContent,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { Search, User, ShoppingCart, LogOut, Settings, ClipboardList, ChevronDown, LayoutGrid, ChevronRight, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hook/useAuth";
import ThemeToggle from './ThemeToggle';
// import { useCategories } from "@/hook/useCategories";
// import { RenderImage } from "@/components/RenderImage";
import { useAuthStore } from "@/store/useAuthStore";


export default function AppNavbar() {
  const navigate = useNavigate();
  const { handleLogout } = useAuth();
  const { user } = useAuthStore();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);




  return (
    <Navbar
      maxWidth="xl"
      className="nav-glass h-20 fixed top-0"
      classNames={{
        wrapper: "bg-transparent px-4 sm:px-6",
        item: "data-[active=true]:text-primary",
      }}
    >
      <NavbarBrand className="cursor-pointer" onClick={() => navigate('/')}>
        <p className="font-[1000] text-[var(--text-main)] italic uppercase tracking-tighter text-2xl">
          Tempest
        </p>
      </NavbarBrand>

      {/* --- MEGA MENU --- */}
      <NavbarContent justify="start" className="hidden sm:flex gap-6 ml-6">
        <NavbarItem onMouseEnter={() => setIsPopoverOpen(true)} onMouseLeave={() => setIsPopoverOpen(false)}>
          <Popover
            placement="bottom-start"
            offset={20}
            isOpen={isPopoverOpen}
            onOpenChange={(open) => setIsPopoverOpen(open)}
            classNames={{
              content: "p-0 bg-transparent border-none shadow-none overflow-visible"
            }}
          >
            <PopoverTrigger>
              <Button
                disableRipple
                className="bg-transparent font-bold text-sm uppercase gap-2 text-[var(--text-main)] opacity-70 hover:opacity-100 p-0"
                endContent={<ChevronDown size={14} className={isPopoverOpen ? "rotate-180 transition-transform" : ""} />}
              >
                <LayoutGrid size={18} /> Danh mục
              </Button>
            </PopoverTrigger>


          </Popover>
        </NavbarItem>

        <NavbarItem>
          <Link href="/news" className="text-[var(--text-main)] font-bold text-sm uppercase tracking-wide opacity-70 hover:opacity-100">Tin tức</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/contact" className="text-[var(--text-main)] font-bold text-sm uppercase tracking-wide opacity-70 hover:opacity-100">Liên hệ</Link>
        </NavbarItem>
      </NavbarContent>

      {/* --- RIGHT ACTIONS --- */}
      <NavbarContent justify="end" className="gap-4">
        <Input
          classNames={{
            base: "hidden lg:block max-w-[12rem]",
            inputWrapper: "search-nav-wrapper", // Class từ CSS
            input: "text-[var(--text-main)] placeholder:text-[var(--text-main)]/40 text-xs font-medium",
          }}
          placeholder="Tìm kiếm..."
          startContent={<Search size={16} className="text-[var(--text-main)] opacity-40" />}
        />

        <div className="hidden sm:flex"><ThemeToggle /></div>

        <Badge content="0" size="sm" color="danger" className="border-none text-white font-bold">
          <Button isIconOnly variant="light" className="text-[var(--text-main)] opacity-70 hover:opacity-100">
            <ShoppingCart size={22} />
          </Button>
        </Badge>

        <NavbarItem>
          {user ? (
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Button disableRipple className="user-btn flex flex-col items-start gap-0 h-auto py-1 px-3">
                  <div className="flex items-center gap-2">
                    <div className="bg-[var(--text-main)] text-[var(--background)] p-1 rounded-full">
                      <User size={14} strokeWidth={3} />
                    </div>
                    {/* Hiển thị Tên */}
                    <span className="text-xs font-bold uppercase tracking-wide truncate max-w-[120px]">
                      {user.email.split('@')[0]} {/* Hoặc user.name nếu Model có */}
                    </span>
                    <ChevronDown size={12} className="opacity-50" />
                  </div>
                </Button>
              </DropdownTrigger>

              <DropdownMenu
                aria-label="User Actions"
                variant="flat"
                onAction={(key) => key === "logout" ? handleLogout() : navigate(key)}
              >
                {/* DropdownItem tiêu đề hiển thị email để xác nhận người dùng */}
                <DropdownItem key="profile_info" className="h-14 gap-2 opacity-100 cursor-default" textValue="user info">
                  <p className="font-semibold text-xs">Đăng nhập bởi</p>
                  <p className="font-bold text-primary text-xs">{user.email}</p>
                </DropdownItem>

                <DropdownItem key="/profile" startContent={<User size={16} />}>Hồ sơ</DropdownItem>
                <DropdownItem key="/orders" startContent={<ClipboardList size={16} />}>Đơn hàng</DropdownItem>

                {/* Hiện menu Admin nếu là quản trị viên */}
                {user.isAdmin && (
                  <DropdownItem key="/admin" className="text-primary" startContent={<Settings size={16} />}>
                    Quản trị hệ thống
                  </DropdownItem>
                )}

                <DropdownItem key="logout" className="text-danger" color="danger" startContent={<LogOut size={16} />}>
                  Đăng xuất
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <Button onPress={() => navigate('/login')} className="btn-tempest h-10 px-6 text-xs">
              ĐĂNG NHẬP
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden" justify="end">
        <Button isIconOnly variant="light" className="text-[var(--text-main)]">
          <Menu size={24} />
        </Button>
      </NavbarContent>
    </Navbar>
  );
}