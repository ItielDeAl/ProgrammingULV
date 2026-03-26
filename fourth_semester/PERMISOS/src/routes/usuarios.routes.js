import { Router } from "express";
import { getDB, toObjectId } from "../db.js";

const router = Router();

//CONSULTAR USUARIOS
router.get("/usuarios", async(req, res)=>{
    try {
        const db = getDB();
        const usuarios = await db.collection('Usuarios').find({}).toArray();
        res.json({ok: true, data: usuarios});
    }catch(err){
        next(err);
    }
});

export default router;