import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();

  const fetchProduct = () => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data));
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  delete product.id;
  delete product.rating;

  const productDetailsElements = Object.keys(product).map((objKey, index) => {
    return (
      <>
        <div key={index} className={`product-${objKey}`}>
          {objKey}: {product[objKey]}
        </div>
      </>
    );
  });

  return <div>{productDetailsElements}</div>;
};

export default ProductDetails;
