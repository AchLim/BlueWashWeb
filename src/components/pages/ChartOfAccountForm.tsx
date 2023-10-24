import { Box, Breadcrumbs, Typography } from "@mui/material";
import Header from "../header/Header";

const ChartOfAccountForm = () => {
  return (
    <>
      <Header title="Dashboard" />
      <Box paddingBlock={1}>
        <Breadcrumbs aria-label="breadcrumb">
          <Typography color="text.disabled">pages</Typography>
          <Typography color="text.disabled">Master Data</Typography>
          <Typography color="text.primary">Chart Of Account</Typography>
          <Typography color="text.primary">Form</Typography>
        </Breadcrumbs>
      </Box>
      <Box>Chart Of Account Form</Box>
    </>
  );
};

export default ChartOfAccountForm;
