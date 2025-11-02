#definimos la clase
class Zapato:
    def __init__(self,talla):
        self.talla = talla
#definimos metodo    
    def mostrar_talla(self):
        return f'El zapato es número {self.talla}'
#creación de objeto
zapato1 = Zapato(25)
#ejecución del metodo
print(zapato1.mostrar_talla())