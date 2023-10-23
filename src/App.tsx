import { Route, Routes } from "react-router-dom";
import SideBar from "./components/sidebar/SideBar";
import { Box, Container } from "@mui/material";
import "./App.css";
import "./assets/css/index.tsx";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Dashboard from "./components/pages/Dashboard.tsx";
import ContextProviders from "./components/contexts/ContextProviders.tsx";
import { useIsSideBarDisplay } from "./components/contexts/SideBarOpenContext.tsx";

const App = () => {
  const isSideBarDisplay = useIsSideBarDisplay();

  return (
    <ContextProviders>
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
            <Routes>
              <Route path="/">
                <Route index element={<Dashboard />} />
                <Route path="dashboard" element={<Dashboard />} />
                {/* <Route path="bank/insert" element={<BankInsert />} /> */}
              </Route>
            </Routes>
          </Container>
        </Box>
      </Box>
    </ContextProviders>
  );
};

export default App;
