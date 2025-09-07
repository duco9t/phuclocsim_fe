import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import Footer from "@/components/footer";
import Header from "@/components/header";
import { Nothing } from "@/components/nothing";
// Import font local
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
    icon: "/favicon.ico",   // favicon tab
    shortcut: "/favicon.ico",
    apple: "/icon.png",     // iOS/Apple devices
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className="text-[#3e2723]">
      <body
        className={`${libertinus.variable} font-sans antialiased flex flex-col min-h-screen bg-gradient-to-br from-[#fff8e1] to-[#fceabb]`}
      >
        {/* Header cố định */}
        <Header />
        <Nothing />
        {/* Nội dung trang */}
        <main className="flex-1">{children}</main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}

