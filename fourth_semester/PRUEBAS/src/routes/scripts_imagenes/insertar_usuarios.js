const total = 5000000;
const lote = 10000;

const categorias = ["premium", "normal", "vip"];
const paises = ["México", "Colombia", "Argentina", "España", "Chile"];

let docs = [];

for (let i = 1; i <= total; i++) {

    docs.push({
        nombre: "Usuario " + i,
        edad: Math.floor(Math.random() * 60) + 18,
        email: "usuario" + i + "@correo.com",
        categoria: categorias[Math.floor(Math.random() * categorias.length)],
        pais: paises[Math.floor(Math.random() * paises.length)],
        seguidores: Math.floor(Math.random() * 100000),
        bio: "Usuario interesado en tecnología y bases de datos",
        fechaRegistro: new Date(
            2020 + Math.floor(Math.random() * 6),
            Math.floor(Math.random() * 12),
            Math.floor(Math.random() * 28)
        )
    })

    
    if (docs.length === lote) {

        db.Usuarios.insertMany(docs);

        print("Insertados: " + i);

        docs = [];
    }
}