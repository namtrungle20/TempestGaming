import React from 'react'

export default function HomePage() {
  return (
    <div className="min-h-screen w-full bg-transparent flex items-center justify-center">
      
      <div className="text-center">
        <h1 className="text-6xl font-black text-slate-800 italic uppercase tracking-tighter">
          Tempest Gaming
        </h1>
        <p className="text-slate-500 mt-2 font-medium">
          Test Lại
        </p>
        
        <button className="mt-8 px-8 py-3 bg-slate-800 text-white rounded-full font-bold shadow-lg hover:bg-slate-700 transition-all">
          Bắt đầu ngay
        </button>
      </div>

    </div>
  )
}

// import { 
//   Navbar, NavbarBrand, NavbarContent, NavbarItem, 
//   Link, Button, Card, CardHeader, CardBody, 
//   Image, Chip, Divider, User, Tooltip
// } from "@heroui/react";
// import { ShoppingCart, Gamepad2, Zap, ShieldCheck, ArrowRight } from "lucide-react";

// export default function HomePage() {
//   const products = [
//     { id: 1, name: "PlayStation 5 Pro", price: "18.500.000đ", img: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=500", tag: "Hot" },
//     { id: 2, name: "Xbox Series X", price: "13.200.000đ", img: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?q=80&w=500", tag: "New" },
//     { id: 3, name: "Nintendo Switch OLED", price: "7.800.000đ", img: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?q=80&w=500", tag: "Best Seller" },
//     { id: 4, name: "DualSense Edge", price: "5.100.000đ", img: "https://images.unsplash.com/photo-1592155931584-901ac15763e3?q=80&w=500", tag: "Accessory" },
//   ];

//   return (
//     <div className="dark bg-[#020617] min-h-screen text-foreground">
//       {/* 1. NAVBAR - Sử dụng Glassmorphism của HeroUI */}
//       <Navbar isBordered maxWidth="xl" className="bg-background/60 backdrop-blur-md">
//         <NavbarBrand>
//           <Gamepad2 className="text-blue-500 mr-2" />
//           <p className="font-black italic text-2xl tracking-tighter text-blue-500">TEMPEST</p>
//         </NavbarBrand>
//         <NavbarContent className="hidden sm:flex gap-8" justify="center">
//           <NavbarItem isActive>
//             <Link href="#" color="primary" className="font-bold uppercase text-xs tracking-widest">Trang Chủ</Link>
//           </NavbarItem>
//           <NavbarItem>
//             <Link href="#" color="foreground" className="uppercase text-xs tracking-widest hover:text-blue-500 transition-colors">Máy Console</Link>
//           </NavbarItem>
//           <NavbarItem>
//             <Link href="#" color="foreground" className="uppercase text-xs tracking-widest hover:text-blue-500 transition-colors">Phụ Kiện</Link>
//           </NavbarItem>
//           <NavbarItem>
//             <Link href="/admin" color="warning" className="uppercase text-xs tracking-widest border-b border-warning">Quản Trị</Link>
//           </NavbarItem>
//         </NavbarContent>
//         <NavbarContent justify="end">
//           <NavbarItem>
//             <Tooltip content="Giỏ hàng">
//               <Button isIconOnly variant="light" radius="full">
//                 <ShoppingCart size={22} />
//               </Button>
//             </Tooltip>
//           </NavbarItem>
//           <NavbarItem>
//              <User   
//                 name="Admin"
//                 description="Staff Manager"
//                 avatarProps={{
//                   src: "https://i.pravatar.cc/150?u=a042581f4e29026024d"
//                 }}
//               />
//           </NavbarItem>
//         </NavbarContent>
//       </Navbar>

//       {/* 2. HERO SECTION - Cực mạnh mẽ trên PC */}
//       <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
//         <div className="absolute inset-0 z-0">
//             <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 to-transparent z-10" />
//             <img 
//               src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070" 
//               className="w-full h-full object-cover opacity-40 scale-105"
//               alt="Gaming Background"
//             />
//         </div>
        
//         <div className="relative z-20 text-center space-y-6 px-4">
//           <Chip color="primary" variant="dot" className="border-blue-500/30">Next-Gen Gaming Experience</Chip>
//           <h1 className="text-7xl md:text-9xl font-black italic tracking-tighter uppercase leading-none">
//             Tempest <span className="text-blue-500">Gaming</span>
//           </h1>
//           <p className="text-slate-400 text-xl max-w-2xl mx-auto">
//             Hệ thống phân phối máy chơi game Console hàng đầu Việt Nam. <br/> Đỉnh cao đồ họa, dẫn đầu công nghệ.
//           </p>
//           <div className="flex gap-4 justify-center pt-4">
//             <Button size="lg" color="primary" radius="none" className="font-bold px-10 shadow-lg shadow-blue-500/40">
//               MUA NGAY <Zap size={18} fill="currentColor" />
//             </Button>
//             <Button size="lg" variant="bordered" radius="none" className="font-bold px-10 border-slate-700">
//               XEM REVIEW
//             </Button>
//           </div>
//         </div>
//       </section>

//       {/* 3. PRODUCT GRID - Sử dụng Card của HeroUI */}
//       <section className="container mx-auto px-6 py-20">
//         <div className="flex items-center justify-between mb-10">
//           <h2 className="text-3xl font-black italic uppercase">Sản phẩm <span className="text-blue-500">Hot</span></h2>
//           <Button variant="light" endContent={<ArrowRight size={16} />}>Xem tất cả</Button>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//           {products.map((p) => (
//             <Card key={p.id} isPressable isHoverable className="bg-slate-900/50 border-none shadow-none">
//               <CardHeader className="absolute z-10 top-2 flex-col !items-start">
//                 <Chip size="sm" color="primary" variant="flat">{p.tag}</Chip>
//               </CardHeader>
//               <CardBody className="p-0 overflow-visible">
//                 <Image
//                   shadow="sm"
//                   radius="lg"
//                   width="100%"
//                   alt={p.name}
//                   className="w-full object-cover h-[280px] hover:scale-110 transition-transform duration-500"
//                   src={p.img}
//                 />
//               </CardBody>
//               <CardBody className="px-4 py-4 space-y-2">
//                 <h3 className="font-bold text-lg">{p.name}</h3>
//                 <div className="flex justify-between items-center">
//                    <p className="text-blue-500 font-black text-xl">{p.price}</p>
//                    <Button isIconOnly radius="full" size="sm" color="primary" variant="flat">
//                       <ShoppingCart size={16} />
//                    </Button>
//                 </div>
//               </CardBody>
//             </Card>
//           ))}
//         </div>
//       </section>

//       {/* 4. FOOTER MINI */}
//       <footer className="py-10 border-t border-slate-800 text-center text-slate-500 text-sm">
//         <p>© 2025 TEMPEST GAMING - LUẬN VĂN TỐT NGHIỆP</p>
//       </footer>
//     </div>
//   );
// }