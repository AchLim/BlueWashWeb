import { Route, Routes } from 'react-router-dom';
import WebNavbar from './components/WebNavbar';
import Receipt from './components/pages/Receipt';
import Vendor from './components/pages/Vendor';
import Bank from './components/pages/Bank';
import ReceiptDetail from './components/pages/ReceiptDetail';
import ReceiptInsert from './components/pages/ReceiptInsert';
import './App.css';
import BankInsert from './components/pages/BankInsert';
import BankDetail from './components/pages/BankDetail';

function App() {
  return (
    <div>
      <WebNavbar />
      <div className='container-fluid'>
        <Routes>
          <Route path="/" element={<div>Dashboard</div>} />
          <Route path="/dashboard" element={<div>Dashboard</div>} />

          <Route path="/receipt" element={<Receipt />} />
          <Route path="/receipt/insert" element={<ReceiptInsert />} />
          <Route path="/receipt/detail/:id" element={<ReceiptDetail />} />

          <Route path="/vendor" element={<Vendor />} />
          
          <Route path="/bank" element={<Bank />} />
          <Route path="/bank/insert" element={<BankInsert />} />
          <Route path="/bank/detail/:id" element={<BankDetail />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
