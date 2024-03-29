const { Category, Task } = require("../models");
const { clearString } = require("../helpers/back");

const controller = {};

controller.index = async (req, res, next) => {
  try {
    const categories = await Category.findAll({
      include: { model: Task },
      order: [["updatedAt", "DESC"]],
      where: { UserId: req.user.id },
    });

    res.render("categories/index", {
      categories,
      namePage: "categories.index",
    });
  } catch (err) {
    backURL = req.header("Referer") || "/";
    req.flash("errors", helpers.handleErrorSequelize(err));

    return res.render("categories/index", {
      categories: {},
      namePage: "categories.index",
    });
  }
};

// controller.create = async (req, res, next) => {
// 	res.json({ ok: true, message: "Show create form" });
// };

controller.store = async (req, res, next) => {
  const { name } = req.body;
  try {
    const category = await Category.create({
      name: clearString(name),
      UserId: req.user.id,
    });
    res.redirect(`/categories/${category.url}`);
  } catch (e) {
    res.json({ ok: false, error: e });
  }
};

controller.show = async (req, res, next) => {
  const { project_url } = req.params;
  try {
    const category = await Category.findOne({
      where: { url: project_url, UserId: req.user.id },
      include: [{ model: Task /* as: 'Task', */, all: true, nested: true }],
      order: [["Tasks", "createdAt", "DESC"]], // Ordernar las tareas dentro de categorias
    });

    if (!category) return res.redirect("/");

    res.render("categories/show", { category, namePage: "categories.show" });
  } catch (err) {
    backURL = req.header("Referer") || "/";
    req.flash("errors", helpers.handleErrorSequelize(err));

    return res.redirect(backURL);
  }
};

// controller.edit = async (req, res, next) => {
// 	const { project_url } = req.params;
// 	const category = await Category.findOne({ where: { url: project_url, UserId: req.user.id } });

// 	res.json({ ok: true, message: "Show edit form form", category });
// };

controller.update = async (req, res, next) => {
  const { project_url } = req.params;
  const { name } = req.body;
  try {
    const category = await Category.findOne({
      where: { url: project_url, UserId: req.user.id },
    });

    if (!category) return res.json({ ok: false });

    await category.update({ name: clearString(name) });

    return res.json({ ok: true, category });
  } catch (e) {
    res.json({ ok: false, error: e });
  }
};

controller.destroy = async (req, res, next) => {
  const { project_url } = req.params;
  try {
    const category = await Category.findOne({
      where: { url: project_url, UserId: req.user.id },
    });

    if (!category) return res.json({ ok: false });

    await category.destroy();

    res.redirect("/categories");
  } catch (err) {
    backURL = req.header("Referer") || "/";
    req.flash("data", req.body);
    req.flash("errors", helpers.handleErrorSequelize(err));

    return res.redirect(backURL);
  }
};

module.exports = controller;
