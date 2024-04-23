import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from "./components/Main/main.js";
import Empresas from './components/Empresas/Empresas.js'; 
import Fornecedores from './components/Setores/Setores.js';


function App() {
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/empresas" element={<Empresas />} />
        <Route path="/fornecedores" element={<Fornecedores />} />
      </Routes>
    </Router>
   
  );
}

export default App;
