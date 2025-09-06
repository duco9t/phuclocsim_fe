import RotatingText from "@/components/ui/rotating-text"


export function RotatingText1() {
  return (
    <div className="w-full md:w-11/12 lg:w-10/12 p-10 flex justify-center items-center flex-col text-center mx-auto mb-20 -mt-40">
      <RotatingText
        text={[
          { data: "Phúc Lộc Sim", className: "text-7xl font-bold text-[#3e2723]" },
          { data: " '' Trao tài lộc, đón thành công", className: "text-2xl text-[#3e2723]" },
          { data: "Sim phong thủy – Hợp tuổi, hợp mệnh", className: "text-2xl text-[#3e2723]" },
          { data: "Giúp công việc hanh thông, tình duyên viên mãn ''", className: "text-2xl text-[#3e2723]" },
        ]}
      />
    </div>
  )
}
