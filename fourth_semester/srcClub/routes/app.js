import express from 'express'
import ClubRoutes from './club.routes.js'
const app = express();

app.use(express.json());

app.use("/api", ClubRoutes);
export default app;