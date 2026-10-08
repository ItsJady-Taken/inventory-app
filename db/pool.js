// db/pool.js
const { Pool } = require("pg");

module.exports = new Pool({
  host: "localhost",
  user: "jady", // Replace with your actual Postgres username
  database: "inventory_db", // Replace with your actual database name
  password: "David2004", // Replace with your actual password
  port: 5432,
});