class Persona:  #nombre
    def __init__(self, nombre, edad): #Atributos
        self.nombre = nombre
        self.edad = edad

    def saludar(self): #metodo
        return f"Hola, me llamo {self.nombre} y tengo {self.edad} años."

persona1 = Persona("Juan", 30) #instasias
mensaje = persona1.saludar()
print(mensaje)

class Arbol:
    pass