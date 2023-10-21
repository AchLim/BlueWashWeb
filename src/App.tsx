import { Route, Routes } from "react-router-dom";
// import WebNavbar from "./components/WebNavbar";
// import Receipt from "./components/pages/Receipt";
// import Vendor from "./components/pages/Vendor";
// import Bank from "./components/pages/Bank";
// import ReceiptDetail from "./components/pages/ReceiptDetail";
// import ReceiptInsert from "./components/pages/ReceiptInsert";

// import BankInsert from "./components/pages/BankInsert";
// import BankDetail from "./components/pages/BankDetail";
import SideBar from "./components/sidebar/SideBar";
import { Box } from "@mui/material";
import "./App.css";
import "./assets/css/index.tsx";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

function App() {
  return (
    <Box>
      {/* <WebNavbar /> */}
      <SideBar />
      <Box sx={{ pl: "300px" }}>
        <Routes>
          <Route path="/" element={<div>Dashboard</div>} />
          <Route path="/dashboard" element={<div>Dashboard</div>} />
          {/* <Route path="/receipt" element={<Receipt />} />
          <Route path="/receipt/insert" element={<ReceiptInsert />} />
          <Route path="/receipt/detail/:id" element={<ReceiptDetail />} />
          <Route path="/vendor" element={<Vendor />} />

          <Route path="/bank" element={<Bank />} />
          <Route path="/bank/insert" element={<BankInsert />} />
          <Route path="/bank/detail/:id" element={<BankDetail />} /> */}
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
