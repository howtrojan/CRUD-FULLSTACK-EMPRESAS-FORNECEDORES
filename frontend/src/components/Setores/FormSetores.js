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

const FormSetores = ({ getSetor, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const setores = ref.current;

      setores.descricao.value = onEdit.descricao;     
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const setores = ref.current;
  
    if (!setores.descricao.value) {
      return toast.warn("Preencha o campo!");
    }
  
    if (onEdit) {
      await axios
        .put(`http://localhost:8800/setores/${onEdit.id}`, {  
        descricao: setores.descricao.value,          
        })
        .then(({ data }) => toast.success(data))
        .catch(({ response }) => toast.error(response.data.message)); 
    } else {
      await axios
        .post("http://localhost:8800/setores/", {
          descricao: setores.descricao.value,          
        })
        .then(({ data }) => toast.success(data))
        .catch(({ response }) => toast.error(response.data.message)); 
    }
  
    setores.descricao.value = "";
  
  
    setOnEdit(null);
    getSetor();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Descrição</Label>
        <Input name="descricao" />
      </InputArea>
      

      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default FormSetores;
