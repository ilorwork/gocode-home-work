const express = require("express");
const mongoose = require("mongoose");
const { productAllowedUpdates } = require("./constants/allowedUpdates");
const serverResponse = require("./utils/serverResponse");
const app = express();

// TODO: The .env file is currently empty.
require("dotenv").config();

app.use(express.json());

// MODEL
const productScema = new mongoose.Schema({
  category: { type: String, required: true },
  title: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: String, required: true },
  description: { type: String, required: true },
});

const Product = mongoose.model("Product", productScema);

// Routs
app.get("/api/procucts", async (req, res) => {
  try {
    // TODO: The find is necassery here?
    const allProducts = await Product.find({});
    return serverResponse(res, 200, allProducts);
  } catch (e) {
    return serverResponse(res, 500, {
      message: "internal error has accured " + e,
    });
  }
});

app.get("/api/product/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findOne({ _id: productId });
    return serverResponse(res, 200, product);
  } catch (e) {
    return serverResponse(res, 500, { message: "internal error occured" + e });
  }
});

app.get("/api/products/:category", async (req, res) => {
  try {
    const category = req.params.category;
    const productsByCat = await Product.find({ category });
    return serverResponse(res, 200, productsByCat);
  } catch (e) {
    return serverResponse(res, 500, { message: "internal error occured" + e });
  }
});

app.post("/api/products", async (req, res) => {
  try {
    // TODO: Seemed like the obj distructring and sprade operator are redundent here.
    // see: https://stackoverflow.com/questions/11625519/how-to-access-the-request-body-when-posting-using-node-js-and-express
    // const product = new Product({ ...req.body });
    const product = new Product(req.body);
    await product.save();

    // Why does the product being sent as message?
    return serverResponse(res, 200, product);
  } catch (e) {
    // Why does the message passed using obj destructring?
    // this isn't enaugh? ,"internal error occured" + e
    return serverResponse(res, 500, { message: "internal error occured" + e });
  }
});

app.delete("/api/product/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findOneAndDelete({ _id: productId });
    return serverResponse(res, 200, product);
  } catch (e) {
    return serverResponse(res, 500, { message: "internal error occured" + e });
  }
});

app.put("/api/product/:productId", async (req, res) => {
  const productId = req.params.productId;

  // TODO: Obj.keys doesn't reqursiv, in case of big nested objs it might hurt preformance.
  const updates = Object.keys(req.body);

  const isValidOperation = updates.every((update) =>
    productAllowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return serverResponse(res, 400, { message: "Invalid updates" });
  }

  try {
    const product = await Product.findOne({ _id: productId });

    // TODO: will it ever get here? if nothing match this id it will throw an exeption... which will lead to catch.
    if (!product) {
      return serverResponse(res, 404, { message: "product does not exist" });
    }
    // TODO: Here we don't use sprade operator for res.body
    updates.forEach((update) => (product[update] = req.body[update]));
    await product.save();
    return serverResponse(res, 200, product);
  } catch (err) {
    return serverResponse(res, 500, {
      message: "Internal error while trying to update user",
    });
  }
});

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/client/build/index.html");
});

mongoose.connect("mongodb://localhost:27017/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(8000, () => {
  console.log("Server running at http://127.0.0.1:8000/");
});
