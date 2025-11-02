""""
#definicion de una clase uppercamelcase
class Persona:
    #Constructor
    def __init__(self, nombre):
        self.nombre = nombre

#creacion de un objeto
persona1 = Persona(input("name1"))
persona2 = Persona(input("name2"))
print (persona1.nombre, persona2.nombre)
"""
"""
 #Definimos la clase
class Concesionaria:
    #constructor
    def __init__(self, color, marca):
        self.color = color
        self.marca = marca

#Creacion de objeto
auto1 = Concesionaria(input("ingrese su color1") , '- Ford')
auto2 = Concesionaria(input("ingrese su color2") , '- Mercedes')
auto3 = Concesionaria(input("ingrese su color3") , '- Nissan')

#imprimir atributos
print(auto1.color, auto1.marca)
print(auto2.color, auto2.marca)
print(auto3.color, auto3.marca)
"""
"""
 #Definimos la clase
class Fruteria:
    #constructor
    def __init__(self, precio, tamaño, tipo):
        self.precio = precio
        self.tamaño = tamaño
        self.tipo = tipo
#Creacion de objeto
cebolla = Fruteria(input("ingrese precio unitario de la cebolla $") , 'pequeña', 'verdura')
melon = Fruteria(input("ingrese precio unitario del melon $") , 'grande', 'fruta')
naranja = Fruteria(input("ingrese precio unitario de la naranja $") , 'pequeña', 'fruta')

#imprimir atributos
print('cebolla $' + cebolla.precio + 'c/u', cebolla.tamaño, cebolla.tipo)
print('melon $' + melon.precio + 'c/u', melon.tamaño, melon.tipo)
print('naranja $' + naranja.precio + 'c/u', naranja.tamaño, naranja.tipo)
"""
""""
 #Definimos la clase
class Boletos:
    #constructor
    def __init__(self, precio, fila, zona):
        self.precio = precio
        self.fila = fila
        self.zona = zona

#Creacion de objeto
boleto1 = Boletos("0", "no asignado", "general")
boleto2 = Boletos("300", "4-6", "ORO")
boleto3 = Boletos("1000", "1-3", "VIP")

#Imprimir atributos
print("precio $" + boleto1.precio, ", fila " + boleto1.fila, ", zona " + boleto1.zona)
print("precio $" + boleto2.precio, ", fila " + boleto2.fila, ", zona " + boleto2.zona)
print("precio $" + boleto3.precio, ", fila " + boleto3.fila, ", zona " + boleto3.zona)


class Reposteria:
  
    def __init__(self, precio, nombre):
        self.precio = precio
        self.nombre = nombre
        

postre1 = Reposteria("$15", "Rebananda de pay")
postre2 = Reposteria("$10", "cupcake")
postre3 = Reposteria("$100", "Pay completo")


print(postre1.nombre, postre1.precio)
print(postre2.nombre, postre2.precio)
print(postre3.nombre, postre3.precio)
"""

class Salon:
    def __init__(self, nombre): #Inicia en atributo
        self.nombre = nombre

    def __str__(self):  #Permite imprimir la instancia. 
        return f"{self.nombre}" #f-string
#(cadena de formato)
#permite incluir expresiones dentro de cadenas de texto
        

# Lista para almacenar objetos de la clase Salon
personas = []

# Número de objetos a crear
num_personas = int(input("Ingrese la cantidad de alumnos "))

# Ciclo para agregar objetos a la lista
for i in range(num_personas):
    nombre = input(f"Ingrese el nombre de la persona {i + 1}: ")

#Crea el ejemplar
    persona = Salon(nombre) 

#Agrega el ejemplar a la lista de personas
    personas.append(persona)

# imprimir personas agregadas
print("Salon integrado por:")
for persona in personas: #Personas = lista a tomar, persona=ejemplar
    print(persona) 