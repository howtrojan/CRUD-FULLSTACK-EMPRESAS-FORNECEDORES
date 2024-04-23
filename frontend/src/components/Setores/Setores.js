import Global from "../../styles/global.js";
import styled from "styled-components";
import FormSetores from "./FormSetores.js";
import GridSetores from "./GridSetores.js";
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

function Setores() {
  const [setores, setSetores] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getSetor = async () => {
    try {
      const res = await axios.get("http://localhost:8800/setores");
      setSetores(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getSetor();
  }, [setSetores]);



  return (
    <>
      <Container>
        <Title>Setores</Title>
        <FormSetores onEdit={onEdit} setOnEdit={setOnEdit} getSetor={getSetor}></FormSetores>
        <GridSetores setOnEdit={setOnEdit} setores={setores} setSetores={setSetores}></GridSetores>
      </Container>
      <ToastContainer autoClose={3000}/>
      <Global />
    </>
  );
}

export default Setores;
