import React from 'react';
import { Button } from "@heroui/react";
import { Home, MoveLeft } from "lucide-react";
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center overflow-hidden">
      {/* Background đường chân trời của bạn */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(125% 125% at 50% 90%, #fff 40%, #475569 100%)",
        }}
      />

      {/* Box nội dung với Shadow và Glassmorphism */}
      <div className="relative z-10 flex flex-col items-center text-center px-8 py-12 
                    bg-white/30 backdrop-blur-xl rounded-[3rem] 
                    border border-white/40 shadow-tempest max-w-lg mx-4">
        
        {/* Ảnh 404 với Drop Shadow mạnh hơn để tạo độ nổi */}
        <div className="relative mb-6">
           <img
            src="404.png"
            className='w-64 md:w-80 drop-shadow-[0_20px_30px_rgba(0,0,0,0.15)] animate-appearance-in' 
            alt="Not Found"
          />
        </div>

        <div className="space-y-3">
          <h2 className="text-4xl md:text-5xl font-black italic text-slate-800 tracking-tighter uppercase leading-tight">
            MẤT DẤU <br/>
            <span className="text-slate-500 underline decoration-slate-300 decoration-4 underline-offset-8">TEMPEST?</span>
          </h2>
          <p className='text-slate-600 text-lg font-medium pt-4'>
            Có vẻ bạn đã đi lạc khỏi vùng an toàn.
          </p>
        </div>

        <div className='flex gap-4 mt-10'>
          <Button 
            variant="bordered"
            radius="full"
            onPress={() => navigate(-1)}
            className="border-slate-300 text-slate-700 font-bold px-6 shadow-sm hover:shadow-md transition-all"
          >
            QUAY LẠI
          </Button>

          <Button 
            className="bg-slate-800 text-white font-bold px-8 shadow-[0_10px_20px_-5px_rgba(71,85,105,0.5)] hover:shadow-[0_15px_25px_-5px_rgba(71,85,105,0.6)]"
            radius="full"
            onPress={() => navigate('/')}
          >
            VỀ TRANG CHỦ
          </Button>
        </div>
      </div>

      {/* Chữ 404 mờ nằm ẩn dưới nền để test độ tương phản */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black text-slate-900/[0.03] select-none pointer-events-none z-0">
        404
      </div>
    </div>
  );
}