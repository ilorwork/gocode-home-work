import React from "react";
import { Link } from "react-router-dom";
import AdminProductsGrid from "./AdminProductsGrid";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import "./AdminPanel.css";

const AdminPanel = ({ products }) => {
  return (
    <div className="admin-panel-container">
      <AdminProductsGrid products={products} />
      <Link to={"/newProduct"}>
        <Button variant="contained" className="add-new-product-btn">
          <AddIcon />
        </Button>
      </Link>
    </div>
  );
};

export default AdminPanel;
