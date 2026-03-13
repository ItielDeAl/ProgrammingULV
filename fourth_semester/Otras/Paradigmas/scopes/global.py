x = 100  # Variable global

def mostrar():
    """Necesita la variable global definida previamente"""
    print(x)

print(mostrar.__doc__)


contador = 0  # Variable global


def aumentar():
    """
    Aumento de la variable

    Toma lavariableque ya estaba definida y alejecutar la funcion
    aumentara en uno su valor, si umportar su numero
    """
    global contador
    contador += 1

print(aumentar.__doc__)



mensaje = "Python"

def cambiar():
    """Cambia el texto de la variable global"""
    global mensaje
    print(x) 
    mensaje = "Programación en Python"


print(cambiar.__doc__)