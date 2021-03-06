const validate = require("./request");

const request = {};

request.store = (req, res) => {
	const validationRule = {
		name: "required|max:32",
	};

	return validate(req.body, validationRule, {}, req, res);
};

request.update = (req, res) => {
	const validationRule = {
		name: "required|max:32",
	};

	return validate(req.body, validationRule, {}, req, res);
};

module.exports = request;
