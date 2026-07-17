// test.js
const db = require("../db/queries");

async function runTest() {
  await db.deleteCategory(1);
  const categories = await db.getAllCategories();
  console.log(categories);
}

runTest();
