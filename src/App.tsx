import { Route, Routes } from "react-router-dom";

import "./App.css";
import "./assets/css/index.tsx";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Dashboard from "./pages/Dashboard.tsx";
import Layout from './pages/Layout.tsx';
import CustomerForm from "./pages/Customer/CustomerForm.tsx";
import SalesForm from "./pages/SalesForm.tsx";
import SalesPaymentForm from "./pages/SalesPaymentForm.tsx";
import PriceMenuTree from "./pages/PriceMenu/PriceMenuTree.tsx";
import ServiceTree from "./pages/Service/ServiceTree.tsx";
import ServiceForm from './pages/Service/ServiceForm.tsx';
import TransactionForm from './pages/Transaction/TransactionForm.tsx';
import CustomerTree from './pages/Customer/CustomerTree.tsx';
import SupplierTree from './pages/Supplier/SupplierTree.tsx';
import SupplierForm from "./pages/Supplier/SupplierForm.tsx";
import Login from './pages/Login.tsx';
import { AuthProvider } from './components/contexts/AuthContext.tsx';
import { SnackBarProvider } from './components/contexts/SnackBarContext.tsx';
import { SidebarToggleProvider } from './components/contexts/SidebarToggleContext.tsx';
import RequiredAuth from './components/RequireAuth.tsx';
import ChartOfAccountTree from "./pages/ChartOfAccount/ChartOfAccountTree.tsx";
import ChartOfAccountForm from "./pages/ChartOfAccount/ChartOfAccountForm.tsx";
import JournalEntryTree from "./pages/JournalEntry/JournalEntryTree.tsx";
import JournalEntryForm from "./pages/JournalEntry/JournalEntryForm.tsx";
import PurchaseForm from "./pages/Purchase/PurchaseForm.tsx";
import PurchaseTree from "./pages/Purchase/PurchaseTree.tsx";
import InventoryTree from "./pages/Inventory/InventoryTree.tsx";
import InventoryForm from "./pages/Inventory/InventoryForm.tsx";

const App = () => {

	return (
		<SnackBarProvider>
			<AuthProvider>
				<SidebarToggleProvider>
					<Routes>
						<Route path="login" element={<Login />} />
						<Route path="/" element={<Layout />}>
							<Route index element={<Dashboard />} />
							<Route path="dashboard" element={<Dashboard />} />
							<Route path="transaction-form" element={<RequiredAuth menuName='transaction' />}>
								<Route path='' element={<TransactionForm />} />
							</Route>
							<Route path="master-data">

								<Route path="chart-of-account-tree" element={<RequiredAuth menuName='chart-of-account' />}>
									<Route path='' element={<ChartOfAccountTree />} />
									<Route path='detail/:id' element={<ChartOfAccountForm />} />
								</Route>

								<Route path="customer-tree" element={<RequiredAuth menuName='customer' />}>
									<Route path='' element={<CustomerTree />} />
									<Route path="detail/:id" element={<CustomerForm />} />
								</Route>

								<Route path="supplier-tree" element={<RequiredAuth menuName='supplier' />}>
									<Route path='' element={<SupplierTree />} />
									<Route path="detail/:id" element={<SupplierForm />} />
								</Route>

								<Route path="inventory-tree" element={<RequiredAuth menuName='inventory' />}>
									<Route path='' element={<InventoryTree />} />
									<Route path="detail/:id" element={<InventoryForm />} />
								</Route>

								<Route path="price-menu-tree" element={<PriceMenuTree />} />
								<Route path="service-tree">
									<Route path='' element={<ServiceTree />} />
									<Route path="detail/:id" element={<ServiceForm />} />
								</Route>
							</Route>
							<Route path="journal-entry-tree" element={<RequiredAuth menuName='general-journal' />}>
								<Route path='' element={<JournalEntryTree />} />
								<Route path='detail/:id' element={<JournalEntryForm />} />
							</Route>
							<Route path="purchase-tree" element={<RequiredAuth menuName='purchase' />}>
								<Route path='' element={<PurchaseTree />} />
								<Route path='detail/:id' element={<PurchaseForm />} />
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
				</SidebarToggleProvider>
			</AuthProvider>
		</SnackBarProvider>
	);
};

export default App;
