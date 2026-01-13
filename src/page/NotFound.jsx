import React from 'react';
import { Button, Card, CardBody } from "@heroui/react";
import { Home, MoveLeft } from "lucide-react";
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center overflow-hidden bg-transparent">
      <Card
        className="relative z-10 
             /* Viền sắc nét hơn */
             border-2 border-[var(--text-main)]/20 dark:border-white/20 
             /* Nền đặc hơn để tách biệt khỏi background */
             bg-white/70 dark:bg-black/60 
             backdrop-blur-3xl 
             /* Class bóng đổ động vừa tạo */
             shadow-tempest-dynamic 
             max-w-lg mx-4 rounded-[4rem]"
        isBlurred
      >
        <CardBody className="flex flex-col items-center text-center px-12 py-16">

          <div className="relative mb-8 group">
            {/* Ảnh 404 với hiệu ứng phát sáng đồng bộ */}
            <img
              src="404.png"
              className='w-64 md:w-80 drop-shadow-[0_20px_40px_rgba(0,0,0,0.3)] 
                   dark:drop-shadow-[0_0_30px_rgba(255,255,255,0.2)] 
                   animate-appearance-in transition-all duration-700 
                   group-hover:scale-110 group-hover:rotate-2'
              alt="Not Found"
            />
          </div>

          <div className="space-y-4">
            <h2 className="text-6xl font-[1000] italic text-[var(--text-main)] 
                     tracking-tight uppercase leading-[0.8] transition-all">
              MẤT DẤU <br />
              <span className="text-primary brightness-110">TEMPEST?</span>
            </h2>
            <p className='text-[var(--text-main)] opacity-70 text-lg font-bold pt-4 
                    uppercase tracking-widest italic'>
              Tọa độ này không tồn tại
            </p>
          </div>

          {/* Nút bấm cũng đồng bộ tương phản */}
          <div className='flex flex-wrap justify-center gap-5 mt-12'>
            <Button
              className="btn-tempest btn-tempest-sm"
              onPress={() => navigate('/')}
            >
              VỀ TRANG CHỦ
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}