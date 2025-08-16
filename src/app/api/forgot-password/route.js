// import { prisma } from "@/lib/prisma"
// import crypto from "crypto"
// import nodemailer from "nodemailer"

// export async function POST(req) {
//   const { email } = await req.json()

//   // بررسی وجود کاربر
//   const user = await prisma.user.findUnique({ where: { email } })
//   if (!user) {
//     return new Response(JSON.stringify({ message: "ایمیل پیدا نشد." }), {
//       status: 404,
//     })
//   }

//   // ساخت توکن تصادفی و تاریخ انقضا (1 ساعت)
//   const token = crypto.randomBytes(32).toString("hex")
//   const expiresAt = new Date(Date.now() + 3600 * 1000)

//   await prisma.passwordReset.create({ data: { email, token, expiresAt } })

//   // ارسال ایمیل با nodemailer
//   const transporter = nodemailer.createTransport({
//     host: "smtp.example.com",
//     port: 587,
//     auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
//   })

//   const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`

//   await transporter.sendMail({
//     from: '"Team" <no-reply@example.com>',
//     to: email,
//     subject: "بازنشانی رمز عبور",
//     html: `<p>برای تغییر رمز خود روی لینک زیر کلیک کنید:</p><a href="${resetUrl}">${resetUrl}</a>`,
//   })

//   return new Response(
//     JSON.stringify({ message: "لینک ریست رمز به ایمیل شما ارسال شد." })
//   )
// }
import { prisma } from "@/lib/prisma"
import crypto from "crypto"
import nodemailer from "nodemailer"

export async function POST(req) {
  const { email } = await req.json()

  // بررسی وجود کاربر
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    return new Response(JSON.stringify({ message: "ایمیل پیدا نشد." }), {
      status: 404,
    })
  }

  // ساخت توکن تصادفی و تاریخ انقضا (1 ساعت)
  const token = crypto.randomBytes(32).toString("hex")
  const expiresAt = new Date(Date.now() + 3600 * 1000)
  await prisma.passwordReset.create({ data: { email, token, expiresAt } })

  // ایجاد transporter با مقادیر .env
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`

  const info = await transporter.sendMail({
    from: '"Team" <no-reply@example.com>',
    to: email,
    subject: "بازنشانی رمز عبور",
    html: `<p>برای تغییر رمز خود روی لینک زیر کلیک کنید:</p><a href="${resetUrl}">${resetUrl}</a>`,
  })

  console.log("Preview URL:", nodemailer.getTestMessageUrl(info)) // لینک پیش‌نمایش در کنسول

  return new Response(
    JSON.stringify({ message: "لینک ریست رمز به ایمیل شما ارسال شد." })
  )
}
