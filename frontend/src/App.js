import Global from "./styles/global";
import styled from "styled-components";
import FormEmpresa from "./components/FormEmpresa.js";
import GridEmpresa from "./components/GridEmpresa.js";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";


const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2``;

function App() {
  const [empresas, setEmpresas] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getEmpresas = async () => {
    try {
      const res = await axios.get("http://localhost:8800/empresas/");
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
        <Title>EMPRESAS</Title>
        <FormEmpresa onEdit={onEdit} setOnEdit={setOnEdit} getEmpresas={getEmpresas}></FormEmpresa>
        <GridEmpresa setOnEdit={setOnEdit} empresas={empresas} setEmpresas={setEmpresas}></GridEmpresa>
      </Container>
      <ToastContainer autoClose={3000}/>
      <Global />
    </>
  );
}

export default App;
