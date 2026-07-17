// populatedb.js
const { Client } = require("pg");

const SQL = `
CREATE TABLE categories (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE items (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL, -- e.g., 'Stratocaster'
  brand VARCHAR(255) NOT NULL, -- e.g., 'Fender'
  price DECIMAL(10, 2),
  category_id INTEGER REFERENCES categories(id)
);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: "postgresql://david:bang@localhost:5432/inventory_db",
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();