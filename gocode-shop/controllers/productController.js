const { productAllowedUpdates } = require("../constants/allowedUpdates");
const serverResponse = require("../utils/serverResponse");
const Product = require("../models/productModel");

const getAllProducts = async (req, res) => {
  try {
    // TODO: The find is necassery here?
    const allProducts = await Product.find({});
    return serverResponse(res, 200, allProducts);
  } catch (e) {
    return serverResponse(res, 500, {
      message: "internal error has accured " + e,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findOne({ _id: productId });
    return serverResponse(res, 200, product);
  } catch (e) {
    return serverResponse(res, 500, { message: "internal error occured" + e });
  }
};

const getProductsByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const productsByCat = await Product.find({ category });
    return serverResponse(res, 200, productsByCat);
  } catch (e) {
    return serverResponse(res, 500, { message: "internal error occured" + e });
  }
};

const createNewProduct = async (req, res) => {
  try {
    const product = new Product({ ...req.body });

    await product.save();

    return serverResponse(res, 200, product);
  } catch (e) {
    return serverResponse(res, 500, { message: "internal error occured" + e });
  }
};

const deleteProductById = async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findOneAndDelete({ _id: productId });
    return serverResponse(res, 200, product);
  } catch (e) {
    return serverResponse(res, 500, { message: "internal error occured" + e });
  }
};

const editProductById = async (req, res) => {
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
};

module.exports = {
  getAllProducts,
  getProductById,
  getProductsByCategory,
  createNewProduct,
  deleteProductById,
  editProductById,
};
