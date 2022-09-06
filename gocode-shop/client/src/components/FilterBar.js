import React, { useState, useEffect, useContext, useRef } from "react";
import "./FilterBar.css";
import RangeSlider from "./RangeSlider";
import ShopContext from "../ShopContext";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

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
    <MenuItem key={index} value={cat}>
      {cat}
    </MenuItem>
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
      <FormControl sx={{ m: 1, minWidth: 180 }}>
        <InputLabel>Filter by</InputLabel>
        <Select
          // value={age}
          label="FILTER BY"
          onChange={(e) => {
            filterByCat(e.target.value, rangeValue);
          }}
        >
          <MenuItem value={"All"}>All</MenuItem>
          {options}
        </Select>
      </FormControl>
    </nav>
  );
};

export default FilterBar;
