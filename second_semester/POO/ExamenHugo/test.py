#Examen Hugo
#deinimos clase
Class Animal: 
#definimos atributos
    def __init__(self, salvaje, agresivo):
        self.salvaje = salvaje
        self.agresivo = agresivo
#definimos metodo  
    def saludar(self):
        return r'El {self.salvaje} es un animal {self.agresivo}'
#definimos instancias
animal 1 = Animal("Leon", feroz)
mensaje = animal1.saludar()
print(mensaje)
