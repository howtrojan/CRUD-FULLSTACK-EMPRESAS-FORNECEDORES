import express from "express";
import empRoutes from "./routes/empresas.js";
import setRoutes from "./routes/setor.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/empresas", empRoutes); 
app.use("/setores", setRoutes); 

app.listen(8800);
