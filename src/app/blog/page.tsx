import Link from "next/link";

export const metadata = {
    title: "Blog - Phúc Lộc Sim",
    description:
        "Chia sẻ kiến thức phong thủy sim, cách chọn sim hợp tuổi, mẹo chọn số điện thoại may mắn.",
};

async function getPosts() {
    try {
        const base = process.env.NEXT_PUBLIC_API_URL || "https://sim-phong-thuy-backend-production.up.railway.app";
        const response = await fetch(base + "/api/blog", {
            cache: 'no-store' // hoặc có thể dùng revalidate: 60 cho cache
        });
        const data = await response.json();

        if (data?.success && Array.isArray(data.data)) {
            return data.data.map((b: { slug: string; title: string; summary?: string }) => ({
                slug: b.slug,
                title: b.title,
                summary: b.summary || "" // Đổi từ description thành summary
            }));
        }
        return [];
    } catch (error) {
        console.error('Error fetching posts:', error);
        return [];
    }
}

export default async function BlogPage() {
    const posts = await getPosts();

    return (
        <main className="max-w-6xl mx-auto px-6 py-12">
            <h1 className="text-4xl font-bold mb-12 text-center text-yellow-600">
                Blog / Tin tức
            </h1>
            <div className="grid md:grid-cols-2 gap-8">
                {posts.map((post: { slug: string; title: string; summary?: string }) => (
                    <Link
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        className="group block rounded-xl border border-yellow-200 dark:border-yellow-600 p-6 bg-white dark:bg-gray-900 shadow-md hover:shadow-2xl hover:border-red-400 dark:hover:border-red-500 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]"
                    >
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2 group-hover:text-red-600 dark:group-hover:text-yellow-400 transition-colors duration-300">
                            {post.title}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
                            {post.summary || "Chưa có tóm tắt..."}
                        </p>
                        <span className="mt-4 inline-block text-yellow-600 dark:text-yellow-400 group-hover:text-red-600 dark:group-hover:text-yellow-300 font-medium transition-colors duration-300">
                            Đọc tiếp →
                        </span>
                    </Link>
                ))}
            </div>
        </main>
    );
}