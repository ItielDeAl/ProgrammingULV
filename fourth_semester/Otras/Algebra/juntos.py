import ast

#! Metodos a utilizar 
def imprimir_matriz(M):
    for fila in M:
        print(" ".join(f"{elemento:^5.1f}" for elemento in fila))
    print(f'{"="*70}\n')

#! función para solicitar la matriz
def pedir_matriz():    
    try:
        A = ast.literal_eval(input('Ingresa la matriz A= '))
        B = ast.literal_eval(input('Ingresa la matriz B= '))

        mA = len(A)
        nA = len(A[0])

        mB = len(B)
        nB = len(B[0])

    except Exception:
        print("Error en el formato de las matrices")
        exit()

    if mA != mB:
        print("Las matrices deben tener el mismo número de filas")
        exit()

    if nB != 1:
        print("La matriz B debe ser un vector columna")
        exit()

    # Concatenar matriz
    C = []

    # Concatenación de A + B
    for i in range(len(A)):
        fila_aumentada = A[i] + B[i]
        C.append(fila_aumentada)
    
    m = len(C)
    n = len(C[0])
    
    imprimir_matriz(C)
    
    return m, C, n




def met_gauss_jordan(m, C, n):
    for k in range(m):
        pivote = C[k][k]

        if pivote == 0:
            print("Error: pivote cero")
            exit()
        
        # Hacer 1 el pivote
        for j in range(n):
            C[k][j] = C[k][j] / pivote

        # Hacer ceros arriba y abajo del pivote
        for i in range(m):
            if i != k:
                factor = C[i][k]
                for j in range(n):
                    C[i][j] = C[i][j] - factor * C[k][j]
                
        print("Matriz escalonada:")
        imprimir_matriz(C)

    # Vector solución (ya directo)
    X = [C[i][m] for i in range(m)]

    print("\nSolución del sistema:")
    for i in range(m):
        print(f"x{i+1} = {X[i]}")
    print(f'{"="*70}\n')    


def met_gauss(m, C, n):
    for k in range(m):
        pivote = C[k][k]

        if pivote == 0:
            print("Error: pivote cero")
            exit()
        
        # Hacer 1 el pivote
        for j in range(n):
            C[k][j] = C[k][j] / pivote

        # Hacer ceros debajo del pivote
        for i in range(m):
            if i > k:
                factor = C[i][k]
                for j in range(n):
                    C[i][j] = C[i][j] - factor * C[k][j]
                
        print("Matriz escalonada:")
        imprimir_matriz(C)

    # Vector solución
    X = [0] * m

    # Sustitución hacia atrás
    for i in range(m-1, -1, -1):
        suma = 0
        for j in range(i+1, m):
            suma += C[i][j] * X[j]
        
        X[i] = C[i][m] - suma

    print("\nSolución del sistema:")
    for i in range(m):
        print(f"x{i+1} = {X[i]}")
    print(f'{"="*70}\n')


menu = """
Metodos disponibles

1. Eliminación Gaussiana
2. Método de Gauss-Jordan
"""
print(menu)
print('='*75)

metodo = int(input('El método que quieres utilizar: '))

if metodo == 1:
    m, C, n = pedir_matriz()
    met_gauss(m, C, n)

elif metodo == 2:
    m, C, n = pedir_matriz()
    met_gauss_jordan(m, C, n)

else:
    print('Ingrese una opción válida')
