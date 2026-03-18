import express from "express"
import usuariosRoutes from "./routes/usuarios.routes.js"

const app = express()

app.use(express.json());

app.use("/api", usuariosRoutes)

export default app;
