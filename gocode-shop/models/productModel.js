const mongoose = require("mongoose");

const ratingScema = new mongoose.Schema({
  rate: { type: Number, default: 0 },
  count: { type: Number, default: 0 },
});

const productScema = new mongoose.Schema({
  category: { type: String, required: true },
  title: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: String, required: true },
  description: { type: String, required: true },
  rating: ratingScema,
});

const Product = mongoose.model("Product", productScema);

module.exports = Product;
