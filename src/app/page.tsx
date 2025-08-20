import Footer from "@/components/footer";
import Header from "@/components/header";
import { Globe } from "@/components/magicui/globe";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <link href="https://cdn.jsdelivr.net/npm/daisyui@5" rel="stylesheet" type="text/css" />
      {/* Header luôn ở trên */}
      <Header />

      {/* Tầng nội dung chính */}
      <main className="flex-1 relative">
        {/* Globe nằm dưới content nếu muốn làm background */}
        <Globe />
      </main>

      {/* Footer luôn ở dưới */}
      <Footer />
    </div>
  );
}
