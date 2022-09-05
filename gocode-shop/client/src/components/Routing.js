import React, { useState, useEffect } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import Cart from "./Cart";
import ShopContext from "../ShopContext";
import ProductDetails from "./ProductDetails";
import NewProduct from "./NewProduct";
import AdminPanel from "./AdminPanel";
import MenuAppBar from "./AppBar";
import BackToTopAppBar from "./BackToTopAppBar";

const Routing = () => {
  const [productsArr, setProductsArr] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [productsInCart, setProductsInCart] = useState([]);
  const [productsToRender, setProductsToRender] = useState([]);

  useEffect(() => {
    console.log("productsArr.length", productsArr.length);
    setProductsToRender(productsArr);
  }, [productsArr]);

  const filterByCat = (category, range) => {
    const products = productsArr.filter(
      (item) => range[0] <= item.price && item.price <= range[1]
    );

    if (category === "All") {
      setProductsToRender(products);
      setSelectedCategory("All");
      return;
    }

    const filteredArr = products.filter(
      (product) => product.category === category
    );
    setProductsToRender(filteredArr);
    setSelectedCategory(category);
  };

  const fetchProducts = async () => {
    // fetch("https://fakestoreapi.com/products")
    const res = await fetch("http://localhost:7000/api/products");
    const data = await res.json();
    setProductsArr(data);
    /* , {
      method: "GET",
      credentials: "same-origin",
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000/",
      },
    } 
    )*/
    // .then((response) => response.json())
    // .then((data) => setProductsArr(data));
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
    const filteredArr = productsArr.filter(
      (product) => product.category === selectedCategory
    );

    const productsToSort =
      selectedCategory === "All" ? productsArr : filteredArr;

    const products = productsToSort.filter(
      (item) => range[0] <= item.price && item.price <= range[1]
    );
    setProductsToRender(products);
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
        <BackToTopAppBar productsInCart={productsInCart} />
        <Routes>
          <Route
            path="/"
            element={
              <App
                filterByCat={filterByCat}
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
