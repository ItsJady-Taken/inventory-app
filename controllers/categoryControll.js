const db = require('../db/queries');

exports.getCategoryList = async (req, res) => {
    try {
        const categories = await db.getAllCategories();
        res.render("categoryList", { categories: categories }); // Render the category list view with the fetched categories
        
    }   catch (error) {
        res.status(500).json({ error: 'Failed to fetch categories' });
        return;
    }   
};

exports.postCategoryCreate = async (req, res) => {
    try {
        const { name } = req.body;
        const newCategory = await db.createCategory(name);
        await db.insertCategory(name);
        res.redirect("/categories"); // Redirect to the category list page after successful creation        
    } catch (error) {
        res.status(500).json({ error: 'Failed to create category' });
        return;
    }
}