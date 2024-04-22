import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
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

const FormEmpresa = ({ getEmpresas, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const empresas = ref.current;

      empresas.nome_empresa.value = onEdit.nome_empresa;
      empresas.endereco.value = onEdit.endereco;
      empresas.telefone.value = onEdit.telefone;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const empresas = ref.current;
  
    if (!empresas.nome_empresa.value || !empresas.telefone.value || !empresas.endereco.value) {
      return toast.warn("Preencha todos os campos!");
    }
  
    if (onEdit) {
      await axios
        .put(`http://localhost:8800/empresas/${onEdit.id_empresa}`, {  // Corrigindo a URL do PUT
          nome_empresa: empresas.nome_empresa.value,
          endereco: empresas.endereco.value,
          telefone: empresas.telefone.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ response }) => toast.error(response.data.message)); // Exibindo a mensagem de erro da resposta da API
    } else {
      await axios
        .post("http://localhost:8800/", {
          nome_empresa: empresas.nome_empresa.value,
          endereco: empresas.endereco.value,
          telefone: empresas.telefone.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ response }) => toast.error(response.data.message)); // Exibindo a mensagem de erro da resposta da API
    }
  
    empresas.nome_empresa.value = "";
    empresas.endereco.value = "";
    empresas.telefone.value = "";
  
    setOnEdit(null);
    getEmpresas();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Nome da Empresa</Label>
        <Input name="nome_empresa" />
      </InputArea>
      <InputArea>
        <Label>Endereço</Label>
        <Input name="endereco" />
      </InputArea>
      <InputArea>
        <Label>Telefone</Label>
        <Input name="telefone" />
      </InputArea>

      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default FormEmpresa;
