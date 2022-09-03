import React from "react";
import { Link } from "react-router-dom";
import AdminProductsGrid from "./AdminProductsGrid";
import AddIcon from "@mui/icons-material/Add";
import { Button, Tooltip } from "@mui/material";
import "./AdminPanel.css";

const AdminPanel = ({ products }) => {
  return (
    <div className="admin-panel-container">
      <AdminProductsGrid products={products} />
      <Tooltip title="Add New Product" placement="top" arrow>
        <Link to={"/newProduct"} className="add-new-product-btn">
          <Button variant="contained">
            <AddIcon />
          </Button>
        </Link>
      </Tooltip>
    </div>
  );
};

export default AdminPanel;
