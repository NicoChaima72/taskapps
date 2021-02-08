const validator = require("../helpers/validate");

module.exports = (data, rules, customMessages, req, res) => {
    validator(data, rules, customMessages, (err, result) => {
			if (err) {
				backURL = req.header("Referer") || "/";
				req.flash("data", req.body);
				req.flash("errors", err);
				return res.redirect(backURL);
			}
		});
}