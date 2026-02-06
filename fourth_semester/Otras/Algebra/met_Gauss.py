import ast

#Mtodo de Gausss

#! Solicitamos las dos Matrices a utilizar
print('='*70)
print('Solucion de Ecuaciones lineales por el metodo de Gauss')

#?Se utliza una libreria para convertirlo a una matriz 
A = ast.literal_eval(input('Ingresa la matriz A= '))
B = ast.literal_eval(input('Ingresa la matriz B= '))
C = []

#Concatenación de A + B, como si fuera el disp() 
for i in range(len(A)):
    fila_aumentada = A[i] + B[i]
    C.append(fila_aumentada)

#*saber el tamaño de la matriz umentada
m = len(C)
n = len(C[0])

print(f"Dimensiones: {m}x{n}")

#Imprimir la matriz aumentada
for fila in C:
    #! Centra y se le coloca los decimales
    print (" ".join(f"{elemento:^5.1f}" for elemento in fila))
