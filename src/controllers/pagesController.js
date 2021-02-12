const { Category, Task } = require("../models");

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

	res.render("index", { categories, tasks, namePage: 'Inicio', currentPage: 'pages.home' });
};

controller.search = async (req, res) => {
	const {search} = req.body;
	const categories = await Category.findAll({include: {model: Task}});
	const tasks = await Task.findAll({include: {model: Category}})

	return res.json({ok: true, categories, tasks})
}

module.exports = controller;
