import React, { useState } from 'react';
import { Card, CardBody, Input, Button, Checkbox, Link } from "@heroui/react";
import { Mail, Lock, EyeOff, Eye, LogIn, User } from "lucide-react";
import { useAuth } from '@/hook/useAuth';


export default function SignInPage() {
  const { formData, loading, handleChange, handleSignIn } = useAuth();

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    /* Container bao phủ toàn màn hình, kế thừa nền từ layout-tempest */
    <div className="min-h-screen w-full flex items-center justify-center p-4">

      {/* Card: Sử dụng kính mờ siêu mỏng để giống với style Navbar/Home */}
      <Card className="w-full max-w-[420px] bg-[var(--text-main)]/[0.02] backdrop-blur-3xl border border-[var(--text-main)]/[0.1] shadow-[0_32px_64px_-15px_rgba(0,0,0,0.5)] rounded-[3rem] p-6">
        <CardBody className="flex flex-col gap-8">

          {/* Header: Typography italic đặc trưng của Tempest */}
          <div className="flex flex-col gap-2 text-center mt-2">
            <h1 className="text-5xl font-black italic text-[var(--text-main)] tracking-tighter uppercase leading-[0.8] mb-1">
              COMING IN <br />
              <span className="opacity-30 text-3xl">MY FRIEND</span>
            </h1>
            <p className="text-[var(--text-main)] opacity-40 font-bold uppercase text-[10px] tracking-[0.3em] mt-4">
              Access the tempest squad
            </p>
          </div>

          <form onSubmit={handleSignIn} className="flex flex-col gap-6">
            {/* Input Account */}
            <Input
              name="loginKey"
              value={formData.loginKey}
              onChange={handleChange}
              label="TÀI KHOẢN"
              placeholder="Email hoặc số điện thoại"
              labelPlacement="outside"
              // Thu nhỏ size icon xuống 18, giữ nét đậm 2.5
              startContent={<User className="text-[var(--text-main)]" size={18} strokeWidth={2.5} />}
              variant="bordered"
              classNames={{
                // h-12 là kích thước chuẩn gọn gàng, giảm border opacity để tinh tế hơn
                inputWrapper: "bg-[var(--text-main)]/[0.03] border-[var(--text-main)]/[0.1] hover:border-[var(--text-main)]/[0.4] transition-all h-12 rounded-xl px-4",
                // Chữ label nhỏ hơn (10px) và tăng khoảng cách chữ (tracking-wider)
                label: "text-[var(--text-main)] font-black uppercase italic text-[10px] tracking-[0.15em] ml-1 mb-1",
                // Font input nhỏ lại một chút để cân đối
                input: "text-[var(--text-main)] placeholder:opacity-20 font-medium text-sm"
              }}
              required
            />

            {/* Input Password */}
            <Input
              name="password"
              value={formData.password}
              onChange={handleChange}
              type={isVisible ? "text" : "password"}
              label="MẬT KHẨU"
              placeholder="••••••••"
              labelPlacement="outside"
              startContent={<Lock className="text-[var(--text-main)]" size={18} strokeWidth={2.5} />}
              endContent={
                <button className="focus:outline-none opacity-40 hover:opacity-100 transition-opacity" type="button" onClick={toggleVisibility}>
                  {isVisible ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              }
              variant="bordered"
              classNames={{
                inputWrapper: "bg-[var(--text-main)]/[0.03] border-[var(--text-main)]/[0.1] hover:border-[var(--text-main)]/[0.4] transition-all h-12 rounded-xl px-4",
                // Chữ label nhỏ hơn (10px) và tăng khoảng cách chữ (tracking-wider)
                label: "text-[var(--text-main)] font-black uppercase italic text-[10px] tracking-[0.15em] ml-1 mb-1",
                // Font input nhỏ lại một chút để cân đối
                input: "text-[var(--text-main)] placeholder:opacity-20 font-medium text-sm"
              }}
              required
            />

            {/* Sub-actions */}
            <div className="flex justify-between items-center px-1">
              <Checkbox
                size="sm"
                classNames={{
                  label: "text-[var(--text-main)] opacity-50 font-black uppercase text-[10px] tracking-wider",
                  wrapper: "before:border-[var(--text-main)]/[0.2]"
                }}
              >
                Ghi nhớ
              </Checkbox>
              <Link href="#" size="sm" className="text-[var(--text-main)] opacity-30 hover:opacity-100 font-black uppercase text-[10px] tracking-wider transition-all underline underline-offset-4">
                Quên mật khẩu?
              </Link>
            </div>

            {/* Submit Button: Đảo màu (Trắng trên nền Đen) y hệt UI Home */}
            <Button
              type="submit"
              isLoading={loading}
              className="btn-tempest btn-tempest-lg"
              radius="full"
              endContent={!loading && <LogIn size={22} strokeWidth={3} />}
            >
              VÀO HỆ THỐNG
            </Button>
          </form>

          {/* Footer */}
          <div className="text-center mt-2 flex flex-col gap-2">
            <p className="text-[var(--text-main)] opacity-30 text-[10px] font-black uppercase tracking-widest">
              Chưa có tài khoản chiến binh?
            </p>
            <Link href="/signup" className="mx-auto font-black text-[var(--text-main)] text-sm uppercase italic underline underline-offset-8 decoration-2 hover:opacity-60 transition-opacity">
              Đăng ký ngay
            </Link>
          </div>

        </CardBody>
      </Card>
    </div>
  );
}