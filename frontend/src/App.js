import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './components/Main/Main.js';
import Empresas from './components/Empresas/Empresas.js'; 


function App() {
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/empresas" element={<Empresas />} />
      </Routes>
    </Router>
   
  );
}

export default App;
