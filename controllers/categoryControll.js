const db = require('../db/queries');

exports.getCategoryList = async (req, res) => {
    try {
        const categories = await db.getAllCategories();

        res.render("categoryList", { categories: categories }); // Render the category list view with the fetched categories
        res.status(200).json(categories); // Send the categories as JSON response

    }   catch (error) {
        res.status(500).json({ error: 'Failed to fetch categories' });
    }   
};

exports.postCategoryCreate = async (req, res) => {
    try {
        const { name } = req.body;
        const newCategory = await db.createCategory(name);
        await db.insertCategory(name);

        res.redirect("/categories"); // Redirect to the category list page after successful creation
        res.status(201).json(newCategory);// Send the created category as JSON response

    } catch (error) {
        res.status(500).json({ error: 'Failed to create category' });
    }
}