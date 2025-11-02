#clase
class Ofertas:
    def __init__(self, nombre, costo, descuento = 15):
        self.nombre = nombre
        self.costo = costo
        self.descuento = descuento

#metodo
    def discount(self):
        precio = self.costo-self.descuento
        return f"El costo con descuento de {self.nombre} es = ${precio}"
    
#instancia
producto = Ofertas(input("Ingresa el nombre de el producto"),int(input("Ingresa el costo")))

mensaje = producto.discount()

print(mensaje)