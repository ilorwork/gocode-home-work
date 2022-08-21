import React, { useState, useEffect } from "react";
import "./App.css";
import Cart from "./components/Cart";
import Nav from "./components/Nav";
import Products from "./components/Products";

function App() {
  const [productsArr, setProductsArr] = useState([]);
  const [filteredProductsByCategory, setFilteredProductsByCategory] = useState(
    []
  );

  const filterByCat = (category) => {
    console.log(category);
    console.log(productsArr);
    const filteredArr = productsArr.filter(
      (product) => product.category === category
    );
    setFilteredProductsByCategory(filteredArr);
    console.log(filteredArr);
    console.log(filteredProductsByCategory);
  };

  const fetchProducts = () => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => setProductsArr(data));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const productsToRender =
    filteredProductsByCategory.length === 0
      ? productsArr
      : filteredProductsByCategory;

  return (
    <div className="main-container">
      <Nav products={productsArr} filterByCat={filterByCat} />

      <Products products={productsToRender} />
      <Cart />
    </div>
  );
}

export default App;
