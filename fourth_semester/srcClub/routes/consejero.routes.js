import { Router } from "express";
import {createDB} from '../db/mongo.js'
import { ObjectId } from "mongodb";
const router = Router();


//* Crear ================================================

//Crear Unidades
router.post("/ClubAventurerosCons", async (req, res)=>{
    const db = await createDB();
    const club = db.collection('Consejeros');

    //console.log(req);
    
    const Unidad = req.body;

    const resultado = await club.insertOne(Unidad);

    res.status(201).json({
        message: "Consejero Creado",
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

// Buscar Dsitrido por ID
router.get("/ClubAventurerosCons/:id", async (req,res)=>{
    const db = await createDB();
    const Club = db.collection('Consejeros');
    
    const lista = await Club.findOne({ _id: new ObjectId(req.params.id) });

    res.status(200).json(lista);    
});

//todo Actualizar=========================================

//Actualizar
router.put("/ClubAventurerosCons/:id", async (req,res)=>{
    const db = await createDB();
    const Club = db.collection('Consejeros');
    
    const resultado = await Club.updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: req.body }
    );
    res.json({
        message: "Consejero Actualizado",
        modificados: resultado.modifiedCount
    })

});
//? Eliminar =============================================
router.delete("/ClubAventurerosCons/:id", async (req,res)=>{
    const db = await createDB();
    const Club = db.collection('Consejeros');
    
    const resultado = await Club.deleteOne(
        { _id: new ObjectId(req.params.id) });
    
        res.json({
        message: "Consejero Eliminado",
        modificados: resultado.deletedCount
    })

});
export default router;