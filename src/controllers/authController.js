const { User } = require("../models");
const uniqid = require("uniqid");
const helpers = require("../helpers/back");
const emailService = require("../services/email");
const { uniq, uniqueId } = require("underscore");
const { Op } = require("sequelize");

const controller = {};

controller.showLoginForm = (req, res) => {
	res.json({ ok: "Show login form" });
};

controller.login = (req, res) => {
	res.json({ ok: true });
};

controller.showRegistrationForm = (req, res) => {
	res.json({ ok: "Show registration form" });
};

controller.register = async (req, res) => {
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
		return res.json(helpers.handleErrorSequelize(err));
	}

	const confirmUrl = `http://localhost:3000/register/activate/${user.token}`;

	emailService
		.sendEmail({
			user,
			subject: `Confirma tu cuenta`,
			archive: "auth/confirmAccount",
			confirmUrl,
		})
		.then((info) => res.json({ ok: true, info, confirmUrl }))
		.catch(async (err) => {
			await user.destroy();
			console.log(err);
			return res.json({ ok: false, err });
		});
};

controller.activate = async (req, res) => {
	const { token } = req.params;

	const user = await User.findOne({ where: { token } });

	if (!user) return res.json({ ok: false });

	await user.update({ isActive: 1, token: null });

	res.json({ ok: true });
};

controller.logout = (req, res) => {
	res.json({ ok: true });
};

controller.showLinkRequestForm = (req, res) => {
	res.json({ ok: "Show form link request" });
};

controller.sendResetLinkEmail = async (req, res) => {
	const { email } = req.body;

	if (!email)
		return res.status(400).json({ ok: false, message: "Email is required" });

	const user = await User.findOne({ where: { email: email } });

	if (!user)
		return res.status(400).json({ ok: false, message: "Email not exist" });

	user.token = uniqid();
	user.expire = Date.now() + 1000 * 60 * 60 * 2; /** 2hrs */

	await user.save();

	const confirmUrl = `http://localhost:3000/password/reset/${user.token}`;

	emailService
		.sendEmail({
			user,
			subject: `Olvidé mi contraseña`,
			archive: "auth/resetPassword",
			confirmUrl,
		})
		.then((info) => res.json({ ok: true, info, confirmUrl }))
		.catch(async (err) => {
			console.log(err);
			return res.json({ ok: false, err });
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
	if (!user)
		return res.status(400).json({ ok: false, message: "Token not valid" });

	res.json({ ok: "Show form reset password" });
};

controller.reset = async (req, res) => {
	const { token } = req.params;

	const user = await User.findOne({
		where: {
			token,
			expire: { [Op.gte]: Date.now() },
		},
	});

	if (!user)
		return res.status(400).json({ ok: false, message: "Token not valid" });

	await user.update({ password: req.body.password, token: null, expire: null });

	res.json({ ok: user });
};

module.exports = controller;
