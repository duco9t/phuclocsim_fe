"use client";

import { MagicCard } from "@/components/magicui/magic-card";
import { Button } from "@/components/ui/ButtonNew";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { Lock, Mail } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
    const { login } = useAuth();
    const { theme } = useTheme();
    const router = useRouter();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const res = await fetch("http://localhost:3009/api/user/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok && (data.success || data.status === "OK")) {
                const user = data.data;
                login({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                });

                router.push("/account");
            } else {
                // ❌ luôn báo chung chung
                setError("Sai email hoặc mật khẩu");
            }
        } catch {
            // ❌ lỗi mạng/server cũng báo giống nhau
            setError("Sai email hoặc mật khẩu");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#fff8e1] to-[#fceabb] dark:from-[#121212] dark:to-[#1f1f1f] px-4">
            <Card className="relative z-10 w-full max-w-md border-0 bg-transparent shadow-3xl">
                <MagicCard
                    gradientColor={theme === "dark" ? "#333333" : "#d4af37"}
                    className="relative overflow-hidden rounded-2xl"
                >
                    <CardHeader className="p-6 text-center">
                        <CardTitle className="text-3xl font-bold text-[#d4af37]">
                            Đăng nhập
                        </CardTitle>
                        <CardDescription className="text-base text-gray-600 dark:text-gray-400 mt-2">
                            Vui lòng nhập thông tin để truy cập{" "}
                            <span className="font-semibold text-[#b8860b]">
                                Phúc Lộc Sim
                            </span>
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="px-6 pb-4">
                        <motion.form
                            onSubmit={handleSubmit}
                            className="space-y-5"
                            animate={error ? { x: [-8, 8, -6, 6, 0] } : {}}
                            transition={{ duration: 0.4 }}
                        >
                            {/* Email */}
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-2 h-5 w-5 " />
                                    <Input
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="nhapemail@example.com"
                                        required
                                        className={`pl-10 focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] ${error ? "border-red-500" : ""
                                            }`}
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="grid gap-2">
                                <Label htmlFor="password">Mật khẩu</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-2 h-5 w-5" />
                                    <Input
                                        id="password"
                                        type="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        required
                                        className={`pl-10 focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] ${error ? "border-red-500" : ""
                                            }`}
                                    />
                                </div>
                            </div>

                            {error && (
                                <p className="text-sm text-red-600">{error}</p>
                            )}

                            {/* Button */}
                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full mt-4 bg-gradient-to-r from-[#d4af37] to-[#f6e75c] text-black font-semibold shadow-md hover:from-[#c19a2b] hover:to-[#e6d94a] transition-all disabled:opacity-60"
                            >
                                {loading ? "Đang xử lý..." : "Đăng nhập"}
                            </Button>
                        </motion.form>
                    </CardContent>

                    <CardFooter className="flex justify-center pb-6">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Chưa có tài khoản?{" "}
                            <a
                                href="/register"
                                className="text-[#d4af37] font-semibold hover:underline"
                            >
                                Đăng ký ngay
                            </a>
                        </p>
                    </CardFooter>
                </MagicCard>
            </Card>
        </div>
    );
}
