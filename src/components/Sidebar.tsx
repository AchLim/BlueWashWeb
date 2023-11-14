import { useEffect, useState, Fragment } from 'react';

import { Box, Divider, Stack, Typography } from "@mui/material";
import SidebarLinkButton from "./SidebarLinkButton";
import {
	Balance,
	Home,
	Inventory,
	LocalShipping,
	Person,
	AccountBalanceWallet,
	Receipt,
	MenuBookRounded,
	CategoryRounded
} from "@mui/icons-material";

import BlueWashLogo from "../../assets/img/Blue Wash Logo.png";
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { GET_USER_MENUS_URL } from '../axios';
import useSnackBar from '../hooks/useSnackBar';
import useAuth from '../hooks/useAuth';

interface MenuCategory {
	categoryName: string;
	categoryDisplayName: string;
	menus: Array<Menu>;
}

interface Menu {
	menuName: string;
	menuDisplayName: string;
}

const Sidebar = () => {
	const { auth } = useAuth();
	const axiosPrivate = useAxiosPrivate();
	const { setSnackBar } = useSnackBar();

	const [menuCategories, setMenuCategories] = useState<Array<MenuCategory>>([])

	useEffect(() => {
		const getMenus = async () => {
			const response = await axiosPrivate.get(GET_USER_MENUS_URL());
			const data = response.data;
			
			if (data.error) {
				setSnackBar({ children: data.error, severity: 'error' });
			} else {
				const menuArray: Array<MenuCategory> = response.data;
				
				setMenuCategories(menuArray);
			}
		}

		getMenus().catch(console.error);
	}, [auth])

	return (
		<Box p={3}>
			{/*<Box component={"img"}
				display={"flex"}
				alignItems={"center"}
				justifyContent={"center"}
				mb={3}
				sx={{
				height: 250,
				width: 340,
				maxHeight: { xs: 220, md: 175 },
				maxWidth: { xs: 240, md: 238 },
				}}
				alt="Blue Wash Logo"
				src={BlueWashLogo}
			>
			</Box>*/}
			<Divider variant="middle" />
			<Stack marginBlock={3} spacing={2}>
				{
					menuCategories.map((menuCategory) => (
						<Box key={menuCategory.categoryName}>
							{GetTypographyByCategoryName(menuCategory.categoryName, menuCategory.categoryDisplayName)}

							{
								menuCategory.menus.map((menu) => (
									<Fragment key={menu.menuName}>
										{ GetSidebarLinkByMenuName(menu.menuName, menu.menuDisplayName) }
									</Fragment>
								))
							}
						</Box>
					))
				}
			</Stack>
		</Box>
	);
};

export default Sidebar;

const GetTypographyByCategoryName = (name: string, displayName: string) => {
	switch (name) {
		case 'transaction':
			return <Typography variant="overline" color={"text.disabled"}>
				{displayName}
			</Typography>

		case 'master-data':
			return <Typography variant="overline" color={"text.disabled"}>
				{displayName}
			</Typography>
		
		case 'general-journal':
			return <Typography variant="overline" color={"text.disabled"}>
				{displayName}
			</Typography>

		case 'purchase':
			return <Typography variant="overline" color={"text.disabled"}>
				{displayName}
			</Typography>


		case 'sales':
			return <Typography variant="overline" color={"text.disabled"}>
				{displayName}
			</Typography>

		default:
			return <></>
	}
}

const GetSidebarLinkByMenuName = (name: string, displayName: string) => {
	switch (name) {
		case 'dashboard':
			return <SidebarLinkButton Icon={Home} linkTo={"/"}>
				{displayName}
			</SidebarLinkButton>


		case 'transaction':
			return <SidebarLinkButton Icon={Receipt} linkTo={"/transaction-form"}>
				{displayName}
			</SidebarLinkButton>


		case 'expense':
			return <SidebarLinkButton Icon={AccountBalanceWallet} linkTo={"/expense-form"}>
				{displayName}
			</SidebarLinkButton>


		case 'chart-of-account':
			return <SidebarLinkButton
				Icon={Balance}
				linkTo={"/master-data/chart-of-account-tree"}
			>
				{displayName}
			</SidebarLinkButton>


		case 'customer':
			return <SidebarLinkButton
				Icon={Person}
				linkTo={"/master-data/customer-tree"}
			>
				{displayName}
			</SidebarLinkButton>


		case 'supplier':
			return <SidebarLinkButton
				Icon={LocalShipping}
				linkTo={"/master-data/supplier-tree"}
			>
				{displayName}
			</SidebarLinkButton>


		case 'inventory':
			return <SidebarLinkButton
				Icon={Inventory}
				linkTo={"/master-data/inventory-form"}
			>
				{displayName}
			</SidebarLinkButton>


		case 'laundry-service':
			return <SidebarLinkButton
				Icon={CategoryRounded}
				linkTo={"/master-data/service-tree"}
			>
				{displayName}
			</SidebarLinkButton>


		case 'price-menu':
			return <SidebarLinkButton
				Icon={MenuBookRounded}
				linkTo={"/master-data/price-menu-tree"}
			>
				{displayName}
			</SidebarLinkButton>

		
		case 'general-journal':
			return <SidebarLinkButton Icon={Home} linkTo={"/general-journal-tree"}>
				{displayName}
			</SidebarLinkButton>

		
		case 'purchase':
			return <SidebarLinkButton Icon={Home} linkTo={"/purchase"}>
				{displayName}
			</SidebarLinkButton>


		case 'sales':
			return <SidebarLinkButton Icon={Home} linkTo={"/sales"}>
				{displayName}
			</SidebarLinkButton>

		
		case 'sales-payment':
			return <SidebarLinkButton Icon={Home} linkTo={"/sales/sales-payment-form"}>
				{displayName}
			</SidebarLinkButton>


		default:
			return <></>
	}
}
