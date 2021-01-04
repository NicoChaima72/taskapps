const { Sequelize } = require("sequelize");

require("../config/config");

const sequelize = new Sequelize(
	process.env.DATABASE_NAME,
	process.env.DATABASE_USER,
	process.env.DATABASE_PASSWORD,
	{
		host: process.env.DATABASE_HOST,
		dialect: "mysql",
		// logging: false /* Mensajes en consola*/,
	}
);

module.exports = sequelize;
