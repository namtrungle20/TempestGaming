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
import { Search, User, ShoppingCart, LogOut, Settings, ClipboardList, ChevronDown, LayoutGrid } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hook/useAuth";
import { ThemeToggle } from './ThemeToggle';
import { useCategories } from "@/hook/useCategories";



export default function AppNavbar() {
  const navigate = useNavigate();
  const { handleLogout } = useAuth();
  const rawData = localStorage.getItem('nguoidung');
  const userData = rawData && rawData !== "undefined" ? JSON.parse(rawData) : null;


  // State lưu danh mục
  const { categories } = useCategories();

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

        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent text-[var(--text-main)] font-bold text-sm gap-2 uppercase tracking-wide opacity-80 hover:opacity-100"
                endContent={<ChevronDown size={16} />}
                variant="light"
                radius="sm"
              >
                <LayoutGrid size={18} /> Danh mục
              </Button>
            </DropdownTrigger>
          </NavbarItem>

          <DropdownMenu
            aria-label="Danh mục sản phẩm"
            className="w-[240px] max-h-[400px] overflow-y-auto bg-[var(--background)]/80 backdrop-blur-xl border border-[var(--border)] shadow-tempest-dynamic rounded-2xl p-2"
            itemClasses={{
              base: [
                "gap-3 py-2.5 px-3 rounded-xl transition-all duration-300",
                "data-[hover=true]:bg-[var(--text-main)]/5", // Hover: dùng màu text chính độ mờ 5% (hợp cả sáng/tối)
                "data-[hover=true]:scale-[1.02]", // Hiệu ứng phóng to nhẹ khi hover chuẩn Tempest
              ].join(" "),
              title: "text-sm font-bold uppercase tracking-tight text-[var(--text-main)]", // Font đậm, in hoa
            }}
          >
            {/* Lặp qua danh sách categories lấy từ API */}
            {categories.map((cat) => (
              <DropdownItem
                key={cat.id} // ✅ Dùng .id (do Model đã map từ loai_id sang)
                href={cat.getLink ? cat.getLink() : `/category/${cat.id}`}
                startContent={
                  <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-[var(--text-main)]/5 border border-[var(--text-main)]/10 p-1.5 shadow-sm">
                    <img
                      src={cat.image} // ✅ Dùng .image chuẩn
                      alt={cat.name}  // ✅ Dùng .name chuẩn
                      className="w-full h-full object-contain dark:invert"
                    />
                  </div>
                }
              >
                <span>{cat.name}</span>
              </DropdownItem>
            ))}

            {/* Nếu API chưa có dữ liệu hoặc đang load thì hiện cái này cho đỡ trống */}
            {categories.length === 0 && (
              <DropdownItem key="loading" isReadOnly>
                Đang tải danh mục...
              </DropdownItem>
            )}
          </DropdownMenu>
        </Dropdown>

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
    </Navbar>
  );
}