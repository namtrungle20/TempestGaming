import AppNavbar from '@/components/layout/Navbar';
import React from 'react'
import { Button } from "@heroui/react";

export default function HomePage() {
  return (
    <div className="layout-tempest">
      <main className="flex flex-col items-center justify-center py-40">
        <h1 className="text-8xl md:text-[12rem] font-black italic tracking-tighter uppercase text-dynamic">
          Tempest
        </h1>
        <Button
          className="btn-tempest btn-tempest-lg" // Gọi cả class gốc và class size
          disableAnimation={false}
        >
          KHÁM PHÁ NGAY
        </Button>
      </main>
    </div>
  );
}