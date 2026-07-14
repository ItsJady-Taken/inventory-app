const { Router } = require("express");
const categoryController = require("../controllers/categoryControll");
const categoryRouter = Router();

categoryRouter.get("/", categoryController.getCategoryList);
categoryRouter.post("/new", categoryController.postCategoryCreate);

module.exports = categoryRouter;