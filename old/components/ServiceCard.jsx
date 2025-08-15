// components/serviceCard.jsx
import { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export default function ServiceCard({ service }) {
  const supabase = createClientComponentClient()
  const [unread, setUnread] = useState(0)

  useEffect(() => {
    const loadUnread = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      // آخرین زمانی که کاربر این آفر را باز کرده
      const { data: participant } = await supabase
        .from("service_participants")
        .select("last_read_at")
        .eq("service_id", service.id)
        .eq("user_id", user.id)
        .single()

      const lastRead = participant?.last_read_at ?? new Date(0).toISOString()

      // تعداد پیام‌های جدید
      const { count } = await supabase
        .from("messages")
        .select("*", { count: "exact", head: true })
        .eq("service_id", service.id)
        .gt("created_at", lastRead)

      setUnread(count ?? 0)
    }
    loadUnread()
  }, [service.id])

  return (
    <div className="relative border rounded p-4">
      <h3 className="font-bold">{service.title}</h3>
      <p>{service.description}</p>

      {unread > 0 && (
        <span className="absolute top-2 right-2 bg-red-500 text-white text-xs rounded-full px-2">
          {unread}
        </span>
      )}
    </div>
  )
}
