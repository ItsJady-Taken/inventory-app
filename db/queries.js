// db/queries.js
const pool = require("./pool");

async function getAllCategories() {
  const { rows } = await pool.query("SELECT * FROM categories");
  return rows;
}

async function createCategory(name) {
  const newCategory = await pool.query("INSERT INTO categories (name) VALUES ($1) RETURNING *", [name]);
  return newCategory.rows[0];
}

async function deleteCategory(id) {
  await pool.query("DELETE FROM categories WHERE id = $1", [id]);
}

async function updateCategory(id, name) {
  await pool.query("UPDATE categories SET name = $1 WHERE id = $2", [name, id]);
}

async function getAllItems() {
  const { rows } = await pool.query("SELECT * FROM items");
  return rows;
}

// Add an item with more detail
async function insertItem(name, brand, price, category_id) {
  await pool.query(
    "INSERT INTO items (name, brand, price, category_id) VALUES ($1, $2, $3, $4)",
    [name, brand, price, category_id]
  );
}

// Get all items for a specific category
async function getItemsByCategory(categoryId) {
  const { rows } = await pool.query(
    "SELECT * FROM items WHERE category_id = $1",
    [categoryId]
  );
  return rows;
}

async function deleteItem(id) {
  await pool.query("DELETE FROM items WHERE id = $1", [id]);
}

async function updateItem(id, name, brand, price, category_id) {
  await pool.query("UPDATE items SET name = $1, category_id = $2 WHERE id = $3", [name, category_id, id]);
}

module.exports = {
    getAllCategories,
    createCategory,
    deleteCategory,
    updateCategory,
  getItemsByCategory,
  getAllItems,
  insertItem,
  deleteItem,
  updateItem
};