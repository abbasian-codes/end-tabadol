// import { PrismaClient } from "../../../src/generated/prisma/client" // مسیر دقیق به Prisma Client
import { PrismaClient } from "/src/generated/prisma/client.js"
const prisma = new PrismaClient()

export async function POST(req) {
  const { name, email, username } = await req.json()

  try {
    const user = await prisma.user.create({
      data: { name, email, username },
    })

    return new Response(JSON.stringify({ message: "ثبت‌نام موفق بود!" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    })
  }
}
