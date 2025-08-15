// components/ChatMessage.jsx
import { formatDistanceToNow } from "date-fns"
import { faIR } from "date-fns/locale"

export default function ChatMessage({ msg, currentUserId }) {
  // چه کسی فرستاده؟ برای رنگ/چینش متفاوت
  const isOwn = msg.sender_id === currentUserId

  return (
    <div className={`flex mb-3 ${isOwn ? "justify-end" : "justify-start"}`}>
      <div className="max-w-[75%]">
        {/* نام کاربر */}
        <div className="text-xs text-gray-500 px-1 mb-0.5">{msg.user_name}</div>

        {/* متن پیام */}
        <div
          className={`rounded-lg px-3 py-2 text-sm leading-relaxed ${
            isOwn
              ? "bg-blue-600 text-white"
              : "bg-slate-100 text-slate-900 dark:bg-slate-700 dark:text-white"
          }`}
        >
          {msg.body}
        </div>

        {/* زمان به فارسی */}
        <div className="text-xs text-gray-400 px-1 mt-0.5">
          {formatDistanceToNow(new Date(msg.created_at), {
            addSuffix: true,
            locale: faIR,
          })}
        </div>
      </div>
    </div>
  )
}
