import conectar from "../dbConect.js";

async function actualizarAlumnos() {
    const db = await conectar();
    const Alumnos = db.collection("Usuarios");

    const resultado = await Alumnos.updateOne(
        {Nombre: "Moises"},
        {$set: {Estatus: true }}
    );
    console.log("Documento modificado", resultado.modifiedCount);
    process.exit();
}

actualizarAlumnos();