import React, { useContext } from "react";
import "./Cart.css";
import { useParams } from "react-router-dom";
import ShopContext from "../ShopContext";

const Cart = () => {
  const { productsInCart } = useContext(ShopContext);

  const titles = productsInCart.map((p) => <div>{p.title}</div>);
  console.log(productsInCart);
  return <div>{titles}</div>;
  // return <div>Cart</div>;
};

export default Cart;
