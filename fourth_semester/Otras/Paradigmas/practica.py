"""
from datetime import datetime
from decimal import Decimal
tipos = {
    "text": "hola",
    "number": 5,
    "number2": 1.5,
    "bolean": True,
    "listas": ['POO', 'Algebra', 12345, 'POO'],
    "tupla": ("IP", 10502137, "IP"),
    "conjuntos": {10, 20,30, 10, 25, 20},
    "diccionario": {"Nombre": "Itiel", "Carrera": "IDS"},
    "complejo": 5+7j,
    "bits": b"mi nombre es Itiel",
    "valor":  None,
    "Hora": datetime.now(),
    "Rango": range(1, 10),
    "fijo": frozenset([1, 2, 3]),
    "bits_mutables": bytearray(b"Hola"),
    "presicion": Decimal('10.00')
}




for clave, valor in tipos.items():
    print(f"El tipo de valor de {clave} ({valor}) es: {type(valor)}")
"""

#Escribe un programa que use input para pedirle al usuario su nombre y luego darle la bienvenida.
nombre = input("Ingresa tu nombre: ")
print(f"Bienvenido {nombre}\n")

#Escribe un programa para pedirle al usuario el número de horas y la tarifa por hora para calcular el salario bruto.

horas = float(input("Ingresa las horas: "))
tarifa = float(input("Ingresa la tarifa por hora:"))
print(f"Salario = {horas*tarifa} \n")


#
ancho = 17
alto = 12.0

expresion1 = ancho/2
expresion2 = ancho/2.0
expresion3 = alto/3
expresion4 = 1 + 2 * 5
    
print(f"El valor {expresion1} es tipo {type(expresion1)}")
print(f"El valor {expresion2} es tipo {type(expresion2)}")
print(f"El valor {expresion3} es tipo {type(expresion3)}")
print(f"El valor {expresion4} es tipo {type(expresion4)}\n")


#Escribe un programa que le pida al usuario una temperatura en grados Celsius, 
#la convierta a grados Fahrenheit e imprima por pantalla la temperatura convertida.

print("------------------------- WELCOME -------------------------")
celsius = float(input(f"Hola {nombre}\nIngresa la temperatura en grados Celsius\n"))
fahrenheit = celsius*1.8+32

print(f"Temperatura Celsius:  {celsius}\nconvertidad a->\nfahrenheit: {fahrenheit}")