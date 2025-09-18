"use client";

import { User } from "@/types/user";
import { Star } from "lucide-react";
import { useState } from "react";

interface Props {
    user: User;
    onSubmitted?: () => void;
}

export default function FeedbackForm({ user, onSubmitted }: Props) {
    const [message, setMessage] = useState("");
    const [rating, setRating] = useState(5);
    const [hover, setHover] = useState(0);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!message.trim()) {
            alert("Vui lòng nhập nội dung đánh giá!");
            return;
        }
        setLoading(true);
        try {
            const res = await fetch("http://localhost:3009/api/feedback/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message, rating, userId: user._id }),
            });
            const data = await res.json();
            alert(data.message || "Gửi đánh giá thành công!");
            setMessage("");
            setRating(5);
            onSubmitted?.();
        } catch {
            alert("Lỗi khi gửi đánh giá");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-auto border rounded-2xl p-6 shadow-md bg-white">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Gửi đánh giá</h2>

            <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Chia sẻ cảm nhận của bạn..."
                rows={4}
                className="w-full border border-gray-300 rounded-xl p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
            />

            <div className="flex items-center gap-3 mb-4">
                <label className="text-gray-700 font-medium">Đánh giá:</label>
                <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                            key={star}
                            size={28}
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHover(star)}
                            onMouseLeave={() => setHover(0)}
                            className={`cursor-pointer transition ${(hover || rating) >= star
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                                }`}
                        />
                    ))}
                </div>
            </div>

            <button
                onClick={handleSubmit}
                disabled={loading}
                className={`w-full py-3 rounded-xl font-semibold transition cursor-pointer
    ${loading
                        ? "bg-yellow-300 text-gray-700 cursor-not-allowed"
                        : "bg-[#f6e75c] text-[#3e2723] hover:bg-[#e6d64f]"
                    }`}
            >
                {loading ? "Đang gửi..." : "Gửi đánh giá"}
            </button>
        </div>
    );
}
