import {MongoClient} from 'mongodb';

const uri = "mongodb://localhost:27017";
const cliente = new MongoClient(uri);

async function conectar() {
    try {
        await cliente.connect ();
        console.log("Conectado a Mongodb");
        
        const db = cliente.db("Pruebas");
        return db;
    } catch (error) {
        console.log("Error de conexion", error);
        
    }
    
}

export default conectar;
