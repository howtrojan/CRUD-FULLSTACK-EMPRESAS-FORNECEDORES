import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const Table = styled.table`
  width: 100%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  max-width: 1120px;
  margin: 20px auto;
  word-break: break-all;
`;

const Thead = styled.thead``;

const Tbody = styled.tbody``;

const Tr = styled.tr``;

const Th = styled.th`
  text-align: start;
  border-bottom: inset;
  padding-bottom: 5px;

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

const Td = styled.td`
  padding-top: 15px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

const GridEmpresa = ({ empresas, setEmpresas, setOnEdit }) => {
  const [setores, setSetores] = useState({});

  useEffect(() => {
    const fetchSetores = async () => {
      try {
        const response = await axios.get("http://localhost:8800/setores");
        const setoresData = {};
        response.data.forEach((setor) => {
          setoresData[setor.id] = setor.descricao;
        });
        setSetores(setoresData);
      } catch (error) {
        console.error("Erro ao buscar setores:", error);
      }
    };

    fetchSetores();
  }, []);

  const handleEdit = (item) => {    
    const setorDescricao = setores[item.id_setor];    
    const empresaComSetor = { ...item, setor: setorDescricao };  
    setOnEdit(empresaComSetor);
  };
  

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/empresas/${id}`);
      const newArray = empresas.filter((empresa) => empresa.id !== id);
      setEmpresas(newArray);
      toast.success("Empresa deletada com sucesso.");
    } catch (error) {
      toast.error("Erro ao deletar empresa.");
    }
    setOnEdit(null);
  };

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Razao Social</Th>
          <Th>Nome Fantasia</Th>
          <Th onlyWeb>CNPJ</Th>
          <Th>Setor</Th>
          <Th></Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {empresas.map((item, i) => (
          <Tr key={i}>
            <Td width="30%">{item.razao_social}</Td>
            <Td width="30%">{item.nome_fantasia}</Td>
            <Td width="20%" onlyWeb>
              {item.cnpj}
            </Td>
            <Td>{setores[item.id_setor]}</Td> {/* Renderizando o nome do setor */}
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

export default GridEmpresa;
