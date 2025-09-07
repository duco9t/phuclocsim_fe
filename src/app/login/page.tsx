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
import { Lock, Mail } from "lucide-react";
import { useTheme } from "next-themes";

export default function LoginPage() {
    const { theme } = useTheme();

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#fff8e1] to-[#fceabb] dark:from-[#121212] dark:to-[#1f1f1f] px-4">
            <Card className="relative z-10 w-full max-w-md border-0 bg-transparent shadow-3xl">
                <MagicCard
                    gradientColor={theme === "dark" ? "#333333" : "#d4af37"}
                    className="relative overflow-hidden rounded-2xl"
                >
                    {/* Header */}
                    <CardHeader className="p-6 text-center">
                        <CardTitle className="text-3xl font-bold text-[#d4af37]">
                            Đăng nhập
                        </CardTitle>
                        <CardDescription className="text-base text-gray-600 dark:text-gray-400 mt-2">
                            Vui lòng nhập thông tin để truy cập{" "}
                            <span className="font-semibold text-[#b8860b]">Phúc Lộc Sim</span>
                        </CardDescription>
                    </CardHeader>

                    {/* Form */}
                    <CardContent className="px-6 pb-4">
                        <form className="space-y-5">
                            {/* Email */}
                            <div className="grid gap-2">
                                <Label htmlFor="email" className="text-sm font-medium">
                                    Email
                                </Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-2 h-5 w-5 " />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="nhapemail@example.com"
                                        className="pl-10 focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37]"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="grid gap-2">
                                <Label htmlFor="password" className="text-sm font-medium">
                                    Mật khẩu
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-2 h-5 w-5" />
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="••••••••"
                                        className="pl-10 focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37]"
                                    />
                                </div>
                            </div>

                            {/* Button */}
                            <Button className="w-full mt-4 bg-gradient-to-r from-[#d4af37] to-[#f6e75c] text-black font-semibold shadow-md hover:from-[#c19a2b] hover:to-[#e6d94a] transition-all">
                                Đăng nhập
                            </Button>
                        </form>
                    </CardContent>

                    {/* Footer */}
                    <CardFooter className="flex justify-center pb-6">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Chưa có tài khoản?{" "}
                            <a href="/register" className="text-[#d4af37] font-semibold hover:underline">
                                Đăng ký ngay
                            </a>
                        </p>
                    </CardFooter>
                </MagicCard>
            </Card>
        </div>
    );
}
