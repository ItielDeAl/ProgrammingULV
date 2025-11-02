'''
#Clase1
class Salon:
    def __init__(self,alumnos, lista): #Inicia en atributo
        self.alumnos = alumnos
        self.lista = lista 
    
    def inscritos(self):
        return f" El salon tiene al alumno {self.alumnos}" #metodo

    def numerodelista(self):
         return f" Su numero de lista es {self.lista}"

objeto1 = Salon("Juan", "2")
objeto2 = Salon("Marcos", "1")

mensaje1 = objeto1.inscritos() + objeto2.inscritos()
mensaje2 = objeto1.numerodelista() + objeto2.numerodelista()

print(mensaje1)
print(mensaje2)   
'''
'''
#clase2
class Ofertas:
    def __init__(self, nombre, costo,):
        self.nombre = nombre
        self.costo = costo

#metodo
    def name(self):
        return f"El producto es {self.nombre} y su costo es ${self.costo}"
    
    def money(self):
       return f" el costo con rebaja es ${self.costo - 10} "
    
#instancia
producto1 = Ofertas('jabon',20)
producto2 = Ofertas('pan',50)

mensaje1 = producto1.name() + producto1.money()
mensaje = producto2.name() + producto2.money()

print(mensaje1)
print(mensaje)
'''

#Clase3
class Pago:
    def __init__(self, cantidad, iva,):
        self.cantidad = cantidad
        self.iva = iva

#metodo
    def monto(self):
        return f"El monto a pagar es {self.cantidad}"
    
    def suma(self):
       return f" mas el iva seria {self.cantidad+((self.cantidad/100)*self.iva)}"
    
#instancia
producto1 = Pago(2020,15)
producto2 = Pago(5050,30)

mensaje1 = producto1.monto() + producto1.suma()
mensaje = producto2.monto() + producto2.suma()

print(mensaje1)
print(mensaje)