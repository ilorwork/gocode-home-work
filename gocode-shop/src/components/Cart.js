import React from "react";
import "./Cart.css";

const Cart = ({ productsInCart }) => {
  return (
    <button onClick={() => console.log(productsInCart)} className="cart-btn">
      Cart
    </button>
  );
};

export default Cart;
