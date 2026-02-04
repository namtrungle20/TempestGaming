import { useUsers } from "@/hook/useUsers";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Lock, Unlock, Trash2 } from "lucide-react";

const UserManagement = () => {
    const { users, isLoading, onToggleLock, onDelete } = useUsers();

    if (isLoading) return <div className="p-8">Đang tải...</div>;

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold italic text-primary">Quản lý tài khoản</h2>
            <div className="border rounded-lg bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Email</TableHead>
                            <TableHead>Vai trò</TableHead>
                            <TableHead>Trạng thái</TableHead>
                            <TableHead className="text-right">Thao tác</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users?.map(u => (
                            <TableRow key={u.id}>
                                <TableCell className="font-medium">{u.email}</TableCell>
                                <TableCell>{u.isAdmin ? "Quản trị" : "Khách hàng"}</TableCell>
                                <TableCell>
                                    <span className={u.is_lock ? "text-destructive" : "text-green-500"}>
                                        {u.is_lock ? "Bị khóa" : "Hoạt động"}
                                    </span>
                                </TableCell>
                                <TableCell className="text-right space-x-2">
                                    <Button variant="outline" size="sm" onClick={() => onToggleLock({ user: u })}>
                                        {u.is_lock ? <Unlock size={14}/> : <Lock size={14}/>}
                                    </Button>
                                    <Button variant="destructive" size="sm" onClick={() => window.confirm("Xóa?") && onDelete(u.id)}>
                                        <Trash2 size={14}/>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default UserManagement;