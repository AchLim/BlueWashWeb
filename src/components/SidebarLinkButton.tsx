import { SvgIconComponent } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

interface ISidebarLinkButtonProps {
	children: any,
	linkTo: string;
	Icon: SvgIconComponent,
}

const SidebarLinkButton = (props: ISidebarLinkButtonProps) => {
	const location = useLocation();

	const isActive = () => location.pathname === props.linkTo;

	return (
		<Link to={props.linkTo} style={{ textDecoration: "none" }}>
			<Stack
				paddingInline={2}
				paddingBlock={"10px"}
				spacing={2}
				alignItems={"center"}
				direction={"row"}
				// boxShadow={3}
				borderRadius={2}
				{...(isActive()
					? {
						className: "box-soft-shadow",
						sx: {
							cursor: "pointer",
							color: "common.white",
							bgcolor: "primary.main",
						},
					}
					: {
						sx: {
							color: "text.primary",

							cursor: "pointer",
							
							"&:hover": {
								bgcolor: "#ddd",
								"& .side-bar-link-button-icon": {
									bgcolor: "primary.main",
									color: "common.white",
								},
							},
						},
					})}
			>
				<Box
					p={"6px"}
					borderRadius={2}
					display={"flex"}
					justifyContent={"center"}
					alignItems={"center"}
					className="icon-soft-shadow side-bar-link-button-icon"
					{...(isActive()
						? { bgcolor: "primary.main", color: "common.white" }
						: { color: "primary.main" })}
				>
					<props.Icon sx={{ fontSize: 16 }} />
				</Box>
				<Typography display={"block"}>{props.children}</Typography>
			</Stack>
		</Link>
	);
};

export default SidebarLinkButton;
