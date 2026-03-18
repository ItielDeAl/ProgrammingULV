import express from "express";
import { createDB } from "../db.js";

const app = express();
app.use(express.json());


// CONSULTA CATEGORIA Y SEGUIDORES
app.get("/categoria", async (req, res) => {

    const db = await createDB();

    const categoria = req.body.categoria;

    const usuarios = await db.collection("Usuarios").find({ categoria: categoria }).sort({ seguidores: -1 }).limit(50).toArray();

    res.json(usuarios);
});


// CONSULTA DE FILTRO Y EDAD
app.post("/filtro", async (req, res) => {

    const db = await createDB();

    const pais = req.body.pais;
    const edad = req.body.edad;

    const usuarios = await db.collection("Usuarios").find({ pais: pais, edad: { $gt: edad } }).limit(50).toArray();

    res.json(usuarios);
});


// BUSQUEDA DE TEXTO
app.post("/buscar", async (req, res) => {

    const db = await createDB();

    const texto = req.body.q;

    const usuarios = await db.collection("Usuarios").find({ $text: { $search: texto } }).limit(50).toArray();

    res.json(usuarios);
});

export default app;