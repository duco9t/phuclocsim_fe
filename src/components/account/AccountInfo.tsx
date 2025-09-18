"use client";

import { User } from "@/types/user";
import { ChangeEvent, useState } from "react";

interface Props {
    user: User;
}

export default function AccountInfo({ user }: Props) {
    const [form, setForm] = useState(() => ({
        name: user?.name || "",
        phone: user?.phone || "",
    }));

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdate = async () => {
        try {
            const res = await fetch(`http://localhost:3009/api/user/update/${user._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            alert(data.message || "Cập nhật thành công!");
        } catch {
            alert("Lỗi khi cập nhật");
        }
    };

    return (
        <div className="space-y-4">
            <div>
                <p className="font-semibold text-gray-700">Email (không thể đổi):</p>
                <p className="text-gray-600">{user.email}</p>
            </div>
            <div>
                <label className="block text-sm font-medium">Tên</label>
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-2"
                />
            </div>
            <div>
                <label className="block text-sm font-medium">Số điện thoại</label>
                <input
                    type="text"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-2"
                />
            </div>
            <div>
                <p className="font-semibold text-gray-700">Vai trò:</p>
                <p className="text-gray-600">
                    {user.vai_tro === 0 ? "Admin" : user.vai_tro === 1 ? "Nhân viên" : "Khách hàng"}
                </p>
            </div>

            <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg cursor-pointer"
            >
                Cập nhật
            </button>
        </div>
    );
}
