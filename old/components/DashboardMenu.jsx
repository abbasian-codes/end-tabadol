import { useRouter } from "next/router"

export default function DashboardMenu() {
  const router = useRouter()

  const menuItems = [
    { href: "/dashboard", label: "پروفایل و خدمات", short: "پروفایل" },
    {
      href: "/dashboard/recommendations",
      label: "توصیه‌ها",
      short: "توصیه‌ها",
    },
    { href: "/dashboard/reviews", label: "نقد و بررسی‌ها" },
    { href: "/dashboard/favorites", label: "علاقه‌مندی‌ها" },
    { href: "/dashboard/groups", label: "گروه‌ها" },
    { href: "/dashboard/orgs", label: "سازمان‌ها" },
    { href: "/settings", label: "تنظیمات" },
    { href: "/help#articles", label: "راهنما" },
  ]

  const isActive = (path) => router.pathname.startsWith(path)

  return (
    <ul
      dir="rtl"
      className="mt-14 list-none p-0 m-0 flex justify-center flex-wrap bg-[#6d6a70] text-[#ddd] font-sans space-x-12 space-x-reverse"
      style={{ fontFamily: "'Vazirmatn', sans-serif" }}
    >
      {menuItems.map((item) => (
        <li key={item.href} className="inline-flex items-center">
          <a
            href={item.href}
            className={`inline-block
              pt-[10px]
              pb-[6px]
              font-semibold
              no-underline
              border-b-4
              border-b-transparent
              ${
                isActive(item.href)
                  ? "text-white border-[#ddd]"
                  : "text-[#ddd] border-transparent"
              }
              hover:text-[#ddd] hover:border-[#ddd]
            `}
          >
            {item.short ? (
              <>
                <span className="hidden sm:inline">{item.label}</span>
                <span className="inline sm:hidden">{item.short}</span>
              </>
            ) : (
              item.label
            )}
          </a>
        </li>
      ))}
    </ul>
  )
}
