import { Router } from "express";
import {createDB} from '../db/mongo.js'
import { ObjectId } from "mongodb";
const router = Router();


//* Crear ================================================

//Crear Plistas
router.post("/ClubAventureroplist", async (req, res)=>{
    const db = await createDB();
    const club = db.collection('Plistas');

    //console.log(req);
    
    const PLista = req.body;

    const resultado = await club.insertOne(PLista);

    res.status(201).json({
        message: "Lista Creada",
        id: resultado.insertedId
    });
})

//! Leer==================================================

//Buscar Pase de lista
router.get("/ClubAventurerosplist", async (req,res)=>{
    const db = await createDB();
    const Club = db.collection('Plistas');

    const lista = await Club.find().toArray();

    res.status(200).json(lista);    
});

//todo Actualizar=========================================

//? Eliminar =============================================

export default router;