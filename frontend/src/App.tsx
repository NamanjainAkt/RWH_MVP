import Home from './Pages/Home';
import Calculator from './Pages/Calculator';
import VendorDashboard from './Pages/VendorDashboard';
import MunicipalDashboard from './Pages/MunicipalDashboard';
import { Routes,Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';


function App() {
  return (
    <LanguageProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/vendor-dashboard" element={<VendorDashboard />} />
        <Route path="/municipal-dashboard" element={<MunicipalDashboard />} />
      </Routes>
    </LanguageProvider>
  );
}

export default App;
