// import { PrismaClient } from "@/src/generated/prisma/client"
// const prisma = new PrismaClient()

// async function main() {
//   const newUser = await prisma.user.create({
//     data: {
//       name: "Hasti",
//       email: "hasti@example.com",
//     },
//   })
//   console.log(newUser)
// }

// main()
// const { PrismaClient } = require("./src/generated/prisma/client") // CommonJS
// const prisma = new PrismaClient()
import { PrismaClient } from "./src/generated/prisma/client.js" // دقت کن .js آخر مسیر لازم است
const prisma = new PrismaClient()
// async function main() {
//   const user = await prisma.user.findMany()
//   console.log(user)
//   console.log("همه کاربران ")
// }
// const newUser = await prisma.user.create({
//   data: {
//     name: "Sara",
//     email: "sara@example.com",
//     username: "sara123", // این اختیاری است، می‌توان حذفش کرد
//   },
// })

// main()
//   .catch((e) => console.error(e))
//   .finally(async () => {
//     await prisma.$disconnect()
//   })
async function main() {
  const newUser = await prisma.user.create({
    data: {
      name: "Sara",
      email: "sara@example.com",
      username: "sara123", // اختیاری
    },
  })

  console.log("کاربر جدید ساخته شد:")
  console.log(newUser)

  const users = await prisma.user.findMany({
    select: { name: true, email: true, username: true },
  })

  console.log("👥 همه کاربران:")
  users.forEach((user) => {
    console.log(
      `سلام ${user.name}! ایمیل: ${user.email}, نام کاربری: ${
        user.username || "ندارد"
      }`
    )
  })
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
