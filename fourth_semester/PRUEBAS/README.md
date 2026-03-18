<h1 align="center">Optimización de Consultas en MongoDB usando Índices</h1>

<p align="center">
Proyecto de análisis del impacto de los índices en el rendimiento de consultas utilizando MongoDB, Express y MongoDB Compass.
</p>

# Objetivo

El objetivo de este proyecto es analizar cómo los **índices en MongoDB** afectan el rendimiento de las consultas cuando se utilizan grandes volúmenes de datos.

Para ello se creó una colección con **5,000,000 documentos** y se realizaron consultas **antes y después de crear índices**, midiendo los tiempos de ejecución.

<h2>Evidencia de la inscerción de datos</h2>

<p align="center">
  <img src="inserción.png" width="400">
</p>

# Colección utilizada: **Usuarios**
Campos utilizados:
- categoria
- seguidores
- pais
- edad
- bi

# Indices creados
Con los siguientes indices se realizaron las pruebas con explain("executionStats") para realizar el analisis y comparación de los tiempos, las evidencias ellos se encuentran al final de el documento

## Comparación
| Consulta | Sin índice | Doc.Exa |Con índice | Doc.Exa  |
|--------|--------|--------|--------|--------|
| Categoria + Seguidores | 8.23 s | 5000000 | 7 s | 1666969 |
| Pais + Edad | 3.66 s | 5000000 | 2.18 s | 783179 |
| Búsqueda de texto | Error | 0 | 12.54 s | 5000000 |
### Simple:
db.Usuarios.createIndex({categoria:1, seguidores:-1})
### Compuesto:
db.Usuarios.createIndex({pais:1, edad:1})
### Texto:
db.Usuarios.createIndex({bio:"text"})