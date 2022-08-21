import React, { useContext } from "react";
import "./Product.css";
import ShopContext from "../ShopContext";

const Product = ({
  id,
  title,
  price,
  description,
  category,
  image,
  rating,
}) => {
  const { addToCart } = useContext(ShopContext);

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={image} />
      </div>
      <div className="product-info">
        <h5>{title}</h5>
        <h6>{price}</h6>
      </div>
      <button onClick={() => addToCart(id)} className="add-to-cart-btn">
        Add to cart
      </button>
    </div>
  );
};

export default Product;
