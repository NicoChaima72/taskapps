const nodemailer = require("nodemailer");

const emailConfig = require("../config/email");

const transporter = nodemailer.createTransport(emailConfig);

exports.sendEmail = async (options) => {
	const mailOptions = {
		from: '"TaskApps" <noreply@taskapps.com>',
		to: options.user.email,
		subject: options.subject,
		text: options.message,
		html: `<p>${options.message}</p>`,
	};

	return new Promise((resolve, reject) => {
		transporter.sendMail(mailOptions, (err, info) => {
			if (err) return reject(err);

			return resolve(true);
		});
	});
};
