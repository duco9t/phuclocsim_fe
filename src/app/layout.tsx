import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Import font local ở đây
const libertinus = localFont({
  src: [
    {
      path: "../../public/fonts/LibertinusSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/LibertinusSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/LibertinusSans-Italic.ttf",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-libertinus",
});

export const metadata: Metadata = {
  title: "Phúc Lộc Sim",
  description: "Luận sim phong thủy & đặt lịch tư vấn trực tuyến.",
  icons: {
    icon: "/favicon.ico",   // icon tab
    shortcut: "/favicon.ico",
    apple: "/icon.png",     // cho iOS/Apple devices
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className={`${libertinus.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
