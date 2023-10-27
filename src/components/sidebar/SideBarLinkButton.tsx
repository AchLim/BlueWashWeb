import { Box, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
const SideBarLinkButton = ({ children, icon: Icon, active, linkTo }: any) => {
  return (
    <Link to={linkTo} style={{ textDecoration: "none" }}>
      <Stack
        paddingInline={2}
        paddingBlock={"10px"}
        spacing={2}
        alignItems={"center"}
        direction={"row"}
        // boxShadow={3}
        borderRadius={2}
        {...(active
          ? {
              className: "box-soft-shadow",
              sx: {
                cursor: "pointer",
                color: "text.primary",
              },
            }
          : {
              sx: {
                color: "text.primary",

                cursor: "pointer",
                "&:hover": {
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
          {...(active
            ? { bgcolor: "primary.main", color: "common.white" }
            : { color: "primary.main" })}
        >
          <Icon sx={{ fontSize: 16 }} />
        </Box>
        <Typography display={"block"}>{children}</Typography>
      </Stack>
    </Link>
  );
};

export default SideBarLinkButton;
