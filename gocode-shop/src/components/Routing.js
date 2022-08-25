import React, { useState, useEffect } from "react";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import App from "../App";
import Cart from "./Cart";
import ShopContext from "../ShopContext";
import ProductDetails from "./ProductDetails";
import NewProduct from "./NewProduct";
import Nav from "./Nav";

const Routing = () => {
  const [productsArr, setProductsArr] = useState([]);
  const [filteredProductsByCategory, setFilteredProductsByCategory] = useState(
    []
  );
  const [productsInCart, setProductsInCart] = useState([]);

  const filterByCat = (category) => {
    const filteredArr = productsArr.filter(
      (product) => product.category === category
    );
    setFilteredProductsByCategory(filteredArr);
  };

  const fetchProducts = () => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => setProductsArr(data));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    console.log(productsArr);
  }, [productsArr]);

  const addToCart = (id) => {
    const productsToAdd = productsToRender.filter((item) => item.id === id);

    setProductsInCart(productsInCart.concat(productsToAdd));
  };

  const removeFromCart = (id) => {
    const productToRemove = productsInCart.filter((item) => item.id === id);

    if (!productToRemove.length) {
      console.log("item doesn't exist in the cart.");
      return;
    }
    const index = productsInCart.lastIndexOf(productToRemove[0]);

    // Had to use slice because it doesn't change the original arr.
    const result = [
      ...productsInCart.slice(0, index),
      ...productsInCart.slice(index + 1),
    ];

    setProductsInCart(result);
  };

  const getCategories = () => {
    return productsArr
      .map((p) => p.category)
      .filter((value, index, array) => array.indexOf(value) === index);
  };

  const productsToRender =
    filteredProductsByCategory.length === 0
      ? productsArr
      : filteredProductsByCategory;

  return (
    <ShopContext.Provider
      value={{ addToCart, removeFromCart, getCategories, setProductsArr }}
    >
      <BrowserRouter>
        <Nav
          products={productsArr}
          filterByCat={filterByCat}
          productsInCart={productsInCart}
        />
        <Routes>
          <Route
            path="/"
            element={
              <App
                productsArr={productsArr}
                filterByCat={filterByCat}
                productsInCart={productsInCart}
                productsToRender={productsToRender}
              />
            }
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/newProduct" element={<NewProduct />} />
          {/* <Route path="/newProduct" element={<><Nav /> <NewProduct /></>} /> */}
          {/* <Route path="/newProduct" render={<><Nav /> <NewProduct /></>} /> */}
        </Routes>
      </BrowserRouter>
    </ShopContext.Provider>
  );
};

export default Routing;
