def externa():

    #x = 20  # Variable envolvente

    def interna():
        """Necesita la variable envolvente para trabajar"""
        print(x)

    return interna


funcion = externa()
print(funcion.__doc__)


def operacion():
    """La funcion anidada duplica elvalor que tenemos de nuestra variable"""
    valor = 5

    def duplicar():
        return valor * 2

    print(duplicar())

print(operacion.__doc__)


#! nonlocal permite modificar la variable del alcance envolvente.
def contador():
    """
    Aumento de variables

    Cada vez que mandemos a llamar la función anidada 
    esta aumentara nuestra variable
    """
    numero = 0

    def incrementar():
        nonlocal numero
        numero += 1
        print(numero)

    incrementar()
    incrementar()

print(contador.__doc__)