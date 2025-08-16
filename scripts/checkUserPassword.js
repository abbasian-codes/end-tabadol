// import { prisma } from "../src/lib/prisma.js"

// async function main() {
//   const user = await prisma.user.findUnique({
//     where: { email: "abbasian.fz@gmail.con" },
//   })
//   console.log(user)
// }

// main()
//   .catch((e) => console.error(e))
//   .finally(async () => await prisma.$disconnect())
// scripts/checkUserPassword.js
// const { PrismaClient } = require("@prisma/client")
// const prisma = new PrismaClient()

// async function main() {
//   const user = await prisma.user.findUnique({
//     where: { email: "abbasian.fz@gmail.con" },
//   })
//   console.log(user)
// }

// main()
//   .catch((e) => console.error(e))
//   .finally(async () => await prisma.$disconnect())
// scripts/checkUserPassword.js
// import bcrypt from "bcryptjs"

// const { PrismaClient } = require("@prisma/client")
// const prisma = new PrismaClient()

// async function main() {
//   const emailToCheck = "abbasian.fz@gmail.con" // ایمیل کاربری که میخوای بررسی کنی
//   const plainPassword = "1212" // پسوردی که میخوای با دیتابیس مقایسه کنی

//   // گرفتن کاربر از دیتابیس
//   const user = await prisma.user.findUnique({
//     where: { email: emailToCheck },
//   })

//   if (!user) {
//     console.log("کاربری با این ایمیل پیدا نشد")
//     return
//   }

//   // بررسی پسورد
//   const isPasswordCorrect = await bcrypt.compare(plainPassword, user.password)

//   console.log("ایمیل:", user.email)
//   console.log("پسورد هش شده در DB:", user.password)
//   console.log("پسورد وارد شده صحیح است؟", isPasswordCorrect)
// }

// main()
//   .catch((e) => console.error(e))
//   .finally(async () => {
//     await prisma.$disconnect()
//   })
// const bcrypt = require("bcryptjs")
// const { PrismaClient } = require("../src/generated/prisma/client") // مسیر استاندارد @prisma/client
// const prisma = new PrismaClient()

// async function main() {
//   // ایمیل کاربری که میخوای بررسی کنی
//   const emailToCheck = "a@g.com"
//   // پسوردی که میخوای با دیتابیس مقایسه کنی
//   const plainPassword = "1212"

//   // گرفتن کاربر از دیتابیس
//   const user = await prisma.user.findUnique({
//     where: { email: emailToCheck },
//   })

//   if (!user) {
//     console.log("کاربری با این ایمیل پیدا نشد")
//     return
//   }

//   // بررسی پسورد
//   const isPasswordCorrect = await bcrypt.compare(plainPassword, user.password)

//   console.log("ایمیل:", user.email)
//   console.log("پسورد هش شده در DB:", user.password)
//   console.log("پسورد وارد شده صحیح است؟", isPasswordCorrect)
// }

// // اجرای اسکریپت
// main()
//   .catch((e) => console.error(e))
//   .finally(async () => {
//     await prisma.$disconnect()
//   })
const bcrypt = require("bcryptjs")
const { PrismaClient } = require("../src/generated/prisma/client")
const prisma = new PrismaClient()

// آرایه‌ای از ایمیل‌ها و پسوردهای تستی
const testUsers = [
  { email: "a@g.com", password: "1234" },
  { email: "b@g.com", password: "1212" },
  { email: "c@g.com", password: "abcd" },
]

async function main() {
  for (const { email, password } of testUsers) {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      console.log(`کاربری با ایمیل ${email} پیدا نشد.`)
      continue
    }

    const isCorrect = await bcrypt.compare(password, user.password)
    console.log("---------------")
    console.log("ایمیل:", email)
    console.log("پسورد تستی:", password)
    console.log("پسورد هش شده در DB:", user.password)
    console.log("پسورد درست است؟", isCorrect)
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
