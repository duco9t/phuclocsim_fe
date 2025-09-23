// src/app/blog/[slug]/page.tsx
import { ShareButtons } from "@/components/share-buttons";
import { notFound } from "next/navigation";

// ---- Metadata cho tab trình duyệt ----
export async function generateMetadata({ params }: { params: { slug: string } }) {
    const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3009";
    const res = await fetch(`${base}/api/blog/${params.slug}`, { cache: "no-store" });
    const data = await res.json();
    const post = data?.data;
    if (!data?.success || !post) return { title: "Không tìm thấy bài viết", description: "" };
    return { title: `${post.title} - Phúc Lộc Sim`, description: post.description || "" };
}

// ---- Component chính ----
export default async function PostPage({ params }: { params: { slug: string } }) {
    const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3009";
    const res = await fetch(`${base}/api/blog/${params.slug}`, { cache: "no-store" });
    const data = await res.json();
    const post = data?.data;
    if (!data?.success || !post) return notFound();

    return (
        <main className="max-w-4xl mx-auto px-6 py-12">
            {/* Title */}
            <h1 className="text-4xl font-bold mb-2 text-[#d4af37]">
                {post.title}
            </h1>

            {/* Date + Author */}
            {post.createdAt && (
                <p className="text-[#8d6e63] mb-4">
                    {new Date(post.createdAt).toLocaleString()} {post.author ? `• ${post.author}` : ""}
                </p>
            )}

            {/* Description */}
            {post.description && (
                <p className="text-[#3e2723] mb-8">{post.description}</p>
            )}

            {/* Content (HTML) */}
            <article className="prose max-w-none dark:prose-invert mb-8" dangerouslySetInnerHTML={{ __html: post.content || "" }} />

            {/* Share buttons */}
            <div className="border-t border-[#d4af37]/30 pt-6">
                <ShareButtons />
            </div>
        </main>
    );
}

