import React, { useState, useEffect } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import Cart from "./Cart";
import ShopContext from "../ShopContext";
import ProductDetails from "./ProductDetails";
import NewProduct from "./NewProduct";
import Nav from "./Nav";
import AdminPanel from "./AdminPanel";

const Routing = () => {
  const [productsArr, setProductsArr] = useState([]);
  const [filteredProductsByCategory, setFilteredProductsByCategory] = useState(
    []
  );
  const [productsInCart, setProductsInCart] = useState([]);
  const [sortedByPrice, setSortedByPrice] = useState([]);
  const [productsToRender, setProductsToRender] = useState([]);

  useEffect(() => {
    console.log("productsArr.length", productsArr.length);
    setProductsToRender(productsArr);
  }, [productsArr]);

  useEffect(() => {
    setProductsToRender(filteredProductsByCategory);
  }, [filteredProductsByCategory]);

  useEffect(() => {
    setProductsToRender(sortedByPrice);
  }, [sortedByPrice]);

  const filterByCat = (category) => {
    if (category === "All") {
      setFilteredProductsByCategory(productsArr);
      return;
    }

    const filteredArr = productsArr.filter(
      (product) => product.category === category
    );
    setFilteredProductsByCategory(filteredArr);
  };

  const fetchProducts = () => {
    // fetch("https://fakestoreapi.com/products")
    fetch("http://127.0.0.1:8000/api/products")
      /* , {
      method: "GET",
      credentials: "same-origin",
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000/",
      },
    } 
    )*/
      .then((response) => response.json())
      .then((data) => setProductsArr(data));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCart = (id) => {
    const productsToAdd = productsToRender.filter((item) => item._id === id);

    setProductsInCart(productsInCart.concat(productsToAdd));
  };

  const removeFromCart = (id) => {
    const productToRemove = productsInCart.filter((item) => item._id === id);

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

  const sortByPrice = (range) => {
    const productsToSort =
      filteredProductsByCategory.length === 0
        ? productsArr
        : filteredProductsByCategory;

    const products = productsToSort.filter(
      (item) => range[0] <= item.price && item.price <= range[1]
    );
    setSortedByPrice(products);
  };

  return (
    <ShopContext.Provider
      value={{
        addToCart,
        removeFromCart,
        getCategories,
        setProductsArr,
        sortByPrice,
      }}
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
                productsInCart={productsInCart}
                productsToRender={productsToRender}
              />
            }
          />
          <Route
            path="/cart"
            element={<Cart productsInCart={productsInCart} />}
          />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/newProduct" element={<NewProduct />} />
          <Route
            path="/editProduct/:id"
            element={<NewProduct products={productsArr} />}
          />
          <Route
            path="/adminPanel"
            element={<AdminPanel products={productsArr} />}
          />
        </Routes>
      </BrowserRouter>
    </ShopContext.Provider>
  );
};

export default Routing;
