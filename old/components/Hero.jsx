// "use client"

// import { useEffect, useState } from "react"
// import axios from "axios"

// export default function Hero() {
//   const [exchanges, setExchanges] = useState([])
//   const [currentExchange, setCurrentExchange] = useState("")

//   useEffect(() => {
//     // const getExchanges = async () => {
//     //   try {
//     //     const res = await axios.get("/api/exchanges")
//     //     const texts = res.data.map((item) => item.text)
//     //     setExchanges(texts)
//     //     setCurrentExchange(texts[0] || "")
//     //   } catch (err) {
//     //     console.error("❌ خطا در دریافت تبادل‌ها:", err)
//     //   }
//     // }
//     // getExchanges()
//     const [exchanges, setExchanges] = useState(["به تبادلکارا خوش آمدید!"])
//     const [currentExchange, setCurrentExchange] = useState(
//       "به تبادلکارا خوش آمدید!"
//     )
//   }, [])

//   useEffect(() => {
//     if (!exchanges.length) return

//     const interval = setInterval(() => {
//       const next = exchanges[Math.floor(Math.random() * exchanges.length)]
//       setCurrentExchange(next)
//     }, 4000)

//     return () => clearInterval(interval)
//   }, [exchanges])

//   return (
//     <section className="relative bg-[#0094d5] text-white py-22 px-4 text-center overflow-hidden">
//       <h1 className="!text-5xl md:text-4xl font-bold mb-8 mt-15">
//         تبادل خدمات، بدون پول
//       </h1>

//       <div className="text-2xl m-8 bg-white/20 px-14 py-2 rounded-full inline-block animate-pulse">
//         {currentExchange || "در حال بارگذاری..."}
//       </div>

//       <p className="!text-2xl md:text-lg mb-6 max-w-2xl mx-auto">
//         در تبادل‌کارا مهارت‌هات رو با دیگران معاوضه کن؛ بدون واسطه و با شفافیت
//         کامل.
//       </p>

//       <button className="bg-white text-xl mt-15 text-blue-600 font-semibold px-6 py-3 rounded-lg shadow hover:bg-blue-100 transition">
//         شما هم به تبادل‌کارها بپیوندید
//       </button>
//     </section>
//   )
// }
// src/components/Hero.jsx
// "use client"
// import { useState, useEffect } from "react"

// export default function Hero() {
//   const [exchanges] = useState(["به تبادلکارا خوش آمدید!"])
//   const [currentExchange] = useState("به تبادلکارا خوش آمدید!")

//   return (
//     <section className="text-center py-20">
//       <h1 className="text-4xl font-bold mb-4">{currentExchange}</h1>
//     </section>
//   )
// }
"use client"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function Hero() {
  const [exchanges, setExchanges] = useState([])
  const [current, setCurrent] = useState("به تبادلکارا خوش آمدید!")

  const todayStart = new Date()
  todayStart.setHours(0, 0, 0, 0)
  const todayEnd = new Date()
  todayEnd.setHours(23, 59, 59, 999)

  // خواندن تبادل‌های امروز
  useEffect(() => {
    supabase
      .from("latest_exchanges")
      .select("buyer_name, seller_name, service")
      .gte("created_at", todayStart.toISOString())
      .lte("created_at", todayEnd.toISOString())
      .then(({ data }) => {
        if (data && data.length) setExchanges(data)
      })
  }, [])

  // realtime برای امروز
  useEffect(() => {
    const channel = supabase
      .channel("today-exchanges")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "latest_exchanges" },
        (payload) => {
          const { buyer_name, seller_name, service } = payload.new
          if (
            new Date(payload.new.created_at) >= todayStart &&
            new Date(payload.new.created_at) <= todayEnd
          ) {
            setExchanges((prev) => [...prev, payload.new])
          }
        }
      )
      .subscribe()

    return () => supabase.removeChannel(channel)
  }, [todayStart, todayEnd])

  // انتخاب رندم هر ۴ ثانیه
  useEffect(() => {
    if (!exchanges.length) return
    const timer = setInterval(() => {
      const idx = Math.floor(Math.random() * exchanges.length)
      const { buyer_name, seller_name, service } = exchanges[idx]
      setCurrent(
        `${buyer_name} امروز از خدمات ${service} ${seller_name} استفاده کرد`
      )
    }, 4000)
    return () => clearInterval(timer)
  }, [exchanges])

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#0094d5] to-[#0072b5] px-4 text-center text-white">
      <h1 className="text-4xl md:text-6xl font-bold mb-8">
        تبادل خدمات، بدون پول
      </h1>
      <div className="text-2xl my-8 bg-white/20 px-8 py-3 rounded-full animate-pulse">
        {current}
      </div>
      <p className="text-lg md:text-xl mb-6 max-w-3xl">
        در تبادل‌کارا مهارت‌هات رو با دیگران معاوضه کن؛ بدون واسطه و با شفافیت
        کامل.
      </p>
      <button className="bg-white text-xl mt-6 text-[#0094d5] font-semibold px-8 py-4 rounded-lg shadow hover:bg-gray-100 transition">
        شما هم به تبادل‌کارها بپیوندید
      </button>
    </section>
  )
}
