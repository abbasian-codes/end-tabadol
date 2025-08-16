// import nodemailer from "nodemailer"

// async function createTestAccount() {
//   let testAccount = await nodemailer.createTestAccount()
//   console.log("Test account:", testAccount)
// }

// createTestAccount()
const nodemailer = require("nodemailer")

async function createTestAccount() {
  let testAccount = await nodemailer.createTestAccount()
  console.log("Test account:", testAccount)
}

createTestAccount()
