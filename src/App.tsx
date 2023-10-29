import { useState } from 'react';
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
import CustomerForm from "./components/pages/CustomerForm.tsx";
import SalesForm from "./components/pages/SalesForm.tsx";
import InventoryForm from "./components/pages/InventoryForm.tsx";
import SupplierForm from "./components/pages/SupplierForm.tsx";
import SalesPaymentForm from "./components/pages/SalesPaymentForm.tsx";
import PurchaseForm from "./components/pages/PurchaseForm.tsx";
import GeneralJournalForm from "./components/pages/GeneralJournalForm.tsx";
import PriceMenuTree from "./components/pages/PriceMenu/PriceMenuTree.tsx";
import ServiceTree from "./components/pages/Service/ServiceTree.tsx";
import ServiceForm from './components/pages/Service/ServiceForm.tsx';

const App = () => {
  const getToken = () => localStorage.getItem('token') ??  null;
  const [token, setToken] = useState(getToken());

  if (!token) {
    return <LogIn setToken={setToken} />
  }

  return (
    <ContextProviders>
      <Routes>
        <Route path="admin-login" element={<LogIn setToken={setToken} />} />
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="master-data">
            <Route
              path="chart-of-account-form"
              element={<ChartOfAccountForm />}
            />
            <Route path="customer-form" element={<CustomerForm />} />
            <Route path="inventory-form" element={<InventoryForm />} />
            <Route path="supplier-form" element={<SupplierForm />} />
            <Route path="price-menu-tree" element={<PriceMenuTree />} />
            <Route path="service-tree">
              <Route path='' element={<ServiceTree />} />
              <Route path="detail/:id" element={<ServiceForm />} />
            </Route>
          </Route>
          <Route path="general-journal">
            <Route index element={<GeneralJournalForm />} />
          </Route>
          <Route path="purchase">
            <Route index element={<PurchaseForm />} />
          </Route>
          <Route path="sales">
            <Route index element={<SalesForm />} />
            <Route path="sales-payment-form" element={<SalesPaymentForm />} />
          </Route>
        </Route>
      </Routes>
    </ContextProviders>
  );
};

export default App;
