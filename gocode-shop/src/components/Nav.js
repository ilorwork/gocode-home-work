import React, { useState, useEffect } from "react";
import "./Nav.css";
import { Link, useLocation } from "react-router-dom";
import RangeSlider from "./RangeSlider";
import TempDrawer from "./Material ui/TempDrawer";

const Nav = ({ products, filterByCat, productsInCart }) => {
  const location = useLocation();

  const [rangeValue, setRangeValue] = useState([0, 0]);
  const [maxRangeOnSlider, setMaxRangeOnSlider] = useState("");

  useEffect(() => {
    if (maxRangeOnSlider !== "" || !products.length) return;

    const prices = products.map((p) => p.price);
    const maxVal = Math.max(...prices);
    setRangeValue([0, maxVal]);
    setMaxRangeOnSlider(maxVal);
  }, [products]);

  const handleChange = (event, newValue) => {
    setRangeValue(newValue);
  };

  const categories = products
    .map((p) => p.category)
    .filter((value, index, array) => array.indexOf(value) === index);

  const options = categories.map((cat, index) => (
    <option key={index} value={cat}>
      {cat}
    </option>
  ));

  const headerView = () => {
    if (location.pathname === "/") {
      return "Products";
    } else if (location.pathname === "/cart") {
      return "Your Cart";
    } else if (location.pathname === "/newProduct") {
      return "Create New Product";
    } else if (location.pathname.startsWith("/product/")) {
      return "Product Details";
    }
  };

  return (
    <nav className="top-nav-bar">
      <div className="nav-icons">
        <Link to="/">
          <button>My Shop</button>
        </Link>
        <Link to={`/cart`}>
          <button className="cart-btn">Cart</button>
          <span className="cart-counter">{productsInCart.length}</span>
        </Link>
        <Link to={"/newProduct"}>
          <button>Add New Product</button>
        </Link>
      </div>
      <h1 className="home-header">{headerView()}</h1>

      {location.pathname === "/" && (
        <div className="sort">
          <div className="collection-sort">
            <label>Filter by:</label>
            <select
              onChange={(e) => {
                filterByCat(e.target.value);
              }}
              // disabled={location.pathname !== "/"}
            >
              <option value={"All"}>All</option>
              {options}
            </select>
          </div>

          {products && (
            <RangeSlider
              value={rangeValue}
              handleChange={handleChange}
              maxRangeOnSlider={maxRangeOnSlider}
            />
          )}
        </div>
      )}
      <TempDrawer productsInCart={productsInCart} />
    </nav>
  );
};

export default Nav;
