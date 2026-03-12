import express from "express";
import usuariosRoutes from "./routes/usuarios.routes.js"
import mensajesRoutes from "./routes/mensajes.routes.js"

const app = express();

app.use(express.json());

app.use("/api",usuariosRoutes)
app.use("/api", mensajesRoutes)

export default app;