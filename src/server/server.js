const express = require("express");
const path = require("path");

const routes = require("../routes/routes.js");

require("../config/config");

module.exports = (app) => {
	app.set("port", process.env.PORT);
	app.set("view engine", "pug");
	app.set("views", path.join(__dirname, "../views"));

	app.use(express.urlencoded({ extended: true }));
	app.use(express.json());
	// app.use(flash());
	// app.use(
	// 	session({
	// 		secret: "supersecret",
	// 		resave: false,
	// 		saveUninitialized: false,
	// 	})
	// );
	// app.use(passport.initialize());
	// app.use(passport.session());

	app.use((req, res, next) => {
		res.locals.title = "TareApps";
		next();
	});

	routes(app);

	app.use(express.static(path.join(__dirname, "../public")));

	return app;
};
