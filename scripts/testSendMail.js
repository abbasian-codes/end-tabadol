import { sendMail } from "../lib/mailer.js"

async function main() {
  await sendMail({
    to: "example@test.com", // هر ایمیل تستی
    subject: "ایمیل تستی با Ethereal",
    text: "سلام! این یه تست ساده است.",
    html: "<h1>سلام 👋</h1><p>این یه ایمیل تستی با Ethereal هست.</p>",
  })
}

main()
