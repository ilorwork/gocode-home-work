import * as React from "react";
import { useRef } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";

export default function AdminProductsGrid({ products }) {
  const navigate = useNavigate();
  const inputElement = useRef();

  const focusInput = () => {
    console.log("fdsafdsa", inputElement.current);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "title",
      headerName: "Title",
      width: 350,
    },
    {
      field: "image",
      headerName: "Image",
      width: 150,
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      width: 110,
    },
    {
      field: "description",
      headerName: "Description",
      description: "The description of the products",
      width: 350,
    },
    {
      field: "category",
      headerName: "Category",
      description: "Category",
      width: 160,
    },
    {
      field: "edit",
      headerName: "Edit",
      sortable: false,
      renderCell: (params) => (
        <Tooltip title="Edit" placement="top" arrow>
          <Button
            onClick={() => {
              navigate(`/editProduct/${params.id}`);
            }}
          >
            <EditIcon />
          </Button>
        </Tooltip>
      ),
    },
    {
      field: "info",
      headerName: "Info",
      sortable: false,
      renderCell: (params) => (
        <Tooltip title="More Details" placement="top" arrow>
          <Button
            onClick={() => {
              console.log(params);
              navigate(`/product/${params.id}`);
            }}
          >
            <InfoIcon />
          </Button>
        </Tooltip>
      ),
    },
  ];

  const productsRows = products.map((p) => {
    return {
      id: p._id,
      title: p.title,
      image: p.image,
      price: p.price,
      description: p.description,
      category: p.category,
    };
  });

  return (
    <Box sx={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={productsRows}
        columns={columns}
        pageSize={7}
        rowsPerPageOptions={[7]}
        // checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
}
