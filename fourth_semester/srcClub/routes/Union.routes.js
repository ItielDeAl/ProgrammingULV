import { Router } from "express";
import {createDB} from '../db/mongo.js'
import { ObjectId } from "mongodb";
const router = Router();


//* Crear ================================================

//Crear union
router.post("/ClubAventurerosUnio", async (req, res)=>{
    const db = await createDB();
    const club = db.collection('Uniones');

    //console.log(req);
    
    const union = req.body;

    const resultado = await club.insertOne(union);

    res.status(201).json({
        message: "Unión Creada",
        id: resultado.insertedId
    });
})

//! Leer==================================================

//Buscar Union 
router.get("/ClubAventurerosUnio", async (req,res)=>{
    const db = await createDB();
    const Club = db.collection('Uniones');

    const lista = await Club.find().toArray();

    res.status(200).json(lista);    
});

//Buscar por id
router.get("/ClubAventurerosUnio/:id", async (req,res)=>{
    const db = await createDB();
    const Club = db.collection('Uniones');
    
    const lista = await Club.findOne({ _id: new ObjectId(req.params.id) });

    res.status(200).json(lista);    
});



//todo Actualizar=========================================

//Actualizar
router.put("/ClubAventurerosUnio/:id", async (req,res)=>{
    const db = await createDB();
    const Club = db.collection('Uniones');
    
    const resultado = await Club.updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: req.body }
    );
    res.json({
        message: "Union Actualizada",
        modificados: resultado.modifiedCount
    })

});
//? Eliminar =============================================

//Eliminar 
router.delete("/ClubAventurerosUnio/:id", async (req,res)=>{
    const db = await createDB();
    const Club = db.collection('Uniones');
    
    const resultado = await Club.deleteOne(
        { _id: new ObjectId(req.params.id) });
    
        res.json({
        message: "Union Eliminada",
        modificados: resultado.deletedCount
    })

});
export default router;