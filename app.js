const express = require('express');
const app = express();
// const controller = require('../controllers/categoryControll');
const path = require('path');
const { title } = require('process');
const categoryRouter = require("./routes/categoryRouter");

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Routes will go here
app.use("/categories", categoryRouter);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});