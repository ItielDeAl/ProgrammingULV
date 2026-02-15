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

// Buscar A sociación Mision por ID
router.get("/ClubAventurerosAso/:id", async (req,res)=>{
    const db = await createDB();
    const Club = db.collection('Asociaciones');
    
    const lista = await Club.findOne({ _id: new ObjectId(req.params.id) });

    res.status(200).json(lista);    
});


//todo Actualizar=========================================

//Actualizar
router.put("/ClubAventurerosAso/:id", async (req,res)=>{
    const db = await createDB();
    const Club = db.collection('Asociaciones');
    
    const resultado = await Club.updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: req.body }
    );
    res.json({
        message: "Aociación/Mision Actualizada",
        modificados: resultado.modifiedCount
    })

});
//? Eliminar =============================================
router.delete("/ClubAventurerosAso/:id", async (req,res)=>{
    const db = await createDB();
    const Club = db.collection('Asociaciones');
    
    const resultado = await Club.deleteOne(
        { _id: new ObjectId(req.params.id) });
    
        res.json({
        message: "Asociación/Misión Eliminada",
        modificados: resultado.deletedCount
    })

});
export default router;