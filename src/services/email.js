const nodemailer = require("nodemailer");
const pug = require("pug");
const juice = require("juice");
const { htmlToText } = require("html-to-text");

const emailConfig = require("../config/email");

const generateHTML = (options) => {
	const html = pug.renderFile(
		`${__dirname}/../views/emails/${options.archive}.pug`,
		options
	);

	return juice(html);
};

const transporter = nodemailer.createTransport(emailConfig);

exports.sendEmail = async (options) => {
	const html = generateHTML(options);
	const htmlString = htmlToText(html);

	const mailOptions = {
		from: '"TaskApps" <noreply@taskapps.com>',
		to: options.user.email,
		subject: `Taskapps - ${options.subject}`,
		text: htmlString,
		html,
	};

	return new Promise((resolve, reject) => {
		transporter.sendMail(mailOptions, (err, info) => {
			if (err) return reject(err);

			return resolve(true);
		});
	});
};
