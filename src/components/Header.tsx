import { AccountCircleSharp, Menu } from "@mui/icons-material";
import { Button, IconButton, Stack, Typography } from "@mui/material";
import useSidebarToggle from "../hooks/useSidebarToggle";
import useAuth from "../hooks/useAuth";

const Header = ({ title }: any) => {
	const { auth } = useAuth();
	const { toggleSidebar } = useSidebarToggle();

	return (
		<>
			<Stack
				paddingBlock={2}
				direction={"row"}
				alignItems={"center"}
				justifyContent={"space-between"}
				spacing={2}
			>
				<Stack
					spacing={2}
					alignItems={"center"}
					justifyContent={"space-between"}
					direction={"row"}
				>
					<IconButton
						color="primary"
						size="small"
						onClick={toggleSidebar}
					>
						<Menu fontSize="small" />
					</IconButton>
					<Typography variant="body1" component={"h1"} fontWeight={"bold"}>
						{title}
					</Typography>
				</Stack>

				<Stack
					spacing={2}
					alignItems={"center"}
					justifyContent={"space-between"}
					direction={"row"}
				>
					<Button
						color="primary"
						startIcon={<AccountCircleSharp />}
						size="small"
						sx={{ textTransform: "none", paddingInline: 2 }}
					>
						{ auth.username }
					</Button>
				</Stack>
			</Stack>
		</>
	);
};

export default Header;
