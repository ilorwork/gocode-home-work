import React, { useContext } from "react";
import "./Product.css";
import ShopContext from "../ShopContext";
import { useNavigate } from "react-router-dom";

const Product = ({ productInfo, productsInCart }) => {
  const { addToCart, removeFromCart } = useContext(ShopContext);
  const navigate = useNavigate();

  const countInCart = productsInCart.filter(
    (element) => element.id === productInfo.id
  ).length;

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={productInfo.image} />
      </div>
      <div className="product-info">
        <h5>{productInfo.title}</h5>
        <h6>${productInfo.price}</h6>
      </div>
      <div className="cart-btns-container">
        <button
          onClick={() => addToCart(productInfo.id)}
          className="add-to-cart-btn tooltip"
          data-tooltip-content="Add To Cart"
        >
          +
        </button>
        <span>{countInCart}</span>
        <button
          onClick={() => removeFromCart(productInfo.id)}
          className="remove-from-cart-btn tooltip"
          data-tooltip-content="Remove From Cart"
        >
          -
        </button>
      </div>
      <button
        className="more-tetails-btn"
        onClick={() => navigate(`/product/${productInfo.id}`)}
      >
        More Details
      </button>
    </div>
  );
};

export default Product;
