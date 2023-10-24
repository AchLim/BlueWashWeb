import { Route, Routes } from "react-router-dom";

import "./App.css";
import "./assets/css/index.tsx";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Dashboard from "./components/pages/Dashboard.tsx";
import ContextProviders from "./components/contexts/ContextProviders.tsx";
import ChartOfAccountForm from "./components/pages/ChartOfAccountForm.tsx";
import AdminLayout from "./components/pages/AdminLayout.tsx";
import LogIn from "./components/pages/LogIn.tsx";

const App = () => {
  return (
    <ContextProviders>
      <Routes>
        <Route path="admin-login" element={<LogIn />} />
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="master-data">
            <Route
              path="chart-of-account-form"
              element={<ChartOfAccountForm />}
            />
            <Route path="customer" element={<div>customer</div>} />
          </Route>

          {/* <Route path="bank/insert" element={<BankInsert />} /> */}
        </Route>
      </Routes>
    </ContextProviders>
  );
};

export default App;
