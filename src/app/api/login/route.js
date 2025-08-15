import { PrismaClient } from "/src/generated/prisma/client"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

export async function POST(req) {
  const { email, password } = await req.json()

  // پیدا کردن کاربر
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    return new Response(JSON.stringify({ message: "User not found" }), {
      status: 404,
    })
  }

  // بررسی رمز عبور
  const isValid = await bcrypt.compare(password, user.password)
  if (!isValid) {
    return new Response(JSON.stringify({ message: "Invalid password" }), {
      status: 401,
    })
  }

  // موفقیت → می‌توانیم JWT یا سشن بسازیم، فعلاً فقط پاسخ موفقیت
  return new Response(JSON.stringify({ message: "Login successful" }), {
    status: 200,
  })
}
