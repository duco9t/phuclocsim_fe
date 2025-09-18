"use client";

import { Button } from "@/components/ui/ButtonNew";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";

/**
 * Feedback page:
 * - fetches all feedbacks from GET /api/feedback/getAll
 * - allows logged-in users to post feedback via POST /api/feedback/create
 * - if not logged in => form is dimmed and only shows login CTA
 */

type LocalFeedback = {
    _id?: string; // may exist from API
    id?: number; // for local ones
    customerName?: string;
    username?: string;
    text: string;
    message?: string;
    rating?: number;
    imageUrl?: string;
    createdAt?: string;
};

export default function FeedbackPage() {
    const { user } = useAuth();
    const isLogged = !!user;
    const [feedbacks, setFeedbacks] = useState<LocalFeedback[]>([]);
    const [visibleCount, setVisibleCount] = useState(4);
    const [expanded, setExpanded] = useState(false);

    // form
    const [username, setUsername] = useState("");
    const [text, setText] = useState("");
    const [rating, setRating] = useState<number>(5);
    const [image, setImage] = useState<File | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [loadingSubmit, setLoadingSubmit] = useState(false);

    const fetchFeedbacks = async () => {
        try {
            const res = await fetch("http://localhost:3009/api/feedback/getAll");
            const json = await res.json();
            // API shape: { status, success, data: [...] }
            const items: any[] = Array.isArray(json?.data) ? json.data : [];
            const mapped = items.map((it) => ({
                _id: it._id,
                customerName: it.customerName,
                username: it.username ?? "",
                text: it.message ?? it.text ?? "",
                rating: typeof it.rating === "number" ? it.rating : 0,
                createdAt: it.createdAt,
                imageUrl: (it.imageUrls && it.imageUrls[0]) || it.videoUrl || undefined,
            }));
            setFeedbacks(mapped);
        } catch (err) {
            console.error("Cannot load feedbacks", err);
        }
    };

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    const handleShowMore = () => {
        setVisibleCount(feedbacks.length);
        setExpanded(true);
    };

    const handleCollapse = () => {
        setVisibleCount(4);
        setExpanded(false);
    };

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!isLogged) return;
        if (!text.trim()) {
            alert("Vui lòng nhập nội dung phản hồi");
            return;
        }
        setLoadingSubmit(true);
        try {
            const payload: any = {
                userId: user._id,
                message: text,
                rating,
            };
            const res = await fetch("http://localhost:3009/api/feedback/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const json = await res.json();

            if (json?.success || json?.status === "OK") {
                await fetchFeedbacks();
                setText("");
                setRating(5);
                setImage(null);
                setUsername("");

                // 🔥 hiện popup thành công
                setSuccessMessage("Gửi phản hồi thành công!");
                setTimeout(() => setSuccessMessage(null), 3000);
            } else {
                alert(json?.message || "Không thể gửi phản hồi");
            }
        } catch (err) {
            console.error(err);
            alert("Lỗi khi gửi phản hồi");
        } finally {
            setLoadingSubmit(false);
        }
    };


    return (
        <main className="max-w-5xl mx-auto px-6 py-12 space-y-8">
            <h1 className="text-4xl font-bold text-yellow-600 text-center mb-8">
                Phản hồi khách hàng
            </h1>

            {/* Feedback list */}
            <div className="grid md:grid-cols-2 gap-6 relative">
                {feedbacks.slice(0, visibleCount).map((fb, idx) => (
                    <motion.div
                        key={fb._id ?? idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.28 }}
                    >
                        <Card className="shadow-md">
                            <CardHeader>
                                <CardTitle>
                                    {fb.customerName
                                        ? `${fb.customerName}${fb.username ? ` (${fb.username})` : ""}`
                                        : fb.username || "Người dùng"}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center text-yellow-500">
                                        {"★".repeat(fb.rating ?? 0)}
                                        {"☆".repeat(5 - (fb.rating ?? 0))}
                                        <span className="ml-2 text-sm text-gray-700">{fb.rating ?? 0}/5</span>
                                    </div>
                                    <div className="text-xs text-gray-400 ml-auto">
                                        {fb.createdAt
                                            ? new Date(fb.createdAt).toLocaleString("vi-VN", {
                                                day: "2-digit",
                                                month: "2-digit",
                                                year: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })
                                            : ""}
                                    </div>
                                </div>

                                <p className="text-gray-700">{fb.text}</p>

                                {fb.imageUrl && (
                                    <img
                                        src={fb.imageUrl}
                                        alt="feedback"
                                        className="w-full h-auto rounded-md object-cover"
                                    />
                                )}
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}

                {!expanded && feedbacks.length > visibleCount && (
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white pointer-events-none"></div>
                )}
            </div>

            {/* Show more / collapse */}
            <div className="flex justify-center">
                {!expanded && visibleCount < feedbacks.length && (
                    <Button
                        onClick={handleShowMore}
                        className="flex items-center gap-2 bg-yellow-600 text-white hover:bg-yellow-500 transition-transform transform hover:scale-105"
                    >
                        Xem thêm
                        <HiChevronDown className="w-5 h-5" />
                    </Button>
                )}
                {expanded && (
                    <Button
                        onClick={handleCollapse}
                        className="flex items-center gap-2 bg-gray-200 text-gray-800 hover:bg-[#d4af37] transition-transform transform hover:scale-105"
                    >
                        Ẩn đi
                        <HiChevronUp className="w-5 h-5" />
                    </Button>
                )}
            </div>

            {/* Form gửi phản hồi */}
            <Card className="p-6 shadow-lg relative">
                <CardHeader>
                    <CardTitle>Gửi phản hồi của bạn</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 relative">
                    {isLogged ? (
                        // --- Nếu đã đăng nhập thì hiện form ---
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="text">Nội dung</Label>
                                <Textarea
                                    id="text"
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    required
                                    placeholder="Nhập phản hồi của bạn"
                                />
                            </div>

                            <div>
                                <Label htmlFor="rating">Đánh giá</Label>
                                <div className="flex items-center gap-2">
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <button
                                            type="button"
                                            key={s}
                                            onClick={() => setRating(s)}
                                            className={`text-2xl leading-none ${(rating || 0) >= s ? "text-yellow-500" : "text-gray-300"
                                                }`}
                                            aria-label={`Chọn ${s} sao`}
                                        >
                                            ★
                                        </button>
                                    ))}
                                    <span className="ml-2 text-sm text-gray-500">{rating}/5</span>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className={`bg-yellow-600 text-white hover:bg-yellow-500 ${loadingSubmit ? "opacity-60 cursor-not-allowed" : ""
                                    }`}
                                disabled={loadingSubmit}
                            >
                                {loadingSubmit ? "Đang gửi..." : "Gửi phản hồi"}
                            </Button>
                        </form>
                    ) : (
                        // --- Nếu chưa đăng nhập thì hiện overlay với nút login ---
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Link href="/login">
                                <Button className="bg-[#f6e75c] text-[#3e2723] hover:bg-[#e6d64f] text-lg px-6 py-3 rounded-xl shadow-lg cursor-pointer">
                                    Đăng nhập để phản hồi
                                </Button>
                            </Link>
                        </div>
                    )}
                </CardContent>
            </Card>
            {successMessage && (
                <div className="fixed bottom-6 right-6 bg-green-500 text-white px-5 py-3 rounded-lg shadow-lg animate-bounce z-50">
                    {successMessage}
                </div>
            )}

        </main>
    );
}
