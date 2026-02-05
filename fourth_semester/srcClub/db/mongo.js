import {MongoClient} from 'mongodb';

const uri = "mongodb://localhost:27017";
const cliente = new MongoClient(uri);

let db = null;
export async function createDB() {
    if(db) return db;
    await cliente.connect();
    console.log("Conectado a Mongodb Aventureros");

    db = cliente.db("ClubAventureros");
    return db;    
}