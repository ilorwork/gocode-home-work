import React from "react";
import "./Nav.css";
import { Link, useLocation } from "react-router-dom";

const Nav = ({ products, filterByCat, productsInCart }) => {
  const categories = products
    .map((p) => p.category)
    .filter((value, index, array) => array.indexOf(value) === index);

  const options = categories.map((cat, index) => (
    <option key={index} value={cat}>
      {cat}
    </option>
  ));

  const HeaderView = () => {
    const location = useLocation();
    console.log(location);
    if (location.pathname === "/") {
      return "Products";
    } else if (location.pathname === "/cart") {
      return "Cart";
    } else if (location.pathname === "/newProduct") {
      return "Create New Product";
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
      <h1 className="home-header">{HeaderView()}</h1>

      <div className="sort">
        <div className="collection-sort">
          <label>Filter by:</label>
          <select
            onChange={(e) => {
              filterByCat(e.target.value);
            }}
          >
            <option value={"All"}>All</option>
            {options}
          </select>
        </div>

        <div className="collection-sort">
          <label>Sort by:</label>
          <select>
            <option value="/">Featured</option>
            <option value="/">Best Selling</option>
            <option value="/">Alphabetically, A-Z</option>
            <option value="/">Alphabetically, Z-A</option>
            <option value="/">Price, low to high</option>
            <option value="/">Price, high to low</option>
            <option value="/">Date, new to old</option>
            <option value="/">Date, old to new</option>
          </select>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
