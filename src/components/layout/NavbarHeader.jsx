import React, { useState, useEffect } from "react";
import {
  Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Badge, Button,
  Input, Popover, PopoverTrigger, PopoverContent, Dropdown,
  DropdownTrigger, DropdownMenu, DropdownItem, Skeleton, Avatar
} from "@heroui/react";
import {
  Search, User, ShoppingCart, LogOut, Settings, ClipboardList,
  ChevronDown, LayoutGrid, ChevronRight, Menu, Gamepad2
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hook/useAuth";
import ThemeToggle from './ThemeToggle';
import { useAuthStore } from "@/store/useAuthStore";

// --- HOOKS ---
import { useBrands } from "@/hook/useBrands";
import { useCategories } from "@/hook/useCategories";
import { API_ENDPOINTS } from "@/constants/apiEndpoints"; 

// ============================================================================
// CẤU HÌNH ẢNH
// ============================================================================
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

const getImageUrl = (path) => {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${BACKEND_URL}/images/${cleanPath}`;
};

// ============================================================================
// MEGA MENU (UI: COMPACT, GRID 4, LOGO BLEND)
// ============================================================================
const MegaMenu = () => {
  const navigate = useNavigate();
  const { brands, isLoading: loadingBrands } = useBrands();
  const { categories, isLoading: loadingCats } = useCategories();

  const [isOpen, setIsOpen] = useState(false);
  const [activeBrand, setActiveBrand] = useState(null);

  useEffect(() => {
    if (brands?.length && !activeBrand) setActiveBrand(brands[0]);
  }, [brands]);

  // Giả lập hiển thị categories (Ông có thể thêm logic filter theo activeBrand.id ở đây nếu API trả về all)
  const displayCategories = categories || [];

  return (
    <Popover
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      placement="bottom-start"
      offset={10}
      shouldBlockScroll={false}
      classNames={{
        // UI FIX 1: Bỏ min-w cứng quá lớn. Dùng w-auto để menu tự co theo nội dung.
        // Chỉ set max-width để không bị tràn màn hình.
        content: "p-0 border border-[var(--text-main)]/10 shadow-2xl bg-[var(--background)]/95 backdrop-blur-3xl overflow-hidden rounded-xl w-auto max-w-[90vw]"
      }}
    >
      <PopoverTrigger>
        <Button
          disableRipple
          className="bg-transparent font-bold text-sm uppercase gap-2 text-[var(--text-main)] opacity-70 hover:opacity-100 p-0"
          onMouseEnter={() => setIsOpen(true)}
          endContent={<ChevronDown size={14} className={isOpen ? "rotate-180" : ""} />}
        >
          <LayoutGrid size={18} /> Danh mục
        </Button>
      </PopoverTrigger>

      <PopoverContent onMouseLeave={() => setIsOpen(false)}>
        {/* UI FIX 2: Set chiều cao cố định hoặc min-height để menu ổn định */}
        <div className="flex min-h-[250px] max-h-[400px]">
          
          {/* --- CỘT TRÁI: THƯƠNG HIỆU --- */}
          <div className="w-[180px] shrink-0 border-r border-[var(--text-main)]/10 bg-[var(--text-main)]/5 overflow-y-auto custom-scrollbar py-2">
            {loadingBrands ? (
              [...Array(5)].map((_, i) => <div key={i} className="p-2"><Skeleton className="h-8 rounded-md w-full opacity-30"/></div>)
            ) : (
              brands?.map((brand) => {
                const isActive = activeBrand?.id === brand.id;
                return (
                  <div
                    key={brand.id}
                    onMouseEnter={() => setActiveBrand(brand)}
                    className={`
                      cursor-pointer px-3 py-2 mx-2 rounded-lg flex items-center gap-2 transition-all mb-1
                      ${isActive 
                        ? "bg-[var(--text-main)]/10 text-[var(--text-main)] font-bold shadow-sm" // Active: Sáng hơn chút
                        : "hover:bg-[var(--text-main)]/5 text-[var(--text-main)]/60"} // Inactive: Mờ đi
                    `}
                  >
                    {/* UI FIX 3: LOGO BLEND - Bỏ khung background, để ảnh trần (object-contain) */}
                    <div className="w-6 h-6 flex items-center justify-center shrink-0">
                        {brand.image || brand.logo ? (
                            <img 
                                src={getImageUrl(brand.image || brand.logo)}
                                alt={brand.name}
                                className="w-full h-full object-contain"
                                // Nếu logo có nền trắng mà ông muốn xóa nền, có thể thử bật dòng này (nhưng tốt nhất là dùng ảnh PNG trong suốt)
                                // style={{ mixBlendMode: 'multiply' }} 
                            />
                        ) : (
                            <div className="w-5 h-5 rounded-full bg-[var(--text-main)]/10 flex items-center justify-center text-[10px] font-bold">
                                {brand.name?.charAt(0)}
                            </div>
                        )}
                    </div>
                    
                    <span className="text-[11px] uppercase truncate flex-1 pt-0.5">
                        {brand.name}
                    </span>
                    
                    {isActive && <ChevronRight size={12} className="text-primary opacity-80" />}
                  </div>
                );
              })
            )}
          </div>

          {/* --- CỘT PHẢI: LOẠI SẢN PHẨM --- */}
          <div className="flex-1 p-4 bg-transparent flex flex-col min-w-[500px]">
            {/* Header */}
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-[var(--text-main)]/10">
                <div className="flex items-center gap-2">
                    <span className="text-base font-black italic uppercase text-[var(--text-main)] tracking-tighter">
                        {activeBrand?.name || "..."}
                    </span>
                </div>
                
                <Link 
                    href="#" 
                    className="text-[10px] text-primary cursor-pointer hover:underline opacity-80"
                    onPress={() => { if(activeBrand) navigate(`${API_ENDPOINTS.PRODUCT.BASE}?thuonghieu_id=${activeBrand.id}`); setIsOpen(false); }}
                >
                    Xem tất cả
                </Link>
            </div>

            {/* UI FIX 4: GRID 4 CỘT - NÚT NHỎ */}
            <div className="grid grid-cols-4 gap-2 overflow-y-auto pr-1 custom-scrollbar content-start">
              {loadingCats ? (
                [...Array(8)].map((_, i) => <Skeleton key={i} className="h-8 rounded-md opacity-30" />)
              ) : (
                displayCategories.map((cat) => (
                  <Button
                    key={cat.id}
                    variant="light"
                    // UI FIX 5: Button size h-8 (32px), padding nhỏ -> Rất gọn
                    className="h-8 px-2 justify-start bg-[var(--text-main)]/5 hover:bg-[var(--text-main)]/10 border border-transparent hover:border-[var(--text-main)]/20 transition-all rounded-md group"
                    onPress={() => {
                         if(activeBrand) navigate(`${API_ENDPOINTS.PRODUCT.BASE}?thuonghieu_id=${activeBrand.id}&loai_id=${cat.id}`);
                         setIsOpen(false);
                    }}
                  >
                    <div className="flex items-center gap-2 w-full overflow-hidden">
                        {/* Ảnh Category siêu nhỏ (18px) */}
                        <div className="w-[18px] h-[18px] flex items-center justify-center shrink-0">
                            {cat.image ? (
                                <img 
                                    src={getImageUrl(cat.image)} 
                                    alt={cat.name} 
                                    className="w-full h-full object-contain opacity-60 group-hover:opacity-100 transition-opacity"
                                />
                            ) : (
                                <Gamepad2 size={12} className="text-[var(--text-main)]/40 group-hover:text-primary"/>
                            )}
                        </div>
                        
                        {/* Tên Category chữ nhỏ */}
                        <span className="text-[10px] font-bold text-[var(--text-main)]/70 group-hover:text-[var(--text-main)] uppercase truncate pt-0.5">
                            {cat.name}
                        </span>
                    </div>
                  </Button>
                ))
              )}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

// ============================================================================
// MAIN NAVBAR
// ============================================================================
export default function AppNavbar() {
  const navigate = useNavigate();
  const { handleLogout } = useAuth();
  const { user } = useAuthStore();

  return (
    <Navbar
      maxWidth="xl"
      className="nav-glass h-20 fixed top-0"
      classNames={{
        wrapper: "bg-transparent px-4 sm:px-6",
        item: "data-[active=true]:text-primary",
      }}
    >
      <NavbarBrand className="cursor-pointer" onClick={() => navigate('/')}>
        <p className="font-[1000] text-[var(--text-main)] italic uppercase tracking-tighter text-2xl">
          Tempest
        </p>
      </NavbarBrand>

      <NavbarContent justify="start" className="hidden sm:flex gap-6 ml-6">
        <NavbarItem><MegaMenu /></NavbarItem>
        <NavbarItem><Link href="/news" className="text-[var(--text-main)] font-bold text-sm uppercase opacity-70 hover:opacity-100">Tin tức</Link></NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end" className="gap-4">
        <Input
          classNames={{ 
            base: "hidden lg:block max-w-[12rem]", 
            inputWrapper: "search-nav-wrapper", 
            input: "text-[var(--text-main)] text-xs font-medium placeholder:text-[var(--text-main)]/40", 
          }}
          placeholder="Tìm kiếm..." 
          startContent={<Search size={16} className="text-[var(--text-main)] opacity-40" />}
        />
        <div className="hidden sm:flex"><ThemeToggle /></div>
        
        <Badge content="0" size="sm" color="danger" className="border-none text-white font-bold">
          <Button isIconOnly variant="light" className="text-[var(--text-main)] opacity-70 hover:opacity-100">
            <ShoppingCart size={22} />
          </Button>
        </Badge>
        
        <NavbarItem>
          {user ? (
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Button disableRipple className="user-btn">
                  <div className="flex items-center gap-2">
                    <div className="bg-[var(--text-main)] text-[var(--background)] p-1 rounded-full"><User size={14} /></div>
                    <span className="text-xs font-bold uppercase truncate max-w-[120px]">{user.email.split('@')[0]}</span>
                    <ChevronDown size={12} className="opacity-50" />
                  </div>
                </Button>
              </DropdownTrigger>
              <DropdownMenu 
                className="bg-[var(--background)]/90 backdrop-blur-3xl border border-[var(--text-main)]/10 rounded-2xl shadow-xl p-2"
                itemClasses={{ base: "data-[hover=true]:bg-[var(--text-main)]/5 text-[var(--text-main)]/80 font-medium" }}
                variant="flat" 
                onAction={(key) => key === "logout" ? handleLogout() : navigate(key)}
              >
                <DropdownItem key="info" className="h-14 gap-2 opacity-100 cursor-default"><p className="font-semibold text-xs">Xin chào</p><p className="font-bold text-primary text-xs">{user.email}</p></DropdownItem>
                <DropdownItem key={API_ENDPOINTS.USER.DETAIL}>Hồ sơ</DropdownItem>
                <DropdownItem key="/orders">Đơn hàng</DropdownItem>
                {user.isAdmin && <DropdownItem key="/admin" className="text-primary">Quản trị</DropdownItem>}
                <DropdownItem key="logout" className="text-danger" color="danger">Đăng xuất</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <Button onPress={() => navigate('/login')} className="btn-tempest h-10 px-6 text-xs">ĐĂNG NHẬP</Button>
          )}
        </NavbarItem>
      </NavbarContent>
      <NavbarContent className="sm:hidden" justify="end">
        <Button isIconOnly variant="light" className="text-[var(--text-main)]"><Menu size={24} /></Button>
      </NavbarContent>
    </Navbar>
  );
}