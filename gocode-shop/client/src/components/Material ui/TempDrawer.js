import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Cart from "../Cart";
import { Link } from "react-router-dom";
import "./TempDrawer.css";
import { Badge } from "@mui/material";

const TempDrawer = ({ productsInCart }) => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (isOpen) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(isOpen);
  };

  const getTotalPrice = () => {
    const total = productsInCart.reduce(
      (previousValue, currentValue) =>
        previousValue + Number(currentValue.price),
      0
    );
    return total;
  };

  const list = () => (
    <Box
      sx={{ width: 350 }}
      role="presentation"
      // onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <div className="drawer-cart-header-container">
          <Link to={`/cart`}>
            <Button
              variant="contained"
              className="go-to-cart-btn"
              onClick={toggleDrawer(false)}
            >
              Go To Cart
            </Button>
          </Link>
          <p className="total-price-counter">Total: ${getTotalPrice()}</p>
        </div>
        <Cart
          productsInCart={productsInCart}
          containerClass="product-card-row"
        />
      </List>
    </Box>
  );

  return (
    <div>
      {
        <React.Fragment>
          <Button color="inherit" onClick={toggleDrawer(true)}>
            <Badge
              color="secondary"
              badgeContent={productsInCart.length}
              showZero
            >
              <ShoppingCartIcon />
            </Badge>
          </Button>
          <Drawer anchor={"right"} open={open} onClose={toggleDrawer(false)}>
            {list()}
          </Drawer>
        </React.Fragment>
      }
    </div>
  );
};

export default TempDrawer;
