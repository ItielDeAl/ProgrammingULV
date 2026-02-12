# API REST – Sistema de Gestión de Clubes Adventistas

## Descripción
Este proyecto consiste en el desarrollo de una API REST utilizando **Node.js**, **Express** y el paquete oficial **mongodb**, que permite realizar operaciones CRUD (Create, Read, Update, Delete) sobre un sistema de gestión de clubes de la iglesia adventista en una base de datos MongoDB. Teniendo en cuenta la organización:en lo mas alto estará la Union, siguido por asociaciones, distritos iglesias y hasta los clubes.

El sistema respeta la jerarquía institucional:

Unión *→* Asociación *→* Distrito *→* Iglesia *→* Club

La API fue probada utilizando **Postman** para verificar su correcto funcionamiento.

---

## Tecnologías utilizadas
- Node.js
- Express.js
- MongoDB
- Paquete oficial mongodb
- Postman

## Requisitos previos

- Node.js (v14 o superior)
- npm
- MongoDB (local o en MongoDB Atlas)
- Postman (opcional para pruebas)

### Endpoints

Cada colección cuenta con los siguientes métodos:

# Unión
- GET /union
- GET /union/:id
- POST /union
- PUT /union/:id
- DELETE /union/:id

# Asociación
- GET /asociacion
- GET /asociacion/:id
- POST /asociacion
- PUT /asociacion/:id
- DELETE /asociacion/:id

# Distrito
- GET /distrito
- GET /distrito/:id
- POST /distrito
- PUT /distrito/:id
- DELETE /distrito/:id

# Iglesia
- GET /iglesia
- GET /iglesia/:id
- POST /iglesia
- PUT /iglesia/:id
- DELETE /iglesia/:id

# Club
- GET /club
- GET /club/:id
- POST /club
- PUT /club/:id
- DELETE /club/:id

## Pruebas

Las pruebas de cada endpoint fueron realizadas utilizando Postman, verificando:

- Creación de registros
- Consulta de datos
- Actualización
- Eliminación

### Objetivo del proyecto
Desarrollar una API estructurada y escalable que permita administrar digitalmente la organización de clubes adventistas, facilitando la gestión jerárquica y el control de información en cada nivel institucional.

# Autor
Alfred Itiel Delgadillo Alvarez