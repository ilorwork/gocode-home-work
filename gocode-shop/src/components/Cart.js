import React from "react";
import "./Cart.css";
import Products from "./Products";

const Cart = ({ productsInCart }) => {
  if (!productsInCart.length) {
    return (
      <div className="empty-cart-header-container">
        <h1>Cart is empty</h1>
      </div>
    );
  }

  const uniq = [...new Set(productsInCart)];
  return <Products products={uniq} productsInCart={productsInCart} />;
};

export default Cart;
