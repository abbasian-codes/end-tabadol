import { prisma } from "@/lib/prisma"
import bcrypt from "bcrypt"

export async function POST(req) {
  const { token, password } = await req.json()

  const reset = await prisma.passwordReset.findUnique({ where: { token } })
  if (!reset || reset.expiresAt < new Date()) {
    return new Response(
      JSON.stringify({ message: "توکن منقضی شده یا نامعتبر است." }),
      { status: 400 }
    )
  }

  const hashed = await bcrypt.hash(password, 10)
  await prisma.user.update({
    where: { email: reset.email },
    data: { password: hashed },
  })

  await prisma.passwordReset.delete({ where: { token } })

  return new Response(
    JSON.stringify({ message: "رمز عبور با موفقیت تغییر کرد." })
  )
}
