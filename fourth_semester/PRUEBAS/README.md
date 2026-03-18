<h1 align="center">Optimización de Consultas en MongoDB usando Índices</h1>

<p align="center">
Proyecto de análisis del impacto de los índices en el rendimiento de consultas utilizando MongoDB, Express y MongoDB Compass.
</p>

# Objetivo

El objetivo de este proyecto es analizar cómo los **índices en MongoDB** afectan el rendimiento de las consultas cuando se utilizan grandes volúmenes de datos.

Para ello se creó una colección con **5,000,000 documentos** y se realizaron consultas **antes y después de crear índices**, midiendo los tiempos de ejecución.

El codigo de la inserción de datos fue ejecutado directamente en **mongosh**, dicho codigo fue genereado por medio de Chatgpt, dentro del promt se le espesifico lo que contrendria el objeto.

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
- bio

# Indices creados
Con los siguientes indices se realizaron las pruebas con explain("executionStats") para realizar el analisis y comparación de los tiempos, las evidencias ellos se encuentran al final de el documento

## Comparación
| Consulta | Sin índice | Doc.Exa |Con índice | Doc.Exa  |
|--------|--------|--------|--------|--------|
| Categoria + Seguidores | 8.23 s | 5000000 | 7 s | 1666969 |
| Pais + Edad | 3.66 s | 5000000 | 2.18 s | 783179 |
| Búsqueda de texto | Error | 0 | 12.54 s | 5000000 |

Al crear los indices la busqueda ya se aplica en todos los documentos, asi como se logra apreciar en los primeros dos, esto hace que tenga una reducción de tiempo de respuesta.

En esta ocación el impacto en el rendimiento, fue minimo habria dos maneras de el porque, la primera es por que se eligieron mal los indices y la segunda es por que aun es baja la cantidad de datos utilizados en las consultas. Y en el caso de las consultas de busqueda de texto no se puede realizar sin el indice.

Los indices que se utilizaron fueron los siguientes:
### Simple:
db.Usuarios.createIndex({categoria:1, seguidores:-1})
### Compuesto:
db.Usuarios.createIndex({pais:1, edad:1})
### Texto:
db.Usuarios.createIndex({bio:"text"})

# Evidencias
## Creación y prueba en mongosh
Indice Simple
<table>
<tr>
<td>

<img src="/1.png" width="400">

<p align="center">Consulta sin índice</p>

</td>

<td>

<img src="/index1.png" width="400">

<p align="center">Consulta con índice</p>

</td>
</tr>
</table>

Indice Compuesto
<table>
<tr>
<td>

<img src="/2.png" width="400">

<p align="center">Consulta sin índice</p>

</td>

<td>

<img src="/index2.png" width="400">

<p align="center">Consulta con índice</p>

</td>
</tr>
</table>

Indice Busqueda de texto
<table>
<tr>
<td>

<img src="/3.png" width="400">

<p align="center">Consulta con índice</p>

</td>

<td>

<img src="/index3.png" width="400">

<p align="center">Consulta con índice</p>

</td>
</tr>
</table>

## Prueba en postman
Indice Simple
<p align="center">
  <img src="/post1.png" width="400">
</p>
Indice Compuesto
<p align="center">
  <img src="/post2.png" width="400">
</p>
Indice Busqueda de texto
<p align="center">
  <img src="/post3.png" width="400">
</p>
