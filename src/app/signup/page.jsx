"use client" // برای اینکه این کامپوننت Client باشد

import { useState } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"

export default function JoinPage() {
  // const [name, setName] = useState("")
  // const [email, setEmail] = useState("")
  // const [username, setUsername] = useState("")
  // const [password, setPassword] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  })
  const router = useRouter()
  const { login } = useAuth()
  const [message, setMessage] = useState("")
  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value })
  // }
  // async function handleSubmit(e) {
  //   e.preventDefault()
  //   setMessage("") // پاک کردن پیام قبلی
  //   try {
  //     // ارسال اطلاعات به API
  //     const res = await fetch("/api/signup", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(formData),
  //     })

  //     const data = await res.json()

  //     if (!res.ok) throw new Error(data.error || "خطایی رخ داد")

  //     setMessage(data.message) // پیام موفقیت
  //     setFormData({ name: "", email: "", username: "", password: "" }) // پاک کردن فرم
  //   } catch (err) {
  //     setMessage(err.message)
  //   }
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage("")

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "خطایی رخ داد")

      // ذخیره اطلاعات کاربر در context
      login({
        name: formData.name,
        username: formData.username,
        email: formData.email,
      })

      // انتقال به صفحه اصلی
      router.push("/")
    } catch (err) {
      setMessage(err.message)
    }
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
              name="name" // اضافه کردن name برای handleChange
              value={formData.name} // استفاده از formData
              onChange={handleChange} // تابع مشترک handleChange
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
            <input
              type="email"
              placeholder="ایمیل"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
            <input
              type="text"
              placeholder="نام کاربری (اختیاری)"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
            />
            <input
              type="password"
              placeholder="پسورد ( الزامی) "
              name="password"
              value={formData.password}
              onChange={handleChange}
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
