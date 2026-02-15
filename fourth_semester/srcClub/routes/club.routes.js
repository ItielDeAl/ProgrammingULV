import { Router } from "express";
import {createDB} from '../db/mongo.js'
import { ObjectId } from "mongodb";
const router = Router();


//* Crear ================================================

//Crear Club 
router.post("/ClubAventurerosClub", async (req, res)=>{
    const db = await createDB();
    const club = db.collection('Clubes');

    //console.log(req);
    
    const Club = req.body;

    const resultado = await club.insertOne(Club);

    res.status(201).json({
        message: "Club Creado",
        id: resultado.insertedId
    });
})

//! Leer==================================================

//Buscar Club
router.get("/ClubAventurerosClub", async (req,res)=>{
    const db = await createDB();
    const Club = db.collection('Clubes');

    const lista = await Club.find().toArray();

    res.status(200).json(lista);    
});

// Buscar Dsitrido por ID
router.get("/ClubAventurerosClub/:id", async (req,res)=>{
    const db = await createDB();
    const Club = db.collection('Clubes');
    
    const lista = await Club.findOne({ _id: new ObjectId(req.params.id) });

    res.status(200).json(lista);    
});
//todo Actualizar=========================================

//Actualizar
router.put("/ClubAventurerosClub/:id", async (req,res)=>{
    const db = await createDB();
    const Club = db.collection('Clubes');
    
    const resultado = await Club.updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: req.body }
    );
    res.json({
        message: "Club Actualizado",
        modificados: resultado.modifiedCount
    })

});

//? Eliminar =============================================
router.delete("/ClubAventurerosClub/:id", async (req,res)=>{
    const db = await createDB();
    const Club = db.collection('Clubes');
    
    const resultado = await Club.deleteOne(
        { _id: new ObjectId(req.params.id) });
    
        res.json({
        message: "Club Eliminado",
        modificados: resultado.deletedCount
    })

});
export default router;