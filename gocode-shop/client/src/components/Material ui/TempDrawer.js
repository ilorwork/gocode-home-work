import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CloseIcon from "@mui/icons-material/Close";
import Cart from "../Cart";
import { Link } from "react-router-dom";
import "./TempDrawer.css";
import { Badge, Tooltip } from "@mui/material";

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
      sx={{ width: 320, mt: 0.5 }}
      role="presentation"
      // onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <div className="drawer-cart-header-container">
          <Tooltip title="close" placement="bottom-end" arrow>
            <Button
              sx={{ m: -5 }}
              size="small"
              variant=""
              onClick={toggleDrawer(false)}
            >
              <CloseIcon />
            </Button>
          </Tooltip>
          <Link to={`/cart`}>
            <Badge
              color="secondary"
              badgeContent={productsInCart.length}
              showZero
            >
              <Button
                variant="contained"
                className="go-to-cart-btn"
                onClick={toggleDrawer(false)}
              >
                Go To Cart
              </Button>
            </Badge>
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
