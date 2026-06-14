const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT || 0),
  secure: process.env.EMAIL_SECURE === "true",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendMail = async (mailOptions) => {
  return transporter.sendMail({
    from: process.env.EMAIL_FROM,
    ...mailOptions,
  });
};

module.exports = {
  transporter,
  sendMail,
};
