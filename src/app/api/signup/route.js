// // import { PrismaClient } from "../../../src/generated/prisma/client" // مسیر دقیق به Prisma Client
// import { PrismaClient } from "/src/generated/prisma/client.js"
// const prisma = new PrismaClient()

// export async function POST(req) {
//   const { name, email, username } = await req.json()

//   try {
//     const user = await prisma.user.create({
//       data: { name, email, username },
//     })

//     return new Response(JSON.stringify({ message: "ثبت‌نام موفق بود!" }), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     })
//   } catch (error) {
//     return new Response(JSON.stringify({ message: error.message }), {
//       status: 400,
//       headers: { "Content-Type": "application/json" },
//     })
//   }
// }
// src/app/api/join/route.js
// import { registerUser } from "@/lib/registerUser"

// export async function POST(req) {
//   try {
//     // 1) بدنه‌ی درخواست را به JSON تبدیل کن
//     const body = await req.json()

//     // 2) تابع تمیزِ ثبت‌نام را صدا بزن
//     const user = await registerUser(body)

//     // 3) جواب موفق برگردان
//     return new Response(
//       JSON.stringify({ message: "کاربر ساخته شد!", userId: user.id }),
//       { status: 201 }
//     )
//   } catch (error) {
//     // اگر هر مشکلی شد (مثلاً فیلدی خالی بود)، پیام مناسب برگردان
//     return new Response(JSON.stringify({ error: error.message }), {
//       status: 400,
//     })
//   }
// }
import { registerUser } from "@/lib/registerUser"

export async function POST(req) {
  try {
    const body = await req.json()
    const user = await registerUser(body)

    // اگر username داشت استفاده می‌کنیم، وگرنه ایمیل
    const displayName = user.username || user.email

    return new Response(
      JSON.stringify({
        message: `ثبت نام شما با موفقیت انجام شد، ${displayName}!`,
      }),
      { status: 201 }
    )
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
    })
  }
}
