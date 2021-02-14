const { Op } = require("sequelize");
const { Category, Task } = require("../models");
const {clearString} = require('../helpers/back')

const controller = {};

controller.home = async (req, res) => {
	const tasks = await Task.findAll({
		include: [{
			model: Category,
			where: {userId: req.user.id}
		}],
		order: [["createdAt", "DESC"]],
		limit: 7,
	});
	const categories = await Category.findAll({
		include: { model: Task },
		order: [["updatedAt", "DESC"]],
		limit: 10,
		where: {userId: req.user.id}
	});

	res.render("index", { categories, tasks, namePage: 'pages.home' });
};

controller.search = async (req, res) => {
	let {search} = req.params;

	search = clearString(search)
	const categories = await Category.findAll({
		where: {
			name: {
				[Op.substring]: search
			},
			userId: req.user.id
		},
		include: {model: Task}
	});
	const tasks = await Task.findAll({
		where: {
			description: {
				[Op.substring]: search
			}
		},
		include: {
			model: Category,
			where: { userId: req.user.id },
		},
	});

	return res.json({ok: true, categories, tasks, search})
}

module.exports = controller;
