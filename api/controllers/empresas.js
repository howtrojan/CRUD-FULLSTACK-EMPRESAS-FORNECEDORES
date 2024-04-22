import { db } from "../db.js";

export const getEmpresas = (_, res) => {
    const q = "SELECT * FROM empresas";

    db.query(q, (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data);
    })
}

export const addEmpresas = (req, res) => {
    const q =
      "INSERT INTO empresas(`nome_empresa`, `endereco`, `telefone`) VALUES(?)";
  
    const values = [
      req.body.nomeEmpresa,
      req.body.endereco,
      req.body.telefone,      
    ];
  
    db.query(q, [values], (err) => {
      if (err) return res.json(err);
  
      return res.status(200).json("Empresa Criada com Sucesso");
    });
  };
  
  export const updateUser = (req, res) => {
    const q =
      "UPDATE empresas SET `nome_empresa` = ?, `endereco` = ?, `telefone` = ? WHERE `id` = ?";
  
    const values = [
      req.body.nome_empresa,
      req.body.endereco,
      req.body.telefone,      
    ];
  
    db.query(q, [...values, req.params.id], (err) => {
      if (err) return res.json(err);
  
      return res.status(200).json("Empresa atualizada com sucesso.");
    });
  };
  
  export const deleteUser = (req, res) => {
    const q = "DELETE FROM empresas WHERE `id` = ?";
  
    db.query(q, [req.params.id_empresa], (err) => {
      if (err) return res.json(err);
  
      return res.status(200).json("Empresa deletada com sucesso.");
    });
  };