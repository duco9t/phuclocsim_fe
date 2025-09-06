// app/sim-form/page.tsx
import { Nothing } from "@/components/nothing";
import { PhucLocSim } from "@/components/PhucLocSim";
import { SimForm } from "@/components/SimFormSimple";


import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Luận Sim Phong Thủy - Phúc Lộc Sim",
  description: "Điền thông tin để nhận kết quả phân tích phong thủy sim nhanh chóng.",
};

export default function Page() {
  return (
    <>
      {/* <link href="https://cdn.jsdelivr.net/npm/daisyui@5" rel="stylesheet" type="text/css" /> */}
      <PhucLocSim />
      <SimForm />
      <Nothing />
    </>
  );
}
