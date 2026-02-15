import { Router } from "express";
import {createDB} from '../db/mongo.js'
import { ObjectId } from "mongodb";
const router = Router();


//* Crear ================================================

//Crear Actividades
router.post("/ClubAventurerosActi", async (req, res)=>{
    const db = await createDB();
    const club = db.collection('Actividades');

    //console.log(req);
    
    const Actividad = req.body;

    const resultado = await club.insertOne(Actividad);

    res.status(201).json({
        message: "Actividad Creada",
        id: resultado.insertedId
    });
})

//! Leer==================================================

//Buscar Actividad
router.get("/ClubAventurerosActi", async (req,res)=>{
    const db = await createDB();
    const Club = db.collection('Actividades');

    const lista = await Club.find().toArray();

    res.status(200).json(lista);    
});


router.get("/ClubAventurerosActi/:id", async (req,res)=>{
    const db = await createDB();
    const Club = db.collection('Actividades');
    
    const lista = await Club.findOne({ _id: new ObjectId(req.params.id) });

    res.status(200).json(lista);    
});

//todo Actualizar=========================================
//Actualizar
router.put("/ClubAventurerosActi/:id", async (req,res)=>{
    const db = await createDB();
    const Club = db.collection('Actividades');
    
    const resultado = await Club.updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: req.body }
    );
    res.json({
        message: "Actividad Actualizada",
        modificados: resultado.modifiedCount
    })

});

//? Eliminar =============================================
router.delete("/ClubAventurerosActi/:id", async (req,res)=>{
    const db = await createDB();
    const Club = db.collection('Actividades');
    
    const resultado = await Club.deleteOne(
        { _id: new ObjectId(req.params.id) });
    
        res.json({
        message: "Actividad eliminada",
        modificados: resultado.deletedCount
    })

});
export default router;
