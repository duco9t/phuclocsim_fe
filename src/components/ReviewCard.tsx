"use client";

import { Marquee } from "@/components/magicui/marquee";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ApiFeedback {
  customerName?: string;
  source?: string;
  message: string;
}

interface Review {
  name: string;
  username: string;
  body: string;
  img: string;
}

const ReviewCard = ({ img, name, username, body }: Review) => {
  return (
    <figure
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <div className="relative w-8 h-8">
          <Image
            className="rounded-full"
            src={`https://avatar.vercel.sh/${encodeURIComponent(name)}?fallback=${encodeURIComponent(img)}&size=128`}
            alt={name}
            fill
            sizes="32px"
          />
        </div>
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">{name}</figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

// adapter map API -> Review
const mapFeedbackToReview = (fb: ApiFeedback): Review => ({
  name: fb.customerName || "Ẩn danh",
  username: fb.source || "Ẩn danh",
  body: fb.message,
  img: "/default-avatar.png",
});

export function MarqueeDemo() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(
          "https://sim-phong-thuy-backend-production.up.railway.app/api/feedback/getAll"
        );
        const data = await res.json();
        const feedbacks: ApiFeedback[] = Array.isArray(data.data) ? data.data : [];
        setReviews(feedbacks.map(mapFeedbackToReview));
      } catch (err) {
        console.error("❌ Lỗi fetch feedback:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  if (loading) return <p className="py-12 text-center text-gray-600">Đang tải feedback...</p>;
  if (!reviews.length) return <p className="py-12 text-center text-gray-600">Chưa có feedback nào.</p>;

  const half = Math.ceil(reviews.length / 2);
  const firstRow = reviews.slice(0, half);
  const secondRow = reviews.slice(half);

  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-12">
      <h2 className="mb-6 text-2xl font-bold text-center text-[#3e2723]">
        Khách hàng nói gì về chúng tôi
      </h2>

      <Marquee pauseOnHover className="[--duration:80s]">
        {firstRow.map((review, i) => (
          <ReviewCard key={i} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:80s]">
        {secondRow.map((review, i) => (
          <ReviewCard key={i} {...review} />
        ))}
      </Marquee>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[#fff5d7]"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[#fceec5]"></div>
    </div>
  );
}
