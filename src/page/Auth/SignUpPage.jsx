import React, { useState } from 'react';
import { Card, CardBody, Input, Button, Link } from "@heroui/react";
import { Mail, Lock, EyeOff, Eye, UserPlus, Phone } from "lucide-react";
import { useRegister } from '@/hook/useRegister';

export default function SignUpPage() {
  const { formData, loading, handleChange, handleSignUp } = useRegister();
  const [isVisible, setIsVisible] = useState(false);

  const inputClasses = {
    inputWrapper: "input-group-tempest",
    label: "input-label-tempest",
    input: "font-medium"
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <Card className="w-full max-w-[500px] card-glass p-8">
        <CardBody className="flex flex-col gap-6">
          
          <div className="text-center">
            <h1 className="text-4xl font-black italic tracking-tighter uppercase leading-none mb-2">
              JOIN US
            </h1>
            <p className="opacity-50 font-bold text-xs uppercase tracking-widest">
              Gia nhập Tempest Gaming
            </p>
          </div>

          <form onSubmit={handleSignUp} className="flex flex-col gap-5">
            <div className="flex gap-4">
              <Input
                name="email"
                type="email"
                label="Email"
                placeholder="abc@gmail.com"
                labelPlacement="outside"
                startContent={<Mail size={18} className="opacity-50"/>}
                variant="bordered"
                classNames={inputClasses}
                value={formData.email}
                onChange={handleChange}
                required
              />
              <Input
                name="sdt"
                label="SĐT"
                placeholder="09..."
                labelPlacement="outside"
                startContent={<Phone size={18} className="opacity-50"/>}
                variant="bordered"
                classNames={inputClasses}
                value={formData.sdt}
                onChange={handleChange}
                required
              />
            </div>

            <Input
              name="password"
              type={isVisible ? "text" : "password"}
              label="Mật khẩu"
              placeholder="••••••••"
              labelPlacement="outside"
              startContent={<Lock size={18} className="opacity-50"/>}
              endContent={
                <button type="button" onClick={() => setIsVisible(!isVisible)} className="opacity-40 hover:opacity-100">
                  {isVisible ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              }
              variant="bordered"
              classNames={inputClasses}
              value={formData.password}
              onChange={handleChange}
              required
            />

            <Button
              type="submit"
              isLoading={loading}
              className="btn-tempest h-12 w-full mt-4 text-sm"
              endContent={!loading && <UserPlus size={20} />}
            >
              ĐĂNG KÝ
            </Button>
          </form>

          <div className="text-center mt-2">
             <Link href="/login" className="text-[var(--text-main)] font-black underline hover:opacity-70 text-sm uppercase italic">
              Đã có tài khoản?
             </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}