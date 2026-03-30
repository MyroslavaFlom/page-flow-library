const transporter = require('../config/mailer');

async function sendVerificationEmail(to, verifyUrl) {
  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to,
    subject: 'Підтвердження реєстрації — Бібліотека',
    html: `
      <p>Вітаємо!</p>
      <p>Будь ласка, підтвердіть вашу електронну адресу:</p>
      <p><a href="${verifyUrl}">Підтвердити email</a></p>
      <p>Посилання діє 24 години.</p>
    `,
  });
}

module.exports = { sendVerificationEmail };