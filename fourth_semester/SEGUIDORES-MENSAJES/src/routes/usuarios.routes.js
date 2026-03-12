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

//MOSTRAR USUARIOS
app.get("/usuarios", async (req, res)=>{
    const db = await createDB();
    const usuario = db.collection("usuarios");

    const lista = await usuario.find().toArray();

    res.status(200).json(lista);

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


//MOSTRAR PERSONAS A LAS QUE SIGO
app.get("/seguir/:id", async (req, res)=>{

    const db = await createDB();
    const id = req.params.id;

    const usuario = await db.collection("usuarios").findOne({
        _id: new ObjectId(id)
    });

    const resultado = await db.collection("usuarios")
        .find({ _id: { $in: usuario.siguiendo } })
        .toArray();

    res.json(resultado);

});
export default app;