import React, { useState } from "react";
import {
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
  Button, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,
  useDisclosure, Image, Tooltip
} from "@heroui/react";
import { Plus, Pencil, Trash2, Image as ImageIcon } from "lucide-react";
import { useCategories } from "@/hook/useCategories";
import Category from "@/models/Category";

export default function CategoryManagement() {
  const { categories, isLoading, onCreate, onUpdate, onDelete } = useCategories();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // State đồng bộ với Database: name, image
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState({ name: "", image: null });
  const [preview, setPreview] = useState(null);

  const handleOpenModal = (cat = null) => {
    if (cat) {
      setSelectedCategory(cat);
      setFormData({ name: cat.name, image: null });
      setPreview(cat.imageUrl);
    } else {
      setSelectedCategory(null);
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
    // Dùng Model để build FormData gửi lên backend
    const data = Category.toFormData(formData);

    if (selectedCategory) {
      onUpdate({ id: selectedCategory.id, formData: data });
    } else {
      onCreate(data);
    }
    onOpenChange(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center px-2">
        <h1 className="text-2xl font-black italic uppercase tracking-tighter">Quản lý loại sản phẩm</h1>
        <Button color="primary" className="font-bold uppercase italic" endContent={<Plus size={18} />} onPress={() => handleOpenModal()}>
          Thêm mới
        </Button>
      </div>

      <Table aria-label="Category table" shadow="none" className="border rounded-xl">
        <TableHeader>
          <TableColumn className="w-20">STT</TableColumn>
          <TableColumn>HÌNH ẢNH</TableColumn>
          <TableColumn>TÊN LOẠI</TableColumn>
          <TableColumn align="end">THAO TÁC</TableColumn>
        </TableHeader>
        <TableBody isLoading={isLoading} emptyContent="Chưa có dữ liệu loại sản phẩm">
          {categories?.map((cat, index) => (
            <TableRow key={cat.id}>
              {/* STT ảo luôn liên tục 1, 2, 3... */}
              <TableCell className="font-medium text-muted-foreground">{index + 1}</TableCell>
              <TableCell>
                <Image src={cat.imageUrl} width={48} height={48} className="object-cover rounded-lg border shadow-sm" />
              </TableCell>
              <TableCell className="font-bold text-sm uppercase tracking-tight">{cat.name}</TableCell>
              <TableCell>
                <div className="flex justify-end gap-2">
                  <Tooltip content="Chỉnh sửa">
                    <Button isIconOnly size="sm" variant="flat" onPress={() => handleOpenModal(cat)}>
                      <Pencil size={16} />
                    </Button>
                  </Tooltip>
                  <Tooltip color="danger" content="Xóa loại này">
                    <Button isIconOnly size="sm" variant="flat" color="danger" 
                      onPress={() => window.confirm(`Xóa ${cat.name}?`) && onDelete(cat.id)}>
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
                {selectedCategory ? "Cập nhật loại SP" : "Thêm loại sản phẩm mới"}
              </ModalHeader>
              <ModalBody className="space-y-6 py-4">
                <Input label="Tên loại sản phẩm" placeholder="Ví dụ: Laptop, PC..." labelPlacement="outside" variant="bordered"
                  value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                
                <div className="space-y-3">
                  <label className="text-sm font-bold uppercase opacity-60">Hình ảnh đại diện</label>
                  <div className="flex flex-col items-center gap-4 p-6 border-2 border-dashed rounded-2xl bg-accent/5">
                    {preview ? <Image src={preview} width={160} className="rounded-lg shadow-md" /> : <ImageIcon size={48} className="opacity-20" />}
                    <input type="file" id="catFile" hidden onChange={handleFileChange} accept="image/*" />
                    <Button size="sm" variant="flat" color="primary" onPress={() => document.getElementById('catFile').click()}>
                       {preview ? "Đổi ảnh khác" : "Chọn ảnh từ máy"}
                    </Button>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button variant="flat" onPress={onClose} className="font-bold">Hủy</Button>
                <Button color="primary" className="font-bold" onPress={handleSubmit}>
                   {selectedCategory ? "Lưu thay đổi" : "Tạo loại sản phẩm"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}