const _ = require("underscore");

helper = {};

helper.handleErrorSequelize = (err) => {
	if (err.name === "SequelizeConnectionRefusedError") {
		/**
		 * TODO: Session global error (try later)  */
		console.log(err);
		return { error: { message: "Ha ocurrido un error, intentalo mas tarde" } };
	}

	if (
		err.name === "SequelizeValidationError" ||
		err.name === "SequelizeUniqueConstraintError"
	) {
		err = _.indexBy(err.errors, "path"); /* https://underscorejs.org/#indexBy */

		return { errors: err };
	}

	return err;
};

module.exports = helper;
