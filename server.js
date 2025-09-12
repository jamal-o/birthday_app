const app = require("./app");

const path = require("path");


const NODE_ENV = process.env.NODE_ENV || "development";

const fs = require("fs");

const envFilePath = path.resolve(__dirname, `.env.${NODE_ENV}`);
if (fs.existsSync(envFilePath)) {
	 require("dotenv").config({ path: envFilePath });
	console.log(`Loaded env: ${envFilePath}`);
} else {
	require("dotenv").config();
	console.log("Loaded default .env");
}
require('./config/database');
const cronService = require ('./services/cron.service');

cronService();
const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Server listening on port http://localhost:${port}`);
});
