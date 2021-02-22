const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const slug = require("slug");
const shortid = require("shortid");

const Task = require("./TaskModel");

const Category = sequelize.define(
	"Category",
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		name: { type: DataTypes.STRING, allowNull: false },
		url: { type: DataTypes.STRING },
		color: { type: DataTypes.STRING },
	},
	{
		hooks: {
			beforeCreate(category) {
				const url = slug(category.name).toLowerCase();
				category.url = `${url}-${shortid.generate()}`;

				const colors = [
					"gray",
					"red",
					"orange",
					"amber",
					"yellow",
					"lime",
					"green",
					"emerald",
					"teal",
					"cyan",
					"lightBlue",
					"blue",
					"indigo",
					"violet",
					"purple",
					"fuchsia",
					"pink",
					"rose",
				];

				category.color = colors[Math.floor(Math.random() * colors.length)];
			},
		},
	}
);

Category.prototype.stats = function () {
	if (this.Tasks.length == 0) return 0;
	const completed = this.Tasks.filter((task) => task.state == 1);
	const percent =
		Math.round((completed.length / this.Tasks.length) * 100); // 0.666666666 -> 666.66666 -> 666 / 10 = 66.6 %
	return { tasks: this.Tasks.length, completed: completed.length, percent, id: this.id, category: this };
};

Category.prototype.updatedUpdatedAt = async function () {
	this.changed("updatedAt", true);
	await this.update({ updatedAt: new Date() });
};

Category.hasMany(Task, { onDelete: "CASCADE" });
Task.belongsTo(Category);

module.exports = Category;
