"""
num1 = 3
num2 = "10"
num3 = int(num2)
print(sum([num1, num3]))

num4 = 9/9*2
num5 =9/(9*2)
num6 =(9/9)*2
print(num4)
print(num5)
print(num6)


if False:
    print('Flase')
else: print('false')

if not False:
    print('non false')
else: print('NON false')

if 0 or 0j: 
    print('0')
else: print('nada')

if '1' or '':
    print('hello')

"""


"""#Valores, tipos y evaluación
Valores = [
    #Falsy
    False, None, 0, 0.0, 0j, range(0), "", [], (), {}, set(),

    #Truthy
    True, -1, -0.1, range(1), " ", "False", (0,), [0],  {"a:0"}, {0}
    ]
print(f'{"Valor":^11} | {"Tipo":^8} | Evaluación')
print("="*35)

for v in Valores:
    print(f'{repr(v):<11} | {type(v).__name__:<8
    } | {bool(v)}')"""


#! Saber la cantidad de funciones en la versión
'''import builtins

funciones = [f for f in dir(builtins) if callable(getattr(builtins, f))]
print(len(funciones))
import sys
print(sys.version)'''


#todo Practica de funciones:

'''def muestra_estribillo(): 
    print('Hola soy Itiel') 
    print('Feliz dia')

print(muestra_estribillo)
print(type(muestra_estribillo))

def repetir():
    muestra_estribillo()
    muestra_estribillo()

repetir()
'''
#? Funciones de ejemplos

def saludar():
    print('Mi nombre es Itiel')

def edad():
    edad = 17
    return edad #No se imprime solo la retorna

def presentar():
    saludar()
    print(f'Tengo {edad()} años')

saludar()
edad()
presentar()
