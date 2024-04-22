import React from "react";
import { Link } from "react-router-dom";
import Global from "../../styles/global";

const Main = () => {
  return (
    <>
      <h1>Cadastro de Empresas e Fornecedores</h1>
      <Link to="/empresas">
        <button>Empresas</button>
      </Link>
      <Global />
    </>
  );
};

export default Main;
