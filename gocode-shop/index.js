const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { getAllUsers, createNewUser } = require("./controllers/userController");
const {
  getAllProducts,
  getProductById,
  getProductsByCategory,
  createNewProduct,
  deleteProductById,
  editProductById,
} = require("./controllers/productController");

const app = express();

require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use(express.static("client/build"));

// Routs
app.get("/api/users", getAllUsers);
app.post("/api/users", createNewUser);

app.get("/api/products", getAllProducts);
app.get("/api/product/:productId", getProductById);
app.get("/api/products/:category", getProductsByCategory);
app.post("/api/products", createNewProduct);
app.delete("/api/product/:productId", deleteProductById);
app.put("/api/product/:productId", editProductById);

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/client/build/index.html");
});

//mongoose.connect("mongodb://localhost:27017/test", {
//useNewUrlParser: true,
//useUnifiedTopology: true,
//});

//app.listen(8000, () => {
//console.log("Server running at http://127.0.0.1:8000/");
//});
const { DB_USER, DB_PASS, DB_HOST, DB_NAME, PORT } = process.env;

mongoose.connect(
  `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    app.listen(PORT || 8000, () => {
      console.log("err", err);
      console.log("Ani maazin!");
    });
  }
);
