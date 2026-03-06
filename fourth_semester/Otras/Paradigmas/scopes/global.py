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
aumentar()
print(contador)
aumentar()
print(contador)



mensaje = "Python"

def cambiar():
    global mensaje
    print(x) 
    mensaje = "Programación en Python"

cambiar()
print(mensaje)