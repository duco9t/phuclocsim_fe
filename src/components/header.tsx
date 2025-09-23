"use client";

import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { HiOutlineMenu, HiX } from "react-icons/hi";

const Header = () => {
    const [open, setOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { user, logout } = useAuth();

    const dropdownRef = useRef<HTMLDivElement>(null);
    const mobileRef = useRef<HTMLDivElement>(null);

    // Auto close khi click ra ngoài
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target as Node)
            ) {
                setDropdownOpen(false);
            }
            if (
                mobileRef.current &&
                !mobileRef.current.contains(e.target as Node)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const menuItems = [
        { name: "Luận Sim", href: "/sim-form" },
        { name: "Phản hồi", href: "/feedback" },
        { name: "Blog", href: "/blog" },
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

                {/* Right: Menu (desktop) */}
                <div className="hidden lg:flex items-center gap-6">
                    <ul className="flex items-center gap-4 text-[#fdf6e3]">
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

                    {/* Auth dropdown */}
                    {user ? (
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="flex items-center gap-1 text-[#fdf6e3] font-medium hover:text-[#ff6851]"
                            >
                                {user.name || user.email} <ChevronDown size={16} />
                            </button>

                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg text-sm text-gray-800 overflow-hidden">
                                    <Link
                                        href="/account"
                                        onClick={() => setDropdownOpen(false)}
                                        className="block px-4 py-2 hover:bg-gray-100"
                                    >
                                        Tài khoản của bạn
                                    </Link>
                                    <button
                                        onClick={() => {
                                            logout();
                                            setDropdownOpen(false);
                                        }}
                                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                    >
                                        Đăng xuất
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link href="/login">
                            <ShimmerButton className="shadow-2xl bg-gradient-to-r from-[#d4af37] to-[#f6e75c] text-[#3e2723]">
                                <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight lg:text-lg">
                                    Đăng nhập
                                </span>
                            </ShimmerButton>
                        </Link>
                    )}
                </div>
            </div>

            {/* Mobile menu */}
            {open && (
                <div
                    ref={mobileRef}
                    className="lg:hidden px-4 pb-4 flex flex-col gap-3 text-[#fdf6e3] bg-[#3e2723]/95 border-t border-[#d4af37]/20"
                >
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

                    {user ? (
                        <div className="flex flex-col gap-2 mt-2">
                            <Link
                                href="/account"
                                onClick={() => setOpen(false)}
                                className="block w-full text-center py-2 bg-[#d4af37] text-[#3e2723] rounded-md font-medium"
                            >
                                Tài khoản của bạn
                            </Link>
                            <button
                                onClick={() => {
                                    logout();
                                    setOpen(false);
                                }}
                                className="block w-full text-center py-2 bg-red-500 text-white rounded-md font-medium"
                            >
                                Đăng xuất
                            </button>
                        </div>
                    ) : (
                        <motion.div
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                            <Link href="/login">
                                <ShimmerButton className="block w-full">
                                    Đăng nhập
                                </ShimmerButton>
                            </Link>
                        </motion.div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Header;
