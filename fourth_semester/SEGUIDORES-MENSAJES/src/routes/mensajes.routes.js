import express from "express";
import { createDB } from "../db.js";
import { ObjectId } from "mongodb";

const app = express();
app.use(express.json());


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


//MODIFICAR MENSAJES 
app.patch("/mensaje/:id", async (req,res)=>{
    const db = await createDB()
    
    const id = req.params.id;
    const { texto } = req.body;

    const resultado = await db.collection("mensajes").updateOne(
        {_id: new ObjectId(id)},
        {$set: {texto: texto}},
    );
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