import { Router } from "express";
import {createDB} from '../db/mongo.js'
import { ObjectId } from "mongodb";
const router = Router();


//* Crear ================================================

//Crear Especialidad
router.post("/ClubAventurerosEsp", async (req, res)=>{
    const db = await createDB();
    const club = db.collection('Especialidades');

    //console.log(req);
    
    const especialidad = req.body;

    const resultado = await club.insertOne(especialidad);

    res.status(201).json({
        message: "especialidad Creada",
        id: resultado.insertedId
    });
})

//! Leer==================================================

//Buscar Especialidad
router.get("/ClubAventurerosEsp", async (req,res)=>{
    const db = await createDB();
    const Club = db.collection('Especialidades');

    const lista = await Club.find().toArray();

    res.status(200).json(lista);    
});

router.get("/ClubAventurerosEsp/:id", async (req,res)=>{
    const db = await createDB();
    const Club = db.collection('Especialidades');
    
    const lista = await Club.findOne({ _id: new ObjectId(req.params.id) });

    res.status(200).json(lista);    
});

//todo Actualizar=========================================
//Actualizar
router.put("/ClubAventurerosEsp/:id", async (req,res)=>{
    const db = await createDB();
    const Club = db.collection('Especialidades');
    
    const resultado = await Club.updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: req.body }
    );
    res.json({
        message: "Especialidad Actualizada",
        modificados: resultado.modifiedCount
    })

});

//? Eliminar =============================================
router.delete("/ClubAventurerosEsp/:id", async (req,res)=>{
    const db = await createDB();
    const Club = db.collection('Especialidades');
    
    const resultado = await Club.deleteOne(
        { _id: new ObjectId(req.params.id) });
    
        res.json({
        message: "Especialidad Eliminada",
        modificados: resultado.deletedCount
    })

});
export default router;