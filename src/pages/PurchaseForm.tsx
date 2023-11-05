import {
  Box,
  Breadcrumbs,
  Button,
  Stack,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import Header from "../components/header/Header";
import { Add, ArrowBack, ArrowForward } from "@mui/icons-material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "No",
    width: 30,
  },
  { field: "itemNo", headerName: "Item No", width: 170 },
  { field: "itemName", headerName: "Item Name", width: 170 },
  { field: "itemQuantity", headerName: "Item Quantity", width: 170 },
  { field: "itemPrice", headerName: "Item Price", width: 170 },
  { field: "subTotal", headerName: "Sub Total", width: 170 },
];

const rows = [
  {
    id: 1,
    itemNo: "I002",
    itemName: "Deterjen Rinso",
    itemQuantity: 20,
    itemPrice: 55_000.00.toLocaleString("id-ID", { style: "currency", currency: "IDR" }),
    subTotal: (20 * 55_000.00).toLocaleString("id-ID", { style: "currency", currency: "IDR" }),
  },
];
const PurchaseForm = () => {
  return (
    <>
      <Header title="Purchase " />
      <Box paddingBlock={1} marginBottom={3}>
        <Breadcrumbs aria-label="breadcrumb">
          <Typography color="text.disabled">pages</Typography>
          <Typography color="text.disabled">Purcase</Typography>
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

        <TextField required label="Purchase No" size="small" autoFocus />
        <TextField required label="Purchase Date" size="small" />
        <TextField required label="Supplier Code" size="small" />
        <TextField disabled label="Supplier Name" size="small" />
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

export default PurchaseForm;
