import express from "express";
import { addEmpresas, deleteEmpresas, getEmpresas, updateEmpresas } from "../controllers/empresas.js"

const router = express.Router();

router.get("/", getEmpresas);

router.post("/", addEmpresas)

router.put("/:id", updateEmpresas)

router.delete("/:id", deleteEmpresas)

export default router;