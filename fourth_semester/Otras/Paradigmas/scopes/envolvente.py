def externa():
    x = 20  # Variable envolvente

    def interna():
        print(x)  # Accede a la variable de externa

    interna()

externa()


def operacion():
    valor = 5

    def duplicar():
        return valor * 2

    print(duplicar())

operacion()


#! nonlocal permite modificar la variable del alcance envolvente.
def contador():
    numero = 0

    def incrementar():
        nonlocal numero
        numero += 1
        print(numero)

    incrementar()
    incrementar()

contador()