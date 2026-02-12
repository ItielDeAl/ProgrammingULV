import { Router } from "express";
import {createDB} from '../db/mongo.js'
import { ObjectId } from "mongodb";
const router = Router();


//* Crear ================================================

//Crear Asociación/Misión
router.post("/ClubAventurerosAso", async (req, res)=>{
    const db = await createDB();
    const club = db.collection('Asociaciones');

    //console.log(req);
    
    const asociación = req.body;

    const resultado = await club.insertOne(asociación);

    res.status(201).json({
        message: "Asociación/Misión Creada",
        id: resultado.insertedId
    });
})

//! Leer==================================================

//Buscar Asociación Misión
router.get("/ClubAventurerosAso", async (req,res)=>{
    const db = await createDB();
    const Club = db.collection('Asociaciones');

    const lista = await Club.find().toArray();

    res.status(200).json(lista);    
});

//todo Actualizar=========================================

//? Eliminar =============================================

export default router;