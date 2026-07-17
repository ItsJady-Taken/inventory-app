const db = require('../db/queries');


exports.postItemCreate = async (req, res) => {
    try {
        const { name, brand, price, category_id } = req.body;
        const newItem = await db.insertItem(name, brand, price, category_id);
        res.redirect("/items/new"); // Redirect to the item list page after successful creation        
    } catch (error) {
        res.status(500).json({ error: 'Failed to create item' });
        return;
    }
}   

exports.getItemCreate = async (req, res) => {
    try {
        const items = await db.getItemByCategory();
        res.render("itemform", { items: items });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch items' });
    }
}