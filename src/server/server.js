const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const passport = require("../config/passport");
// const session = require('express-session')
const session = require("cookie-session");
const flash = require("connect-flash");

const routes = require("../routes/routes.js");

// require("../config/config");

module.exports = (app) => {
  // database
  require("../database/database");

  // settings
  app.set("port", process.env.PORT);
  app.set("view engine", "pug");
  app.set("views", path.join(__dirname, "../views"));

  // middlewares
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(methodOverride("_method"));
  app.use(flash());
  app.use(
    session({
      secret: "session_secret",
      resave: false,
      saveUninitialized: false,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  // global variables
  const helpers = require("../helpers/front");
  app.use((req, res, next) => {
    res.locals.title = "TaskApps";
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.user = req.user || null;
    res.locals.helpers = helpers;
    res.locals.errors = req.flash("errors");
    res.locals.data = req.flash("data");
    if (res.locals.data.length > 0) res.locals.data = res.locals.data[0];

    next();
  });

  // routes
  routes(app);

  app.use(express.static(path.join(__dirname, "../public")));

  return app;
};
