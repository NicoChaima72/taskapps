const express = require("express");
const router = express.Router();

module.exports = (app) => {
	router.get("/", (req, res) => {
		res.render("index", { pageName: "index" });
	});

	app.use(router);
};
