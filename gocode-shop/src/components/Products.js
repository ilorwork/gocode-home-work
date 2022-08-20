import React, { useState, useEffect } from "react";
import Product from "./Product";
import "./Products.css";

const Products = () => {
  const [productsArr, setProductsArr] = useState([]);

  const fetchProducts = async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();

    setProductsArr(data);
    //return data;
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const productComponnents = productsArr.map((item) => (
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

  return <section className="products">{productComponnents}</section>;
};

export default Products;
