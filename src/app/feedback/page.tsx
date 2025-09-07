"use client";

import { Button } from "@/components/ui/ButtonNew";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { useState } from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";

interface Feedback {
    id: number;
    name?: string;      // optional, hiển thị nếu muốn
    username: string;   // bắt buộc
    text: string;
    image?: string;
}

const initialFeedbacks: Feedback[] = [
    { id: 1, name: "Nguyen Van A", username: "nguyenvana", text: "Dịch vụ rất tốt, sim phong thủy giúp tôi may mắn hơn!", image: "https://tiki.vn/blog/wp-content/uploads/2023/11/sim-phong-thuy.jpg" },
    { id: 2, username: "tranthib", text: "Rất hài lòng với cách tư vấn, sẽ giới thiệu cho bạn bè." },
    { id: 3, username: "nguyenvanc", text: "Sim rất đẹp, dịch vụ hỗ trợ nhanh chóng." },
    { id: 4, username: "levand", text: "Cảm ơn Phúc Lộc Sim đã tư vấn nhiệt tình." },
    { id: 5, username: "phamthie", text: "Rất hài lòng, sẽ giới thiệu cho bạn bè và người thân." },
    { id: 6, username: "nguyenvanf", text: "Sim hợp phong thủy giúp tôi tự tin hơn." },
    { id: 7, username: "nguyenvang", text: "Tư vấn viên nhiệt tình, sim đẹp, dịch vụ tốt." },
];

export default function FeedbackPage() {
    const [feedbacks, setFeedbacks] = useState<Feedback[]>(initialFeedbacks);
    const [visibleCount, setVisibleCount] = useState(4);
    const [expanded, setExpanded] = useState(false);

    const [username, setUsername] = useState("");
    const [text, setText] = useState("");
    const [image, setImage] = useState<File | null>(null);

    const handleShowMore = () => {
        setVisibleCount(feedbacks.length);
        setExpanded(true);
    };

    const handleCollapse = () => {
        setVisibleCount(4);
        setExpanded(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newFeedback: Feedback = {
            id: feedbacks.length + 1,
            username,
            text,
            image: image ? URL.createObjectURL(image) : undefined,
        };
        setFeedbacks([newFeedback, ...feedbacks]);
        setUsername("");
        setText("");
        setImage(null);
        if (!expanded) setVisibleCount(4);
    };

    return (
        <main className="max-w-5xl mx-auto px-6 py-12 space-y-8">
            {/* <link href="https://cdn.jsdelivr.net/npm/daisyui@5" rel="stylesheet" type="text/css" /> */}
            <h1 className="text-4xl font-bold text-yellow-600 text-center mb-8">Phản hồi khách hàng</h1>

            {/* Feedback hiển thị */}
            <div className="grid md:grid-cols-2 gap-6 relative">
                {feedbacks.slice(0, visibleCount).map((fb) => (
                    <motion.div
                        key={fb.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Card className="shadow-md">
                            <CardHeader>
                                <CardTitle>{fb.name ? `${fb.name} (${fb.username})` : fb.username}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <p>{fb.text}</p>
                                {fb.image && <img src={fb.image} alt="Feedback Image" className="w-full h-auto rounded-md" />}
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}

                {!expanded && feedbacks.length > visibleCount && (
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#fff8e1] dark:from-gray-900/90 pointer-events-none"></div>
                )}
            </div>

            {/* Nút xem thêm / ẩn đi */}
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
            <Card className="p-6 shadow-lg">
                <CardHeader>
                    <CardTitle>Gửi phản hồi của bạn</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                placeholder="Nhập username của bạn"
                            />
                        </div>
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
                            <Label htmlFor="image">Ảnh (tùy chọn)</Label>
                            <Input
                                id="image"
                                type="file"
                                accept="image/*"
                                onChange={(e) => setImage(e.target.files?.[0] ?? null)}
                            />
                        </div>
                        <Button type="submit" className="bg-yellow-600 text-white hover:bg-yellow-500">
                            Gửi phản hồi
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </main>
    );
}
