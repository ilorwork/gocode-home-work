import React from "react";
import "./App.css";
import Cart from "./components/Cart";
import Nav from "./components/Nav";
import Products from "./components/Products";

function App({ productsArr, filterByCat, productsInCart, productsToRender }) {
  return (
    <div className="main-container">
      {/* <Cart productsInCart={productsInCart} /> */}

      <Products products={productsToRender} productsInCart={productsInCart} />
    </div>
  );
}

export default App;
