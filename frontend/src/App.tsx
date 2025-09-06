import Home from './Pages/Home';
import Calculator from './Pages/Calculator';
import { Routes,Route } from 'react-router-dom';


function App() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/calculator" element={<Calculator />} />
      </Routes>
    </>
  );
}

export default App;
