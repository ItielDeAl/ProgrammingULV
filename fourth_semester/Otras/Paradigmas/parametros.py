# Preguntas y respuestas ===============================================================================================

'''
1. ¿Las funciones internas necesitan argumentos?
R= Algunas

2. En una función ¿Como se le denomina a un argumento asignado a una variable?
R= Parametro

3. ¿Cuando se evalua el argumento en una función?
R= Antes de que la función sea llamada

4. ¿Cuantas veces se evaluan los argumentos?
R= Una sola vez

5. En la función se tiene una variable como argumento con el nombre POO, pero 
   alejecutar le paso el argumento paradigma, esto afectara? 
R= No, lo unico que podria dañarsera el type.

6. ¿En que tipo de funciones puedo utilizar las reglas de composición?
R= Internas y Externas

7. ¿Las funciones pueden recibir unicamente un parametro?
R= No, eso depende de lo que se necesecite en la función

8. ¿Para que tipo de función se necesita utilizar el def?
R= externas/definidas por el usuario

9. ¿Se puede utilizar una función como argumento de otra?
R= Si

10. Si quiero utilizar una variable como argumento en mi función, ¿Que debo de hacer antes con ella? 
R= Definirla
'''

#! fUNCIONES CON 1 PARAMETRO """"""""""""""""""""""""""""""""""""""""""""""""

def equipos_inscritos(equipo):
    print(f'Equipo: {equipo}, Bienvenido')

def salario_horas(horas):
    print(f'Su pago es: ${horas*75}')

def calificacion_materia(calificacion):
    print(f'Su calificación de Paradigmas es: {calificacion}')

#? Funciones con dos parametros =======================================================
def compra_carro(nombre, auto):
    print(f'Felicidades {nombre}, por adquirir el {auto}.')

def materia_promedio(nombremateria, calificacion):
    print(f'Su calificación de {nombremateria} es: {calificacion}')

def presentar_alumno(nombre, apellido):
    print(f'Alumno presente: {nombre} {apellido}')


#* funciones con un parámetro, el cual sea otra función con un parámetro (funciones de orden superior
#! Se utilizaran las funciones de un parametro
def ejecutar_equipo(funcion):
    funcion("Los Titanes")

def ejecutar_salario(funcion):
    funcion(8)

def ejecutar_calificacion(funcion):
    funcion(95)


#todo funciones con un parámetro que reciban una variable como argumento.
#! Solo se definiran las variables, por que las funciones a utlizar son las de un argumento
equipo_a_incribir = "LA GALAXI"
horas_trabajadas = 56
calificacion_obtenida = 8.7



print('='*75)
print('1 parametro\n')
equipos_inscritos("Real Madrid")
salario_horas(30)
calificacion_materia(9.5)


print('*'*75)
print('2 parametros\n')
compra_carro('Itiel Alvarez', 'Duster Orox')
materia_promedio('Paradigmas', 6.5)
presentar_alumno('Itiel', 'Alvarez')


print('-'*75)
print('Función de orden superior\n')
ejecutar_equipo(equipos_inscritos)
ejecutar_salario(salario_horas)
ejecutar_calificacion(calificacion_materia)

print('+'*75)
print('Variable como argumento\n')
equipos_inscritos(equipo_a_incribir)
salario_horas(horas_trabajadas)
calificacion_materia(calificacion_obtenida)
