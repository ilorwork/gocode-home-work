import React from "react";
import "./Cart.css";
import Products from "./Products";

const Cart = ({ productsInCart }) => {
  if (!productsInCart.length) {
    return <h1>Cart is empty</h1>;
  }

  const uniq = [...new Set(productsInCart)];
  return <Products products={uniq} productsInCart={productsInCart} />;
};

export default Cart;
