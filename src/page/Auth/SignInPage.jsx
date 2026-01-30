import React, { useState } from 'react';
import { Card, CardBody, Input, Button, Checkbox, Link } from "@heroui/react";
import { Lock, EyeOff, Eye, LogIn, User } from "lucide-react";
import { useAuth } from '@/hook/useAuth';

export default function SignInPage() {
  const { formData, loading, handleChange, handleSignIn } = useAuth();
  const [isVisible, setIsVisible] = useState(false);

  // Style chung cho input (gọi class từ index.css)
  const inputClasses = {
    inputWrapper: "input-group-tempest", 
    label: "input-label-tempest",
    input: "font-medium"
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <Card className="w-full max-w-[420px] card-glass p-8">
        <CardBody className="flex flex-col gap-8">
          
          <div className="text-center mt-2">
            <h1 className="text-5xl font-black italic tracking-tighter uppercase leading-[0.8] mb-2">
              WELCOME <br /> <span className="opacity-30 text-3xl">BACK</span>
            </h1>
          </div>

          <form onSubmit={handleSignIn} className="flex flex-col gap-6">
            <Input
              name="loginKey"
              value={formData.loginKey}
              onChange={handleChange}
              label="Tài khoản"
              placeholder="Email / SĐT"
              labelPlacement="outside"
              startContent={<User size={18} className="opacity-50" />}
              variant="bordered"
              classNames={inputClasses}
              required
            />

            <Input
              name="password"
              value={formData.password}
              onChange={handleChange}
              type={isVisible ? "text" : "password"}
              label="Mật khẩu"
              placeholder="••••••••"
              labelPlacement="outside"
              startContent={<Lock size={18} className="opacity-50" />}
              endContent={
                <button type="button" onClick={() => setIsVisible(!isVisible)} className="opacity-40 hover:opacity-100">
                  {isVisible ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              }
              variant="bordered"
              classNames={inputClasses}
              required
            />

            <div className="flex justify-between items-center px-1">
              <Checkbox size="sm" classNames={{ label: "font-bold uppercase text-[10px] tracking-wider opacity-60" }}>
                Ghi nhớ
              </Checkbox>
              <Link href="#" className="opacity-40 hover:opacity-100 font-bold uppercase text-[10px] tracking-wider text-[var(--text-main)]">
                Quên mật khẩu?
              </Link>
            </div>

            <Button
              type="submit"
              isLoading={loading}
              className="btn-tempest h-12 w-full mt-2 text-sm"
              endContent={!loading && <LogIn size={20} />}
            >
              ĐĂNG NHẬP
            </Button>
          </form>

          <div className="text-center">
             <Link href="/signup" className="font-black text-[var(--text-main)] text-sm uppercase italic underline underline-offset-4 hover:opacity-60">
              Đăng ký tài khoản
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}