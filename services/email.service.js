const nodemailer = require("nodemailer");

const User = require("../models/user");
const emailService = async () => {
	const today = new Date();

	try {
		const users = await User.find({
			$expr: {
				$and: [
					{ $eq: [{ $dayOfMonth: "$dateOfBirth" }, { $dayOfMonth: today }] },
					{ $eq: [{ $month: "$dateOfBirth" }, { $month: today }] },
				],
			},
		});

		console.log(`Sending ${users.length} birthday emails...`);
		users.forEach((user) => {
			return sendBirthdayEmail(user)
				.then(() => {
					user.lastSentAt = new Date();
					return user.save();
				})
				.catch((err) => {
					console.error(`Error sending email to ${user.email}: ${err}`);
				});
		});
		return Promise.all(users.map((user) => user.save()));
	} catch (err) {
		console.error(`Error fetching users: ${err}`);
	}
};

const sendBirthdayEmail = async (user) => {
	// 	const transporter = nodemailer.createTransport({
	// 		service: "gmail",
	// 		host: process.env.EMAIL_HOST,
	// 		port: process.env.EMAIL_PORT,
	// 		secure: false,
	// 		auth: {
	// 			user: process.env.EMAIL_USER,
	// 			pass: process.env.EMAIL_PASS,
	// 		},
	// 		connectionTimeout: 5 * 60 * 1000, // 5 minutes
	// 		logger: true,
	// 		tls: {
	// 			rejectUnauthorized: false,
	// 		},
	// 	});
	const { SMTPClient} = await import("emailjs");
	const client = new SMTPClient({
		user: process.env.EMAIL_USER,
		password: process.env.EMAIL_PASS,
		host: process.env.EMAIL_HOST,
		ssl: true,
		// port: process.env.EMAIL_PORT,
	});

	return client.sendAsync(
		{
			from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_USER}>`,
			to: user.email,
			subject: "Happy Birthday!",
			text: `Happy birthday to ${user.username}!`,
			html: `
        <div style="background: #f7fafc; padding: 40px 0;">
          <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width: 500px; background: #fff; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
            <tr>
              <td style="padding: 30px 40px 20px 40px; text-align: center;">
                <img src="https://img.icons8.com/color/96/000000/birthday-cake.png" alt="Birthday Cake" width="80" height="80" style="margin-bottom: 20px;" />
                <h1 style="color: #ff6f61; font-family: Arial, sans-serif; margin-bottom: 10px;">Happy Birthday, ${
									user.username
								}!</h1>
                <p style="color: #333; font-size: 18px; font-family: Arial, sans-serif; margin-bottom: 20px;">
                  Wishing you a fantastic day filled with joy, laughter, and all your favorite things.<br>
                  Thank you for being a valued part of our community!
                </p>
                <a href="https://yourcompany.com" style="display: inline-block; padding: 12px 28px; background: #ff6f61; color: #fff; border-radius: 5px; text-decoration: none; font-weight: bold; font-family: Arial, sans-serif;">
                  Celebrate with Us
                </a>
              </td>
            </tr>
            <tr>
              <td style="padding: 20px 40px 30px 40px; text-align: center; color: #aaa; font-size: 14px; font-family: Arial, sans-serif;">
                &copy; ${new Date().getFullYear()} Birthday Reminder Inc. All rights reserved.
              </td>
            </tr>
          </table>
        </div>
        `,
		}
	
	);
};

module.exports = { emailService };
