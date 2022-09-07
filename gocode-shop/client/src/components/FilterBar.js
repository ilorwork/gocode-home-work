import React, { useState, useEffect, useContext, useRef } from "react";
import "./FilterBar.css";
import RangeSlider from "./RangeSlider";
import ShopContext from "../ShopContext";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const FilterBar = ({ products, filterByCat }) => {
  const [rangeValue, setRangeValue] = useState([0, 1000]);
  const [selectedCat, setSelectedCat] = useState("All");

  const { getCategories } = useContext(ShopContext);

  useEffect(() => {
    console.log("rendering bar", selectedCat);
    filterByCat(selectedCat, [0, 1000]);
  }, []);

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
          maxRangeOnSlider={1000}
          selectedCat={selectedCat}
        />
      )}
      <FormControl sx={{ m: 1, minWidth: 180 }}>
        <InputLabel>Category</InputLabel>
        <Select
          value={selectedCat}
          label="CATEGORY"
          onChange={(e) => {
            setSelectedCat(e.target.value);
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
