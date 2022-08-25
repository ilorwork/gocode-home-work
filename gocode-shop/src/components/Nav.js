import React from "react";
import "./Nav.css";
import { Link } from "react-router-dom";

const Nav = ({ products, filterByCat, productsInCart }) => {
  const categories = products
    .map((p) => p.category)
    .filter((value, index, array) => array.indexOf(value) === index);

  const options = categories.map((cat, index) => (
    <option key={index} value={cat}>
      {cat}
    </option>
  ));

  return (
    <nav className="top-nav-bar">
      <div className="nav-icons">
        <Link to="/">
          <button>My Shop</button>
        </Link>
        {/* <Cart productsInCart={productsInCart} /> */}
        <button
          onClick={() => console.log(productsInCart)}
          className="cart-btn"
        >
          Cart - {productsInCart.length} items
        </button>
        {/* <Link to={"/cart"}>Cart</Link> */}
        {/* <Link to={"/cart"}><Cart productsInCart={productsInCart} /></Link> */}
        <Link to={"/newProduct"}>
          <button>Add New Product</button>
        </Link>
      </div>
      <h1 className="home-header">Products</h1>

      <div className="sort">
        <div className="collection-sort">
          <label>Filter by:</label>
          <select
            onChange={(e) => {
              filterByCat(e.target.value);
            }}
          >
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
