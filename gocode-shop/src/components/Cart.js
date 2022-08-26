import React from "react";
import "./Cart.css";

const Cart = ({ productsInCart }) => {
  const titles = productsInCart.map((p) => <div>{p.title}</div>);
  console.log(productsInCart);
  return <div>{titles}</div>;
  // return <div>Cart</div>;
};

export default Cart;
