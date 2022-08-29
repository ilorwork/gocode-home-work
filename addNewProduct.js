const fs = require("fs");
const products = require("./getProducts");

const newProduct = {
  id: 5423543543534523,
  title: "543543534534534",
  price: 543543543543534,
  description: "5434534534534",
  category: "54543",
  image: "5423534534534534",
  rating: { rate: 54235423534534, count: 5423534543534 },
};

products.push(newProduct);

fs.writeFile("./products.json", JSON.stringify(products), "utf-8", (err) => {
  if (err) throw err;
  console.log("done writing");
});
