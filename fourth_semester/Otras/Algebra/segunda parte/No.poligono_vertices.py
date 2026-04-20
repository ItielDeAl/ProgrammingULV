import numpy as np


def leer_vertices():
    """
    Solicita el número de vértices y sus coordenadas.
    Retorna un arreglo NumPy de tamaño (n,2)
    """
    vertices = []

    n = int(input("Número de vértices del polígono: "))

    for i in range(n):
        print(f"Vértice {i+1}")
        x = float(input("  x: "))
        y = float(input("  y: "))
        vertices.append([x, y])

    return np.array(vertices)


def calcular_area(vertices):
    """
    Calcula el área del polígono con la fórmula de Shoelace
    """
    x = vertices[:, 0]
    y = vertices[:, 1]

    area = 0.5 * abs(np.dot(x, np.roll(y, -1)) - np.dot(y, np.roll(x, -1)))

    return area


def calcular_perimetro(vertices):
    """
    Calcula el perímetro sumando distancias entre vértices consecutivos
    """
    perimetro = 0

    for i in range(len(vertices)):
        punto_actual = vertices[i]
        punto_siguiente = vertices[(i + 1) % len(vertices)]

        distancia = np.linalg.norm(punto_actual - punto_siguiente)
        perimetro += distancia

    return perimetro


while True:

    print("\n--- MENÚ ---")
    print("1. Calcular área del polígono")
    print("2. Calcular perímetro del polígono")
    print("3. Calcular ambos")
    print("4. Salir")

    opcion = input("Selecciona una opción: ")

    if opcion == "1":
        vertices = leer_vertices()
        area = calcular_area(vertices)
        print("Área =", area)

    elif opcion == "2":
        vertices = leer_vertices()
        perimetro = calcular_perimetro(vertices)
        print("Perímetro =", perimetro)

    elif opcion == "3":
        vertices = leer_vertices()
        area = calcular_area(vertices)
        perimetro = calcular_perimetro(vertices)

        print("Área =", area)
        print("Perímetro =", perimetro)

    elif opcion == "4":
        print("Programa finalizado")
        break

    else:
        print("Opción inválida")