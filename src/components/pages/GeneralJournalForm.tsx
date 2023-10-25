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
  { field: "accountHeader", headerName: "Account Header", width: 170 },
  { field: "accountHeaderName", headerName: "Account Header Name", width: 170 },
  { field: "accountName", headerName: "Account Name", width: 170 },
];

const rows = [
  {
    id: 1,
    accountHeader: "100",
    accountHeaderName: "asset",
    accountName: "accounts receivable",
  },
  {
    id: 2,
    accountHeader: "100",
    accountHeaderName: "asset",
    accountName: "inventory",
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
        <TextField required label="Account No" size="small" />
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

export default GeneralJournalForm;
