import express from "express";
import { addEmpresas, deleteEmpresas, getEmpresas, updateEmpresas } from "../controllers/empresas.js"

const router = express.Router();

router.get("/", getEmpresas);

router.post("/", addEmpresas)

router.put("/:id_empresa", updateEmpresas)

router.delete("/:id_empresa", deleteEmpresas)

export default router;