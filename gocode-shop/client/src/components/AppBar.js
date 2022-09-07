import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import TempDrawer from "./Material ui/TempDrawer";
import AddProductsScript from "./AddProductsScript";

export default function MenuAppBar({ productsInCart }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const profileClickCount = React.useRef(0);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onClickProfile = () => {
    profileClickCount.current = profileClickCount.current + 1;
    if (profileClickCount.current > 2) {
      alert(
        "You've descovered a secret. new products have been added. refresh to reveal them"
      );
      AddProductsScript();
      profileClickCount.current = 0;
      // window.location.reload(false);
    }
    handleClose();
  };

  const onClickManageProducts = () => {
    navigate(`/adminPanel`);
    handleClose();
  };

  const headerView = () => {
    if (location.pathname === "/") {
      return "Products";
    } else if (location.pathname === "/cart") {
      return "Your Cart";
    } else if (location.pathname === "/newProduct") {
      return "Create New Product";
    } else if (location.pathname.startsWith("/product/")) {
      return "Product Details";
    } else if (location.pathname === "/adminPanel") {
      return "Manage Your Products";
    } else if (location.pathname.startsWith("/editProduct/")) {
      return "Edit Product";
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar>
        <Toolbar>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate(`/`)}
          >
            Shopy
          </Button>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 3 }}>
            {headerView()}
          </Typography>

          <TempDrawer productsInCart={productsInCart} />

          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={onClickProfile}>Profile</MenuItem>
            <MenuItem onClick={onClickManageProducts}>Manage Products</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
