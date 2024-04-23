import express from "express";
import { addSetor, deleteSetor, getSetor, updateSetor } from "../controllers/setor.js"

const router = express.Router();

router.get("/", getSetor);

router.post("/", addSetor)

router.put("/:id", updateSetor)

router.delete("/:id", deleteSetor)

export default router;