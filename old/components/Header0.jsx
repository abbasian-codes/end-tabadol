
"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { supabase } from "@/utils/supabase/client"
import { Menu, X } from "lucide-react"
import Logo from "@/components/Logo"
import { createClient } from "@supabase/supabase-js"

export default function Header({ alwaysWhite = false }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [user, setUser] = useState(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    async function fetchUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
    }
    fetchUser()
  }, [isClient])

  useEffect(() => {
    if (!isClient) return

    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", onScroll)
    onScroll()

    return () => window.removeEventListener("scroll", onScroll)
  }, [isClient])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    window.location.href = "/"
  }

  if (!isClient) return null

  return (
    <header
      className={`fixed top-0 w-full min-h-16 z-50 transition-all duration-300 ${
        alwaysWhite || scrolled
          ? "bg-white text-black shadow"
          : "bg-[#0094d5] text-white border-b border-[#c7c6cc]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-19 flex items-center justify-between">
        {/* لوگو */}
        <Link href="/">
          <div className="flex items-center space-x-2 rtl:space-x-reverse cursor-pointer select-none">
            {alwaysWhite || scrolled ? (
              <Logo color="#0094d5" textColor="#1E3A8A" />
            ) : (
              <Logo color="#ffffff" textColor="#ffffff" />
            )}
          </div>
        </Link>

        {/* وضعیت کاربر یا دکمه ورود و ثبت نام */}
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          {user ? (
            <>
              <img
                src={user.user_metadata?.avatar_url || "/default-avatar.png"}
                alt="User Avatar"
                className="w-8 h-8 rounded-full"
              />
              <span className="text-sm font-medium">{user.email}</span>
              <Link
                href="/dashboard"
                className="text-blue-600 hover:underline whitespace-nowrap"
              >
                داشبورد
              </Link>
              <button
                onClick={handleSignOut}
                className="text-red-600 hover:underline cursor-pointer bg-transparent border-none whitespace-nowrap"
                type="button"
              >
                خروج
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth"
                className="text-blue-500 hover:underline whitespace-nowrap"
              >
                ورود
              </Link>
              <Link
                href="/join"
                className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 whitespace-nowrap"
              >
                ثبت‌نام
              </Link>
            </>
          )}
        </div>

        {/* منوی دسکتاپ */}
        <nav className="hidden md:flex flex-row-reverse items-center gap-3 h-full">
          <Link
            href="/how-it-works"
            className="px-3 py-1 hover:underline whitespace-nowrap"
          >
            چطور کار می‌کند
          </Link>

          <div
            className={`h-full w-px ${
              scrolled ? "bg-[#c7c6cc]" : "bg-[#33a9dd]"
            }`}
          ></div>

          {user ? (
            <>
              <Link
                href="/dashboard"
                className="px-3 py-1 hover:underline whitespace-nowrap"
              >
                داشبورد
              </Link>
              <button
                onClick={handleSignOut}
                className="px-3 py-1 text-red-600 hover:underline cursor-pointer bg-transparent border-none whitespace-nowrap"
                type="button"
              >
                خروج
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="px-3 py-1 hover:underline whitespace-nowrap"
              >
                ورود
              </Link>
              <div
                className={`h-full w-px ${
                  scrolled ? "bg-[#c7c6cc]" : "bg-[#33a9dd]"
                }`}
              ></div>
              <Link
                href="/join"
                className="px-3 py-1 hover:underline whitespace-nowrap"
              >
                ثبت‌نام
              </Link>
            </>
          )}
        </nav>

        {/* دکمه منوی موبایل */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative z-50 focus:outline-none"
            aria-label="Toggle menu"
            type="button"
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* منوی موبایل */}
        {menuOpen && (
          <div className="bg-gray-100 md:hidden z-40 relative" dir="rtl">
            <div className="p-4 flex flex-col gap-2">
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    className="block py-2 px-4 text-gray-800 text-right hover:bg-gray-200 rounded"
                    onClick={() => setMenuOpen(false)}
                  >
                    داشبورد
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="block py-2 px-4 text-red-600 text-right cursor-pointer bg-transparent border-none hover:bg-gray-200 rounded"
                    type="button"
                  >
                    خروج
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/join"
                    className="w-full bg-blue-600 text-white text-center py-2 rounded-md hover:bg-blue-700 transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    ثبت‌نام
                  </Link>
                  <hr className="my-2 border-gray-300" />
                  <Link
                    href="/login"
                    className="block py-2 px-4 text-gray-800 text-right hover:bg-gray-200 rounded"
                    onClick={() => setMenuOpen(false)}
                  >
                    ورود
                  </Link>
                </>
              )}

              <hr className="my-2 border-gray-300" />
              <Link
                href="/how-it-works"
                className="block py-2 px-4 text-gray-800 text-right hover:bg-gray-200 rounded"
                onClick={() => setMenuOpen(false)}
              >
                چطور کار می‌کند
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
