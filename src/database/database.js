const db = require("../config/db");

require("../models/UserModel");
require("../models/CategoryModel");
require("../models/TaskModel");

db.sync({ alter: true } /* {force: true} */)
  .then(() => console.log("Conectado"))
  .catch((err) => {
    throw err;
  });
