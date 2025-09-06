
import { ButtonDemo } from "@/components/ButtonDemo";
import { PhucLocSim } from "@/components/PhucLocSim";
import { RotatingText1 } from "@/components/RotatingTextDemo";
import { StrengthsSection } from "@/components/StrengthsSection";
import { Globe } from "@/components/magicui/globe";
import { MarqueeDemo } from "@/components/ReviewCard";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* <link href="https://cdn.jsdelivr.net/npm/daisyui@5" rel="stylesheet" type="text/css" /> */}
      {/* Tầng nội dung chính */}
      <main className=" relative">
        {/* Globe nằm dưới content nếu muốn làm background */}
        {/* <Globe /> */}
        <StrengthsSection />
        <PhucLocSim />
        <RotatingText1 />
        <ButtonDemo />
        <MarqueeDemo />
      </main>
    </div>
  );
}
