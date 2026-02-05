import conectar from "../db/mongo.js";

async function crearAlumno() {
    const db = await conectar();
    const Alumnos = db.collection("Usuarios");

    const Alumno = {
        Nombre: "Laura",
        Edad: 18,
        Activo: true
    }

    const resultado = await Alumnos.insertOne(Alumno);
    console.log("Alumno insertado", resultado.insertedId);
 
    process.exit();
}


crearAlumno();

