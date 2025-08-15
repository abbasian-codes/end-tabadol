import React, { useEffect, useState } from "react"

export default function AvatarWithDB({ size = 100 }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/user")
        if (!res.ok) throw new Error("خطا در دریافت اطلاعات کاربر")

        const data = await res.json()
        setUser(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  if (loading) return <div>در حال بارگذاری...</div>

  if (!user) return <div>کاربر یافت نشد</div>

  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "U"

  return (
    <div
      className="relative rounded-full bg-gray-200 text-gray-600 font-semibold flex items-center justify-center select-none overflow-hidden"
      style={{
        width: size,
        height: size,
        backgroundImage: user.avatarUrl ? `url(${user.avatarUrl})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      aria-label={user.name}
      title={user.name}
    >
      {!user.avatarUrl && (
        <span style={{ fontSize: size / 2 }}>{initials}</span>
      )}
    </div>
  )
}
