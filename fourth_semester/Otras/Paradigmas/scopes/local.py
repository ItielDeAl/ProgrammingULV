
def saludar():
    """deuelve el texto previamente definido dentro de ella el cual es una veriable local"""
    mensaje = "Hola, mundo"  # Variable local
    return mensaje


print(saludar.__doc__)


def sumar(a, b):
    """
    Suma de dos digitos.

    Necesita dos numero serparados por comas para realizar la 
    operación (suma), para ver el resultado es necesario
    utilizarun print porque unicamente devuelte el resultado, 
    no lo imprime
    """
    resultado = a + b  # Variable local
    return resultado

print(sumar.__doc__)


def contador():
    '''Aumenta lavariable local definida previamente'''
    numero = 10
    numero += 5
    print(numero)

print(contador.__doc__)
