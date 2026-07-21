const db = require('../db/queries');

exports.getCategoryCreate = async (req, res) => {
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
         await db.createCategory(name);
        res.redirect("/categories"); // Redirect to the category list page after successful creation        
    } catch (error) {
        const { name } = req.body;
        console.error(`Error creating category ${name}:`, error);
        res.status(500).json({ error: `Failed to create category ${name}`, details: error.message });
        
        return;
    }
}

exports.getCategoryForm = async (req, res) => {
    try {
        res.render("categoryForm"); // Render the category creation form view
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch category form' });
    }
}