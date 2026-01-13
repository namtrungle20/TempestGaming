import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Badge,
  Avatar,
  Dropdown,
  Input,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from "@heroui/react";
import { Search, User, ShoppingCart } from "lucide-react";
import { ThemeToggle } from "../layout/ThemeToggle";
import { useNavigate } from "react-router-dom";

export default function AppNavbar() {
  const navigate = useNavigate();

  return (
    <Navbar
      maxWidth="xl"
      // Xóa bỏ các class màu cứng của Tailwind, chỉ dùng class custom
      className="nav-glass h-20 fixed top-0"
      classNames={{
        wrapper: "bg-transparent", // Để màu của nav-glass thực hiện nhiệm vụ
      }}
    >
      <NavbarBrand>
        <p className="font-black text-[var(--text-main)] italic uppercase tracking-tighter text-xl">
          Tempest
        </p>
      </NavbarBrand>

      <NavbarContent justify="end" className="gap-5">
        {/* Input search với độ mờ nhẹ để tiệp với Nav */}
        <Input
          classNames={{
            inputWrapper: "bg-[var(--text-main)]/5 border-none",
            input: "text-[var(--text-main)]"
          }}
          placeholder="Search..."
          startContent={<Search size={16} className="opacity-30" />}
        />

        <NavbarContent justify="end" className="gap-4">
          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
          {/* Các icon User, Cart khác */}
        </NavbarContent>

        <Badge content="2" size="sm" className="bg-[var(--text-main)] text-[var(--main-bg)] border-none">
          <ShoppingCart size={20} strokeWidth={2.5} />
        </Badge>
        {/* PROFILE DẠNG AVATAR CÓ DROPDOWN */}
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform border-[var(--text-main)] w-9 h-9"
              color="secondary"
              name="User"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d" // Thay bằng link avatar của user
            />
          </DropdownTrigger>


          <DropdownMenu
            aria-label="Profile Actions"
            variant="flat"
            onAction={(key) => navigate(key)} // Tự động chuyển trang theo key
          >
            <DropdownItem key="/profile" className="h-14 gap-2">
              <p className="font-semibold">Đang đăng nhập bằng</p>
              <p className="font-semibold text-primary">user@tempest.com</p>
            </DropdownItem>
            <DropdownItem key="/profile">Hồ sơ cá nhân</DropdownItem>
            <DropdownItem key="/orders">Đơn hàng của tôi</DropdownItem>
            <DropdownItem key="/settings">Cài đặt</DropdownItem>
            <DropdownItem key="/logout" color="danger" className="text-danger">
              Đăng xuất
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}