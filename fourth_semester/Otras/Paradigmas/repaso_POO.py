#========================= Clase basica===================
class MisionEspacial:
    def __init__(self, nombre, destino, duracion):
        self.nombre = nombre
        self.destino = destino
        self.duracion = duracion

    def mostrar_info(self):
        print(f"Misión: {self.nombre}")
        print(f"Destino: {self.destino}")
        print(f"Duración: {self.duracion} días")


m1 = MisionEspacial("Artemis I", "Luna", 25)
m1.mostrar_info()

#===============================Encapsulamiento===============================
class MisionEspacialEncapsulada:
    def __init__(self, nombre, destino, duracion, presupuesto):
        self.nombre = nombre
        self.destino = destino
        self.duracion = duracion
        self.__presupuesto = presupuesto

    def obtener_presupuesto(self):
        return self.__presupuesto

    def modificar_presupuesto(self, nuevo_presupuesto):
        if nuevo_presupuesto > 0:
            self.__presupuesto = nuevo_presupuesto
        else:
            print("Presupuesto inválido")


m1 = MisionEspacialEncapsulada("Voyager", "Espacio profundo", 3650, 1000000)
print(m1.obtener_presupuesto())
m1.modificar_presupuesto(2000000)
print(m1.obtener_presupuesto())


#=========================Herencia=====================================
class MisionTripulada(MisionEspacial):
    def __init__(self, nombre, destino, duracion, tripulantes):
        super().__init__(nombre, destino, duracion)
        self.tripulantes = tripulantes

    def mostrar_tripulacion(self):
        print(f"Tripulantes: {self.tripulantes}")


m2 = MisionTripulada("Apollo 11", "Luna", 8, 3)
m2.mostrar_tripulacion()

#=========================Polimorfismo==================================
class MisionEspacialPoli:
    def __init__(self, nombre, destino, duracion):
        self.nombre = nombre
        self.destino = destino
        self.duracion = duracion


class MisionTripulada(MisionEspacialPoli):
    def ejecutar_mision(self):
        print(f"La misión {self.nombre} lleva astronautas al {self.destino}")


class MisionNoTripulada(MisionEspacialPoli):
    def ejecutar_mision(self):
        print(f"La misión {self.nombre} envía sondas al {self.destino}")


def iniciar_misiones(misiones):
    for mision in misiones:
        mision.ejecutar_mision()


m1 = MisionTripulada("Apollo 11", "Luna", 8)
m2 = MisionNoTripulada("Voyager 1", "Espacio profundo", 10000)

lista = [m1, m2]
iniciar_misiones(lista)