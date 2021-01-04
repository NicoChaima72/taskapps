const db = require("../config/db");

// models
require("../models/UserModel");

db.sync({ alter: true } /* {force: true} */)
	.then(() => console.log("Conectado"))
	.catch((err) => console.log(err));
