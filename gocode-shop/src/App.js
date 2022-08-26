import React from "react";
import "./App.css";
import Products from "./components/Products";

function App({ productsInCart, productsToRender }) {
  return (
    <div className="main-container">
      <Products products={productsToRender} productsInCart={productsInCart} />
    </div>
  );
}

export default App;
