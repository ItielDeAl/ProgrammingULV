

#! Variable inmutable (error por LEGB)

x = 10

def modificar():
    x = x + 5
    print(x)

modificar()

"""
Python ve que dentro de modificar() se asigna a x, por lo tanto la considera variable local (L).
El problema es que intenta usar x antes de asignarla:
"""

#? Variable mutable modificada dentro de función

lista = [1, 2, 3]

def modificar():
    lista.append(4)

modificar()
print(lista)

"""
lista se encuentra en el alcance global (G).
Dentro de la función no se reasigna la variable, solo se modifica su contenido.
Python encuentra lista siguiendo LEGB:
Local → Enclosing → Global
"""

#todo  Función anidada (Enclosing) con mutable e inmutable

def externa():
    numero = 10
    lista = [1, 2]

    def interna():
        lista.append(3)
        print(numero)

    interna()
    print(lista)

externa()

"""
numero y lista están en el alcance Enclosing (E).
La función interna() busca variables así:
Local → Enclosing → Global → Built-in
Resultados:
numero → encontrado en Enclosing → se imprime 10
lista.append(3) → modifica el objeto mutable
La lista cambia a:
[1, 2, 3]
"""