import {
  Box,
  Breadcrumbs,
  Button,
  Stack,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import Header from "../header/Header";
import { Add, ArrowBack, ArrowForward } from "@mui/icons-material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "No",
    width: 30,
  },
  { field: "cbmItemNo", headerName: "cbm Item No", width: 170 },
  { field: "itemName", headerName: "Item Name", width: 170 },
  {
    field: "itemPrice_msInventory",
    headerName: "item Price ms Inventory",
    width: 300,
  },
  { field: "itemQuantity", headerName: "Item Price", width: 170 },
  { field: "itemPrice", headerName: "Item Quantity", width: 170 },
  { field: "subTotal", headerName: "Sub Total", width: 170 },
];

const rows = [
  {
    id: 1,
    cbmItemNo: "I002",
    itemName: "PC Asiacom",
    itemPrice_msInventory: "2850",
    itemQuantity: 5,
    itemPrice: 2565,
    subTotal: 1282500,
  },
];
const SalesForm = () => {
  return (
    <>
      <Header title="Sales" />
      <Box paddingBlock={1} marginBottom={3}>
        <Breadcrumbs aria-label="breadcrumb">
          <Typography color="text.disabled">pages</Typography>
          <Typography color="text.disabled">Sales</Typography>
        </Breadcrumbs>
      </Box>
      <Stack
        component="form"
        className="box-soft-shadow"
        p={3}
        borderRadius={3}
        spacing={2}
      >
        <Box display={"flex"} gap={1} justifyContent={"right"}>
          <IconButton color={"primary"} size={"small"}>
            <Add fontSize="small" />
          </IconButton>

          <IconButton color={"primary"} size={"small"}>
            <ArrowBack fontSize="small" />
          </IconButton>
          <IconButton color={"primary"} size={"small"}>
            <ArrowForward fontSize="small" />
          </IconButton>
        </Box>

        <TextField required label="Sales No" size="small" autoFocus />
        <TextField required label="Sales Date" size="small" />
        <TextField required label="cmb Customer CC" size="small" />
        <TextField required label="Customer Name" size="small" />
        <TextField required label="Customer Address" size="small" />
        <TextField required label="Description" size="small" />
        <Box display={"flex"}>
          <Box sx={{ marginRight: "auto" }}>
            <Button variant="outlined" color="warning">
              Delete
            </Button>
          </Box>
          <Box>
            <Button type="submit" variant="contained">
              Save
            </Button>
          </Box>
        </Box>
      </Stack>
      <Box className="box-soft-shadow" p={3} borderRadius={3} marginBottom={3}>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => row?.id}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 25 },
            },
          }}
          pageSizeOptions={[5, 10]}
        />
      </Box>
    </>
  );
};

export default SalesForm;
