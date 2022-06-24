const { Task, Category } = require("../models");
const { clearString } = require("../helpers/back");
const TaskRequest = require("../requests/taskRequest");

const controller = {};

controller.index = async (req, res, next) => {
  const { project_url } = req.params;
  const category = await Category.findOne({ where: { url: project_url } });

  const tasks = await Task.findAll({ where: { projectId: category.id } });

  res.render("categories/index", { ok: true, tasks });
};

// controller.create = async (req, res, next) => {
// 	const { project_url } = req.params;

// 	const category = await Category.findOne({ where: { url: project_url } });

// 	res.json({ ok: true, message: "Form create task", category });
// };

controller.store = async (req, res, next) => {
  TaskRequest.store(req, res);

  const { project_url } = req.params;
  const { description } = req.body;

  try {
    let category = await Category.findOne({ where: { url: project_url } });

    if (!category)
      return res
        .status(400)
        .json({ ok: false, message: "Category not exists" });

    const task = await Task.create(
      { description: clearString(description), CategoryId: category.id },
      { include: Category }
    );

    category = await Category.findByPk(category.id, {
      include: { model: Task },
    });

    await category.updatedUpdatedAt();

    res.json({ ok: true, task, category, stats: category.stats() });
  } catch (e) {
    res.json({ ok: false, error: e });
  }
};

controller.edit = async (req, res, next) => {
  const { task_id } = req.params;
  const task = await Task.findByPk(task_id);

  res.json({ ok: true, message: "Show form update task", task });
};

controller.update = async (req, res, next) => {
  TaskRequest.update(req, res);

  const { task_id } = req.params;
  const { description } = req.body;
  try {
    const task = await Task.findByPk(task_id);

    await task.update({ description: clearString(description) });

    res.json({ ok: true, task });
  } catch (e) {
    res.json({ ok: false, error: e });
  }
};

controller.updateState = async (req, res, next) => {
  const { task_id } = req.params;
  try {
    const task = await Task.findByPk(task_id);

    await task.update({ state: !task.state });

    const category = await Category.findByPk(task.CategoryId, {
      include: { model: Task },
    });

    await category.updatedUpdatedAt();

    res.json({ ok: true, task, category, stats: category.stats() });
  } catch (e) {
    res.json({ ok: false, error: e });
  }
};

controller.destroy = async (req, res, next) => {
  const { task_id } = req.params;
  try {
    const task = await Task.findByPk(task_id);

    if (!task)
      return res.status(400).json({ ok: false, message: "Task not exists" });

    let category = await Category.findByPk(task.CategoryId);

    await task.destroy();

    category = await Category.findByPk(category.id, {
      include: { model: Task },
    });

    await category.updatedUpdatedAt();

    res.json({ ok: true, task, category, stats: category.stats() });
  } catch (e) {
    res.json({ ok: false, error: e });
  }
};

module.exports = controller;
