const express = require("express");
const router = express.Router();

const Auth = require("./auth");

module.exports = (app) => {
	Auth(router);

	router.get("/", (req, res) => {
		res.render("emails/auth/resetPassword", { pageName: "index" });
	});

	app.use(router);
};
