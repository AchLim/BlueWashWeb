import SideBar from "../sidebar/SideBar";
import { Box, Container } from "@mui/material";
import { useIsSideBarDisplay } from "../contexts/SideBarOpenContext.tsx";
import { Outlet } from "react-router-dom";
const AdminLayout = () => {
  const isSideBarDisplay = useIsSideBarDisplay();
  return (
    <>
      <div
        style={{ position: "fixed", bottom: 0, right: 0 }}
        className="findme"
        onClick={() => console.log(isSideBarDisplay, "testestes")}
      >
        {isSideBarDisplay ? "true" : "false"}
      </div>
      <Box>
        <Box
          position={"fixed"}
          top={0}
          bottom={0}
          width={300}
          overflow={"auto"}
          {...(isSideBarDisplay
            ? { sx: { left: { xs: "-300px", sm: 0 } } }
            : { sx: { left: { xs: 0, sm: "-300px" } } })}
        >
          <SideBar />
        </Box>
        <Box
          {...(isSideBarDisplay
            ? { sx: { pl: { xs: 0, sm: "300px" } } }
            : { sx: { pl: { xs: "300px", sm: 0 } } })}
        >
          <Container>
            <Outlet />
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default AdminLayout;
