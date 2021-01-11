const Validator = require("validatorjs"); /**https://www.npmjs.com/package/validatorjs */
const _ = require("underscore");

Validator.useLang("es");

const validator = (body, rules, customMessages, callback) => {
	const validation = new Validator(body, rules, customMessages);

	validation.passes(() => callback(null, true));
	validation.fails(() => {
		const fails = validation.errors.errors;

		console.log(validation.errors.all());
		// const errors = [];

		// for (const key in fails) {
		// 	errors.push({ [key]: { message: fails[key][0] } });
		// }

		const errors = {};

		for (const key in fails) {
			errors[key] = { message: fails[key][0] };
		}

		return callback(errors, false);
	});
};

module.exports = validator;
