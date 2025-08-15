"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Logo from "./Logo"
import { Search, Menu, X } from "lucide-react"
import { useAuth } from "@/context/AuthContext"

export default function Header({
  alwaysWhite = false,
  searchTerm = "",
  onSearchChange = () => {},
}) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()

  // فقط داخل کامپوننت
  const { user, logout } = useAuth()

  useEffect(() => {
    if (alwaysWhite) return
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [alwaysWhite])

  async function handleLogout() {
    await logout() // فرض بر این که در context logout تعریف شده
    router.push("/")
  }

  return (
    <header
      className={`fixed top-0 w-full min-h-16 z-50 transition-all duration-300 ${
        alwaysWhite || scrolled
          ? "bg-white text-black shadow"
          : "bg-[#0094d5] text-white border-b-1 border-[#c7c6cc]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-19 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center space-x-2 rtl:space-x-reverse"
        >
          {alwaysWhite || scrolled ? (
            <Logo color="#0094d5" textColor="#1E3A8A" />
          ) : (
            <Logo color="#ffffff" textColor="#ffffff" />
          )}
        </Link>

        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <div className="flex items-center gap-3">
                <span>سلام، {user.username || user.name}!</span>
                <Link
                  href="/dashboard"
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  داشبورد
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-danger-emphasis hover:underline"
                >
                  خروج
                </button>
              </div>
            </>
          ) : (
            <>
              <Link href="/login" className="px-3 py-1">
                ورود
              </Link>
              <Link href="/signup" className="px-3 py-1">
                ثبت‌نام
              </Link>
            </>
          )}

          <div
            className={`h-full w-px ${
              scrolled ? "bg-[#c7c6cc]" : "bg-[#33a9dd]"
            }`}
          />

          <div className="relative">
            <input
              type="text"
              placeholder="جستجو"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className={`pl-8 pr-3 py-1 rounded-md border bg-transparent outline-none text-sm placeholder:opacity-70 ${
                alwaysWhite || scrolled
                  ? "placeholder:text-blue-700 text-black border-blue-200"
                  : "placeholder:text-white text-white border-white/50"
              }`}
            />
            <Search
              className={`absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                scrolled ? "text-blue-700" : "text-white"
              }`}
            />
          </div>
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative z-50"
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="bg-gray-100 md:hidden z-40 relative" dir="rtl">
          <div className="p-4 flex flex-col gap-4">
            {user ? (
              <>
                <span>سلام، {user.username || user.name}!</span>
                <Link
                  href="/dashboard"
                  className="w-full bg-blue-600 text-white text-center py-2 rounded-md hover:bg-blue-700 transition"
                >
                  داشبورد
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-600 text-white py-2 rounded"
                >
                  خروج
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/join"
                  className="w-full bg-blue-600 text-white text-center py-2 rounded-md hover:bg-blue-700 transition"
                >
                  ثبت‌نام
                </Link>
                <Link href="/login" className="block py-2 px-4 text-gray-800">
                  ورود
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
