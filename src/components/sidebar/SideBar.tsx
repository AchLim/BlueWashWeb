import { Box, Divider, Stack, Typography } from "@mui/material";
import SideBarLinkButton from "./SideBarLinkButton";
import { Home } from "@mui/icons-material";

const SideBar = () => {
  return (
    <Box
      position={"fixed"}
      top={0}
      bottom={0}
      left={0}
      width={"300px"}
      p={3}
      overflow={"auto"}
    >
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        mb={3}
      >
        LOGO
      </Box>
      <Divider variant="middle" />
      <Stack marginBlock={3} spacing={2}>
        <Box>
          <SideBarLinkButton icon={Home} active>
            Dashboard
          </SideBarLinkButton>
        </Box>
        <Box>
          <Typography variant="overline" color={"text.disabled"}>
            MASTER DATA
          </Typography>
          <SideBarLinkButton icon={Home} linkTo={"/"}>
            Chart of Accounts
          </SideBarLinkButton>
          <SideBarLinkButton icon={Home} linkTo={"/"}>
            Customer
          </SideBarLinkButton>
          <SideBarLinkButton icon={Home} linkTo={"/"}>
            Inventory
          </SideBarLinkButton>
          <SideBarLinkButton icon={Home} linkTo={"/"}>
            Supplier
          </SideBarLinkButton>
          <SideBarLinkButton icon={Home} linkTo={"/"}>
            Sales Payment
          </SideBarLinkButton>
        </Box>
        <Box>
          <Typography variant="overline" color={"text.disabled"}>
            PURCASE
          </Typography>
          <SideBarLinkButton icon={Home} linkTo={"/"}>
            Purcase
          </SideBarLinkButton>
          <SideBarLinkButton icon={Home} linkTo={"/"}>
            Purcase Detail
          </SideBarLinkButton>
        </Box>
        <Box>
          <Typography variant="overline" color={"text.disabled"}>
            SALES
          </Typography>
          <SideBarLinkButton icon={Home} linkTo={"/"}>
            Sales
          </SideBarLinkButton>
          <SideBarLinkButton icon={Home} linkTo={"/"}>
            Sales Payment
          </SideBarLinkButton>
        </Box>
      </Stack>
    </Box>
  );
};

export default SideBar;
