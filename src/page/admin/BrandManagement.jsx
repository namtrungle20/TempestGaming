import React, { useState } from "react";
import {
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
  Button, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,
  useDisclosure, Image, Tooltip
} from "@heroui/react";
import { Plus, Pencil, Trash2, Image as ImageIcon } from "lucide-react";
import { useBrands } from "@/hook/useBrands";
import Brand from "@/models/Brand"; // Import Model để dùng toFormData

export default function BrandManagement() {
  const { brands, isLoading, onCreate, onUpdate, onDelete } = useBrands();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // State chuẩn: name và image (khớp với Database)
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [formData, setFormData] = useState({ name: "", image: null });
  const [preview, setPreview] = useState(null);

  const handleOpenModal = (brand = null) => {
    if (brand) {
      setSelectedBrand(brand);
      setFormData({ name: brand.name, image: null });
      setPreview(brand.imageUrl);
    } else {
      setSelectedBrand(null);
      setFormData({ name: "", image: null });
      setPreview(null);
    }
    onOpen();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    // Dùng hàm static của Model để build FormData nhanh gọn
    const data = Brand.toFormData(formData);

    if (selectedBrand) {
      onUpdate({ id: selectedBrand.id, formData: data });
    } else {
      onCreate(data);
    }
    onOpenChange(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center px-2">
        <h1 className="text-2xl font-black italic uppercase tracking-tighter">
          Quản lý thương hiệu
        </h1>
        <Button 
          color="primary" 
          className="font-bold"
          endContent={<Plus size={18} />} 
          onPress={() => handleOpenModal()}
        >
          Thêm mới
        </Button>
      </div>

      <Table 
        aria-label="Brand table" 
        shadow="none" 
        className="border rounded-xl"
      >
        <TableHeader>
          <TableColumn className="w-20">STT</TableColumn>
          <TableColumn>HÌNH ẢNH</TableColumn>
          <TableColumn>TÊN THƯƠNG HIỆU</TableColumn>
          <TableColumn align="end">THAO TÁC</TableColumn>
        </TableHeader>
        <TableBody 
          isLoading={isLoading} 
          loadingContent={<div>Đang tải...</div>}
          emptyContent="Chưa có thương hiệu nào"
        >
          {brands?.map((brand, index) => (
            <TableRow key={brand.id}>
              {/* Hiển thị STT ảo liên tục */}
              <TableCell className="font-medium text-muted-foreground">
                {index + 1}
              </TableCell>
              <TableCell>
                <Image 
                  src={brand.imageUrl} 
                  width={48} 
                  height={48} 
                  alt={brand.name} 
                  className="object-cover rounded-lg border shadow-sm" 
                />
              </TableCell>
              <TableCell className="font-bold text-sm uppercase tracking-tight">
                {brand.name}
              </TableCell>
              <TableCell>
                <div className="flex justify-end gap-2">
                  <Tooltip content="Chỉnh sửa">
                    <Button 
                      isIconOnly 
                      size="sm" 
                      variant="flat" 
                      onPress={() => handleOpenModal(brand)}
                    >
                      <Pencil size={16} />
                    </Button>
                  </Tooltip>
                  <Tooltip color="danger" content="Xóa thương hiệu">
                    <Button 
                      isIconOnly 
                      size="sm" 
                      variant="flat" 
                      color="danger" 
                      onPress={() => window.confirm(`Xóa ${brand.name}?`) && onDelete(brand.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center" backdrop="blur">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="font-black italic uppercase tracking-tighter text-xl">
                {selectedBrand ? "Cập nhật thương hiệu" : "Thêm thương hiệu mới"}
              </ModalHeader>
              <ModalBody className="space-y-6 py-4">
                <Input
                  label="Tên thương hiệu"
                  placeholder="Ví dụ: Sony, Samsung..."
                  labelPlacement="outside"
                  variant="bordered"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                
                <div className="space-y-3">
                  <label className="text-sm font-bold uppercase opacity-60">Logo thương hiệu</label>
                  <div className="flex flex-col items-center gap-4 p-6 border-2 border-dashed rounded-2xl bg-accent/5 hover:bg-accent/10 transition-colors">
                    {preview ? (
                      <Image src={preview} width={160} height={100} className="object-contain rounded-lg" />
                    ) : (
                      <div className="flex flex-col items-center gap-2 opacity-30">
                        <ImageIcon size={48} strokeWidth={1} />
                        <span className="text-xs">Chưa có ảnh</span>
                      </div>
                    )}
                    <input type="file" id="fileInput" hidden onChange={handleFileChange} accept="image/*" />
                    <Button 
                      size="sm" 
                      variant="flat" 
                      color="primary"
                      className="font-semibold"
                      onPress={() => document.getElementById('fileInput').click()}
                    >
                      {preview ? "Thay đổi ảnh" : "Chọn ảnh từ máy"}
                    </Button>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter className="border-t">
                <Button variant="flat" onPress={onClose} className="font-bold">
                  Hủy
                </Button>
                <Button color="primary" onPress={handleSubmit} className="font-bold">
                  {selectedBrand ? "Lưu thay đổi" : "Tạo mới ngay"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}