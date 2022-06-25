const passport = require("passport");
const LocalStrategy = require("passport-local");
const helpers = require("../helpers/back");

const { User, Category } = require("../models");

passport.use(
  "local.signin",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      let user = null;
      try {
        user = await User.findOne({
          where: { email },
          include: { model: Category },
        });
      } catch (e) {
        req.flash("error", helpers.handleErrorSequelize(e));
        return done(null, false, {});
      }

      if (!user) {
        req.flash("data", { email });
        req.flash("error", "Usuario y/o contraseña incorrectos");
        return done(null, false, {});
      }

      if (!user.verifyPassword(password)) {
        req.flash("data", { email });
        req.flash("error", "Usuario y/o contraseña incorrectos");
        return done(null, false, {});
      }

      if (user.isActive != 1) {
        req.flash("data", { email });
        req.flash("error", "Usuario no activo, verifica tu correo");
        return done(null, false, {});
      }

      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (user, done) => {
  try {
    user = await User.findOne({
      where: { email: user.email },
      include: { model: Category },
    });

    done(null, user);
  } catch (e) {
    return done(null, false, {});
  }
});

module.exports = passport;
