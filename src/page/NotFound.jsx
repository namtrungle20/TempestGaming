import React from 'react';
import { Button, Card, CardBody } from "@heroui/react";
import { Home } from "lucide-react";
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 overflow-hidden relative">
      
      <Card className="card-glass w-full max-w-lg p-8 relative z-10">
        <CardBody className="flex flex-col items-center text-center gap-6">
          
          {/* Ảnh 404 */}
          <div className="relative group">
            <img
              src="/404.png" // Đảm bảo bạn có ảnh này trong folder public
              className="w-64 drop-shadow-2xl animate-appearance-in transition-transform duration-700 group-hover:scale-105 group-hover:-rotate-3"
              alt="Page Not Found"
            />
          </div>

          <div className="space-y-2">
            <h2 className="text-5xl font-black italic tracking-tighter uppercase leading-[0.9]">
              MẤT DẤU <br/> <span className="text-purple-600">TEMPEST?</span>
            </h2>
            <p className="opacity-60 font-bold uppercase tracking-widest text-xs">
              Tọa độ này không tồn tại trong hệ thống
            </p>
          </div>

          <Button
            onPress={() => navigate('/')}
            className="btn-tempest h-12 px-8 mt-4"
            startContent={<Home size={18} />}
          >
            VỀ TRANG CHỦ
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}