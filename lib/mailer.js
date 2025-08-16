import nodemailer from "nodemailer"

// ⚡ مقادیر رو از createEtherealAccount.js که قبلاً گرفتی جایگزین کن
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // چون پورت 587 هست
  auth: {
    user: "mabp7e67zgyiwgn6@ethereal.email",
    pass: "JyKn4cr4t5h5s9s5k5",
  },
})

export async function sendMail({ to, subject, text, html }) {
  const info = await transporter.sendMail({
    from: '"Hasti Project" <no-reply@hasti-project.com>',
    to,
    subject,
    text,
    html,
  })

  console.log("Message sent: %s", info.messageId)
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))
}
