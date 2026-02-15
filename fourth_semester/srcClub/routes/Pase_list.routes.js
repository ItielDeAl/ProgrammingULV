import { Router } from "express";
import {createDB} from '../db/mongo.js'
import { ObjectId } from "mongodb";
const router = Router();


//* Crear ================================================

//Crear Plistas
router.post("/ClubAventurerosplist", async (req, res)=>{
    const db = await createDB();
    const club = db.collection('Plistas');

    //console.log(req);
    
    const PLista = req.body;

    const resultado = await club.insertOne(PLista);

    res.status(201).json({
        message: "Plista Creado",
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


router.get("/ClubAventurerosplist/:id", async (req,res)=>{
    const db = await createDB();
    const Club = db.collection('Plistas');
    
    const lista = await Club.findOne({ _id: new ObjectId(req.params.id) });

    res.status(200).json(lista);    
});

//todo Actualizar=========================================
//Actualizar
router.put("/ClubAventurerosplist/:id", async (req,res)=>{
    const db = await createDB();
    const Club = db.collection('Plistas');
    
    const resultado = await Club.updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: req.body }
    );
    res.json({
        message: "Plista Actualizado",
        modificados: resultado.modifiedCount
    })

});

//? Eliminar =============================================
router.delete("/ClubAventurerosplist/:id", async (req,res)=>{
    const db = await createDB();
    const Club = db.collection('Plistas');
    
    const resultado = await Club.deleteOne(
        { _id: new ObjectId(req.params.id) });
    
        res.json({
        message: "Plista o",
        modificados: resultado.deletedCount
    })

});
export default router;
