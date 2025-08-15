"use client"

import Link from "next/link"
import Logo from "./Logo"

export default function Footer() {
  return (
    <footer className="bg-gray-700 text-white py-8">
      <div className="max-w-7xl w-full h-[100px] flex flex-col md:flex-row justify-between items-center px-4 mx-auto gap-4 md:gap-0">
        {/* لوگو سمت راست */}
        <div className="flex-shrink-0">
          <Logo />
        </div>

        {/* لینک‌ها سمت چپ */}
        <div className="flex flex-wrap justify-center md:justify-end gap-4 text-sm">
          <Link href="#">چطور کار می‌کند</Link>
          <Link href="#">تیم پشتیبانی</Link>
          <Link href="#">ثبت‌نام</Link>
          <Link href="#">وبلاگ</Link>
          <Link href="#">پرسش‌های متداول</Link>
          <Link href="#">اصطلاحات</Link>
          <Link href="#">موارد امنیتی</Link>
          <Link href="#">تماس با ما</Link>
        </div>
      </div>

      <hr className="my-6 border-gray-500" />

      {/* متن پایانی */}
      <div className="text-center text-xs text-gray-300">
        2025 © جامعه تبادل کارا
      </div>
    </footer>
  )
}
