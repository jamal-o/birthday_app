const express = require("express");
const app = express();
const exphbs = require("express-handlebars");

const path = require("path");
const User = require("./models/user");
const { default: mongoose } = require("mongoose");

const hbs = exphbs.create({
	extname: ".hbs",
	helpers: {
		formatDate: (date) => {
			const options = { year: "numeric", month: "long", day: "numeric" };
			return new Date(date).toLocaleDateString("en-US", options);
		},
	},
});

app.engine(".hbs", hbs.engine);

// app.engine('handlebars', engine());
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
	res.render("index");
});

app.post("/users", async (req, res) => {
	try {
		console.log(req.body);
		const user = new User(req.body);
		await user.save();
		res.redirect("/users");
	} catch (err) {
		console.error(err);
		if (err?.code === 11000) {
			res.render("index", {
				errorMessage: "Duplicate Entries are not allowed",
			});
		} else {
			res.render("index", { errorMessage: err.message });
		}
	}
});

app.get("/users", async (req, res) => {
	try {
		const users = await User.find().lean();

		res.render("users", { users });
	} catch (err) {
		console.error(err);
		res.status(500).send("Error fetching users");
	}
});

app.use((req, res) => {
	res.redirect("/");
});
app.use((err, req, res, next) => {
	console.error(err);
	res.status(500).send("Internal Server Error");
});

module.exports = app;
