import { Route, Routes } from 'react-router-dom';
import WebNavbar from './components/WebNavbar';
import Currency from './components/pages/Currency';
import CurrencyDetail from './components/pages/CurrencyDetail';
// import BankInsert from './components/pages/BankInsert';

import './App.css';

function App() {
  return (
    <div>
      <WebNavbar />
      <div className='container-fluid'>
        <Routes>
          <Route path="/" element={<div>Dashboard</div>} />
          <Route path="/dashboard" element={<div>Dashboard</div>} />

          <Route path="/currency" element={<Currency />} />
          <Route path="/currency/detail/:id" element={<CurrencyDetail />} />
          {/* <Route path="/bank/insert" element={<BankInsert />} /> */}
        </Routes>
      </div>
    </div>
  )
}

export default App
