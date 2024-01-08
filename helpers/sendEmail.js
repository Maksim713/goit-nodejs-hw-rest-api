const nodemailer = require("nodemailer");
require("dotenv").config();

const { BREVO_SMTP_KEY, SMTP_PORT, SMTP_USER, SMTP_HOST } = process.env;

const nodemailerConfig = {
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: true,
  auth: {
    user: SMTP_USER,
    pass: BREVO_SMTP_KEY,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async ({ to, subject, html }) => {
  const email = { to, subject, html, from: "maxims9513@gmail.com" };

  await transport.sendMail(email).then(() => console.log("Email sent success"));
  return true;
};

module.exports = sendEmail;

// const email = {
//   to: "jageti5471@tanlanav.com",
//   from: SMTP_USER,
//   subject: "Test email",
//   html: "<p><strong>Test email</strong> from localhost:3000</p>",
// };

// transport
//   .sendMail(email)
//   .then(() => console.log("Email send success"))
//   .catch((error) => console.log(error.message));
