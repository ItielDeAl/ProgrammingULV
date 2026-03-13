

#! Variable inmutable (error por LEGB)

x = 10

def cambiar():
    """
    Python ve que dentro de modificar() se asigna a x, por lo tanto la considera variable local (L).
    El problema es que intenta usar x antes de asignarla:
    """
    x = x + 5
    print(x)

print(cambiar.__doc__)


#? Variable mutable modificada dentro de función

lista = [1, 2, 3]

def modificar():
    """
    lista se encuentra en el alcance global (G).
    Dentro de la función no se reasigna la variable, solo se modifica su contenido.
    Python encuentra lista siguiendo LEGB:
    Local → Enclosing → Global
    """
    lista.append(4)


print(modificar.__doc__)


#todo  Función anidada (Enclosing) con mutable e inmutable

def externa():
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
    numero = 10
    lista = [1, 2]

    def interna():
        lista.append(3)
        print(numero)

    interna()
    print(lista)

print(externa.__doc__)
