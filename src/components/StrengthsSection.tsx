import { Testimonial } from "@/components/ui/testimonial"

export function StrengthsSection() {
  const strengths = [
    {
      title: "Luận Sim Chuyên Sâu",
      subTitle: "Phân tích theo ngày sinh & mệnh",
      description:
        "Mỗi sim đều được phân tích kỹ lưỡng dựa trên ngày sinh, bản mệnh và mục tiêu của bạn. \n Giúp chọn đúng con số mang năng lượng tích cực và phù hợp nhất.",
    },
    {
      title: "Kho Sim Đa Dạng",
      subTitle: "Sim phong thủy – Sim số đẹp",
      description:
        "Hàng ngàn số điện thoại được cập nhật liên tục: \n Sim thần tài, sim năm sinh, sim doanh nhân… \n Đáp ứng đầy đủ mọi nhu cầu cá nhân và công việc.",
    },
    {
      title: "Uy Tín – Tận Tâm",
      subTitle: "Minh bạch & Chuyên nghiệp",
      description:
        "Cam kết giá cả rõ ràng, dịch vụ nhanh chóng. \n Đội ngũ tư vấn tận tâm, đồng hành cùng bạn \n trong hành trình chọn số hợp mệnh, đón tài lộc.",
    },
  ]

  return (
    <Testimonial
      data={strengths}
      backgroundUrl="https://static.videezy.com/system/resources/previews/000/007/313/original/Plexus.mp4"
      backgroundClassName="absolute top-0 left-0 w-screen h-[90vh] object-cover -z-0 opacity-20"
      containerClassName="relative bg-gradient-to-r from-amber-900 via-red-900 to-yellow-800 text-white w-screen h-[90vh]"
      animationDuration={5000}
      contentWrapperClassName="w-full md:w-11/12 lg:w-10/12 p-10"
      titleTextClassName="text-[1.75rem] md:text-[2rem] lg:text-[2.5rem] text-yellow-300"
      subtitleTextClassName="text-2xl lg:text-3xl text-white"
      descriptionTextClassName="text-base md:text-lg text-white/90"
    />
  )
}
