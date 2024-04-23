import React from "react";
import { Link } from "react-router-dom";
import Global from "../../styles/global";
import "./main.css";

const Main = () => {
  return (
    <>
      <h1>Cadastro de Empresas e Fornecedores</h1>
      <div className="botoes">
        <Link className="btn" to="/empresas">
          <button>Empresas</button>
        </Link>
        <Link className="btn" to="/fornecedores">
          <button>Setores</button>
        </Link>
      </div>
      <Global />
    </>
  );
};

export default Main;
