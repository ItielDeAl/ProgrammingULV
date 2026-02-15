import { Router } from "express";
import {createDB} from '../db/mongo.js'
import { ObjectId } from "mongodb";
const router = Router();


//* Crear ================================================

//Crear distrito
router.post("/ClubAventurerosDist", async (req, res)=>{
    const db = await createDB();
    const club = db.collection('Distritos');

    //console.log(req);
    
    const distrito = req.body;

    const resultado = await club.insertOne(distrito);

    res.status(201).json({
        message: "Distrito Creado",
        id: resultado.insertedId
    });
})

//! Leer==================================================
//Buscar Distrito
router.get("/ClubAventurerosDist", async (req,res)=>{
    const db = await createDB();
    const Club = db.collection('Distritos');

    const lista = await Club.find().toArray();

    res.status(200).json(lista);    
});

// Buscar Dsitrido por ID
router.get("/ClubAventurerosDist/:id", async (req,res)=>{
    const db = await createDB();
    const Club = db.collection('Distritos');
    
    const lista = await Club.findOne({ _id: new ObjectId(req.params.id) });

    res.status(200).json(lista);    
});

//todo Actualizar=========================================
//Actualizar
router.put("/ClubAventurerosDist/:id", async (req,res)=>{
    const db = await createDB();
    const Club = db.collection('Distritos');
    
    const resultado = await Club.updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: req.body }
    );
    res.json({
        message: "Distrito Actualizado",
        modificados: resultado.modifiedCount
    })

});

//? Eliminar =============================================
router.delete("/ClubAventurerosDist/:id", async (req,res)=>{
    const db = await createDB();
    const Club = db.collection('Distritos');
    
    const resultado = await Club.deleteOne(
        { _id: new ObjectId(req.params.id) });
    
        res.json({
        message: "Distrito Eliminado",
        modificados: resultado.deletedCount
    })

});
export default router;