import React, { useState, useEffect } from "react";
import Product from "./Product";
import Loader from "./Loader";
import "./Products.css";

const Products = () => {
  const [productsArr, setProductsArr] = useState([]);
  // let productsArr = [];

  const fetchProducts = () => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => setProductsArr(data));

    debugger;
    // console.log(productsArr);

    // setProductsArr(data);
    // return data;
  };

  // const fetchProducts = async () => {
  //   const response = await fetch("https://fakestoreapi.com/products");
  //   const data = await response.json();

  //   // console.log(productsArr);

  //   setProductsArr(data);
  //   // return data;
  // };

  // Calling here
  // fetchProducts();

  useEffect(() => {
    // hideLoader();
    fetchProducts();
    // console.log(productsArr);
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

  console.log(productsArr);

  return (
    <>
      {productComponnents.length === 0 && <Loader />}
      <section className="products">{productComponnents}</section>
    </>
  );
};

export default Products;
