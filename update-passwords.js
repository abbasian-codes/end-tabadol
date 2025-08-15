import { PrismaClient } from "./src/generated/prisma/client.js"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

async function updateOldPasswords() {
  const users = await prisma.user.findMany({
    where: { password: "temp1234" }, // پسورد قدیمی که می‌خوای هش شود
  })

  for (const user of users) {
    // هش کردن رمز عبور قدیمی
    const hashedPassword = await bcrypt.hash(user.password, 10) // 10 = تعداد rounds
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    })
  }

  console.log("تمام پسوردهای قدیمی هش و بروزرسانی شدند")
}

updateOldPasswords()
  .catch(console.error)
  .finally(async () => await prisma.$disconnect())
