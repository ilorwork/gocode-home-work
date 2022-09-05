import { useContext } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import ShopContext from "../ShopContext";
import config from "../config.json";

export default function AdminProductsGrid({ products }) {
  const navigate = useNavigate();
  const { setProductsArr } = useContext(ShopContext);

  const deleteProduct = async (id) => {
    await fetch(`${config.BaseUrl}/api/product/${id}`, {
      method: "DELETE",
    });

    const indexToDelete = products.findIndex((p) => p._id === id);
    if (indexToDelete < 0) {
      console.log("Unable to delete, item not found");
      return;
    }

    products.splice(indexToDelete, 1);
    setProductsArr([...products]);
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
              navigate(`/product/${params.id}`);
            }}
          >
            <InfoIcon />
          </Button>
        </Tooltip>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      sortable: false,
      renderCell: (params) => (
        <Tooltip title="Delete" placement="top" arrow>
          <Button
            onClick={() => {
              deleteProduct(params.id);
            }}
          >
            <DeleteIcon />
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
