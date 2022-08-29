import React, { useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import ShopContext from "../ShopContext";

function valuetext(value) {
  return `${value}°C`;
}

export default function RangeSlider(value, handleChange, maxRangeOnSlider) {
  const { sortByPrice } = useContext(ShopContext);

  useEffect(() => {
    sortByPrice(value);
  }, [value]);

  return (
    <Box sx={{ width: 200 }}>
      <Typography id="input-slider" gutterBottom>
        Price Range: {value[0]} {"-"} {value[1]}
      </Typography>
      <Slider
        getAriaLabel={() => "Temperature range"}
        value={value}
        aria-labelledby="input-slider"
        onChange={handleChange}
        max={Number(maxRangeOnSlider)}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
      />
    </Box>
  );
}
