import express from "express";
import movimientosroutes from "./routes/movimientos.routes.js"

const app = express();

app.use(express.json());

app.use("/api",movimientosroutes)

export default app;