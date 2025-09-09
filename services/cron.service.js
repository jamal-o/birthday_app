const cron = require('node-cron');
const User = require('../models/User');
const { sendBirthdayEmail } = require('./emailService');

const schedule = '0 7 * * *'; // every day at 7:00 AM

cron.schedule(schedule, async () => {
  try {
    const today = new Date();
    const users = await User.find({
      $expr: {
        $and: [
          { $eq: [{ $dayOfMonth: "$dateOfBirth" }, { $dayOfMonth: today }] },
          { $eq: [{ $month: "$dateOfBirth" }, { $month: today }] }
        ]
      }
    });

    users.forEach((user) => {
      sendBirthdayEmail(user);
    });
  } catch (err) {
    console.error('Error sending birthday emails:', err);
  }
});