import express from "express";
import { createDB } from "../db.js";
import { ObjectId } from "mongodb";

const app = express();
app.use(express.json());

// CREAR USUARIO
app.post("/usuarios", async (req,res)=>{

    const db = await createDB();

    const usuario = {
        nombre: req.body.nombre,
        correo: req.body.Correo,
        edad: req.body.edad,
        pais: req.body.pais,
        siguiendo: []
    }

    const resultado = await db.collection("usuarios").insertOne(usuario);

    res.json(resultado);
});

// SEGUIR USUARIO (referencing)
app.post("/seguir", async (req,res)=>{

    const db = await createDB();

    const {usuarioId, seguirId} = req.body;

    await db.collection("usuarios").updateOne(
        {_id: new ObjectId(usuarioId)},
        {$addToSet: {siguiendo: new ObjectId(seguirId)}}
    );

    res.json({mensaje:"Ahora sigues a este usuario"});
});

// DEJAR DE SEGUIR
app.delete("/seguir", async (req,res)=>{

    const db = await createDB();

    const {usuarioId, seguirId} = req.body;

    await db.collection("usuarios").updateOne(
        {_id: new ObjectId(usuarioId)},
        {$pull: {siguiendo: new ObjectId(seguirId)}}
    );

    res.json({mensaje:"Dejaste de seguir al usuario"});
});

// ENVIAR MENSAJE (embedding)
app.post("/mensaje", async (req,res)=>{

    const db = await createDB();

    const {remitente, receptor, texto, adjuntos} = req.body;

    const mensaje = {
        remitente: new ObjectId(remitente),
        receptor: new ObjectId(receptor),
        texto,
        adjuntos,
        fecha: new Date()
    }

    const resultado = await db.collection("mensajes").insertOne(mensaje);

    res.json(resultado);
});

// MENSAJES RECIBIDOS
app.get("/mensajes/:id", async (req,res)=>{

    const db = await createDB();

    const usuarioId = req.params.id;

    const mensajes = await db.collection("mensajes")
        .find({receptor: new ObjectId(usuarioId)})
        .toArray();

    res.json(mensajes);
});

export default app;