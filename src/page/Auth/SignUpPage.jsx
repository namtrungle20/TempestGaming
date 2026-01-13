import React, { useState } from 'react';
import { Card, CardBody, Input, Button, Link } from "@heroui/react";
import { Mail, Lock, EyeOff, Eye, UserPlus, User, Phone } from "lucide-react";
import { useRegister } from '@/hook/useRegister'; // Đảm bảo bạn đã tạo hook này

export default function SignUpPage() {
  const { formData, loading, handleChange, handleSignUp } = useRegister();

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  // Style dùng chung cho Input để code gọn hơn
  const sharedInputClass = {
    inputWrapper: [
      "bg-[var(--text-main)]/[0.04]", // Nền input cực nhẹ theo theme
      "border-[var(--border)]",
      "hover:border-[var(--text-main)]",
      "transition-colors",
      "h-12",
      "backdrop-blur-sm"
    ],
    label: "text-[var(--text-main)] font-bold italic uppercase text-[11px] tracking-widest",
    input: "text-[var(--text-main)] placeholder:opacity-40"
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-transparent">
      {/* Card đồng bộ màu theo biến CSS var(--text-main) */}
      <Card className="w-full max-w-[480px] bg-[var(--text-main)]/[0.02] backdrop-blur-2xl border-1 border-[var(--border)] shadow-2xl rounded-[2.5rem] p-4">
        <CardBody className="flex flex-col gap-8">

          {/* Header với Font đặc trưng của Tempest */}
          <div className="flex flex-col gap-2 text-center mt-2">
            <h1 className="text-4xl font-black italic text-[var(--text-main)] tracking-tighter uppercase leading-none">
              JOIN THE SQUAD <br />
              <span className="opacity-30 text-2xl">RIGHT NOW</span>
            </h1>
            <p className="text-[var(--text-main)] opacity-50 font-medium text-sm tracking-tight">
              Khởi tạo hành trình của bạn, chiến binh!
            </p>
          </div>

          <form onSubmit={handleSignUp} className="flex flex-col gap-5">

            {/* Hàng Email & SĐT */}
            <div className="flex flex-col md:flex-row gap-4">
              <Input
                name="email"
                type="email"
                label="Email"
                placeholder="rimuru@tempest.com"
                labelPlacement="outside"
                startContent={<Mail className="text-[var(--text-main)] opacity-60" size={18} />}
                variant="bordered"
                classNames={sharedInputClass}
                value={formData.email}
                onChange={handleChange}
                required
              />
              <Input
                name="sdt"
                label="Số điện thoại"
                placeholder="09xxx..."
                labelPlacement="outside"
                startContent={<Phone className="text-[var(--text-main)] opacity-60" size={18} />}
                variant="bordered"
                classNames={sharedInputClass}
                value={formData.sdt}
                onChange={handleChange}
                required
              />
            </div>

            {/* Mật khẩu */}
            <Input
              name="password"
              value={formData.password}
              onChange={handleChange}
              type={isVisible ? "text" : "password"}
              label="Mật khẩu bảo mật"
              placeholder="••••••••"
              labelPlacement="outside"
              startContent={<Lock className="text-[var(--text-main)] opacity-60" size={18} />}
              endContent={
                <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                  {isVisible ?
                    <Eye className="text-[var(--text-main)] opacity-40" size={18} /> :
                    <EyeOff className="text-[var(--text-main)] opacity-40" size={18} />
                  }
                </button>
              }
              variant="bordered"
              classNames={sharedInputClass}
              required
            />

            {/* Nút đăng ký đảo màu theo Theme */}
            <Button
              type="submit"
              isLoading={loading}
              className="btn-tempest btn-tempest-lg"
              radius="full"
              endContent={!loading && <UserPlus size={20} strokeWidth={2.5} />}
            >
              TẠO TÀI KHOẢN
            </Button>
          </form>

          {/* Footer Link */}
          <p className="text-center text-[var(--text-main)] opacity-40 text-xs font-bold uppercase tracking-tighter mb-2">
            Đã là thành viên?{" "}
            <Link href="/login" className="font-black text-[var(--text-main)] underline opacity-100 hover:opacity-70 transition-opacity ml-1">
              Đăng nhập ngay
            </Link>
          </p>

        </CardBody>
      </Card>
    </div>
  );
}