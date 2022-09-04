import React from "react";
import Product from "./Product";
import Loader from "./Loader";
import "./Products.css";

const Products = ({ products, productsInCart, containerClass }) => {
  const productComponnents = products.map((product) => (
    <Product
      key={product._id}
      productInfo={product}
      productsInCart={productsInCart}
      containerClass={containerClass}
    />
  ));

  return (
    <>
      {productComponnents.length === 0 && <Loader />}
      <section className="products">{productComponnents}</section>
    </>
  );
};

export default Products;
