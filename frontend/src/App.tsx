import Home from './Pages/Home';
import Calculator from './Pages/Calculator';
import { Routes,Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';


function App() {
  return (
    <LanguageProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calculator" element={<Calculator />} />
      </Routes>
    </LanguageProvider>
  );
}

export default App;
