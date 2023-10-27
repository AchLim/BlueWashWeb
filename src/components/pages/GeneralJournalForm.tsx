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
  { field: "accountName", headerName: "Account Name", width: 170 },
  { field: "debit", headerName: "Debit", width: 170 },
  { field: "credit", headerName: "Credit", width: 170 },
];

const rows = [
  {
    id: 1,
    accountName: "Cash",
    debit: 1_500_000_000.0.toLocaleString("id-ID", { style: "currency", currency: "IDR" }),
    credit: 0.0.toLocaleString("id-ID", { style: "currency", currency: "IDR" }),
  },
  {
    id: 2,
    accountName: "Owner's Equity",
    debit: 0.0.toLocaleString("id-ID", { style: "currency", currency: "IDR" }),
    credit: 1_500_000_000.0.toLocaleString("id-ID", { style: "currency", currency: "IDR" }),
  },
];
const GeneralJournalForm = () => {
  return (
    <>
      <Header title="General Journal" />
      <Box paddingBlock={1} marginBottom={3}>
        <Breadcrumbs aria-label="breadcrumb">
          <Typography color="text.disabled">pages</Typography>
          <Typography color="text.disabled">General Journal</Typography>
        </Breadcrumbs>
      </Box>
      <Stack
        component="form"
        className="box-soft-shadow"
        p={3}
        borderRadius={3}
        spacing={2}
        marginBottom={3}
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

        <TextField required label="Transaction No" size="small" autoFocus />
        <TextField required label="Transaction Date" size="small" />
        <TextField label="Description" size="small" />
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

export default GeneralJournalForm;
