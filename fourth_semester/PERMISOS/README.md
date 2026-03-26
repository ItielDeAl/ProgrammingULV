# Seguridad en MongoDB en Windows

Para activar la seguridad debemos ubicarnos en la carpeta donde se intalo MongoDB, y abrir como administrador el archivo *mongo.cfg*.
Ya que estamos dendro vamos a ubicar la sección de seguridad y activarlo de la siguiente manera:

#Segurity
security:
  authorization: enabled

Guardamos y reiniciamos el servicio de MongoDB.
ahora entramos a mongosh y accedemos a la db admin, dentro de ella crearemos el usuario de administrador. con el siguiente comando: 
*db.createUser({user: "adminUser", pwd: "contraseña!", roles: [{ role: "userAdminAnyDatabase", db: "admin" }]});*

Ahora al entrar a Mongo compas nos pedira la autenticación, pero en mongosh solicitad la autenticación al realizar alguna operación mostrara el siguiente mensaje:
**MongoServerError[Unauthorized]: Command listDatabases requires authentication**

Para aceder a mongosh necesitamos utilizar comandos extras de autenticación: 

*mongosh -u nameUser -p password --authenticationDatabase namedb*

Esto se utiliza sin importal el usuario.

para hacer las pruebas creamos a dos usuarios uno de solo lectura, y otro de lectura y escritura, para verificar sus permisos.

<table>
<tr>
<td>
<p align="center">Solo lectura</p>

<img src="evidencias/read.1.png" width="400">
<p align="center">Solo lectura</p>
<p>Al ejecutar comandos de insertar nos avisará que no se puede realizar la acción por que no tenemos permisos</p>

<img src="evidencias/read.2.png" width="400">

</td>

<td>

<img src="index1.png" width="400">

<p align="center">Lectura y escritura</p>

</td>
</tr>
</table>

Indice Compuesto
<table>
<tr>
<td>

<img src="2.png" width="400">

<p align="center">Consulta sin índice</p>

</td>

<td>

<img src="Index2.png" width="400">

<p align="center">Consulta con índice</p>

</td>
</tr>
</table>

Indice Busqueda de texto
<table>
<tr>
<td>

<img src="3.png" width="400">

<p align="center">Consulta con índice</p>

</td>

<td>

<img src="index3.png" width="400">

<p align="center">Consulta con índice</p>

</td>
</tr>
</table>