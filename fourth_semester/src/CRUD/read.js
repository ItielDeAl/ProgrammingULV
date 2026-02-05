import conectar from "../db/mongo.js";

async function leerAlumnos() {
    const db = await conectar();
    const Alumnos = db.collection("Usuarios");

    const lista = await Alumnos.find().toArray();
    console.log(lista);
    console.log("\n");
    
    const activos = await Alumnos.find({Estatus: "Activo"}).toArray();
    console.log(activos);
    console.log("\n");
    const mayores = await Alumnos.find({Edad: {$gt: 20}}).toArray();
    console.log(mayores);
    console.log("\n");
    
    process.exit();
}
leerAlumnos();