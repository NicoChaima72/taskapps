const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Task = sequelize.define("Task", {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	description: { type: DataTypes.STRING, allowNull: false },
	state: { type: DataTypes.BOOLEAN, defaultValue: 0 },
});

module.exports = Task;
