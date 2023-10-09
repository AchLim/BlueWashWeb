import { Route, Routes } from 'react-router-dom';
import WebNavbar from './components/WebNavbar';
import PurchaseOrder from './components/pages/PurchaseOrder';
import Vendor from './components/pages/Vendor';
import Bank from './components/pages/Bank';
import PurchaseOrderDetail from './components/pages/PurchaseOrderDetail';

function App() {
  return (
    <div>
      <WebNavbar />
      <Routes>
        <Route path="/" element={<div>Dashboard</div>} />
        <Route path="/dashboard" element={<div>Dashboard</div>} />
        <Route path="/purchase_order" element={<PurchaseOrder />} />
        <Route path="/purchase_order/detail/:id" element={<PurchaseOrderDetail />} />
        <Route path="/vendor" element={<Vendor />} />
        <Route path="/bank" element={<Bank />} />
      </Routes>
    </div>
  )
}

export default App
