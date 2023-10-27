import { Box, Divider, Stack, Typography } from "@mui/material";
import SideBarLinkButton from "./SideBarLinkButton";
import {
  Balance,
  Home,
  Inventory,
  LocalShipping,
  Person,
} from "@mui/icons-material";

import BlueWashLogo from "../../assets/img/Blue Wash Logo.png";

const SideBar = () => {
  return (
    <Box p={3}>
      <Box component={"img"}
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
      </Box>
      <Divider variant="middle" />
      <Stack marginBlock={3} spacing={2}>
        <Box>
          <SideBarLinkButton icon={Home} linkTo={"/"} active>
            Dashboard
          </SideBarLinkButton>
        </Box>
        <Box>
          <Typography variant="overline" color={"text.disabled"}>
            MASTER DATA
          </Typography>
          <SideBarLinkButton
            icon={Balance}
            linkTo={"/master-data/chart-of-account-form"}
          >
            Chart of Accounts
          </SideBarLinkButton>
          <SideBarLinkButton
            icon={Person}
            linkTo={"/master-data/customer-form"}
          >
            Customer
          </SideBarLinkButton>
          <SideBarLinkButton
            icon={Inventory}
            linkTo={"/master-data/inventory-form"}
          >
            Inventory
          </SideBarLinkButton>
          <SideBarLinkButton
            icon={LocalShipping}
            linkTo={"/master-data/supplier-form"}
          >
            Supplier
          </SideBarLinkButton>
        </Box>
        <Box>
          <Typography variant="overline" color={"text.disabled"}>
            General Journal
          </Typography>
          <SideBarLinkButton icon={Home} linkTo={"/general-journal"}>
            General Journal
          </SideBarLinkButton>
        </Box>
        <Box>
          <Typography variant="overline" color={"text.disabled"}>
            PURCHASE
          </Typography>
          <SideBarLinkButton icon={Home} linkTo={"/purchase"}>
            Purchase
          </SideBarLinkButton>
        </Box>
        <Box>
          <Typography variant="overline" color={"text.disabled"}>
            SALES
          </Typography>
          <SideBarLinkButton icon={Home} linkTo={"/sales"}>
            Sales
          </SideBarLinkButton>
          <SideBarLinkButton icon={Home} linkTo={"/sales/sales-payment-form"}>
            Sales Payment
          </SideBarLinkButton>
        </Box>
      </Stack>
    </Box>
  );
};

export default SideBar;
