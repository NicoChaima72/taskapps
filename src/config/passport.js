const passport = require("passport")
const LocalStrategy = require('passport-local')

const {User, Category} = require('../models')

passport.use(
    'local.signin',
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
            passReqToCallback: true
        },
        async (req, email, password, done) => {
            const user = await User.findOne({
                where: {email},
                include: {model: Category}
            });

            if (!user) {
                req.flash('data', {email})
                req.flash('error', 'Usuario y/o contraseña incorrectos')
                return done(null, false, {})
            }
            
            if (!user.verifyPassword(password)) {
                req.flash('data', {email})
                req.flash('error', 'Usuario y/o contraseña incorrectos')
                return done(null, false, {})
            }
            
            if (user.isActive != 1) {
                req.flash('data', {email})
                req.flash('error', 'Usuario no activo, verifica tu correo')
                return done(null, false, {})
            }

            return done(null, user)
        }
))

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser(async (user, done) => {
    user = await User.findOne({
			where: { email: user.email },
			include: { model: Category },
		});
    console.log('DESERIALIZE', user)
    done(null, user)
})

module.exports = passport