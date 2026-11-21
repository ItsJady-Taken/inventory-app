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
        const categoryId = req.query.category_id; // Get the category_id from the query parameters
        const brand = req.query.brand; // Get the brand from the query parameters
       
        const modelData = await CarApiService.getModels(brand); // Fetch car makes from the CarAPI
        const models = modelData.data.map(model => model.name); // Extract the models from the API response
        const trimsData = await CarApiService.getTrims(brand); // Fetch trims for the first model
       
        res.render("itemList", { categoryId: categoryId, categories: categories, brand: brand, models: models, trims: trimsData.data });
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

exports.itemFilter = async (req, res) => {
    try {
        const categories = await db.getAllCategories();
        const categoryId = req.query.category_id; // Get the category_id from the query parameters
        const brand = req.query.brand;
        const filterModel = req.query.model; // Get the model from the query parameters

        const modelsData = await CarApiService.getModels(brand); // Fetch car makes from the CarAPI
        const models = modelsData.data.map(model => model.name); // Extract the models from the API response
        //const trimsRawData = await CarApiService.getTrim(brand); // Fetch trims for the first model
        const trimsData = await CarApiService.getTrimSearchDetails(brand, filterModel); // Fetch trims for the filtered model
        const allTrims = trimsData.data; // Get all trims from the API response
        const normalizedModel = (filterModel || '').trim().toLowerCase(); // Normalize the filter model to lowercase for comparison
        const filteredTrims = normalizedModel ? allTrims.filter(trim =>
        (trim.model || '').toLowerCase().includes(normalizedModel)
        ) : allTrims;
        
        res.render("itemList", { categoryId: categoryId, categories: categories, brand: brand, models: models, trims: filteredTrims }); // Pass the filtered models to the view
     } catch (error) {
        res.status(500).json({ error: 'Failed to filter items' });
    }
}   