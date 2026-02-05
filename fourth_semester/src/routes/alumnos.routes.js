import { Router } from "express";
import {createDB} from '../db/mongo.js'
import { ObjectId } from "mongodb";
const router = Router();

//Crear un nuevo recurso (Hacia la bd) "C"
router.post("/alumnos", async (req, res)=>{
    const db = await createDB();
    const alumnos = db.collection('Usuarios');

    //console.log(req);
    
    const alumno = req.body;

    const resultado = await alumnos.insertOne(alumno);

    res.status(201).json({
        message: "Alumno creado",
        id: resultado.insertedId
    });
})


//Buscar
router.get("/alumnos", async (req,res)=>{
    const db = await createDB();
    const alumnos = db.collection('Usuarios');

    const alumno = req.body;
    const lista = await alumnos.find().toArray();

    res.status(200).json(lista);    
});


//Buscar por id
router.get("/alumnos/:id", async (req,res)=>{
    const db = await createDB();
    const alumnos = db.collection('Usuarios');
    
    const lista = await alumnos.findOne({ _id: new ObjectId(req.params.id) });

    res.status(200).json(lista);    
});



//Actualizar
router.put("/alumnos/:id", async (req,res)=>{
    const db = await createDB();
    const alumnos = db.collection('Usuarios');
    
    const resultado = await alumnos.updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: req.body }
    );
    res.json({
        message: "Alumno Actualizado",
        modificados: resultado.modifiedCount
    })

});



//Eliminar 
router.delete("/alumnos/:id", async (req,res)=>{
    const db = await createDB();
    const alumnos = db.collection('Usuarios');
    
    const resultado = await alumnos.deleteOne(
        { _id: new ObjectId(req.params.id) });
    
        res.json({
        message: "Alumno Eliminado",
        modificados: resultado.deletedCount
    })

});

export default router;