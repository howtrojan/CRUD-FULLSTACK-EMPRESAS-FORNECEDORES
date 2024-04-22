import express from "express";
import { getFornecedores } from "../controllers/fornecedores.js"

const router = express.Router();

router.get("/", getFornecedores);

export default router;