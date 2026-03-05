
def saludo():
    mensaje = "Hola, mundo"  # Variable local
    print(mensaje)

saludo()
# print(mensaje) Error: no existe fuera de la función


def suma(a, b):
    resultado = a + b  # Variable local
    return resultado

print(suma(3, 4))


def contador():
    numero = 10
    numero += 5
    print(numero)

contador()