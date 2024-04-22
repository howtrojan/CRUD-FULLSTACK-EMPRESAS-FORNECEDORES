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
      req.body.nome_empresa,
      req.body.endereco,
      req.body.telefone,      
    ];
  
    db.query(q, [values], (err) => {
      if (err) return res.json(err);
  
      return res.status(200).json("Empresa Criada com Sucesso");
    });
  };
  
  export const updateEmpresas = (req, res) => {
    const q =
      "UPDATE empresas SET `nome_empresa` = ?, `endereco` = ?, `telefone` = ? WHERE `id_empresa` = ?";
  
    const values = [
      req.body.nome_empresa,
      req.body.endereco,
      req.body.telefone,      
    ];
  
    db.query(q, [...values, req.params.id_empresa], (err) => {
      if (err) return res.json(err);
  
      return res.status(200).json("Empresa atualizada com sucesso.");
    });
  };
  
  export const deleteEmpresas = (req, res) => {
    const q = "DELETE FROM empresas WHERE `id_empresa` = ?";
  
    db.query(q, [req.params.id_empresa], (err, result) => {
      if (err) {
        console.error("Erro ao excluir empresa:", err);
        return res.status(500).json("Erro ao excluir empresa.");
      }
  
      if (result.affectedRows === 0) {
        return res.status(404).json("Empresa não encontrada.");
      }
  
      return res.status(200).json("Empresa excluída com sucesso.");
    });
  };
  