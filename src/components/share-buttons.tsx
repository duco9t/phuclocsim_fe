"use client";

import { FaCopy, FaFacebookF } from "react-icons/fa";
import { SiTiktok, SiZalo } from "react-icons/si";

export function ShareButtons() {
    if (typeof window === "undefined") return null;
    const shareUrl = window.location.href;

    const handleCopy = () => {
        navigator.clipboard.writeText(shareUrl);
        alert("Đã sao chép liên kết!");
    };

    return (
        <div className="flex flex-wrap gap-4 mt-6">
            <button
                onClick={() =>
                    window.open(
                        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                            shareUrl
                        )}`,
                        "_blank"
                    )
                }
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
                <FaFacebookF /> Facebook
            </button>

            <button
                onClick={() =>
                    window.open(
                        `https://zalo.me/share?url=${encodeURIComponent(shareUrl)}`,
                        "_blank"
                    )
                }
                className="flex items-center gap-2 px-4 py-2 bg-blue-400 text-white rounded-md hover:bg-blue-500 transition"
            >
                <SiZalo /> Zalo
            </button>

            <button
                onClick={() =>
                    window.open(
                        `https://www.tiktok.com/share/video?url=${encodeURIComponent(
                            shareUrl
                        )}`,
                        "_blank"
                    )
                }
                className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
            >
                <SiTiktok /> TikTok
            </button>

            <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded-md hover:bg-gray-400 dark:hover:bg-gray-600 transition"
            >
                <FaCopy /> Sao chép liên kết
            </button>
        </div>
    );
}
