import { MongoClient, ObjectId } from "mongodb";

let client;
let db;

export async function connectBD(){
    if(db) return db;

    client = new MongoClient(process.env.MONGO_URI);
    await client.connect();

    db = client.db(process.env.DB_NAME);
    await ensureIndexes(db);

    console.log("MongoDB conectado a:", process.env.DB_NAME);
    return db;
}

export function getDB(){
    if(!db) throw new Error("DB no inicializada, llama ConectDB()") 
    return db;
}

export function toObjectId(value, fielName = "id"){
    try{
        return new ObjectId(value);
    } catch (error){
        const err = new Error(`ObjectId invalido para ${fielName}': ${value}`);
        err.status = 400;
        throw err;
    }
}

async function ensureIndexes(db) {
    
}
