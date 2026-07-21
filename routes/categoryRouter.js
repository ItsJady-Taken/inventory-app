const { Router } = require("express");
const categoryController = require("../controllers/categoryControll");
const categoryRouter = Router();

categoryRouter.get("/", categoryController.getCategoryCreate);
categoryRouter.get("/new", categoryController.getCategoryForm);
categoryRouter.post("/new", categoryController.postCategoryCreate);

module.exports = categoryRouter;