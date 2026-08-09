const db = require('../db/queries');
const CarApiService = require("../services/carApi");

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
        const brand = req.query.brand; // Get the brand from the query parameters
       
        const models = await CarApiService.getModels(brand); // Fetch car makes from the CarAPI
        const allModels = models.data.map(item => item.name); // Extract the names of the car makes
        console.log(allModels[1]); // Log the brand to the console for debugging

        res.render("itemList", { categories: categories, brand: brand });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch items' });
    }
}

exports.deleteItem = async (req, res) => {
    try {
        const itemId = req.params.id;
        const item = await db.getItemsByCategory(itemId);
        await db.deleteItem(itemId);
        res.redirect(`/categories/${item}`); // Redirect to the item list page after successful deletion
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete item' });
    }
}