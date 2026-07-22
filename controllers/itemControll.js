const db = require('../db/queries');


exports.postItemCreate = async (req, res) => {
    try {
        const { name, brand, price, category_id } = req.body;
        const newItem = await db.insertItem(name, brand, price, category_id);
        res.redirect("/categories"); // Redirect to the item list page after successful creation        
    } catch (error) {

        res.status(500).json({ error: 'Failed to create item', details: error.message });
        return;
    }
}   

exports.getItemCreate = async (req, res) => {
    try {
        const categories = await db.getAllCategories();
        res.render("itemform", { categories: categories });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch items' });
    }
}