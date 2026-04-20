import numpy as np

def solicitar_vertices():
    """
    Solicita el número de vértices y sus coordenadas.
    Retorna un arreglo NumPy de tamaño (n,2)
    """
    
    vertices = []
    try:
        n = int(input("Número de vértices del polígono: "))
        
        if n>0:
            for i in range(n):
                print(f"Vértice {i+1}")
                x = float(input("  x: "))
                y = float(input("  y: "))
                vertices.append([x, y])
            
            vertices = np.append(vertices, [vertices[0]], axis = 0)
    except:
            print('Error: El numero de vertices debe ser mayor a 0')
    return np.array(vertices), n


def calcular_area(vertices, n):
    """
    Calcula el area del poligono con la formula de Shoelace
    """
    x = vertices[:, 0]
    y = vertices[:, 1]
    
    area = 0
    parte1 = 0 
    parte2 = 0
    print("Metodo de Shoelace")
    for i in range(n):
        print("\n{:^10} {:^1} {:^10} {:^10}".format("x", '*' , "y", f'Total{i+1}'))
        
        parte1 = parte1 + ((x[i] * y[i+1]))
        parte2 = parte2 + ((x[i+1] * y[i]))
        
        #print(f'{x[i]} * {y[i+1]}: {parte1}')
        #print(f'{(x[i+1])} * {y[i]}: {parte2}')
        
        print("{:^10} {:^1} {:^10} {:<10}".format(str(x[i]),'*', str(y[i+1]),parte1))
        print("{:^10} {:^1} {:^10} {:<10}".format(str(x[i+1]),'*', str(y[i]), parte2))
    
    area = (abs(parte1-parte2))/2

    print("\nTotal area =", area)


def calcular_perimetro(vertices, n):
    """
    Calcula el perimetro sumando distancias entre vertices consecutivos
    """
    x = vertices[:, 0]
    y = vertices[:, 1]

    perimetro = 0
    

    for i in range(n):
        punto = np.sqrt(((x[i+1]-x[i])**2)+((y[i+1]-y[i])**2))
        perimetro = perimetro + punto 

        print("\n{:^15} {:^15} {:^15}".format("Punto1", "Punto2", f"Distancia{i+1}"))
        print("{:<15} {:<15} {:<15}".format(str(f'({x[i]} , {(y[i])})'), str(f'({x[i+1]} , {(y[i+1])})'), punto))

    print("\nTotal perimetro =", perimetro)


while True:

    print("\n--- MENÚ ---")
    print("1. Calcular área del polígono")
    print("2. Calcular perímetro del polígono")
    print("3. Calcular ambos")
    print("4. Salir")

    opcion = input("Selecciona una opción: ")

    if opcion == "1":
        try: 
            vertices, n = solicitar_vertices()
            calcular_area(vertices, n)
        except:
            print('Error de calculo')

    elif opcion == "2":
        try:    
            vertices, n = solicitar_vertices()
            perimetro = calcular_perimetro(vertices, n)

        except:
            print('Error de calculo')
    elif opcion == "3":
        try:
            vertices, n = solicitar_vertices()
            area = calcular_area(vertices, n)
            perimetro = calcular_perimetro(vertices, n)

        except:
            print('Error de calculo')

    elif opcion == "4":
        print("\nPrograma finalizado")
        break

    else:
        print("Opción inválida")