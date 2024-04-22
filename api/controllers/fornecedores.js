import { db } from "../db.js";

export const getFornecedores = (_, res) => {
    const q = "SELECT * FROM fornecedores";

    db.query(q, (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data);
    })
}