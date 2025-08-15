"use client"
import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export default function HeadersTam() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  return (
    <header className="bg-blue-600 w-full text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">LOGO</div>
        <nav className="hidden md:flex space-x-10 rtl:space-x-reverse">
          <Link href="#" className="px-3 py-1">
            ورود{" "}
          </Link>
          <Link href="#" className="px-3 py-1">
            ثبت نام{" "}
          </Link>
          <Link href="#" className="px-3 py-1">
            چطور کار میکند{" "}
          </Link>
        </nav>
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>
      {/* لوگو و منوی دسکتاپ و دکمه موبایل */}
      {/* منوی موبایل در صورت فعال بودن */}

      {/* منوی موبایل (نمایش فقط وقتی بازه) */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#0094d5] px-4 pb-4 text-sm">
          <Link
            href="/how-it-works"
            className="block py-2 border-b border-white/20"
          >
            چطور کار می‌کند
          </Link>
          <Link href="/login" className="block py-2 border-b border-white/20">
            ورود
          </Link>
          <Link href="/join" className="block py-2">
            ثبت‌نام
          </Link>
        </div>
      )}
    </header>
  )
}
