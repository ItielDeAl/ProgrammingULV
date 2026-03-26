import { Router } from "express";
import { getDB } from "../db.js";


console.log("Router usuarios cargado");

const router = Router();

router.get("/", async (req, res, next) => {
    try {
        const db = getDB();

        const usuarios = await db
            .collection("Usuarios")
            .find({})
            .toArray();

        res.json({
            ok: true,
            data: usuarios
        });

    } catch (err) {
        next(err);
    }
});

router.get("/test", (req, res) => {
    res.send("ruta funcionando");
});

export default router;