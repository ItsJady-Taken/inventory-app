// db/queries.js
const pool = require("./pool");

async function getAllCategories() {
  const { rows } = await pool.query("SELECT * FROM categories");
  return rows;
}

async function insertCategory(name) {
  await pool.query("INSERT INTO categories (name) VALUES ($1)", [name]);
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

async function insertItem(name, category_id) {
  await pool.query("INSERT INTO items (name, category_id) VALUES ($1, $2)", [name, category_id]);
}

async function deleteItem(id) {
  await pool.query("DELETE FROM items WHERE id = $1", [id]);
}

async function updateItem(id, name, category_id) {
  await pool.query("UPDATE items SET name = $1, category_id = $2 WHERE id = $3", [name, category_id, id]);
}

module.exports = {
    getAllCategories,
    insertCategory,
    deleteCategory,
    updateCategory,
  getAllItems,
  insertItem,
  deleteItem,
  updateItem
};