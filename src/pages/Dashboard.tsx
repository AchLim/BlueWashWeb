import { Box, Breadcrumbs, Typography } from "@mui/material";
import Header from "../components/Header";

const Dashboard = () => {

	return (
		<>
			<Header title="Dashboard" />
			<Box paddingBlock={1}>
				<Breadcrumbs aria-label="breadcrumb">
					<Typography color="text.primary">Dashboard</Typography>
				</Breadcrumbs>
			</Box>
			<Box>Dashboard</Box>
		</>
	);
};

export default Dashboard;
