// import { prisma } from "@/lib/prisma"
// import bcrypt from "bcrypt"

// export async function POST(req) {
//   const { token, password } = await req.json()

//   const reset = await prisma.passwordReset.findUnique({ where: { token } })
//   if (!reset || reset.expiresAt < new Date()) {
//     return new Response(
//       JSON.stringify({ message: "توکن منقضی شده یا نامعتبر است." }),
//       { status: 400 }
//     )
//   }

//   const hashed = await bcrypt.hash(password, 10)
//   await prisma.user.update({
//     where: { email: reset.email },
//     data: { password: hashed },
//   })

//   await prisma.passwordReset.delete({ where: { token } })

//   return new Response(
//     JSON.stringify({ message: "رمز عبور با موفقیت تغییر کرد." })
//   )
// }
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function POST(req) {
  const { token, newPassword } = await req.json()

  // بررسی توکن معتبر و تاریخ انقضا
  const resetRecord = await prisma.passwordReset.findUnique({
    where: { token },
  })

  if (!resetRecord || resetRecord.expiresAt < new Date()) {
    return new Response(
      JSON.stringify({ message: "توکن نامعتبر یا منقضی شده است." }),
      { status: 400 }
    )
  }

  // پیدا کردن کاربر بر اساس ایمیل
  const user = await prisma.user.findUnique({
    where: { email: resetRecord.email },
  })
  if (!user) {
    return new Response(JSON.stringify({ message: "کاربر یافت نشد." }), {
      status: 404,
    })
  }

  // هش کردن رمز جدید
  const hashedPassword = await bcrypt.hash(newPassword, 10)

  // به‌روزرسانی رمز کاربر
  await prisma.user.update({
    where: { email: user.email },
    data: { password: hashedPassword },
  })

  // حذف رکورد ریست برای امنیت
  await prisma.passwordReset.delete({ where: { token } })

  return new Response(
    JSON.stringify({ message: "رمز عبور با موفقیت تغییر کرد." })
  )
}
