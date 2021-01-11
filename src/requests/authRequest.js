const validator = require("../helpers/validate");

const request = {};

request.resetPassword = (req, res, next) => {
	const validationRule = {
		password: "required|min:8|confirmed",
		password_confirmation: "required",
	};

	validator(req.body, validationRule, {}, (err, result) => {
		if (err) return res.json({ ok: false, err });

		next();
	});
};

module.exports = request;
