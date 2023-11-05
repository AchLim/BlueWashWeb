import { useState } from 'react';
import { Route, Routes } from "react-router-dom";

import "./App.css";
import "./assets/css/index.tsx";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Dashboard from "./pages/Dashboard.tsx";
import ContextProviders from "./components/contexts/ContextProviders.tsx";
import ChartOfAccountForm from "./pages/ChartOfAccountForm.tsx";
import AdminLayout from "./pages/AdminLayout.tsx";
import LogIn from "./pages/LogIn.tsx";
import CustomerForm from "./pages/Customer/CustomerForm.tsx";
import SalesForm from "./pages/SalesForm.tsx";
import InventoryForm from "./pages/InventoryForm.tsx";
import SalesPaymentForm from "./pages/SalesPaymentForm.tsx";
import PurchaseForm from "./pages/PurchaseForm.tsx";
import GeneralJournalForm from "./pages/GeneralJournalForm.tsx";
import PriceMenuTree from "./pages/PriceMenu/PriceMenuTree.tsx";
import ServiceTree from "./pages/Service/ServiceTree.tsx";
import ServiceForm from './pages/Service/ServiceForm.tsx';
import TransactionForm from './pages/Transaction/TransactionForm.tsx';
import CustomerTree from './pages/Customer/CustomerTree.tsx';
import SupplierTree from './pages/Supplier/SupplierTree.tsx';
import SupplierForm from "./pages/Supplier/SupplierForm.tsx";

const App = () => {
	const getToken = () => localStorage.getItem('token') ?? null;
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
					<Route path="transaction-form">
						<Route path='' element={<TransactionForm />} />
					</Route>
					<Route path="master-data">
						<Route
							path="chart-of-account-form"
							element={<ChartOfAccountForm />}
						/>
						<Route path="customer-tree">
							<Route path='' element={<CustomerTree />} />
							<Route path="detail/:id" element={<CustomerForm />} />
						</Route>
						<Route path="supplier-tree">
							<Route path='' element={<SupplierTree />} />
							<Route path="detail/:id" element={<SupplierForm />} />
						</Route>
						<Route path="inventory-form" element={<InventoryForm />} />
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
