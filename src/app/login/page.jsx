// "use client" // چون از useState و فرم استفاده می‌کنیم

// import { useState } from "react"

// export default function LoginPage() {
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [error, setError] = useState("")

//   async function handleSubmit(e) {
//     e.preventDefault()

//     const res = await fetch("/api/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password }),
//     })

//     const data = await res.json()

//     if (res.ok) {
//       // ورود موفق → می‌توانیم کاربر را به داشبورد ریدایرکت کنیم
//       window.location.href = "/dashboard"
//     } else {
//       setError(data.message)
//     }
//   }

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen">
//       <h1 className="text-2xl font-bold mb-4">Login</h1>
//       <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-80">
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//           className="border p-2 rounded"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//           className="border p-2 rounded"
//         />
//         <button type="submit" className="bg-blue-500 text-white p-2 rounded">
//           Login
//         </button>
//         {error && <p className="text-red-500">{error}</p>}
//       </form>
//     </div>
//   )
// }
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { useAuth } from "@/context/AuthContext"

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth() // Context برای ذخیره اطلاعات کاربر
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [message, setMessage] = useState("")

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage("")

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "خطایی رخ داد")

      // ذخیره کاربر در Context
      login(data.user)

      // انتقال به صفحه اصلی
      router.push("/")
    } catch (err) {
      setMessage(err.message)
    }
  }

  return (
    <div>
      <main className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
        <div className="max-w-md w-full bg-white p-8 rounded shadow space-y-4">
          <h1 className="text-2xl font-bold text-center">ورود</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="ایمیل"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="رمز عبور"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
            >
              ورود
            </button>
          </form>
          {message && <p className="text-red-500">{message}</p>}
        </div>
      </main>
    </div>
  )
}
