const { User } = require("../models");
const uniqid = require("uniqid");
const helpers = require("../helpers/back");
const emailService = require("../services/email");
const { uniq, uniqueId } = require("underscore");

const controller = {};

controller.showLoginForm = (req, res) => {
	res.json({ ok: true });
};

controller.login = (req, res) => {
	res.json({ ok: true });
};

controller.showRegistrationForm = (req, res) => {
	res.json({ ok: true });
};

controller.register = async (req, res) => {
	const { name, email, password } = req.body;
	let user;

	try {
		user = await User.create({
			name,
			email,
			password,
			token: `${uniqid()}${uniqid()}`,
		});
	} catch (err) {
		return res.json(helpers.handleErrorSequelize(err));
	}

	const confirmUrl = `http://localhost:3000/register/activate/${user.token}`;
	try {
		const info = await emailService.sendEmail({
			user,
			subject: `Confirma tu cuenta`,
			message: `Visita: ${confirmUrl}`,
		});
		res.json({ ok: true, info, confirmUrl });
	} catch (err) {
		await user.destroy();
		return res.json({ ok: false, err });
	}
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
	res.json({ ok: true });
};

controller.sendResetLinkEmail = (req, res) => {
	res.json({ ok: true });
};

controller.showResetForm = (req, res) => {
	res.json({ ok: true });
};

controller.reset = (req, res) => {
	res.json({ ok: true });
};

module.exports = controller;
