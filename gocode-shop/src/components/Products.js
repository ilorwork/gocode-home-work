import React, { useState, useEffect } from "react";
import Product from "./Product";
import Loader from "./Loader";
import "./Products.css";

const Products = ({ products }) => {
  const productComponnents = products.map((item) => (
    <Product
      id={item.id}
      key={item.id}
      title={item.title}
      price={item.price}
      description={item.description}
      category={item.category}
      image={item.image}
      rating={item.rating}
    />
  ));

  // console.log(productsArr);

  return (
    <>
      {productComponnents.length === 0 && <Loader />}
      <section className="products">{productComponnents}</section>
    </>
  );
};

export default Products;
