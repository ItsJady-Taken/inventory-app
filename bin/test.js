// test.js
const db = require("../db/queries");

async function runTest() {

  await db.insertItem("Test Item", "Test Brand", 9.99, 1);
  const items = await db.getAllItems();
  console.log(items);
}

runTest();
