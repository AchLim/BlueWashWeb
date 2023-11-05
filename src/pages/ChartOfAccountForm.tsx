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

const ChartOfAccountForm = () => {
  return (
    <>
      <Header title="Chart Of Accounts " />
      <Box paddingBlock={1} marginBottom={3}>
        <Breadcrumbs aria-label="breadcrumb">
          <Typography color="text.disabled">pages</Typography>
          <Typography color="text.disabled">Master Data</Typography>
          <Typography color="text.primary">Chart Of Account </Typography>
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

        <TextField
          required
          label="Account Header No"
          autoComplete="email"
          size="small"
          autoFocus
        />

        <TextField required label="Account Header Name" size="small" />
        <TextField required label="Account No" size="small" />
        <TextField required label="Account Name" size="small" />
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
    </>
  );
};

export default ChartOfAccountForm;
