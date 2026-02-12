import { Router } from "express";
import {createDB} from '../db/mongo.js'
import { ObjectId } from "mongodb";
const router = Router();


//* Crear ================================================

//Crear Unidades
router.post("/ClubAventurerosUnid", async (req, res)=>{
    const db = await createDB();
    const club = db.collection('Unidades');

    //console.log(req);
    
    const Unidad = req.body;

    const resultado = await club.insertOne(Unidad);

    res.status(201).json({
        message: "Unidad Creada",
        id: resultado.insertedId
    });
})

//! Leer==================================================

//Buscar Consejero
router.get("/ClubAventurerosCons", async (req,res)=>{
    const db = await createDB();
    const Club = db.collection('Consejeros');

    const lista = await Club.find().toArray();

    res.status(200).json(lista);    
});

//todo Actualizar=========================================

//? Eliminar =============================================

export default router;