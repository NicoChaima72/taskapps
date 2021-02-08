require('../config/passport')
const passport = require("passport");
const { User } = require("../models");
const { Op } = require("sequelize");
const uniqid = require("uniqid");
const helpers = require("../helpers/back");
const emailService = require("../services/email");

const AuthRequest = require("../requests/authRequest");

const controller = {};

controller.showLoginForm = (req, res) => {
	res.render("auth/login");
};

controller.login = (req, res, next) => {
	AuthRequest.login(req, res);

	passport.authenticate("local.signin", {
		successRedirect: "/",
		failureRedirect: "/login",
		failureFlash: true,
	})(req, res, next);
};

controller.showRegistrationForm = (req, res) => {
	res.render("auth/register");
};

controller.register = async (req, res) => {
	AuthRequest.register(req, res);

	const { name, email, password } = req.body;
	let user;

	try {
		user = await User.create({
			name,
			email,
			password,
			token: uniqid(),
		});
	} catch (err) {
		backURL = req.header("Referer") || "/";
		req.flash("data", req.body);
		req.flash("errors", helpers.handleErrorSequelize(err));

		return res.redirect(backURL);
	}

	const confirmUrl = `http://localhost:3000/register/activate/${user.token}`;

	emailService
		.sendEmail({
			user,
			subject: `Confirma tu cuenta`,
			archive: "auth/confirmAccount",
			confirmUrl,
		})
		.then((info) => {
			req.flash("success", "Cuenta creada, verifica tu correo.");
			req.flash("data", { email });
			res.redirect("/login");
		})
		.catch(async (err) => {
			await user.destroy();
			req.flash("error", "Ha ocurrido un error, intenta más tarde.");
			return res.redirect("/register");
		});
};

controller.activate = async (req, res) => {
	const { token } = req.params;

	const user = await User.findOne({ where: { token } });

	if (!user) {
		req.flash("error", "Token expirado.");
		return res.redirect("/login");
	}

	await user.update({ isActive: 1, token: null });

	req.flash("data", { email: user.email });
	req.flash("success", "Cuenta verificada, puedes iniciar sesion.");
	res.redirect("/login");
};

controller.logout = (req, res) => {
	req.logOut();
	res.redirect("/login");
};

controller.showLinkRequestForm = (req, res) => {
	res.render("auth/link-request");
};

controller.sendResetLinkEmail = async (req, res) => {
	AuthRequest.linkRequest(req, res);

	const { email } = req.body;

	const user = await User.findOne({ where: { email: email } });

	if (!user) {
		req.flash("data", {email})
		req.flash("error", "El email no está registrado")
		return res.redirect('/password/reset')
}

	user.token = uniqid();
	user.expire = Date.now() + 1000 * 60 * 60 * 2; /** 2hrs */

	await user.save();

	const confirmUrl = `http://localhost:3000/password/reset/${user.token}`;

	emailService
		.sendEmail({
			user,
			subject: `Recuperar contraseña`,
			archive: "auth/resetPassword",
			confirmUrl,
		})
		.then((info) => {
			req.flash("success", "Hemos enviado un link a tu correo para recuperar tu contraseña.");
			req.flash("data", { email });
			res.redirect("/login");
		})
		.catch(async (err) => {
			req.flash("error", "Ha ocurrido un error, intenta más tarde.");
			return res.redirect("/password/reset");
		});
};

controller.showResetForm = async (req, res) => {
	const { token } = req.params;

	const user = await User.findOne({
		where: {
			token,
			expire: { [Op.gte]: Date.now() },
		},
	});
	if (!user) {
		req.flash("error", "Token expirado.");
		return res.redirect("/login");
	}

	res.render('auth/reset.pug', {token});
};

controller.reset = async (req, res) => {
	AuthRequest.resetPassword(req, res)
	
	const { token } = req.params;

	const user = await User.findOne({
		where: {
			token,
			expire: { [Op.gte]: Date.now() },
		},
	});

	if (!user) {
		req.flash("error", "Token expirado.");
		return res.redirect("/login");
	}

	await user.update({ password: req.body.password, token: null, expire: null, isActive: 1 });

	req.flash("success", "Contraseña cambiada con exito.");
			req.flash("data", { email: user.email });
			res.redirect("/login");
};

module.exports = controller;
