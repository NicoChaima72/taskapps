const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const slug = require("slug");
const shortid = require("shortid");

const Project = sequelize.define(
	"Project",
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		name: { type: DataTypes.STRING, allowNull: false },
		url: { type: DataTypes.STRING },
	},
	{
		hooks: {
			beforeCreate(project) {
				const url = slug(project.name).toLowerCase();
				project.url = `${url}-${shortid.generate()}`;
			},
		},
	}
);

module.exports = Project;
