"use client"
import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"

export default function ResetPassword() {
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get("token")

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch("/api/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    })
    const data = await res.json()
    setMessage(data.message)
    if (res.ok) setTimeout(() => router.push("/login"), 2000)
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">تغییر رمز عبور</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          placeholder="رمز عبور جدید"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <button className="w-full bg-blue-600 text-white p-2 rounded">
          تغییر رمز
        </button>
      </form>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  )
}
