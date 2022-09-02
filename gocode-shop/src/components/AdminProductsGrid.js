import * as React from "react";
import { useRef } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
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
        <Button
          onClick={() => {
            navigate(`/editProduct/${params.id}`);
          }}
        >
          <EditIcon />
        </Button>
      ),
    },
    {
      field: "",
      headerName: "",
      sortable: false,
      renderCell: (params) => (
        <Button
          onClick={() => {
            console.log(params);
            navigate(`/product/${params.id}`);
          }}
        >
          <InfoIcon />
        </Button>
      ),
    },
  ];

  const productsRows = products.map((p) => {
    return {
      id: p.id,
      title: p.title,
      image: p.image,
      price: p.price,
      description: p.description,
      category: p.category,
    };
  });

  const rows = [
    {
      id: 1,
      image: "Snow",
      title: "Jon",
      price: 35,
      description: "fdsa fdsa fdsa fdsa fdsa fdsa fdsa fdsa fdsa",
      category: "pants",
    },
    {
      id: 2,
      image: "Lannister",
      title: "Cersei",
      price: 42,
      description: "fdsa fdsa fdsa fdsa fdsa fdsa fdsa fdsa fdsa",
      category: "pants",
    },
    {
      id: 3,
      image: "Lannister",
      title: "Jaime",
      price: 45,
      description: "fdsa fdsa fdsa fdsa fdsa fdsa fdsa fdsa fdsa",
      category: "pants",
    },
    {
      id: 4,
      image: "Stark",
      title: "Arya",
      price: 16,
      description: "fdsa fdsa fdsa fdsa fdsa fdsa fdsa fdsa fdsa",
      category: "pants",
    },
    {
      id: 5,
      image: "Targaryen",
      title: "Daenerys",
      price: null,
      description: "fdsa fdsa fdsa fdsa fdsa fdsa fdsa fdsa fdsa",
      category: "pants",
    },
    {
      id: 6,
      image: "Melisandre",
      title: null,
      price: 150,
      description: "fdsa fdsa fdsa fdsa fdsa fdsa fdsa fdsa fdsa",
      category: "pants",
    },
    {
      id: 7,
      image: "Clifford",
      title: "Ferrara",
      price: 44,
      description: "fdsa fdsa fdsa fdsa fdsa fdsa fdsa fdsa fdsa",
      category: "pants",
    },
    {
      id: 8,
      image: "Frances",
      title: "Rossini",
      price: 36,
      description: "fdsa fdsa fdsa fdsa fdsa fdsa fdsa fdsa fdsa",
      category: "pants",
    },
    {
      id: 9,
      image: "Roxie",
      title: "Harvey",
      price: 65,
      description: "fdsa fdsa fdsa fdsa fdsa fdsa fdsa fdsa fdsa",
      category: "pants",
    },
  ];

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
