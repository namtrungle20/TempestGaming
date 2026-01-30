import React, { useState, useEffect } from "react";
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
import { ThemeToggle } from './ThemeToggle';
import { useCategories } from "@/hook/useCategories";
import { useBrands } from "@/hook/useBrand";
import { RenderImage } from "@/components/RenderImage";



export default function AppNavbar() {
  const navigate = useNavigate();
  const { handleLogout } = useAuth();
  const rawData = localStorage.getItem('nguoidung');
  const userData = rawData && rawData !== "undefined" ? JSON.parse(rawData) : null;


  // State lưu danh mục
  const { categories } = useCategories();
  const { brands } = useBrands();
  const [activeBrandId, setActiveBrandId] = useState(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  // Effect để chọn brand đầu tiên khi mở menu
  useEffect(() => {
    if (brands.length > 0 && !activeBrandId) {
      setActiveBrandId(brands[0].id);
    }
  }, [isPopoverOpen, brands, activeBrandId]);

  // Gọi API lấy danh mục ngay trong Navbar


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

            <PopoverContent>
              {/* Class .menu-dropdown sẽ chịu trách nhiệm tạo khung kính */}
              <div className="menu-dropdown">
                {brands.map((brand) => (
                  <div
                    key={brand.id}
                    className="brand-row group"
                    onClick={() => { navigate(`/brand/${brand.id}`); setIsPopoverOpen(false); }}
                  >
                    {/* Tên Brand */}
                    <span>{brand.name}</span>
                    <ChevronRight size={14} />

                    {/* MENU CON */}
                    <div className="sub-menu-glass">
                      {/* Header nhỏ */}
                      <div className="px-3 py-2 text-[9px] opacity-40 uppercase font-black tracking-widest text-[var(--text-main)] border-b border-[var(--text-main)]/10 mb-1">
                        {brand.name}
                      </div>

                      {categories.filter(cat => cat.thuonghieu_id === brand.id).map((cat) => (
                        <div
                          key={cat.id}
                          className="category-link"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/category/${cat.id}`);
                            setIsPopoverOpen(false);
                          }}
                        >
                          {cat.name}
                        </div>
                      ))}

                      {categories.filter(cat => cat.thuonghieu_id === brand.id).length === 0 && (
                        <div className="px-3 py-2 text-[10px] italic opacity-40 text-[var(--text-main)]">
                          Đang cập nhật...
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </PopoverContent>
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
          {userData ? (
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                {/* Gọi class user-btn từ CSS */}
                <Button disableRipple className="user-btn">
                  <div className="bg-[var(--text-main)] text-[var(--background)] p-1 rounded-full">
                    <User size={14} strokeWidth={3} />
                  </div>
                  <span className="text-xs uppercase tracking-wide hidden sm:block max-w-[80px] truncate">
                    {userData.ten || "User"}
                  </span>
                  <ChevronDown size={12} className="opacity-50" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="User Actions"
                variant="flat"
                onAction={(key) => key === "logout" ? handleLogout() : navigate(key)}
              >
                <DropdownItem key="/profile" startContent={<User size={16} />}>Hồ sơ</DropdownItem>
                <DropdownItem key="/orders" startContent={<ClipboardList size={16} />}>Đơn hàng</DropdownItem>
                <DropdownItem key="/settings" startContent={<Settings size={16} />}>Cài đặt</DropdownItem>
                <DropdownItem key="logout" className="text-danger" color="danger" startContent={<LogOut size={16} />}>Đăng xuất</DropdownItem>
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