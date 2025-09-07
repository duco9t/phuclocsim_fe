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
import { Lock, Mail, User } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";

export default function RegisterPage() {
    const { theme } = useTheme();
    const [openTerms, setOpenTerms] = useState(false);
    const [accepted, setAccepted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!accepted) {
            setError("Vui lòng đồng ý với Điều khoản & Chính sách trước khi tiếp tục.");
            return;
        }
        setError(null);
        // TODO: gọi API đăng ký ở đây
        alert("Đăng ký thành công (demo).");
    };

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
                            Đăng ký
                        </CardTitle>
                        <CardDescription className="text-base text-gray-600 dark:text-gray-400 mt-2">
                            Tạo tài khoản để bắt đầu sử dụng{" "}
                            <span className="font-semibold text-[#b8860b]">Phúc Lộc Sim</span>
                        </CardDescription>
                    </CardHeader>

                    {/* Form */}
                    <CardContent className="px-6 pb-4">
                        <form className="space-y-5" onSubmit={handleSubmit}>
                            {/* Name */}
                            <div className="grid gap-2">
                                <Label htmlFor="name" className="text-sm font-medium">
                                    Họ và tên
                                </Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-2 h-5 w-5 text-gray-500" />
                                    <Input
                                        id="name"
                                        type="text"
                                        placeholder="Nguyễn Văn A"
                                        className="pl-10 focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37]"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="grid gap-2">
                                <Label htmlFor="email" className="text-sm font-medium">
                                    Email
                                </Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-2 h-5 w-5 text-gray-500" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="nhapemail@example.com"
                                        className="pl-10 focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37]"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="grid gap-2">
                                <Label htmlFor="password" className="text-sm font-medium">
                                    Mật khẩu
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-2 h-5 w-5 text-gray-500" />
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="••••••••"
                                        className="pl-10 focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37]"
                                        minLength={8}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div className="grid gap-2">
                                <Label htmlFor="confirm-password" className="text-sm font-medium">
                                    Xác nhận mật khẩu
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-2 h-5 w-5 text-gray-500" />
                                    <Input
                                        id="confirm-password"
                                        type="password"
                                        placeholder="••••••••"
                                        className="pl-10 focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37]"
                                        minLength={8}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Terms */}
                            <div className="flex items-start gap-3 rounded-lg border border-border/60 p-3">
                                <input
                                    id="accept"
                                    type="checkbox"
                                    checked={accepted}
                                    onChange={(e) => setAccepted(e.target.checked)}
                                    className="mt-1 size-4 accent-[#d4af37]"
                                />
                                <Label htmlFor="accept" className="text-sm leading-6">
                                    Tôi đồng ý với{" "}
                                    <button
                                        type="button"
                                        onClick={() => setOpenTerms(true)}
                                        className="text-[#d4af37] font-semibold hover:underline"
                                    >
                                        Điều khoản & Chính sách
                                    </button>
                                </Label>
                            </div>

                            {error && (
                                <p className="text-sm text-red-600">{error}</p>
                            )}

                            {/* Button */}
                            <Button
                                className="w-full mt-1 bg-gradient-to-r from-[#d4af37] to-[#f6e75c] text-black font-semibold shadow-md hover:from-[#c19a2b] hover:to-[#e6d94a] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                                disabled={!accepted}
                            >
                                Đăng ký
                            </Button>
                        </form>
                    </CardContent>

                    {/* Footer */}
                    <CardFooter className="flex justify-center pb-6">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Đã có tài khoản?{" "}
                            <a href="/login" className="text-[#d4af37] font-semibold hover:underline">
                                Đăng nhập
                            </a>
                        </p>
                    </CardFooter>
                </MagicCard>
            </Card>

            {/* TERMS MODAL */}
            {openTerms && (
                <div
                    role="dialog"
                    aria-modal="true"
                    className="fixed inset-0 z-50 flex items-center justify-center"
                >
                    {/* backdrop */}
                    <div
                        className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"
                        onClick={() => setOpenTerms(false)}
                    />
                    {/* content */}
                    <div className="relative z-10 mx-4 w-full max-w-3xl rounded-2xl bg-white dark:bg-[#1c1c1c] shadow-2xl ring-1 ring-border/60">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-border/60">
                            <h3 className="text-xl font-semibold text-[#d4af37]">
                                Điều khoản sử dụng & Chính sách bảo mật
                            </h3>
                            <button
                                className="rounded-md px-2 py-1 text-sm hover:bg-black/5 dark:hover:bg-white/5"
                                onClick={() => setOpenTerms(false)}
                                aria-label="Đóng"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="max-h-[70vh] overflow-y-auto px-6 py-5 space-y-5 text-sm leading-6">
                            {/* ====== ĐIỀU KHOẢN SỬ DỤNG ====== */}
                            <section>
                                <h4 className="text-lg font-semibold mb-2">1. Giới thiệu</h4>
                                <p>
                                    Chào mừng bạn đến với nền tảng <strong>Phúc Lộc Sim</strong>. Khi sử dụng
                                    website/dịch vụ của chúng tôi, bạn đồng ý tuân thủ các Điều khoản sử dụng này
                                    (“Điều khoản”). Vui lòng đọc kỹ trước khi đăng ký tài khoản hoặc sử dụng.
                                </p>
                            </section>

                            <section>
                                <h4 className="text-lg font-semibold mb-2">2. Tài khoản & Bảo mật</h4>
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>Thông tin bạn cung cấp phải chính xác, đầy đủ và được cập nhật.</li>
                                    <li>Bạn chịu trách nhiệm giữ bí mật thông tin đăng nhập và mọi hoạt động phát sinh từ tài khoản.</li>
                                    <li>Thông báo ngay cho chúng tôi nếu phát hiện truy cập trái phép.</li>
                                </ul>
                            </section>

                            <section>
                                <h4 className="text-lg font-semibold mb-2">3. Dịch vụ tư vấn & nội dung</h4>
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>Các phân tích phong thủy/đề xuất số chỉ mang tính tham khảo, không phải cam kết tài chính hay bảo đảm kết quả.</li>
                                    <li>Chúng tôi có thể thay đổi, tạm ngừng hoặc ngừng cung cấp một phần/ toàn bộ dịch vụ để bảo trì hoặc nâng cấp.</li>
                                </ul>
                            </section>

                            <section>
                                <h4 className="text-lg font-semibold mb-2">4. Hành vi bị cấm</h4>
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>Gian lận, giả mạo thông tin, can thiệp hệ thống, phát tán mã độc.</li>
                                    <li>Sao chép, khai thác dữ liệu tự động (scraping) khi chưa có văn bản cho phép.</li>
                                    <li>Đăng tải nội dung vi phạm pháp luật, bản quyền, thuần phong mỹ tục.</li>
                                </ul>
                            </section>

                            <section>
                                <h4 className="text-lg font-semibold mb-2">5. Thanh toán & hoàn tiền</h4>
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>Phí dịch vụ (nếu có) sẽ được hiển thị rõ trước khi thanh toán.</li>
                                    <li>Chính sách hoàn tiền: chỉ áp dụng khi dịch vụ chưa được cung cấp hoặc lỗi phát sinh do hệ thống của chúng tôi, tùy từng trường hợp cụ thể.</li>
                                </ul>
                            </section>

                            <section>
                                <h4 className="text-lg font-semibold mb-2">6. Quyền sở hữu trí tuệ</h4>
                                <p>
                                    Toàn bộ nội dung, nhãn hiệu, thiết kế, mã nguồn thuộc quyền sở hữu của
                                    Phúc Lộc Sim hoặc các bên cấp phép. Bạn không được sao chép, phân phối lại khi
                                    chưa có chấp thuận bằng văn bản.
                                </p>
                            </section>

                            <section>
                                <h4 className="text-lg font-semibold mb-2">7. Giới hạn trách nhiệm</h4>
                                <p>
                                    Chúng tôi không chịu trách nhiệm cho các thiệt hại gián tiếp, ngẫu nhiên, hay hậu
                                    quả phát sinh do việc sử dụng/không thể sử dụng dịch vụ, trong phạm vi cho phép
                                    của pháp luật.
                                </p>
                            </section>

                            <section>
                                <h4 className="text-lg font-semibold mb-2">8. Chấm dứt</h4>
                                <p>
                                    Chúng tôi có quyền tạm khóa hoặc chấm dứt tài khoản nếu bạn vi phạm Điều khoản
                                    hoặc có dấu hiệu rủi ro an ninh, pháp lý.
                                </p>
                            </section>

                            <section>
                                <h4 className="text-lg font-semibold mb-2">9. Thay đổi Điều khoản</h4>
                                <p>
                                    Điều khoản có thể được cập nhật theo thời gian. Bản cập nhật sẽ có hiệu lực kể
                                    từ khi đăng trên website. Tiếp tục sử dụng dịch vụ đồng nghĩa bạn chấp nhận các
                                    thay đổi.
                                </p>
                            </section>

                            {/* ====== CHÍNH SÁCH BẢO MẬT ====== */}
                            <section>
                                <h4 className="text-lg font-semibold mt-6 mb-2">10. Thu thập dữ liệu cá nhân</h4>
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>Dữ liệu bạn cung cấp: họ tên, email, số điện thoại, thông tin thanh toán (nếu có).</li>
                                    <li>Dữ liệu kỹ thuật: cookie, địa chỉ IP, thông tin trình duyệt/thiết bị, hành vi trên website.</li>
                                </ul>
                            </section>

                            <section>
                                <h4 className="text-lg font-semibold mb-2">11. Mục đích sử dụng dữ liệu</h4>
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>Cung cấp dịch vụ tư vấn, chăm sóc khách hàng, gửi thông báo.</li>
                                    <li>Cải thiện trải nghiệm, phân tích hiệu năng, phòng chống gian lận.</li>
                                    <li>Tuân thủ yêu cầu pháp lý khi có cơ quan có thẩm quyền yêu cầu hợp lệ.</li>
                                </ul>
                            </section>

                            <section>
                                <h4 className="text-lg font-semibold mb-2">12. Chia sẻ với bên thứ ba</h4>
                                <p>
                                    Chúng tôi chỉ chia sẻ dữ liệu với nhà cung cấp dịch vụ liên quan (lưu trữ, thanh
                                    toán, phân tích) theo hợp đồng và yêu cầu bảo mật; hoặc khi pháp luật yêu cầu.
                                </p>
                            </section>

                            <section>
                                <h4 className="text-lg font-semibold mb-2">13. Lưu trữ & bảo mật</h4>
                                <p>
                                    Dữ liệu được lưu trữ theo tiêu chuẩn bảo mật hợp lý. Thời hạn lưu trữ phụ thuộc mục
                                    đích sử dụng, yêu cầu pháp luật hoặc cho đến khi bạn yêu cầu xóa và không còn nghĩa
                                    vụ pháp lý nào phát sinh.
                                </p>
                            </section>

                            <section>
                                <h4 className="text-lg font-semibold mb-2">14. Quyền của chủ thể dữ liệu</h4>
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>Quyền truy cập, chỉnh sửa, yêu cầu xóa dữ liệu cá nhân.</li>
                                    <li>Quyền rút lại sự đồng ý (không ảnh hưởng hồi tố tới xử lý hợp pháp trước đó).</li>
                                    <li>Liên hệ chúng tôi để thực hiện quyền theo mục 16.</li>
                                </ul>
                            </section>

                            <section>
                                <h4 className="text-lg font-semibold mb-2">15. Cookie</h4>
                                <p>
                                    Chúng tôi dùng cookie cho đăng nhập, ghi nhớ tùy chọn và phân tích. Bạn có thể
                                    tắt cookie trong trình duyệt, nhưng một số tính năng có thể hoạt động không tối ưu.
                                </p>
                            </section>

                            <section>
                                <h4 className="text-lg font-semibold mb-2">16. Liên hệ</h4>
                                <p>
                                    Email hỗ trợ: <a className="underline" href="mailto:support@phuclocsim.vn">support@phuclocsim.vn</a> <br />
                                    Hotline: 0900 000 000 (giờ hành chính)
                                </p>
                            </section>
                        </div>

                        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border/60">
                            <button
                                onClick={() => setOpenTerms(false)}
                                className="rounded-xl px-4 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/5"
                            >
                                Đóng
                            </button>
                            <button
                                onClick={() => {
                                    setAccepted(true);
                                    setOpenTerms(false);
                                    setError(null);
                                }}
                                className="rounded-xl px-4 py-2 text-sm font-semibold bg-[#d4af37] hover:bg-[#c19a2b] text-black"
                            >
                                Tôi đã đọc & đồng ý
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
