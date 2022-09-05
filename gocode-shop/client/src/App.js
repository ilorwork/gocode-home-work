import React from "react";
import "./App.css";
import FilterBar from "./components/FilterBar";
import Products from "./components/Products";

function App({ filterByCat, productsInCart, productsToRender }) {
  return (
    <div className="main-container">
      <FilterBar products={productsToRender} filterByCat={filterByCat} />
      <Products products={productsToRender} productsInCart={productsInCart} />
    </div>
  );
}

export default App;
