import React from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const Table = styled.table`  
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  max-width: 100%; /* Alterado para ocupar 100% da largura disponível */
  margin: 20px auto;
  word-break: break-all;
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr``;

export const Th = styled.th`
  text-align: start;
  border-bottom: inset;
  padding-bottom: 5px;

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

export const Td = styled.td`
  padding-top: 15px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

const GridSetor = ({ setores, setSetores, setOnEdit }) => {
  const handleEdit = (item) => {
    setOnEdit(item);
  };
  
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/setores/${id}`);
      const newArray = setores.filter((setores) => setores.id !== id);
      setSetores(newArray);
      toast.success("Setor deletado com sucesso.");
    } catch (error) {
      toast.error("Erro ao deletar setor.");
    }
    setOnEdit(null);
  };
  
  
  
  

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Descrição do Setor</Th>          
          <Th></Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {setores.map((item, i) => (
          <Tr key={i}>
            <Td width="60%">{item.descricao}</Td>            
            <Td alignCenter width="5%">
              <FaEdit onClick={() => handleEdit(item)} />
            </Td>
            <Td alignCenter width="5%">
              <FaTrash onClick={() => handleDelete(item.id)} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
    
  );
};

export default GridSetor;
