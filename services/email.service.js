const nodemailer = require('nodemailer');
require('dotenv').config();
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendBirthdayEmail = async (user) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Happy Birthday!',
      text: `Happy birthday to ${user.username}!`,
    };

    await transporter.sendMail(mailOptions);
    console.log('Birthday email sent to', user.email);
  } catch (err) {
    console.error('Error sending birthday email:', err);
  }
};

module.exports = { sendBirthdayEmail };