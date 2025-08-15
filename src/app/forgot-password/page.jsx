"use client"
import { useState } from "react"

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch("/api/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
    const data = await res.json()
    setMessage(data.message)
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">فراموشی رمز عبور</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="ایمیل خود را وارد کنید"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <button className="w-full bg-blue-600 text-white p-2 rounded">
          ارسال لینک
        </button>
      </form>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  )
}
