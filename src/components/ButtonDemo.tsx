import { Button3 } from "@/components/ui/button"
import { Globe } from "@/components/magicui/globe"

export function ButtonDemo() {
  return (
    <div className="relative w-full flex flex-col sm:flex-row gap-6 justify-center items-center">
      {/* Globe bên trái */}
      <div className="w-[300px] h-[300px] flex justify-center items-center">
        <Globe />
      </div>

      {/* CTA buttons bên phải */}
      <div className="flex flex-col sm:flex-row gap-4 my-10">
        <Button3 className="px-6 py-3 rounded-xl text-lg font-bold text-white bg-black hover:bg-yellow-500 hover:text-black shadow-md hover:shadow-lg transition">
          Luận sim ngay
        </Button3>
        <Button3 className="px-6 py-3 rounded-xl text-lg font-bold text-white bg-black hover:bg-yellow-500 hover:text-black shadow-md hover:shadow-lg transition">
          Đặt lịch tư vấn
        </Button3>
      </div>
    </div>
  )
}
