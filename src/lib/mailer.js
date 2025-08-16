const nodemailer = require("nodemailer")

export async function sendMail({ to, subject, text, html }) {
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  let info = await transporter.sendMail({
    from: `"پشتیبانی" <${process.env.SMTP_USER}>`,
    to,
    subject,
    text,
    html,
  })

  console.log("Message sent: %s", info.messageId)
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))
}
// import nodemailer from "nodemailer"

// export async function sendTestEmail(to, subject, text) {
//   let testAccount = await nodemailer.createTestAccount()

//   let transporter = nodemailer.createTransport({
//     host: "smtp.ethereal.email",
//     port: 587,
//     secure: false, // TLS
//     auth: {
//       user: testAccount.user,
//       pass: testAccount.pass,
//     },
//   })

//   let info = await transporter.sendMail({
//     from: '"My App 👩‍💻" <no-reply@myapp.com>',
//     to,
//     subject,
//     text,
//     html: `<b>${text}</b>`,
//   })

//   console.log("Message sent: %s", info.messageId)
//   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))
// }
