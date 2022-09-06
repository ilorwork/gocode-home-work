import React, { useState, useEffect, useContext, useRef } from "react";
import "./FilterBar.css";
import RangeSlider from "./RangeSlider";
import ShopContext from "../ShopContext";

const FilterBar = ({ products, filterByCat }) => {
  const [rangeValue, setRangeValue] = useState([0, 0]);
  // const [maxRangeOnSlider, setMaxRangeOnSlider] = useState("");

  const { getCategories } = useContext(ShopContext);

  const maxRangeOnSlider = useRef(0);

  useEffect(() => {
    if (maxRangeOnSlider.current !== 0 || !products.length) return;

    const prices = products.map((p) => p.price);
    const maxVal = Math.max(...prices);
    setRangeValue([0, maxVal]);
    // setMaxRangeOnSlider(maxVal);
    maxRangeOnSlider.current = maxVal;
  }, [products]);

  const handleChange = (event, newValue) => {
    setRangeValue(newValue);
  };

  const categories = getCategories();

  const options = categories.map((cat, index) => (
    <option key={index} value={cat}>
      {cat}
    </option>
  ));

  return (
    <nav className="filtering-nav-bar">
      {products && (
        <RangeSlider
          value={rangeValue}
          handleChange={handleChange}
          maxRangeOnSlider={maxRangeOnSlider.current}
        />
      )}
      <div className="collection-sort">
        <label>Filter by:</label>
        <select
          onChange={(e) => {
            filterByCat(e.target.value, rangeValue);
          }}
        >
          <option value={"All"}>All</option>
          {options}
        </select>
      </div>
    </nav>
  );
};

export default FilterBar;
