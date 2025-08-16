"use client"

import { useAuth } from "@/context/AuthContext"
import Link from "next/link"
import {
  Instagram,
  Facebook,
  Linkedin,
  Star,
  Zap,
  CheckCircle,
  UserCheck,
  Award,
} from "lucide-react"

export default function DashboardPage() {
  const { user } = useAuth()

  // نمونه داده بج‌ها
  const badges = [
    { name: "ستاره", icon: Star },
    { name: "سرعت", icon: Zap },
    { name: "دقت", icon: CheckCircle },
    { name: "معرفی", icon: UserCheck },
    { name: "مجرب", icon: Award },
    { name: "با استعداد", icon: Star }, // می‌توان آیکون متفاوت انتخاب کرد
  ]

  return (
    <div className="min-h-screen flex flex-col">
      {/* هدر */}

      {/* منوی خاکستری تیره زیر هدر */}
      <nav className="bg-gray-500 text-white h-12 flex items-center px-8 gap-6 mt-16">
        <Link href="/dashboard" className="hover:text-blue-400 transition">
          داشبورد
        </Link>
        <Link href="/my-services" className="hover:text-blue-400 transition">
          خدمات من
        </Link>
        <Link href="/comments" className="hover:text-blue-400 transition">
          کامنت‌ها
        </Link>
        <Link href="/requests" className="hover:text-blue-400 transition">
          درخواست‌ها
        </Link>
      </nav>

      {/* محتوای اصلی */}
      <main className="flex flex-1 mt-28 px-8 gap-8">
        {/* سایدبار سمت راست */}
        <aside className="w-80 flex-shrink-0 bg-gray-100 p-6 rounded-lg shadow-lg">
          {/* نام و ایمیل */}
          <div className="text-lg font-semibold">
            {user?.username || "نام کاربر"}
          </div>
          <div className="text-gray-600 text-sm mb-3">
            {user?.email || "email@example.com"}
          </div>
          <div className="border-t border-gray-300 my-3" />

          {/* خلاصه درباره یوزر */}
          <div className="text-gray-700 mb-4">
            {user?.bio ||
              "خلاصه‌ای درباره شما و خدماتی که ارائه می‌دهید در اینجا نمایش داده می‌شود."}
          </div>

          {/* شبکه‌های اجتماعی */}
          <div className="flex gap-3 mb-4">
            {user?.social?.instagram && (
              <a
                href={user.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="w-6 h-6 text-gray-700 hover:text-pink-500 transition" />
              </a>
            )}
            {user?.social?.facebook && (
              <a
                href={user.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="w-6 h-6 text-gray-700 hover:text-blue-600 transition" />
              </a>
            )}
            {user?.social?.linkedin && (
              <a
                href={user.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="w-6 h-6 text-gray-700 hover:text-blue-500 transition" />
              </a>
            )}
          </div>

          {/* بخش بج‌ها */}
          <div className="grid grid-cols-2 gap-3">
            {badges.map((badge) => {
              const Icon = badge.icon
              return (
                <div
                  key={badge.name}
                  className="flex items-center gap-2 bg-white p-2 rounded shadow-sm hover:shadow-md transition cursor-default"
                >
                  <Icon className="w-5 h-5 text-yellow-500" />
                  <span className="text-gray-800 text-sm">{badge.name}</span>
                </div>
              )
            })}
          </div>
        </aside>

        {/* بخش محتوای اصلی داشبورد */}
        <section className="flex-1 bg-white rounded-lg p-6 shadow-lg">
          <h1 className="text-2xl font-semibold mb-4">
            خوش آمدید، {user?.username || "کاربر"}!
          </h1>
          <p className="text-gray-700">
            اینجا محتوای داشبورد شما نمایش داده می‌شود. بعداً می‌توانیم بخش
            خدمات، کامنت‌ها و درخواست‌ها را اینجا بیاوریم.
          </p>
        </section>
      </main>
    </div>
  )
}
