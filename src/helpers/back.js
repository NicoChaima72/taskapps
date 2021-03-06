const _ = require("underscore");

helper = {};

helper.handleErrorSequelize = (err) => {
	if (err.name === "SequelizeConnectionRefusedError") {
		/**
		 * TODO: Session global error (try later)  */
		console.log(err);
		return { global: { message: "Ha ocurrido un error, intentalo mas tarde" } };
	}

	if (
		err.name === "SequelizeValidationError" ||
		err.name === "SequelizeUniqueConstraintError"
	) {
		err = _.indexBy(err.errors, "path"); /* https://underscorejs.org/#indexBy */

		return err;
	}

	return err;
};

helper.clearString = (string) => {
	return string
		.replace(/&/g, "&amp;")
		.replace(/>/g, "&gt;")
		.replace(/</g, "&lt;")
		.replace(/"/g, "&quot;")
		.trim()
};

module.exports = helper;
