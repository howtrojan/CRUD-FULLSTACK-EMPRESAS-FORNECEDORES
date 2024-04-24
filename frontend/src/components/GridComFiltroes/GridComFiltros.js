import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

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

const GridComFiltros = ({ empresas, setEmpresas, setOnEdit }) => {
  const [setores, setSetores] = useState({});
  const [filtroSetor, setFiltroSetor] = useState("");
  const [filtroEmpresa, setFiltroEmpresa] = useState("");

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
  
  
   const filterEmpresa = (empresa) => {
    return empresa.razao_social.toLowerCase().includes(filtroEmpresa.toLowerCase());
  };

  
  const filterSetor = (empresa) => {
    if (!filtroSetor) return true;
    const setorDescricao = setores[empresa.id_setor];
    return setorDescricao === filtroSetor;
  };

  const empresasFiltradas = empresas.filter(filterEmpresa).filter(filterSetor);

  return (
    <>
    <div style={{ display: 'flex', gap: '10px' }} >
        <input
          type="text"
          value={filtroEmpresa}
          onChange={(e) => setFiltroEmpresa(e.target.value)}
          placeholder="Filtrar por razão social..."
        />
        <select
          value={filtroSetor}
          onChange={(e) => setFiltroSetor(e.target.value)}
        >
          <option value="">Todos os setores</option>
          {Object.values(setores).map((descricao) => (
            <option key={descricao} value={descricao}>{descricao}</option>
          ))}
        </select>
      </div>
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
        {empresasFiltradas.map((item, i) => (
          <Tr key={i}>
            <Td width="30%">{item.razao_social}</Td>
            <Td width="30%">{item.nome_fantasia}</Td>
            <Td width="20%" onlyWeb>
              {item.cnpj}
            </Td>   
            <Td>{setores[item.id_setor]}</Td>         
          </Tr>
        ))}
      </Tbody>
    </Table>
    </>
  );
};

export default GridComFiltros;
