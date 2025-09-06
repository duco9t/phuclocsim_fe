// src/app/blog/[slug]/page.tsx
import { CodeBlock } from "@/components/code-block";
import { ShareButtons } from "@/components/share-buttons";
import { Table } from "@/components/table";
import { format } from "date-fns";
import { notFound } from "next/navigation";

const posts = [
    {
        slug: "sim-phong-thuy-la-gi",
        title: "Sim phong thủy là gì",
        description: "Tìm hiểu sim phong thủy, ý nghĩa các con số trong phong thủy sim điện thoại.",
        author: "Admin Phúc Lộc Sim",
        date: new Date("2025-09-01T10:00:00"),
        images: [
            "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/486536yJw/anh-mo-ta.png",
            "https://mobifonehanoi.vn/medias/500/1636359386_sim-hop-menh-tho-1.-min.png",
        ],
        content: [
            <p key="intro1">Sim phong thủy là các số điện thoại được lựa chọn theo nguyên tắc phong thủy nhằm tăng tài lộc, may mắn...</p>,
            <h2 key="header1">Ý nghĩa các con số</h2>,
            <Table
                key="table1"
                headers={["Số", "Ý nghĩa"]}
                rows={[
                    ["6", "Tài lộc"],
                    ["8", "Phát đạt"],
                    ["9", "Trường thọ"],
                ]}
            />,
            <ul key="list1" className="list-disc ml-6 mb-4">
                <li>Lợi ích 1: Tăng may mắn</li>
                <li>Lợi ích 2: Hài hòa âm dương</li>
            </ul>,
            <CodeBlock
                key="code1"
                code={`function calculateLuckyNumber(phoneNumber) {
  return phoneNumber.split('').reduce((a,b)=>a+Number(b),0);
}`}
            />,
        ],
    },
    {
        slug: "cach-chon-sim-hop-tuoi",
        title: "Cách chọn sim hợp tuổi",
        description: "Hướng dẫn chọn sim theo tuổi, cung mệnh để tăng may mắn và tài lộc.",
        author: "Admin Phúc Lộc Sim",
        date: new Date("2025-09-05T14:30:00"),
        images: [
            "https://chat.saymee.vn/public/media/64-que-trong-kinh-dich-1692691749013.png",
            "https://thanglongdaoquan.vn/wp-content/uploads/tim-sim-phong-thuy-theo-menh-sim.jpg",
            "https://photo2.tinhte.vn/data/attachment-files/2024/10/8469510_Dich_vu_chon_sim_phong_thuy.jpg",
        ],
        content: [
            <p key="intro2">Chọn sim hợp tuổi giúp bạn cân bằng âm dương, tăng năng lượng tích cực...</p>,
            <h2 key="header2-1">Bước 1: Xác định tuổi và cung mệnh</h2>,
            <ul key="list2-1" className="list-disc ml-6 mb-4">
                <li>Tuổi âm lịch</li>
                <li>Cung mệnh theo ngũ hành</li>
            </ul>,
            <h2 key="header2-2">Bước 2: Tính tổng số hợp tuổi</h2>,
            <Table
                key="table2"
                headers={["Sim", "Tổng số", "Kết quả"]}
                rows={[
                    ["0909xxxxxx", "36", "Hợp"],
                    ["0912xxxxxx", "42", "Không hợp"],
                ]}
            />,
            <CodeBlock
                key="code2"
                code={`function isLucky(totalNumber, age) {
  return (totalNumber + age) % 9 === 0;
}`}
            />,
        ],
    },
];

// ---- Metadata cho tab trình duyệt ----
export async function generateMetadata({ params }: { params: { slug: string } }) {
    const post = posts.find(p => p.slug === params.slug);
    if (!post) {
        return {
            title: "Không tìm thấy bài viết",
            description: "",
        };
    }
    return {
        title: `${post.title} - Phúc Lộc Sim`,
        description: post.description,
    };
}

// ---- Component chính ----
export default function PostPage({ params }: { params: { slug: string } }) {
    const post = posts.find(p => p.slug === params.slug);
    if (!post) return notFound();

    return (
        <main className="max-w-4xl mx-auto px-6 py-12">
            {/* Title */}
            <h1 className="text-4xl font-bold mb-2 text-[#d4af37]">
                {post.title}
            </h1>

            {/* Date + Author */}
            <p className="text-[#8d6e63] mb-4">
                {format(post.date, "dd/MM/yyyy HH:mm")} • {post.author}
            </p>

            {/* Description */}
            <p className="text-[#3e2723] mb-8">
                {post.description}
            </p>

            {/* Images */}
            {post.images.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {post.images.map((img, idx) => (
                        <img
                            key={idx}
                            src={img}
                            alt={`${post.title} - ảnh ${idx + 1}`}
                            className="w-full h-auto rounded-lg shadow-md object-cover border border-[#d4af37]/30"
                            loading="lazy"
                        />
                    ))}
                </div>
            )}

            {/* Content */}
            <article className="prose max-w-none dark:prose-invert mb-8">
                {post.content.map((item, idx) => (
                    <div
                        key={idx}
                        className="prose-headings:text-[#b71c1c] prose-p:text-[#3e2723] prose-li:text-[#3e2723]"
                    >
                        {item}
                    </div>
                ))}
            </article>

            {/* Share buttons */}
            <div className="border-t border-[#d4af37]/30 pt-6">
                <ShareButtons />
            </div>
        </main>
    );
}

