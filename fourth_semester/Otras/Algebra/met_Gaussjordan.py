import ast

#!Metodos a utilizar 
def imprimir_matriz(M):
    for fila in M:
        print(" ".join(f"{elemento:^5.1f}" for elemento in fila))
    print(f'{"="*70}\n')
#Metodo de Gausss 

#! Solicitamos las dos Matrices a utilizar
print(f'{"="*70}\n')
print('Solucion de Ecuaciones lineales por el metodo de Gauss Jordan')

#?Se utliza una libreria para convertirlo a una matriz 
try:
    A = ast.literal_eval(input('Ingresa la matriz A= '))
    B = ast.literal_eval(input('Ingresa la matriz B= '))
    mA = len(A)
    nA = len(A[0])
    nB = len(B)
    mB = len(B[0])
except Exception:
    print("Error en el formato de las matrices")
    exit()

if nA != nB:
    print("Las columnas deben de ser del mismo tamaño")
    exit()

C = []

#Concatenación de A + B, como si fuera el disp() 
for i in range(len(A)):
    fila_aumentada = A[i] + B[i]
    C.append(fila_aumentada)
    

#*saber el tamaño de la matriz aumentada
m = len(C)
n = len(C[0])

print(f"Dimensiones: {m}x{n}")

#Imprimir la matriz aumentada
imprimir_matriz(C)

#? Matriz escalonada (Método de Gauss)
for k in range(m):
    # Hacer 1 el pivote dividiendo toda la fila entre C[k][k]
    pivote = C[k][k]
    
    for j in range(n):
        C[k][j] = C[k][j] / pivote

    # Hacer ceros debajo del pivote
    for i in range(0, m):
        if i!= k:
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