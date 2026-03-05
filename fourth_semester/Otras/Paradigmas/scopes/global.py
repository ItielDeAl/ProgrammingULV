x = 100  # Variable global

def mostrar():
    print(x)

mostrar()


contador = 0  # Variable global


def aumentar():
    global contador
    contador += 1

aumentar()
print(contador)



mensaje = "Python"

def cambiar():
    global mensaje
    mensaje = "Programación en Python"

cambiar()
print(mensaje)