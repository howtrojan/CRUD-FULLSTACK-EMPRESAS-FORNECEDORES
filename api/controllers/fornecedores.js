import { db } from "../db.js";

export const getFornecedores = (_, res) => {
    const q = "SELECT * FROM fornecedores";

    db.query(q, (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data);
    })
}

export const addFornecedores = (req, res) => {
    const q =
      "INSERT INTO fornecedores(`nome_fornecedor`, `endereco`, `telefone`) VALUES(?)";
  
    const values = [
      req.body.nomeFornecedor,
      req.body.endereco,
      req.body.telefone,      
    ];
  
    db.query(q, [values], (err) => {
      if (err) return res.json(err);
  
      return res.status(200).json("Fornecedor Criado com Sucesso");
    });
  };
  
  export const updateFornecedores = (req, res) => {
    const q =
      "UPDATE fornecedores SET `nome_fornecedor` = ?, `endereco` = ?, `telefone` = ? WHERE `id` = ?";
  
    const values = [
      req.body.nomeFornecedor,
      req.body.endereco,
      req.body.telefone,      
    ];
  
    db.query(q, [...values, req.params.id], (err) => {
      if (err) return res.json(err);
  
      return res.status(200).json("Fornecedor atualizado com sucesso.");
    });
  };
  
  export const deleteFornecedores = (req, res) => {
    const q = "DELETE FROM fornecedores WHERE `id` = ?";
  
    db.query(q, [req.params.id_empresa], (err) => {
      if (err) return res.json(err);
  
      return res.status(200).json("Fornecedor deletado com sucesso.");
    });
  };