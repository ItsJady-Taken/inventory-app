const express = require('express');
const app = express();
const controller = require('../controllers/controller');
const path = require('path');
const { title } = require('process');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Routes will go here
const categoryRouter = require("./routes/categoryRoutes");
app.use("/categories", categoryRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});