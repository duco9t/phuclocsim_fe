"use client";

import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { HiOutlineMenu, HiX } from "react-icons/hi";

const Header = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className="fixed top-0 left-0 right-0 z-50 bg-base-100 shadow-md">
            <div className="flex items-center justify-between px-4 py-3 lg:px-8">
                {/* Left: Hamburger (mobile) */}
                <div className="lg:hidden">
                    <button
                        onClick={() => setOpen(!open)}
                        className="text-2xl text-gray-800 dark:text-white"
                    >
                        {open ? <HiX /> : <HiOutlineMenu />}
                    </button>
                </div>

                {/* Center: Logo */}
                <div className="flex-1 flex justify-center lg:justify-start">
                    <Image
                        src="/assets/logo_banner.svg"
                        alt="Logo"
                        width={250}
                        height={60}
                    />
                </div>

                {/* Right: Menu + Button (desktop only) */}
                <div className="hidden lg:flex items-center gap-6">
                    <ul className="menu menu-horizontal px-1 flex items-center gap-4">
                        <li><a>Luận Sim</a></li>
                        <li><a>Phản hồi</a></li>
                        <li><a>Blog</a></li>
                        <li><a>Liên hệ</a></li>
                    </ul>
                    <ShimmerButton className="shadow-2xl">
                        <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                            Đăng nhập
                        </span>
                    </ShimmerButton>
                </div>
            </div>

            {/* Mobile menu */}
            {open && (
                <div className="lg:hidden px-4 pb-4 flex flex-col gap-3">
                    {["Luận Sim", "Phản hồi", "Blog", "Liên hệ"].map((item) => (
                        <motion.a
                            key={item}
                            className="block w-full text-center py-2 border-b"
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                            {item}
                        </motion.a>
                    ))}

                    <motion.div
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                        <ShimmerButton className="w-full mt-3 shadow-2xl">
                            <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                                Đăng nhập
                            </span>
                        </ShimmerButton>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default Header;
