const db = require('../db/queries');
const CarApiService = require("../services/carApi");
exports.getCategoryCreate = async (req, res) => {
    try {
        const categories = await db.getAllCategories();
        const items = await db.getAllItems();
        res.render("categoryList", { categories: categories }); // Render the category list view with the fetched categories
        
    }   catch (error) {
        res.status(500).json({ error: 'Failed to fetch categories' });
        return;
    }   
};

exports.postCategoryCreate = async (req, res) => {
    try {
        const { name } = req.body;  
         await db.createCategory(name);
        res.redirect("/categories"); // Redirect to the category list page after successful creation        
    } catch (error) {
        const { name } = req.body;
        res.status(500).json({ error: `Failed to create category ${name}`, details: error.message });
        return;
    }
}

exports.getCategoryById = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const items = await db.getItemsByCategory(categoryId);
        const categories = await db.getAllCategories();
        const category = categories.find(cat => cat.id === parseInt(categoryId));
        const makerData = await CarApiService.getMakes(); // Fetch car makes from the CarAPI
        const allBrands = makerData.data.map(item => item.name); // Extract the names of the car makes
       
        res.render("categoryId", { items: items, category: category, categories: categories, allBrands: allBrands }); // Render the item list view with the fetched items
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch items for the category' });
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        await db.deleteCategory(categoryId);
        res.redirect("/categories"); // Redirect to the category list page after successful deletion
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete category' });
    }
}