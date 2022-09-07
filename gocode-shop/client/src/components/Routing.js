import React, { useState, useEffect } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import Cart from "./Cart";
import ShopContext from "../ShopContext";
import ProductDetails from "./ProductDetails";
import NewProduct from "./NewProduct";
import AdminPanel from "./AdminPanel";
import BackToTopAppBar from "./BackToTopAppBar";
import config from "../config.json";

const Routing = () => {
  const [productsArr, setProductsArr] = useState([]);
  const [productsInCart, setProductsInCart] = useState([]);
  const [productsToRender, setProductsToRender] = useState([]);

  useEffect(() => {
    console.log("productsArr.length", productsArr.length);
    setProductsToRender(productsArr);
  }, [productsArr]);

  const filterByCat = (category, range) => {
    const products = productsArr.filter(
      (item) => range[0] <= Number(item.price) && Number(item.price) <= range[1]
    );

    if (category === "All") {
      setProductsToRender(products);
      return;
    }

    const filteredArr = products.filter(
      (product) => product.category === category
    );
    setProductsToRender(filteredArr);
  };

  const fetchProducts = async () => {
    const res = await fetch(`${config.BaseUrl}/api/products`);
    const data = await res.json();
    setProductsArr(data);
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

  const sortByPrice = (range, selectedCat) => {
    const filteredArr = productsArr.filter(
      (product) => product.category === selectedCat
    );

    const productsToSort = selectedCat === "All" ? productsArr : filteredArr;

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
