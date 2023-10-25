import SideBar from "../sidebar/SideBar";
import { Box, Container } from "@mui/material";
import { useIsSideBarDisplay } from "../contexts/SideBarOpenContext.tsx";
import { Outlet } from "react-router-dom";
const AdminLayout = () => {
  const isSideBarDisplay = useIsSideBarDisplay();
  return (
    <>
      <Box>
        <Box
          position={"fixed"}
          top={0}
          bottom={0}
          width={300}
          overflow={"auto"}
          bgcolor={"#f8f9fa"}
          zIndex={1000}
          {...(isSideBarDisplay
            ? { sx: { left: { xs: "-300px", sm: 0 } } }
            : { sx: { left: { xs: 0, sm: "-300px" } } })}
        >
          <SideBar />
        </Box>
        <Box
          {...(isSideBarDisplay
            ? { sx: { pl: { xs: 0, sm: "300px" } } }
            : { sx: { pl: { xs: "0", sm: 0 } } })}
        >
          <Container sx={{ paddingBottom: 3 }}>
            <Outlet />
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default AdminLayout;
