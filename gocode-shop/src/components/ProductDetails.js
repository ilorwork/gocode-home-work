import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetails.css";

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();

  const fetchProduct = async () => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    const data = await response.json();
    setProduct(data);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    // Ask Almog about the Optional chaining when rendering the rating part
    <div className="product-card-container">
      <div className="product-card">
        <img className="product-image" src={product.image} />

        <h5 className="product-title">{product.title}</h5>
        <h6 className="product-price">${product.price}</h6>
        <h6 className="product-rating">
          Rating: {product.rating?.rate} out of 5
        </h6>
        <p className="product-description">{product.description}</p>
        <p className="product-category">Category: {product.category}</p>
      </div>
    </div>
  );
};

export default ProductDetails;
