// "use client"
// import { useRealtimeMessages } from "@/hooks/useRealtimeMessages"
// import { sendMessage } from "@/hooks/useSendMessage"
// import { useState } from "react"

// export default function ChatSheet({ offerId, open, onOpenChange }) {
//   if (!open) return null
//   const messages = useRealtimeMessages(offerId)
//   const [text, setText] = useState("")

//   const handleSend = async () => {
//     if (!text.trim()) return
//     await sendMessage(offerId, text)
//     setText("")
//   }

//   return (
//     <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
//       <div className="bg-white w-80 h-full shadow-lg p-4 flex flex-col">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-lg font-bold">چت آفر {offerId}</h2>
//           <button onClick={() => onOpenChange(false)}>✕</button>
//         </div>

//         {/* لیست پیام‌ها */}
//         <div className="flex-1 overflow-y-auto space-y-2">
//           {messages.map((m) => (
//             <div key={m.id} className="text-sm bg-slate-100 p-2 rounded">
//               {m.body}
//             </div>
//           ))}
//         </div>

//         {/* فرم ارسال */}
//         <div className="flex gap-2 mt-2">
//           <input
//             className="flex-1 border rounded px-2 py-1"
//             placeholder="پیامت را بنویس..."
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && handleSend()}
//           />
//           <button
//             className="bg-sky-600 text-white px-3 py-1 rounded"
//             onClick={handleSend}
//           >
//             ارسال
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }
// "use client"
// import { useRealtimeMessages } from "@/hooks/useRealtimeMessages"
// import { sendMessage } from "@/hooks/useSendMessage"
// import { useState, useEffect } from "react"
// import ChatMessage from "@/components/ChatMessage"
// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

// export default function ChatSheet({ offerId, open, onOpenChange }) {
//   const supabase = createClientComponentClient()
//   const messages = useRealtimeMessages(offerId)
//   const [text, setText] = useState("")
//   const [currentUserId, setCurrentUserId] = useState(null)

//   useEffect(() => {
//     supabase.auth.getUser().then(({ data }) => {
//       setCurrentUserId(data.user?.id || null)
//     })
//   }, [supabase])

//   if (!open) return null

//   const handleSend = async () => {
//     if (!text.trim()) return
//     await sendMessage(offerId, text)
//     setText("")
//   }
//   useEffect(() => {
//     if (!open || !currentUserId) return

//     // وقتی شیت باز شد، زمان آخرین بازدید را ثبت کن
//     supabase.from("offer_participants").upsert({
//       offer_id: offerId,
//       user_id: currentUserId,
//       last_read_at: new Date().toISOString(),
//     })
//   }, [open, offerId, currentUserId])
//   return (
//     <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
//       <div className="bg-white w-80 h-full shadow-lg p-4 flex flex-col">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-lg font-bold">چت آفر {offerId}</h2>
//           <button onClick={() => onOpenChange(false)}>✕</button>
//         </div>

//         {/* لیست پیام‌ها */}
//         <div className="flex-1 overflow-y-auto space-y-2">
//           {messages.map((m) => (
//             <ChatMessage key={m.id} msg={m} currentUserId={currentUserId} />
//           ))}
//         </div>

//         {/* فرم ارسال */}
//         <div className="flex gap-2 mt-2">
//           <input
//             className="flex-1 border rounded px-2 py-1"
//             placeholder="پیامت را بنویس..."
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && handleSend()}
//           />
//           <button
//             className="bg-sky-600 text-white px-3 py-1 rounded"
//             onClick={handleSend}
//           >
//             ارسال
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }
"use client"
import { useRealtimeMessages } from "@/hooks/useRealtimeMessages"
import { sendMessage } from "@/hooks/useSendMessage"
import { useState, useEffect } from "react"
import ChatMessage from "@/components/ChatMessage"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

const supabase = createClientComponentClient()

export default function ChatSheet({ offerId, open, onOpenChange }) {
  const messages = useRealtimeMessages(offerId)
  const [text, setText] = useState("")
  const [currentUserId, setCurrentUserId] = useState(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setCurrentUserId(data.user?.id || null)
    })
  }, [supabase])

  useEffect(() => {
    if (!open || !currentUserId) return

    // وقتی شیت باز شد، زمان آخرین بازدید را ثبت کن
    supabase.from("offer_participants").upsert({
      offer_id: offerId,
      user_id: currentUserId,
      last_read_at: new Date().toISOString(), // اینجا از new Date() استفاده کرده‌ایم
    })
  }, [open, offerId, currentUserId])

  if (!open) return null

  const handleSend = async () => {
    if (!text.trim()) return
    await sendMessage(offerId, text)
    setText("")
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
      <div className="bg-white w-80 h-full shadow-lg p-4 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">چت آفر {offerId}</h2>
          <button onClick={() => onOpenChange(false)}>✕</button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2">
          {messages.map((m) => (
            <ChatMessage key={m.id} msg={m} currentUserId={currentUserId} />
          ))}
        </div>

        <div className="flex gap-2 mt-2">
          <input
            className="flex-1 border rounded px-2 py-1"
            placeholder="پیامت را بنویس..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            className="bg-sky-600 text-white px-3 py-1 rounded"
            onClick={handleSend}
          >
            ارسال
          </button>
        </div>
      </div>
    </div>
  )
}
