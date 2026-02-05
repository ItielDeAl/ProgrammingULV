import conectar from "../dbConect.js";

async function eliminarAlumno() {
    const db = await conectar();
    const Alumnos = db.collection("Usuarios");

    const resultado = await Alumnos.deleteMany({
        Estatus: true
    });
    console.log("Eliminado: ", resultado.deletedCount);
    process.exit();
}

eliminarAlumno();