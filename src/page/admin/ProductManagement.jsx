import React, { useState } from "react";
import {
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
  Button, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,
  useDisclosure, Image, Select, SelectItem, Textarea
} from "@heroui/react";
import { Plus, Pencil, Trash2, Image as ImageIcon } from "lucide-react";
import { useProducts } from "@/hook/useProduct";
import { useBrands } from "@/hook/useBrands";
import { useCategories } from "@/hook/useCategories";
import Product from "@/models/Product";

export default function ProductManagement() {
  const { products, isLoading, onCreate, onUpdate, onDelete } = useProducts();
  const { brands } = useBrands();
  const { categories } = useCategories();
  
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({}); // State lưu lỗi từ Backend

  const [formData, setFormData] = useState({
    name: "", price: "", quantity: "", description: "",
    brandId: "", categoryId: "", image: null
  });

  const handleOpenModal = (prod = null) => {
    setErrors({}); // Xóa lỗi cũ khi mở modal
    if (prod) {
      setSelectedProduct(prod);
      setFormData({
        name: prod.name, 
        price: prod.price, 
        quantity: prod.quantity,
        description: prod.description, 
        brandId: prod.brandId, 
        categoryId: prod.categoryId,
        image: prod.image // Giữ lại tên file ảnh cũ
      });
      setPreview(prod.imageUrl);
    } else {
      setSelectedProduct(null);
      setFormData({ name: "", price: "", quantity: "", description: "", brandId: "", categoryId: "", image: null });
      setPreview(null);
    }
    onOpen();
  };

  const handleSubmit = () => {
    const data = Product.toFormData(formData);
    setErrors({}); // Reset lỗi trước khi gửi

    const mutationOptions = {
        onSuccess: () => {
            onOpenChange(false); // Chỉ đóng modal khi thành công
        },
        onError: (err) => {
            // Map lỗi từ Backend vào state errors
            if (err.response?.data?.errors) {
                setErrors(err.response.data.errors);
            }
        }
    };

    if (selectedProduct) {
      onUpdate({ id: selectedProduct.id, formData: data }, mutationOptions);
    } else {
      onCreate(data, mutationOptions);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header & Table giữ nguyên logic cũ, chỉ thêm key động */}
      <div className="flex justify-between items-center px-2">
        <h1 className="text-2xl font-black italic uppercase tracking-tighter">Quản lý sản phẩm</h1>
        <Button color="primary" className="font-bold" endContent={<Plus size={18} />} onPress={() => handleOpenModal()}>
          Thêm mới
        </Button>
      </div>

      <Table aria-label="Product table" shadow="none" className="border rounded-xl">
        <TableHeader>
          <TableColumn>STT</TableColumn>
          <TableColumn>SẢN PHẨM</TableColumn>
          <TableColumn>GIÁ & KHO</TableColumn>
          <TableColumn>DANH MỤC</TableColumn>
          <TableColumn align="end">THAO TÁC</TableColumn>
        </TableHeader>
        <TableBody isLoading={isLoading} emptyContent="Chưa có sản phẩm">
          {products?.map((prod, index) => (
            <TableRow key={prod.id}>
              <TableCell className="text-muted-foreground">{index + 1}</TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Image isZoomed src={prod.imageUrl} width={50} height={50} className="rounded-lg border object-cover shadow-sm" />
                  <div>
                    <p className="font-bold text-sm">{prod.name}</p>
                    <p className="text-xs text-slate-400 truncate max-w-[150px] italic">{prod.description}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-bold text-primary">{prod.formattedPrice}</span>
                  <span className="text-xs text-slate-500">Kho: {prod.quantity}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold uppercase bg-blue-50 text-blue-600 px-2 py-0.5 rounded border border-blue-100 w-fit">{prod.brandName}</span>
                  <span className="text-[10px] font-bold uppercase bg-purple-50 text-purple-600 px-2 py-0.5 rounded border border-purple-100 w-fit">{prod.categoryName}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex justify-end gap-2">
                  <Button isIconOnly size="sm" variant="light" onPress={() => handleOpenModal(prod)}><Pencil size={16} /></Button>
                  <Button isIconOnly size="sm" variant="light" color="danger" onPress={() => window.confirm("Bạn có chắc chắn muốn xóa?") && onDelete(prod.id)}><Trash2 size={16} /></Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* MODAL FORM ĐÃ HOÀN THIỆN LỖI */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl" scrollBehavior="inside" backdrop="blur">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="font-black italic uppercase text-primary">
                {selectedProduct ? "Cập nhật sản phẩm" : "Thêm sản phẩm mới"}
              </ModalHeader>
              <ModalBody className="grid grid-cols-2 gap-6 pb-6">
                
                {/* Cột Trái: Thông tin cơ bản */}
                <div className="space-y-4">
                  <Input 
                    label="Tên sản phẩm" 
                    variant="bordered" 
                    value={formData.name} 
                    isInvalid={!!errors.name}
                    errorMessage={errors.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})} 
                  />
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Input 
                        type="number" 
                        label="Giá (VNĐ)" 
                        variant="bordered" 
                        value={formData.price} 
                        isInvalid={!!errors.gia}
                        errorMessage={errors.gia}
                        onChange={(e) => setFormData({...formData, price: e.target.value})} 
                    />
                    <Input 
                        type="number" 
                        label="Số lượng" 
                        variant="bordered" 
                        value={formData.quantity} 
                        isInvalid={!!errors.soluong}
                        errorMessage={errors.soluong}
                        onChange={(e) => setFormData({...formData, quantity: e.target.value})} 
                    />
                  </div>

                  <Select 
                    label="Thương hiệu" 
                    variant="bordered" 
                    isInvalid={!!errors.thuonghieu_id}
                    errorMessage={errors.thuonghieu_id}
                    selectedKeys={formData.brandId ? [String(formData.brandId)] : []}
                    onChange={(e) => setFormData({...formData, brandId: e.target.value})}>
                    {brands?.map((b) => <SelectItem key={b.id}>{b.name}</SelectItem>)}
                  </Select>

                  <Select 
                    label="Loại sản phẩm" 
                    variant="bordered"
                    isInvalid={!!errors.loai_id}
                    errorMessage={errors.loai_id}
                    selectedKeys={formData.categoryId ? [String(formData.categoryId)] : []}
                    onChange={(e) => setFormData({...formData, categoryId: e.target.value})}>
                    {categories?.map((c) => <SelectItem key={c.id}>{c.name}</SelectItem>)}
                  </Select>
                </div>

                {/* Cột Phải: Ảnh & Mô tả */}
                <div className="space-y-4">
                    <div className={`flex flex-col items-center gap-4 p-4 border-2 border-dashed rounded-xl bg-accent/5 h-[200px] justify-center transition-colors ${errors.image ? 'border-danger bg-danger/5' : 'border-default-200'}`}>
                        {preview ? <Image src={preview} height={140} className="object-contain" /> : <ImageIcon size={40} className="opacity-20" />}
                        <input type="file" id="prodFile" hidden accept="image/*" onChange={(e) => {
                            const file = e.target.files[0];
                            if(file) { 
                                setFormData({...formData, image: file}); 
                                setPreview(URL.createObjectURL(file)); 
                            }
                        }} />
                        <Button size="sm" variant="flat" color={errors.image ? "danger" : "default"} onPress={() => document.getElementById('prodFile').click()}>
                            {formData.image ? "Thay đổi ảnh" : "Chọn ảnh sản phẩm"}
                        </Button>
                        {errors.image && <p className="text-[10px] text-danger font-medium">{errors.image}</p>}
                    </div>

                    <Textarea 
                        label="Mô tả chi tiết" 
                        variant="bordered" 
                        minRows={3} 
                        value={formData.description} 
                        isInvalid={!!errors.mota}
                        errorMessage={errors.mota}
                        onChange={(e) => setFormData({...formData, description: e.target.value})} 
                    />
                </div>
              </ModalBody>
              <ModalFooter className="border-t">
                <Button variant="light" onPress={onClose}>Hủy bỏ</Button>
                <Button color="primary" onPress={handleSubmit} className="font-bold shadow-lg shadow-primary/30">
                  Lưu sản phẩm
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}