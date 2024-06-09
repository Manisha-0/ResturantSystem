const express = require("express");
require("dotenv").config();
const { connectDB } = require("./config/db.config");

const cors = require("cors");
const app = express();
app.use(express.json());
const morgan = require("morgan");
app.use(morgan("dev"));
const productRoutes = require("./routes/productRoutes")

const port = process.env.PORT || 5000;

app.use(cors());
app.use("/product",productRoutes)

connectDB(
  "mongodb+srv://user:user@cluster0.zhsctjm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
