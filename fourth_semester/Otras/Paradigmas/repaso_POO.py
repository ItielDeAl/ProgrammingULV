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