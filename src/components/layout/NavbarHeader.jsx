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
import { Search, User, ShoppingCart, LogOut, Settings, ClipboardList, ChevronDown, LayoutGrid, ChevronRight } from "lucide-react";
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
    if (isPopoverOpen && brands.length > 0 && !activeBrandId) {
      setActiveBrandId(brands[0].id);
    }
  }, [isPopoverOpen, brands, activeBrandId]);

  // Gọi API lấy danh mục ngay trong Navbar


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

      <NavbarContent justify="start" className="hidden sm:flex gap-4 ml-4">
        <NavbarItem
          onMouseEnter={() => setIsPopoverOpen(true)}
          onMouseLeave={() => {
            setIsPopoverOpen(false);
            setActiveBrandId(null);
          }}
        >
          <Popover
            placement="bottom-start"
            offset={15}
            isOpen={isPopoverOpen}
            showArrow
            classNames={{
              content: "p-0 border border-white/10 bg-black/95 backdrop-blur-3xl rounded-[2.5rem] shadow-2xl",
            }}
          >
            {/* QUAN TRỌNG: PopoverTrigger để menu dính đúng vị trí nút bấm */}
            <PopoverTrigger>
              <Button
                variant="light"
                className="font-bold text-sm uppercase gap-2 text-[var(--text-main)] opacity-80 hover:opacity-100"
                endContent={<ChevronDown size={16} className={isPopoverOpen ? "rotate-180 transition-transform" : ""} />}
              >
                <LayoutGrid size={18} /> Danh mục
              </Button>
            </PopoverTrigger>

            <PopoverContent>
              {/* Container Mega Menu rộng 600px */}
              <div className="w-[600px] p-6 flex flex-col gap-6">

                {/* PHẦN 1: GRID THƯƠNG HIỆU (Ngang 4 cái, tự xuống dòng) */}
                <div className="grid grid-cols-4 gap-4">
                  {brands.map((bra) => (
                    <div
                      key={bra.id}
                      onMouseEnter={() => setActiveBrandId(bra.id)}
                      className={`flex flex-col items-center justify-center p-3 rounded-2xl cursor-pointer transition-all duration-300 ${activeBrandId === bra.id
                        ? "bg-primary/10 text-primary scale-110 shadow-lg"
                        : "hover:bg-white/5 text-white/50"
                        }`}
                      onClick={() => navigate(bra.link)}
                    >
                      <RenderImage
                        src={bra.image}
                        alt={bra.name}
                        className={`w-6 h-6 object-contain ${activeBrandId === bra.id ? "" : "dark:invert"}`}
                      />
                    </div>
                  ))}
                </div>

                {/* PHẦN 2: MENU DỌC THỂ LOẠI (Giống nShop) */}
                {activeBrandId && (
                  <div className="flex flex-col animate-in fade-in slide-in-from-top-4 duration-500 pt-4 border-t border-white/5">
                    <p className="px-4 pb-2 text-[10px] font-black uppercase text-white/20 italic">
                      Thể loại {brands.find(b => b.id === activeBrandId)?.name}
                    </p>

                    {/* Khung menu dọc trắng/mờ giống hình bạn gửi */}
                    <div className="bg-white/5 rounded-2xl p-1.5 flex flex-col gap-0.5">
                      {categories
                        .filter(cat => cat.thuonghieu_id === activeBrandId)
                        .map((subCat, index) => (
                          <Button
                            key={subCat.id}
                            variant="light"
                            // Mục đầu tiên màu đỏ (highlight) giống PS5 trong nShop
                            className={`justify-start h-11 px-4 font-bold uppercase text-xs italic rounded-xl hover:bg-white/10 transition-all ${index === 0 ? "text-red-500" : "text-white/80"
                              }`}
                            onPress={() => {
                              navigate(subCat.link);
                              setIsPopoverOpen(false);
                            }}
                            startContent={<ChevronRight size={14} className="opacity-30" />}
                          >
                            {subCat.name}
                          </Button>
                        ))}

                      {/* Fallback khi chưa có thể loại */}
                      {categories.filter(cat => cat.thuonghieu_id === activeBrandId).length === 0 && (
                        <div className="p-8 text-center text-[10px] font-black uppercase opacity-20 italic">
                          Chưa có danh mục cụ thể
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </PopoverContent>
          </Popover>
        </NavbarItem>

        {/* Các menu text khác nếu có */}
        <NavbarItem>
          <Link href="/news" className="text-[var(--text-main)] font-bold text-sm uppercase tracking-wide opacity-80 hover:opacity-100">
            Tin tức
          </Link>
        </NavbarItem>
      </NavbarContent>


      {/* 3. TIỆN ÍCH (Search, Cart, User) - GIỮ NGUYÊN */}
      <NavbarContent justify="end" className="gap-5">
        <Input
          classNames={{
            base: "hidden lg:block",
            inputWrapper: "bg-[var(--text-main)]/5 border-none w-40 md:w-64",
            input: "text-[var(--text-main)]"
          }}
          placeholder="Search..."
          startContent={<Search size={16} className="opacity-30" />}
        />

        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>

        <Badge content="0" size="sm" color="danger" className="border-none text-white font-bold">
          <Button isIconOnly variant="light" className="text-[var(--text-main)] opacity-80 hover:opacity-100">
            <ShoppingCart size={22} />
          </Button>
        </Badge>

        <NavbarItem>
          {userData ? (
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Button
                  disableRipple
                  className="bg-[var(--text-main)]/10 text-[var(--text-main)] font-bold px-4 h-11 rounded-2xl flex items-center gap-3 border border-white/10"
                  variant="flat"
                >
                  <span className="text-sm tracking-tight hidden sm:block">
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
                <DropdownItem key="/profile" startContent={<User size={18} />}>Hồ sơ cá nhân</DropdownItem>
                <DropdownItem key="/orders" startContent={<ClipboardList size={18} />}>Đơn hàng</DropdownItem>
                <DropdownItem key="/settings" startContent={<Settings size={18} />}>Cài đặt</DropdownItem>
                <DropdownItem key="/logout" color="danger" className="text-danger" startContent={<LogOut size={18} />}>
                  Đăng xuất
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <Button
              as={Link}
              href="/login"
              className="bg-[var(--text-main)] text-[var(--bg-main)] font-bold px-6 h-10 rounded-full shadow-lg hover:scale-105 transition-transform"
              variant="flat"
            >
              Đăng nhập
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>
    </Navbar >
  );
}