"use client";

import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { HiOutlineMenu, HiX } from "react-icons/hi";

const Header = () => {
    const [open, setOpen] = useState(false);

    const menuItems = [
        { name: "Luận Sim", href: "/sim-form" },
        { name: "Phản hồi", href: "/feedback" },
        { name: "Blog", href: "/blog" },
        { name: "Liên hệ", href: "/contact" },
    ];

    return (
        <div className="fixed top-0 left-0 right-0 z-50 bg-[#3e2723]/95 shadow-lg border-b border-[#d4af37]/30">
            <div className="flex items-center justify-between px-4 py-3 lg:px-8">
                {/* Left: Hamburger (mobile) */}
                <div className="lg:hidden">
                    <button
                        onClick={() => setOpen(!open)}
                        className="text-2xl text-[#fdf6e3]"
                    >
                        {open ? <HiX /> : <HiOutlineMenu />}
                    </button>
                </div>

                {/* Center: Logo */}
                <div className="flex-1 flex justify-center lg:justify-start">
                    <Link href="/">
                        <Image
                            src="/assets/logo_banner.svg"
                            alt="Logo"
                            width={250}
                            height={60}
                            priority
                        />
                    </Link>
                </div>

                {/* Right: Menu + Button (desktop only) */}
                <div className="hidden lg:flex items-center gap-6">
                    <ul className="menu menu-horizontal px-1 flex items-center gap-4 text-[#fdf6e3]">
                        {menuItems.map((item) => (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    className="hover:text-[#ff6851] transition-colors"
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <ShimmerButton className="shadow-2xl bg-gradient-to-r from-[#d4af37] to-[#f6e75c] text-[#3e2723]">
                        <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight lg:text-lg">
                            Đăng nhập
                        </span>
                    </ShimmerButton>
                </div>
            </div>

            {/* Mobile menu */}
            {open && (
                <div className="lg:hidden px-4 pb-4 flex flex-col gap-3 text-[#fdf6e3] bg-[#3e2723]/95 border-t border-[#d4af37]/20">
                    {menuItems.map((item) => (
                        <motion.div
                            key={item.name}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                            <Link
                                href={item.href}
                                className="block w-full text-center py-2 border-b border-[#d4af37]/20 hover:text-[#ff6851] transition-colors"
                                onClick={() => setOpen(false)}
                            >
                                {item.name}
                            </Link>
                        </motion.div>
                    ))}

                    <motion.div
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                        <ShimmerButton>
                            Đăng nhập
                        </ShimmerButton>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default Header;
