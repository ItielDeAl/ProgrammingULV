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

'''#! fUNCIONES CON 1 PARAMETRO """"""""""""""""""""""""""""""""""""""""""""""""

def inscribir_equipo(equipo: str):
    print(f'Equipo: {equipo}, Bienvenido')

def calcular_salario(horas: int | float):
    print(f'Su pago es: ${horas*75}')

def asignar_calificacion(calificacion: int | float):
    print(f'Su calificación de Paradigmas es: {calificacion}')

#? Funciones con dos parametros =======================================================
def comprar_auto(nombre: str, auto: str):
    print(f'Felicidades {nombre}, por adquirir el {auto}.')

def procesar_promedio(nombremateria: str, calificacion: str):
    print(f'Su calificación de {nombremateria} es: {calificacion}')

def presentar_alumno(nombre: str, apellido: str):
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
inscribir_equipo("Real Madrid")
calcular_salario(30)
asignar_calificacion(9.5)


print('*'*75)
print('2 parametros\n')
comprar_auto('Itiel Alvarez', 'Duster Orox')
procesar_promedio('Paradigmas', 6.5)
presentar_alumno('Itiel', 'Alvarez')


print('-'*75)
print('Función de orden superior\n')
ejecutar_equipo(inscribir_equipo)
ejecutar_salario(calcular_salario)
ejecutar_calificacion(asignar_calificacion)

print('+'*75)
print('Variable como argumento\n')
inscribir_equipo(equipo_a_incribir)
calcular_salario(horas_trabajadas)
asignar_calificacion(calificacion_obtenida)'''



#* PRACTICAS CON RETURN
def saludar_p(nombre):
    print(f'HOLA {nombre}')

def saludar_r(nombre):
    return f'HOLA {nombre}'

nombre_p = saludar_p("Itiel")
nombre_r = saludar_r("Itiel")


print(nombre_p)
print(type(nombre_p))

print(nombre_r)
print(type(nombre_r))

print('+'*50)

def calcular_salario_p(horas: int | float):
    print(f'Su pago es: ${horas*75}')

def calcular_salario_r(horas: int | float):
    return f'Su pago es: ${horas*75}'

salario_p = calcular_salario_p(5)
salario_r = calcular_salario_r(5)

print(salario_p)
print(type(salario_p))

print(salario_r)
print(type(salario_r))

print('+'*50)


def presentar_alumno_p(nombre: str, apellido: str):
    print(f'Alumno presente: {nombre} {apellido}')

def presentar_alumno_r(nombre: str, apellido: str):
    return f'Alumno presente: {nombre} {apellido}'

alumno_p = presentar_alumno_p('Itiel', 'Alvarez')
alumno_r = presentar_alumno_r('Itiel', 'Alvarez')

print(alumno_p)
print(type(alumno_p))

print(alumno_r)
print(type(alumno_r))
print('+'*50)
