import express from "express";
import empRoutes from "./routes/empresas.js";
import fornRoutes from "./routes/fornecedores.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/empresas", empRoutes); 
app.use("/fornecedores", fornRoutes); 

app.listen(8800);
