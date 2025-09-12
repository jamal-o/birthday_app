const cron = require("node-cron");
const { emailService } = require("./email.service");



module.exports = () => {
  console.log("Setting up cron job...");
	cron.schedule(process.env.CRON_SCHEDULE, async () => {
		try {
      console.log("Running cron job...");
			emailService();
		} catch (err) {
			console.error("Error sending birthday emails:", err);
		}
	});
};
