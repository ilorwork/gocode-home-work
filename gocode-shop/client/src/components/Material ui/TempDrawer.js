import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CloseIcon from "@mui/icons-material/Close";
import Cart from "../Cart";
import { useNavigate } from "react-router-dom";
import "./TempDrawer.css";
import { Badge, BottomNavigation, Paper, Tooltip } from "@mui/material";

const TempDrawer = ({ productsInCart, setProductsInCart }) => {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const toggleDrawer = (e, isOpen) => {
    if (e.type === "keydown" && (e.key === "Tab" || e.key === "Shift")) {
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

  const goToCartOnClickHandler = (e) => {
    toggleDrawer(e, false);
    navigate(`/cart`);
  };

  const list = () => (
    <Box
      sx={{ width: 320, mt: 0.5 }}
      role="presentation"
      // onClick={toggleDrawer(false)}
      onKeyDown={(e) => toggleDrawer(e, false)}
    >
      <List>
        <div className="drawer-cart-header-container">
          <Tooltip title="close" placement="bottom-end" arrow>
            <Button
              sx={{ m: -5 }}
              size="small"
              variant=""
              onClick={(e) => toggleDrawer(e, false)}
            >
              <CloseIcon />
            </Button>
          </Tooltip>
          <Badge
            color="secondary"
            badgeContent={productsInCart.length}
            showZero
          >
            <Button
              variant="contained"
              onClick={(e) => goToCartOnClickHandler(e)}
            >
              Go To Cart
            </Button>
          </Badge>
          <p className="total-price-counter">Total: ${getTotalPrice()}</p>
        </div>
        <Cart
          productsInCart={productsInCart}
          containerClass="product-card-row"
        />
      </List>
      {productsInCart.length !== 0 && (
        <Paper
          sx={{ position: "sticky", bottom: 0, left: 0, right: 0 }}
          elevation={3}
        >
          <BottomNavigation>
            <Button
              variant="contained"
              color="error"
              sx={{ my: 1 }}
              onClick={() => setProductsInCart([])}
            >
              Clear Cart
            </Button>
          </BottomNavigation>
        </Paper>
      )}
    </Box>
  );

  return (
    <div>
      {
        <React.Fragment>
          <Button color="inherit" onClick={(e) => toggleDrawer(e, true)}>
            <Badge
              color="secondary"
              badgeContent={productsInCart.length}
              showZero
            >
              <ShoppingCartIcon />
            </Badge>
          </Button>
          <Drawer
            anchor={"right"}
            open={open}
            onClose={(e) => toggleDrawer(e, false)}
          >
            {list()}
          </Drawer>
        </React.Fragment>
      }
    </div>
  );
};

export default TempDrawer;
