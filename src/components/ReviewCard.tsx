import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";

const reviews = [
  {
    name: "Minh",
    username: "@minh",
    body: "UI xịn xò 😍, web load nhanh vãi, bấm phát ra kq liền, ko cần chờ lâu.",
    img: "https://avatar.vercel.sh/minh",
  },
  {
    name: "Hà",
    username: "@ha",
    body: "Luận sim đọc dễ hiểu ghê, ngắn gọn mà đủ ý, ko bị lan man 🫶.",
    img: "https://avatar.vercel.sh/ha",
  },
  {
    name: "Phúc",
    username: "@phuc",
    body: "Đặt lịch tư vấn nhanh cực, 5p sau có ng gọi confirm r, uy tín phết 👍.",
    img: "https://avatar.vercel.sh/phuc",
  },
  {
    name: "Lan",
    username: "@lan",
    body: "Web nhìn tối giản mà đẹp, đúng gu tui, ko màu mè nhưng xài thích 🖤.",
    img: "https://avatar.vercel.sh/lan",
  },
  {
    name: "Nam",
    username: "@nam",
    body: "Trải nghiệm mượt, ko lag, click đâu ăn đó, gọn lẹ 😎.",
    img: "https://avatar.vercel.sh/nam",
  },
  {
    name: "Vy",
    username: "@vy",
    body: "Công cụ luận sim dễ xài vl, nhập số xong auto phân tích, chill thật 😆.",
    img: "https://avatar.vercel.sh/vy",
  },
  {
    name: "Tùng",
    username: "@tung",
    body: "Đỡ pải ib fb hỏi lòng vòng, vô web cái xong luôn, tiết kiệm tgian 👌.",
    img: "https://avatar.vercel.sh/tung",
  },
  {
    name: "Hương",
    username: "@huong",
    body: "Giao diện đẹp, đọc luận sim xong thấy hợp vibe nên yên tâm hẳn 💯.",
    img: "https://avatar.vercel.sh/huong",
  },
  {
    name: "Bảo",
    username: "@bao",
    body: "Web rep nhanh, có ng hỗ trợ liền, ko ghost khách nha 🤝.",
    img: "https://avatar.vercel.sh/bao",
  },
  {
    name: "Trang",
    username: "@trang",
    body: "Chỉ cần số dt là có phân tích chi tiết, đơn giản như uống nước lọc 🥤.",
    img: "https://avatar.vercel.sh/trang",
  },
  {
    name: "Khánh",
    username: "@khanh",
    body: "Web hợp GenZ vc, dễ hiểu, font đẹp, màu gọn, ko rối mắt 🤩.",
    img: "https://avatar.vercel.sh/khanh",
  },
  {
    name: "My",
    username: "@my",
    body: "Đặt lịch xong có email confirm nữa, cảm giác chuyên nghiệp ghê 🤓.",
    img: "https://avatar.vercel.sh/my",
  },
  {
    name: "Quân",
    username: "@quan",
    body: "Điện thoại cùi mà vẫn load êm, tối ưu tốt ghê ta 😮‍💨.",
    img: "https://avatar.vercel.sh/quan",
  },
  {
    name: "Thảo",
    username: "@thao",
    body: "Luận sim đọc vui vl, kiểu vừa xem giải thích vừa thấy hợp lý 🤭.",
    img: "https://avatar.vercel.sh/thao",
  },
  {
    name: "Duy",
    username: "@duy",
    body: "Dùng xong muốn share cho bạn bè luôn, web uy tín thật sự 🔥.",
    img: "https://avatar.vercel.sh/duy",
  },
  {
    name: "An",
    username: "@an",
    body: "Tư vấn dễ thương, chốt lịch nhanh, ko vòng vo, mê cái này 😍.",
    img: "https://avatar.vercel.sh/an",
  },
  {
    name: "Hải",
    username: "@hai",
    body: "Đúng kiểu all-in-one, ko cần tải app, mở web làm đc hết 🖥️.",
    img: "https://avatar.vercel.sh/hai",
  },
  {
    name: "Linh",
    username: "@linh",
    body: "Công nhận web design gọn gàng, vô phát biết chỗ bấm luôn, ko pải mò 🙌.",
    img: "https://avatar.vercel.sh/linh",
  },
  {
    name: "Sơn",
    username: "@son",
    body: "Ai nghĩ ra idea luận sim online hay quá, ngồi nhà cũng check đc 😎.",
    img: "https://avatar.vercel.sh/son",
  },
  {
    name: "Yến",
    username: "@yen",
    body: "Trc cứ tưởng web sim nhàm chán, mà web này design như startup xịn v 😏.",
    img: "https://avatar.vercel.sh/yen",
  },
];


const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export function MarqueeDemo() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-12">
      {/* Tiêu đề */}
      <h2 className="mb-6 text-2xl font-bold text-center text-yellow-600 dark:text-yellow-400">
        Khách hàng nói gì về chúng tôi
      </h2>

      {/* Hàng review chạy */}
      <Marquee pauseOnHover className="[--duration:80s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:80s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>

      {/* Hiệu ứng fade 2 bên */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
    </div>
  );
}
