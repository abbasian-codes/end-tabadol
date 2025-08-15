"use client" // برای اینکه این کامپوننت Client باشد

import { useState } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function JoinPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()

    // ارسال اطلاعات به API
    const res = await fetch("/api/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, username, password }),
    })

    const data = await res.json()
    setMessage(data.message)
  }

  return (
    <div>
      <Header />
      <main className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
        <div className="max-w-md w-full bg-white p-8 rounded shadow space-y-4">
          <h1 className="text-2xl font-bold text-center">ثبت‌نام</h1>
          <h1>ثبت‌نام</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="نام"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
            <input
              type="email"
              placeholder="ایمیل"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
            <input
              type="text"
              placeholder="نام کاربری (اختیاری)"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
            />
            <input
              type="text"
              placeholder="پسورد ( الزامی) "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
            >
              ثبت‌نام
            </button>
          </form>
          <p>{message}</p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
