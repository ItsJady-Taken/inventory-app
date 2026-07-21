// test.js
const db = require("../db/queries");

async function runTest() {
  await db.insertCategory("Test Category");
  const categories = await db.getAllCategories();
  console.log(categories);
}

runTest();
