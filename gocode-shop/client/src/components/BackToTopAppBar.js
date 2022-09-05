import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Fade from "@mui/material/Fade";
import MenuAppBar from "./AppBar";
import { Tooltip } from "@mui/material";

function ScrollTop({ children }) {
  const trigger = useScrollTrigger();

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({
        block: "center",
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 20, right: 20 }}
      >
        {children}
      </Box>
    </Fade>
  );
}

export default function BackToTopAppBar(props) {
  console.log("props", props);
  return (
    <React.Fragment>
      <MenuAppBar productsInCart={props.productsInCart} />

      <Toolbar id="back-to-top-anchor" />
      <ScrollTop {...props}>
        <Tooltip title="Back to top" placement="top">
          <Fab size="small" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </Tooltip>
      </ScrollTop>
    </React.Fragment>
  );
}
