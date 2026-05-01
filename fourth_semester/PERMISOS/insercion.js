import { MongoClient } from "mongodb";
import { faker } from "@faker-js/faker";

const uri = "mongodb://adminUser:AdminPassword123!@localhost:27017/Permisos?authSource=admin&tls=true&tlsCAFile=C:/ca.pem";
const client = new MongoClient(uri);

async function generarDatos() {
  try {
    await client.connect();
    console.log("Conectado a MongoDB");

    const db = client.db("empresa");
    const collection = db.collection("ventas");

    // Limpiar colección 
    await collection.deleteMany({});
    console.log("Colección limpiada");

    const categorias = ["Electrónica", "Ropa", "Hogar", "Deportes"];
    const productos = ["Laptop", "Mouse", "Teclado", "Monitor", "Audífonos"];

    const batchSize = 5000;
    let batch = [];

    console.time("Tiempo total de inserción");

    for (let i = 1; i <= 1000000; i++) {
      const documento = {
        cliente: {
          nombre: faker.person.fullName(),
          email: faker.internet.email()
        },
        producto: productos[Math.floor(Math.random() * productos.length)],
        categoria: categorias[Math.floor(Math.random() * categorias.length)],
        cantidad: Math.floor(Math.random() * 5) + 1,
        precioUnitario: parseFloat((Math.random() * 2000).toFixed(2)),
        fechaVenta: faker.date.between({
          from: "2022-01-01",
          to: "2026-05-05"
        })
      };

      batch.push(documento);

      if (batch.length === batchSize) {
        await collection.insertMany(batch);
        batch = [];

        if (i % 50000 === 0) {
          console.log(`Insertados: ${i}`);
        }
      }
    }

    // Insertar lo restante
    if (batch.length > 0) {
      await collection.insertMany(batch);
    }

    console.timeEnd("Tiempo total de inserción");
    console.log("Datos generados correctamente");

  } catch (error) {
    console.error("Error:", error);
  } finally {
    await client.close();
    console.log("Conexión cerrada");
  }
}

generarDatos();