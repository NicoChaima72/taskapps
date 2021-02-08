const validate = require('./request')

const request = {};

request.register = (req, res) => {
	const validationRule = {
		name: "required",
		email: "required",
		password: "required|min:8|confirmed",
		password_confirmation: "required"
	}

	const customMessages = {
		"confirmed.password": "Las contraseñas no coinciden"
	}

	return validate(req.body, validationRule, customMessages, req, res);
}

request.login = (req, res) => {
	const validationRule = {
		email: "required",
		password: "required"
	}
	
	const customMessages = {}
	
	return validate(req.body, validationRule, customMessages, req, res);
}

request.linkRequest = (req, res) => {
	const validationRule = {
		email: "required",
	};

	return validate(req.body, validationRule, {}, req, res);
}

request.resetPassword = (req, res) => {
	const validationRule = {
		password: "required|min:8|confirmed",
		password_confirmation: "required",
	};

	const customMessages = {}

	return validate(req.body, validationRule, customMessages, req, res);
};

module.exports = request;
