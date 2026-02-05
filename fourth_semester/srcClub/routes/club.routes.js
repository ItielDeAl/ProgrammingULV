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

//Crear Consejeros
router.post("/ClubAventurerosCons", async (req, res)=>{
    const db = await createDB();
    const club = db.collection('Consejeros');

    //console.log(req);
    
    const Consejero = req.body;

    const resultado = await club.insertOne(Consejero);

    res.status(201).json({
        message: "Consejero Creado",
        id: resultado.insertedId
    });
})

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
//Buscar Distrito
router.get("/ClubAventurerosDist", async (req,res)=>{
    const db = await createDB();
    const Club = db.collection('Distritos');

    const lista = await Club.find().toArray();

    res.status(200).json(lista);    
});

//Buscar Club
router.get("/ClubAventurerosClub", async (req,res)=>{
    const db = await createDB();
    const Club = db.collection('Clubes');

    const lista = await Club.find().toArray();

    res.status(200).json(lista);    
});

//Buscar Consejero
router.get("/ClubAventurerosCons", async (req,res)=>{
    const db = await createDB();
    const Club = db.collection('Consejeros');

    const lista = await Club.find().toArray();

    res.status(200).json(lista);    
});

//Buscar Unidad
router.get("/ClubAventurerosUnid", async (req,res)=>{
    const db = await createDB();
    const Club = db.collection('Unidades');

    const lista = await Club.find().toArray();

    res.status(200).json(lista);    
});

//todo Actualizar=========================================

//? Eliminar =============================================

export default router;