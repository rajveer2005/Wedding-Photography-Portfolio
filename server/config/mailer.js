// Sends email through SMTP (Gmail by default). If SMTP is not configured the message is printed
// in the server terminal instead, so you can still test locally.
const nodemailer = require('nodemailer');
const { SMTP_USER, SMTP_PASS, SMTP_HOST, SMTP_PORT } = process.env;
const transporter = SMTP_USER && SMTP_PASS
  ? nodemailer.createTransport({ host: SMTP_HOST || 'smtp.gmail.com', port: Number(SMTP_PORT) || 587, secure: Number(SMTP_PORT) === 465, auth: { user: SMTP_USER, pass: SMTP_PASS } })
  : null;

exports.sendMail = async ({ to, subject, text }) => {
  if (!transporter) { console.log(`\n[EMAIL not configured - printing instead]\nTo: ${to}\n${subject}\n${text}\n`); return false; }
  try { await transporter.sendMail({ from: `"One Soul Media" <${SMTP_USER}>`, to, subject, text }); return true; }
  catch (e) { console.error('Email failed:', e.message); console.log(text); return false; }
};
