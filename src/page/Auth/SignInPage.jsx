import React from 'react';
import { Card, CardBody, Input, Button, Checkbox, Link } from "@heroui/react";
import { Mail, Lock, EyeOff, Eye, LogIn } from "lucide-react";

export default function SignInPage() {
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-transparent">
      {/* Box đăng nhập sử dụng hiệu ứng Kính mờ và Shadow bạn đã thiết lập */}
      <Card className="w-full max-w-[420px] bg-white/60 backdrop-blur-2xl border-white/50 shadow-tempest rounded-[2.5rem] p-4">
        <CardBody className="flex flex-col gap-6">
          
          {/* Header của Form */}
          <div className="flex flex-col gap-2 text-center mb-4">
            <h1 className="text-4xl font-black italic text-slate-800 tracking-tighter uppercase">
              COMMING IN SIGN <span className="text-slate-500">MY FRIEND</span>
            </h1>
            <p className="text-slate-500 font-medium">Chào mừng trở lại, chiến binh!</p>
          </div>

          {/* Các ô nhập liệu */}
          <div className="flex flex-col gap-4">
            <Input
              type="email"
              label="Email nhân viên"
              placeholder="nhap.email@tempest.com"
              labelPlacement="outside"
              startContent={<Mail className="text-slate-400" size={18} />}
              variant="bordered"
              classNames={{
                inputWrapper: "bg-white/50 border-slate-200 shadow-sm hover:border-slate-400 transition-colors h-12",
                label: "text-slate-700 font-bold"
              }}
            />

            <Input
              type={isVisible ? "text" : "password"}
              label="Mật khẩu"
              placeholder="••••••••"
              labelPlacement="outside"
              startContent={<Lock className="text-slate-400" size={18} />}
              endContent={
                <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                  {isVisible ? (
                    <Eye className="text-slate-400" size={18} />
                  ) : (
                    <EyeOff className="text-slate-400" size={18} />
                  )}
                </button>
              }
              variant="bordered"
              classNames={{
                inputWrapper: "bg-white/50 border-slate-200 shadow-sm hover:border-slate-400 transition-colors h-12",
                label: "text-slate-700 font-bold"
              }}
            />
          </div>

          {/* Ghi nhớ và Quên mật khẩu */}
          <div className="flex justify-between items-center px-1">
            <Checkbox size="sm" classNames={{ label: "text-slate-600 font-medium" }}>
              Ghi nhớ tôi
            </Checkbox>
            <Link href="#" size="sm" className="text-slate-500 hover:text-slate-800 font-semibold transition-colors">
              Quên mật khẩu?
            </Link>
          </div>

          {/* Nút đăng nhập */}
          <Button 
            className="w-full bg-slate-800 text-white font-black h-12 shadow-lg shadow-slate-400/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
            radius="full"
            endContent={<LogIn size={18} />}
          >
            VÀO HỆ THỐNG
          </Button>

          {/* Footer của Form */}
          <p className="text-center text-slate-500 text-sm mt-2">
            Chưa có tài khoản?{" "}
            <Link href="/signup" size="sm" className="font-bold text-slate-800 underline">
              Đăng ký ngay
            </Link>
          </p>

        </CardBody>
      </Card>
    </div>
  );
}