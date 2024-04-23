import { db } from "../db.js";

export const getSetor = (_, res) => {
    const q = "SELECT * FROM setor";

    db.query(q, (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data);
    })
}

export const addSetor = (req, res) => {
    const q =
      "INSERT INTO setor(`descricao`) VALUES(?)";
  
    const values = [
      req.body.descricao,           
    ];
  
    db.query(q, [values], (err) => {
      if (err) return res.json(err);
  
      return res.status(200).json("Setor Criado com Sucesso");
    });
  };
  
  export const updateSetor = (req, res) => {
    const q =
      "UPDATE setor SET `descricao` = ?";
  
    const values = [
      req.body.descricao,          
    ];
  
    db.query(q, [...values, req.params.id], (err) => {
      if (err) return res.json(err);
  
      return res.status(200).json("Setor atualizado com sucesso.");
    });
  };
  
  export const deleteSetor = (req, res) => {
    const q = "DELETE FROM setor WHERE `id` = ?";
  
    db.query(q, [req.params.id], (err) => {
      if (err) return res.json(err);
  
      return res.status(200).json("Setor deletado com sucesso.");
    });
  };