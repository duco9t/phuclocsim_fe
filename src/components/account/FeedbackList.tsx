"use client";

import { Feedback } from "@/types/feedback";
import { User } from "@/types/user";
import { useEffect, useState } from "react";

interface Props {
    user: User;
    reloadFlag?: number;
}

export default function FeedbackList({ user, reloadFlag }: Props) {
    const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

    useEffect(() => {
        fetch(`https://sim-phong-thuy-backend-production.up.railway.app/api/feedback/get-details/${user._id}`)
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data.data)) {
                    setFeedbacks(data.data);
                }
            });
    }, [user._id, reloadFlag]);

    return (
        <div className="border rounded-lg p-4 shadow-sm bg-white">
            <h2 className="text-xl font-semibold mb-3 text-gray-800">
                Đánh giá của bạn
            </h2>
            {feedbacks.length === 0 ? (
                <p className="text-gray-500">Bạn chưa có đánh giá nào.</p>
            ) : (
                <ul className="space-y-4">
                    {feedbacks.map((fb) => (
                        <li
                            key={fb._id}
                            className="border rounded-lg p-4 bg-gray-50 hover:bg-gray-100"
                        >
                            {/* Tên + Thời gian */}
                            <div className="flex justify-between items-center mb-2">
                                <p className="font-semibold text-gray-800">{fb.customerName}</p>
                                <p className="text-xs text-gray-500">
                                    {new Date(fb.createdAt).toLocaleString("vi-VN", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </p>
                            </div>

                            {/* Rating sao */}
                            <p className="flex items-center text-yellow-500 mb-2">
                                {"★".repeat(fb.rating)}
                                {"☆".repeat(5 - fb.rating)}
                                <span className="ml-2 text-sm text-gray-700">
                                    {fb.rating}/5
                                </span>
                            </p>

                            {/* Nội dung đánh giá */}
                            <p className="text-gray-700">{fb.message}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
