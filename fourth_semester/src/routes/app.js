import express from 'express'
import alumnosRoute from './alumnos.routes.js'
const app = express();

app.use(express.json());

app.use("/api", alumnosRoute);
export default app;