const { Router } = require("express");
const categoryController = require("../controllers/categoryController");
const categoryRouter = Router();

categoryRouter.get("/", categoryController.getCategoryList);
categoryRouter.post("/new", categoryController.postCategoryCreate);

module.exports = categoryRouter;