const { Router } = require("express");
const categoryController = require("../controllers/categoryControll");
const categoryRouter = Router();

categoryRouter.get("/", categoryController.getCategoryCreate);// Route to handle fetching all categories
categoryRouter.post("/new", categoryController.postCategoryCreate);// Route to handle category creation
categoryRouter.get("/:id", categoryController.getCategoryById);// Route to handle fetching items by category ID
categoryRouter.post("/:id", categoryController.deleteCategory);// Route to handle category deletion
module.exports = categoryRouter;