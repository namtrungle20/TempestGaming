import React, { useState } from 'react';
import { Card, CardBody, Input, Button, Link } from "@heroui/react";
import { Mail, Lock, EyeOff, Eye, UserPlus, User, Phone } from "lucide-react";
import { useRegister } from '@/hook/useRegister'; // Đảm bảo bạn đã tạo hook này

export default function SignUpPage() {
  const { formData, loading, handleChange, handleSignUp, serverError } = useRegister();

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  serverError?.toLowerCase().includes("tồn tại");

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-transparent">
      {/* Box đăng ký đồng bộ hiệu ứng Kính mờ với SignIn */}
      <Card className="w-full max-w-[450px] bg-white/60 backdrop-blur-2xl border-white/50 shadow-tempest rounded-[2.5rem] p-4">
        <CardBody className="flex flex-col gap-6">

          {/* Header */}
          <div className="flex flex-col gap-2 text-center mb-2">
            <h1 className="text-4xl font-black italic text-slate-800 tracking-tighter uppercase leading-none">
              JOIN THE SQUAD <span className="text-slate-500">NOW</span>
            </h1>
            <p className="text-slate-500 font-medium">Khởi tạo hành trình của bạn!</p>
          </div>

          <form onSubmit={handleSignUp} className="flex flex-col gap-4">

            {/* Trường Họ Tên */}
            {/* <Input
              name="ten"
              value={formData.ten}
              onChange={handleChange}
              type="text"
              label="Họ và Tên"
              placeholder="Ví dụ: Rimuru Tempest"
              labelPlacement="outside"
              startContent={<User className="text-black" size={18} />}
              variant="bordered"
              classNames={{
                inputWrapper: "bg-white/50 border-slate-200 shadow-sm hover:border-slate-400 transition-colors h-12",
                label: "text-slate-700 font-bold",
                input: "text-black placeholder:text-slate-400"
              }}
              required
            /> */}

            <div className="flex gap-4">
              <Input
                name="email"
                type="email"
                label="Email"
                placeholder="ten@gmail.com"
                labelPlacement="outside"
                startContent={<Mail size={18} />}
                variant="bordered"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <Input
                name="sdt"
                label="Số điện thoại"
                placeholder="09xxx..."
                labelPlacement="outside"
                startContent={<Phone size={18} />}
                variant="bordered"
                value={formData.sdt}
                onChange={handleChange}
                required
              />
            </div>

            {/* Trường Mật khẩu */}
            <Input
              name="password"
              value={formData.password}
              onChange={handleChange}
              type={isVisible ? "text" : "password"}
              label="Mật khẩu"
              placeholder="Tối thiểu 6 ký tự"
              labelPlacement="outside"
              startContent={<Lock className="text-black" size={18} />}
              endContent={
                <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                  {isVisible ? <Eye className="text-slate-400" size={18} /> : <EyeOff className="text-slate-400" size={18} />}
                </button>
              }
              variant="bordered"
              classNames={{
                inputWrapper: "bg-white/50 border-slate-200 shadow-sm hover:border-slate-400 transition-colors h-12",
                label: "text-slate-700 font-bold",
                input: "text-black placeholder:text-slate-400"
              }}
              required
            />

            <Button
              type="submit"
              isLoading={loading}
              className="w-full bg-slate-800 text-white font-black h-12 shadow-lg shadow-slate-400/40 hover:scale-[1.02] active:scale-[0.98] transition-all mt-4"
              radius="full"
              endContent={!loading && <UserPlus size={18} />}
            >
              TẠO TÀI KHOẢN
            </Button>
          </form>

          <p className="text-center text-slate-500 text-sm mt-2">
            Đã là chiến binh của hệ thống?{" "}
            <Link href="/login" size="sm" className="font-bold text-slate-800 underline">
              Đăng nhập ngay
            </Link>
          </p>

        </CardBody>
      </Card>
    </div>
  );
}