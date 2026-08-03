const express = require('express');
const app = express();
app.use(express.json());
const path = require('path');
const { title } = require('process');
const categoryRouter = require("./routes/categoryRouter");
const itemRouter = require("./routes/itemRouter");
const CarApiService = require("./services/carApi");
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Routes will go here
app.get("/", (req, res) => {
    res.redirect("/categories"); // Redirect to the category list page
});
app.use("/categories", categoryRouter);
app.use("/items", itemRouter);

// Express endpoint to test the CarAPI connection
app.get('/api/test-carapi', async (req, res) => {
  try {
    const datas = await CarApiService.getMakes();
    console.log(datas.data[0]); // Log the fetched data to the console
    res.json({ success: true, datas });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});