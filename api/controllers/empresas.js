import { db } from "../db.js";

export const getEmpresas = (_, res) => {
    const q = "SELECT * FROM empresa";

    db.query(q, (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data);
    })
}

export const addEmpresas = (req, res) => {
  const q =
    "INSERT INTO empresa(`razao_social`, `nome_fantasia`, `cnpj`, `id_setor`) VALUES(?, ?, ?, ?)";
  
  const values = [
    req.body.razao_social,
    req.body.nome_fantasia,
    req.body.cnpj,
    req.body.id_setor, 
  ];

  db.query(q, values, (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Empresa Criada com Sucesso");
  });
};

  
  export const updateEmpresas = (req, res) => {
    const q =
      "UPDATE empresa SET `razao_social` = ?, `nome_fantasia` = ?, `cnpj` = ?, `id_setor` = ? WHERE `id` = ?";
  
    const values = [
      req.body.razao_social,
      req.body.nome_fantasia,
      req.body.cnpj,  
      req.body.id_setor,      
    ];
  
    db.query(q, [...values, req.params.id], (err) => {
      if (err) return res.json(err);
  
      return res.status(200).json("Empresa atualizada com sucesso.");
    });
  };
  
  export const deleteEmpresas = (req, res) => {
    const q = "DELETE FROM empresa WHERE `id` = ?";
  
    db.query(q, [req.params.id], (err, result) => {
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
  