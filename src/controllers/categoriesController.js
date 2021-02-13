const { Category, Task } = require("../models");
const {clearString} = require('../helpers/back')
const CategoryRequest = require("../requests/categoryRequest");

const controller = {};

controller.index = async (req, res, next) => {
	const categories = await Category.findAll({
		include: { model: Task },
		order: [["updatedAt", "DESC"]],
		where: {userId: req.user.id}
	});

	res.render("categories/index", { categories, namePage: 'categories.index' });
};

controller.create = async (req, res, next) => {
	res.json({ ok: true, message: "Show create form" });
};

controller.store = async (req, res, next) => {
	CategoryRequest.store(req, res);
	
	const { name } = req.body;
	const category = await Category.create({ name: clearString(name), userId: req.user.id });

	res.redirect(`/categories/${category.url}`);
};

controller.show = async (req, res, next) => {
	const { project_url } = req.params;
	const category = await Category.findOne({
		where: { url: project_url, userId: req.user.id },
		include: [{ model: Task /* as: 'Task', */, all: true, nested: true }],
		order: [["Tasks", "createdAt", "DESC"]], // Ordernar las tareas dentro de categorias
	});

	if (!category)
		return res.status(400).json({ ok: false, message: "Category not exists" });

		res.render("categories/show", { category, namePage: 'categories.show'});
};

// controller.edit = async (req, res, next) => {
// 	const { project_url } = req.params;
// 	const category = await Category.findOne({ where: { url: project_url, userId: req.user.id } });

// 	res.json({ ok: true, message: "Show edit form form", category });
// };

controller.update = async (req, res, next) => {
	CategoryRequest.update(req, res);

	const { project_url } = req.params;
	const { name } = req.body;
	const category = await Category.findOne({ where: { url: project_url, userId: req.user.id } });

	if (!category) return res.json({ ok: false });

	await category.update({ name: clearString(name) });

	return res.json({ ok: true, category });
};

controller.destroy = async (req, res, next) => {
	const { project_url } = req.params;
	const category = await Category.findOne({ where: { url: project_url, userId: req.user.id } });

	if (!category) return res.json({ ok: false });

	await category.destroy();

	res.redirect("/categories");
};

module.exports = controller;
