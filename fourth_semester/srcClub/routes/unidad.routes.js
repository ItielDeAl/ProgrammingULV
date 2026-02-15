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

//Buscar Unidad
router.get("/ClubAventurerosUnid", async (req,res)=>{
    const db = await createDB();
    const Club = db.collection('Unidades');

    const lista = await Club.find().toArray();

    res.status(200).json(lista);    
});

router.get("/ClubAventurerosUnid/:id", async (req,res)=>{
    const db = await createDB();
    const Club = db.collection('Unidades');
    
    const lista = await Club.findOne({ _id: new ObjectId(req.params.id) });

    res.status(200).json(lista);    
});

//todo Actualizar=========================================
//Actualizar
router.put("/ClubAventurerosUnid/:id", async (req,res)=>{
    const db = await createDB();
    const Club = db.collection('Unidades');
    
    const resultado = await Club.updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: req.body }
    );
    res.json({
        message: "Unidad Actualizada",
        modificados: resultado.modifiedCount
    })

});

//? Eliminar =============================================
router.delete("/ClubAventurerosUnid/:id", async (req,res)=>{
    const db = await createDB();
    const Club = db.collection('Unidades');
    
    const resultado = await Club.deleteOne(
        { _id: new ObjectId(req.params.id) });
    
        res.json({
        message: "Unidad Eliminada",
        modificados: resultado.deletedCount
    })

});
export default router;