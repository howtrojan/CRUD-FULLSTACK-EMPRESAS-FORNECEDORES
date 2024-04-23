import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

const Select = styled.select`
  width: 150px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const FormEmpresa = ({ getEmpresas, onEdit, setOnEdit }) => {
  const [setores, setSetores] = useState([]);
  const ref = useRef();

  useEffect(() => {
    const fetchSetores = async () => {
      try {
        const response = await axios.get("http://localhost:8800/setores");
        setSetores(response.data);
      } catch (error) {
        console.error("Erro ao buscar setores:", error);
      }
    };

    fetchSetores();
  }, []);

  useEffect(() => {
    if (onEdit) {
      const empresas = ref.current;

      empresas.razao_social.value = onEdit.razao_social;
      empresas.nome_fantasia.value = onEdit.nome_fantasia;
      empresas.cnpj.value = onEdit.cnpj;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const empresas = ref.current;
  
    if (!empresas.razao_social.value || !empresas.nome_fantasia.value || !empresas.cnpj.value) {
      return toast.warn("Preencha todos os campos!");
    }
  
    const idSetor = empresas.setor.value; // Obtém o ID do setor selecionado

    if (!idSetor) {
      return toast.warn("Selecione um setor!");
    }
  
    if (onEdit) {
      await axios
        .put(`http://localhost:8800/empresas/${onEdit.id}`, {  
          razao_social: empresas.razao_social.value,
          nome_fantasia: empresas.nome_fantasia.value,
          cnpj: empresas.cnpj.value,
          id_setor: idSetor 
        })
        .then(({ data }) => toast.success(data))
        .catch(({ response }) => toast.error(response.data.message)); 
    } else {
      await axios
        .post("http://localhost:8800/empresas/", {
          razao_social: empresas.razao_social.value,
          nome_fantasia: empresas.nome_fantasia.value,
          cnpj: empresas.cnpj.value,
          id_setor: idSetor // Passa o ID do setor para criação
        })
        .then(({ data }) => toast.success(data))
        .catch(({ response }) => toast.error(response.data.message)); 
    }
  
    empresas.razao_social.value = "";
    empresas.nome_fantasia.value = "";
    empresas.cnpj.value = "";
    empresas.setor.value = ""; 
  
    setOnEdit(null);
    getEmpresas();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Razão Social</Label>
        <Input name="razao_social" />
      </InputArea>
      <InputArea>
        <Label>Nome Fantasia</Label>
        <Input name="nome_fantasia" />
      </InputArea>
      <InputArea>
        <Label>CNPJ</Label>
        <Input name="cnpj" />
      </InputArea>
      <InputArea>
        <Label>Setor</Label>
        <Select name="setor">
          <option value="">Selecione o setor</option>
          {setores.map((setor) => (
            <option key={setor.id} value={setor.id}>{setor.descricao}</option>
          ))}
        </Select>
      </InputArea>

      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default FormEmpresa;
