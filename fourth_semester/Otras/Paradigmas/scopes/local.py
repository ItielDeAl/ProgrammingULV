
def saludar():
    mensaje = "Hola, mundo"  # Variable local
    print(mensaje)

saludar()
print(mensaje) #Error: no existe fuera de la función


def sumar(a, b):
    resultado = a + b  # Variable local
    return resultado

print(resultado)


def contador():
    numero = 10
    numero += 5
    print(numero)

contador()
print(numero) 
