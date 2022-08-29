const fs = require("fs");

const products = JSON.parse(fs.readFileSync("./products.json", "utf8"));

console.log(products[0].price);

module.exports = products;
