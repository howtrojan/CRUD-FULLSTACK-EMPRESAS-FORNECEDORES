import React from "react";
import { Link } from "react-router-dom";
import Global from "../../styles/global";
import "./main.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import GridComFiltros from "../GridComFiltroes/GridComFiltros";

const Main = () => {

  const Container = styled.div`  
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

  const [empresas, setEmpresas] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getEmpresas = async () => {
    try {
      const res = await axios.get("http://localhost:8800/empresas");
      setEmpresas(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getEmpresas();
  }, [setEmpresas]);

  return (
    <>
    <Container>
      <h1>Cadastro de Empresas e Fornecedores</h1>
      <div style={{margin: "20px"}} className="botoes">
        <Link className="btn" to="/empresas">
          <button>Empresas</button>
        </Link>
        <Link className="btn" to="/fornecedores">
          <button>Setores</button>
        </Link>
      </div>
      <GridComFiltros setOnEdit={setOnEdit} empresas={empresas} setEmpresas={setEmpresas}></GridComFiltros>
      </Container>
      <Global />
    </>
  );
};

export default Main;
