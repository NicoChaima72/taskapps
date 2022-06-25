const express = require("express");
const router = express.Router();

const Auth = require("./auth");
const authMiddleware = require("../middlewares/authMiddleware");
const { pages, categories, tasks } = require("../controllers");
const { CategoryRequest, TaskRequest } = require("../requests");

module.exports = (app) => {
  Auth(router);

  router.get("/", authMiddleware.isAuthenticated, pages.home);
  router.get("/search/:search", authMiddleware.isAuthenticated, pages.search);

  router.use("/categories", authMiddleware.isAuthenticated);
  router.get("/categories", categories.index);
  // router.get("/categories/create", categories.create);
  router.post("/categories", CategoryRequest.store, categories.store);
  router.get("/categories/:project_url", categories.show);
  // router.get("/categories/:project_url/edit", categories.edit);
  router.put(
    "/categories/:project_url",
    CategoryRequest.update,
    categories.update
  );
  router.delete("/categories/:project_url", categories.destroy);

  router.use("/tasks", authMiddleware.isAuthenticated);
  // router.get("/tasks/:project_url", tasks.index);
  // router.get("/tasks/:project_url/create", tasks.create);
  router.post("/tasks/:project_url", TaskRequest.store, tasks.store);
  // router.get("/tasks/:task_id/edit", tasks.edit);
  router.put("/tasks/:task_id", TaskRequest.update, tasks.update);
  router.put("/tasks/:task_id/state", tasks.updateState);
  router.delete("/tasks/:task_id", tasks.destroy);

  app.use(router);
};
