import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function registerUser({ name, email, username, password }) {
  if (!name || !email || !password) {
    throw new Error("همه فیلدها باید پر شوند.")
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  return prisma.user.create({
    data: {
      name,
      email,
      username: username || null,
      password: hashedPassword,
    },
  })
}
