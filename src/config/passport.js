const passport = require("passport")
const LocalStrategy = require('passport-local')

const {User} = require('../models')

passport.use(
    'local.signin',
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
            passReqToCallback: true
        },
        async (req, email, password, done) => {
            const user = await User.findOne({where: {email}});

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

passport.deserializeUser((user, done) => {
    // pruebas aqui
    done(null, user)
})

module.exports = passport