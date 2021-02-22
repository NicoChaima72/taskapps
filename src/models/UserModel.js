const { Sequelize, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
const sequelize = require("../config/db");

const Category = require("./CategoryModel");

const User = sequelize.define(
	"User",
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: { msg: "El nombre es requerido" },
				notNull: { msg: "El nombre es requerido" },
			},
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				isEmail: { msg: "Formato de correo invalido" },
				notEmpty: { msg: "El email es requerido" },
				notNull: { msg: "El email es requerido" },
			},
			unique: { args: true, msg: "Email ya registrado" },
		},
		password: {
			type: DataTypes.STRING(60),
			allowNull: false,
			validate: {
				notEmpty: { msg: "La contraseña es requerida" },
				notNull: { msg: "La contraseña es requerida" },
				len: { args: [8], msg: "Minimo 8 caracteres" },
			},
		},
		token: { type: DataTypes.STRING },
		expire: { type: DataTypes.DATE },
		isActive: { type: DataTypes.BOOLEAN, defaultValue: 0 },
	},
	{
		hooks: {
			beforeCreate(user) {
				user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
			},

			beforeUpdate(user) {
				if (user.previous().password) {
					if (user.password != user.previous().password) {
						user.password = bcrypt.hashSync(
							user.password,
							bcrypt.genSaltSync(10)
						);
					}
				}
			},
		},
	}
);

User.prototype.verifyPassword = function (password) {
	return bcrypt.compareSync(password, this.password);
};

User.hasMany(Category, { onDelete: "CASCADE" });
Category.belongsTo(User);

module.exports = User;
