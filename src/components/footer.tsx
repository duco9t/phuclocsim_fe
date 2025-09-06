import Image from "next/image";

const Footer = () => {
    return (
        <>
            <footer className="footer sm:footer-horizontal bg-[#3e2723] text-[#fdf6e3] p-10">
                <nav>
                    <h6 className="footer-title text-[#d4af37]">Dịch vụ</h6>
                    <a className="link link-hover hover:text-[#ff6851]">Luận sim phong thủy</a>
                    <a className="link link-hover hover:text-[#ff6851]">Tư vấn sim số đẹp</a>
                    <a className="link link-hover hover:text-[#ff6851]">Bài viết phong thủy</a>
                    <a className="link link-hover hover:text-[#ff6851]">Quảng cáo & hợp tác</a>
                </nav>
                <nav>
                    <h6 className="footer-title text-[#d4af37]">Công ty</h6>
                    <a className="link link-hover hover:text-[#ff6851]">Về chúng tôi</a>
                    <a className="link link-hover hover:text-[#ff6851]">Liên hệ</a>
                    <a className="link link-hover hover:text-[#ff6851]">Tuyển dụng</a>
                    <a className="link link-hover hover:text-[#ff6851]">Đối tác</a>
                </nav>
                <nav>
                    <h6 className="footer-title text-[#d4af37]">Pháp lý</h6>
                    <a className="link link-hover hover:text-[#ff6851]">Điều khoản sử dụng</a>
                    <a className="link link-hover hover:text-[#ff6851]">Chính sách bảo mật</a>
                    <a className="link link-hover hover:text-[#ff6851]">Chính sách cookie</a>
                </nav>
            </footer>

            <footer className="footer bg-[#3e2723] text-[#fdf6e3] border-t border-[#d4af37]/30 px-10 py-4">
                <aside className="grid-flow-col items-center">
                    <Image
                        src="/assets/logo.svg"
                        alt="Logo"
                        width={120}
                        height={40}
                        priority
                    />
                    <p className="flex items-center h-30">
                        Phúc Lộc Sim - Bản quyền &copy; {new Date().getFullYear()} thuộc về
                        <a href="https://duco9t.pro.vn" className="ml-1 text-[#d4af37] hover:text-[#ff6851]">
                            Duco
                        </a>
                        - Tất cả quyền được bảo lưu.
                    </p>
                </aside>

                <nav className="md:place-self-center md:justify-self-end">
                    <div className="grid grid-flow-col gap-4">
                        <a className="hover:text-[#d4af37] transition-colors">
                            {/* Twitter */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
                                viewBox="0 0 24 24" className="fill-current">
                                <path d="M24 4.557c-..."></path>
                            </svg>
                        </a>
                        <a className="hover:text-[#d4af37] transition-colors">
                            {/* YouTube */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                viewBox="0 0 24 24" className="fill-current">
                                <path d="M19.615 3.184c-..."></path>
                            </svg>
                        </a>
                        <a className="hover:text-[#d4af37] transition-colors">
                            {/* Facebook */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                viewBox="0 0 24 24" className="fill-current">
                                <path d="M9 8h-3v4h3..."></path>
                            </svg>
                        </a>
                    </div>
                </nav>
            </footer>
        </>
    );
};

export default Footer;
