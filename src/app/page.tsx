
import { ButtonDemo } from "@/components/ButtonDemo";
import { MarqueeDemo } from "@/components/ReviewCard";
import { RotatingText1 } from "@/components/RotatingTextDemo";
import { StrengthsSection } from "@/components/StrengthsSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#fff8e1] to-[#fceabb]">
      {/* <link href="https://cdn.jsdelivr.net/npm/daisyui@5" rel="stylesheet" type="text/css" /> */}
      {/* Tầng nội dung chính */}
      <main className=" relative">
        {/* Globe nằm dưới content nếu muốn làm background */}
        {/* <Globe /> */}
        <RotatingText1 />
        {/* <PhucLocSim /> */}
        <ButtonDemo />
        <MarqueeDemo />
        <StrengthsSection />
      </main>
    </div>
  );
}
