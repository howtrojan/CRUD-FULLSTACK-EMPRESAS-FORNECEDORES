import express from "express";
import { getEmpresas } from "../controllers/empresas.js"

const router = express.Router();

router.get("/", getEmpresas);

export default router;