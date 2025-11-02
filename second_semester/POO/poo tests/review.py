#1 = Creacion de clases

#2 = Definir atributos
#3 = Creacion de metodos
#4 = Objetos

class Salon:
    def __init__(self,alumnos): #Inicia en atributo
        self.alumnos = alumnos 
def inscritos(self):
        return f"El salon tiene al alumno {self.alumnos}" #metodo


class Materias:
    def __init__(self, nombre): #Inicia en atributo
        self.nombre = nombre
def imprimir(self):
        return f"La materia del primer parcial ser {self.nombre}" #metodo


class Equipos:
    def __init__(self,liga): #Inicia en atributo
        self.liga = liga
def clasificados(self):
        return f"el equipo viene de la liga {self.liga}" #metodo


##Objetos
objeto1 = Salon("Marcos")
objeto2 = Materias("POO")
objeto3 = Equipos("Liga A")

