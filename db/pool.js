// db/pool.js
const { Pool } = require("pg");

module.exports = new Pool({
  host: "localhost",
  user: "david", // Replace with your actual Postgres username
  database: "inventory_db", // Replace with your actual database name
  password: "bang", // Replace with your actual password
  port: 5432,
});