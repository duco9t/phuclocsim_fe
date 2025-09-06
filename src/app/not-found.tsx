import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-6xl font-bold mb-4 text-yellow-600">404</h1>
      <p className="text-lg mb-6 text-[#a0522d]">Trang bạn tìm không tồn tại.</p>
      <Link
        href="/"
        className="px-6 py-3 rounded-lg bg-yellow-600 text-white hover:bg-red-600 transition-colors"
      >
        Quay về trang chủ
      </Link>
    </div>
  );
}