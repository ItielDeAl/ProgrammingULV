from sympy import *

def main():

    # Recibir datos
    def recibir_datos():
        """
        La función «recibir_datos» solicita al usuario que introduzca las coordenadas de dos puntos en una recta,
        asegurándose de que las coordenadas x no sean iguales entre sí para evitar la división por cero.
        :return: La función `recibir_datos` devuelve cuatro números de punto flotante: `x1`, `y1`,
        `x2` y `y2`, que son las coordenadas de dos puntos en una recta.
        """
        while True:
            # Pedir los puntos de la recta
            x1, y1 = input("Ingrese x1 y y1 separados por coma: ").split(",")
            x2, y2 = input("Ingrese x2 y y2 separados por coma: ").split(",")
            
            # verificar que los puntos no causen divicion entre 0
            if x1 == x2:
                print("Error, las coordenadas en x no debe ser igualesles")
            else:
                # Convertimos a float antes de retornarlos
                return float(x1), float(y1), float(x2), float(y2)
    
    puntos = recibir_datos()
    
    def formar_matriz_compuesta(puntos):
        """
        La función `formar_matriz_compuesta` crea una matriz compuesta utilizando variables simbólicas y
        puntos dados.
        
        :param puntos: El parámetro `puntos` parece ser una lista que contiene cuatro elementos. La función
        `formar_matriz_compuesta` toma esta lista como entrada y construye una matriz compuesta utilizando los
        elementos de la lista. Los elementos de la lista se utilizan para rellenar la matriz junto con
        las variables simbólicas `x`
        :return: La función `formar_matriz_compuesta` devuelve una matriz 3x3 `c` que se forma
        utilizando la entrada `puntos`. A continuación, la matriz `c` se imprime y se devuelve como resultado de la
        función.
        """
        
        # Declarar las variables simbolicas
        x, y = symbols('x y')

        # matriz compuesta
        c = Matrix([[x, y, 1],[puntos[0], puntos[1], 1],[puntos[2], puntos[3], 1]])

        # Mostrar la matriz compuesta
        print("---------- Matriz compuesta ----------")
        pprint(c)
        return c    
    
    c = formar_matriz_compuesta(puntos)
    
    def recortar_matriz(matriz, fila_del, columna_del):
        """
        TLa función `recortar_matriz` toma una matriz, elimina una fila y una columna especificadas y devuelve
        la matriz modificada.
        
        :param matriz: La función `recortar_matriz` toma una matriz como entrada y elimina de ella una
        fila y una columna especificadas. Los parámetros `fila_del` y `columna_del` indican la fila y la columna
        que se van a eliminar de la matriz, respectivamente
        :param fila_del: El parámetro `fila_del` de la función `recortar_matriz` representa el índice
        de la fila que se desea eliminar de la matriz. Esta función toma una matriz como entrada y
        elimina la fila y la columna especificadas de la matriz
        :param columna_del: El parámetro `columna_del` de la función `recortar_matriz` representa el
        índice de la columna que se desea eliminar de la matriz. Cuando se invoca esta función,
        eliminará la columna especificada de la matriz y devolverá la matriz modificada sin esa
        columna
        :return: La función `recortar_matriz` devuelve una versión modificada de la matriz de entrada
        `matriz` tras eliminar la fila especificada `fila_del` y la columna `columna_del`.
        """
        
        matriz0 = matriz.copy()
        matriz0.row_del(fila_del)
        matriz0.col_del(columna_del)
        
        return matriz0
    
    def determinate(matriz):
        """
        La función `determinate` calcula el determinante de una matriz de 2x2.
        
        :param matriz: Implementar una función para calcular el determinante
        de una matriz 2x2. El código actual comprueba si la matriz de entrada tiene 2 filas y, a continuación,
        calcula el determinante utilizando la fórmula para una matriz 2x2
        :return: el determinante de una matriz 2x2.
        """
        
        if matriz.rows == 2:
            return (matriz[0, 0] * matriz[1,1]) - (matriz[0, 1] * matriz[1, 0])

    
    def multiplicar(matriz, j = 0):
        """
        Esta función de Python calcula el determinante de una matriz mediante la expansión de cofactores a lo largo de la
        primera fila.
        
        :param matriz: El código es una función para calcular el determinante
        de una matriz utilizando el método de expansión de Laplace. La función `multiplicar` toma una matriz como
        entrada y calcula el determinante mediante el cálculo recursivo de los determinantes de las submatrices
        :param j: El parámetro `j` de la función `multiplicar` se utiliza como índice inicial para la
        iteración sobre las columnas de la matriz. Por defecto, se establece en 0, lo que significa que la iteración
        comenzará desde la primera columna (índice 0) de la matriz. Sin embargo, el valor por defecto es 0 (opcional)
        :return: La función `multiplicar` devuelve el valor total calculado a partir de la matriz de entrada
        y el índice de columna especificado `j`. La función calcula el determinante de las
        submatrices obtenidas al eliminar la primera fila y una columna específica de la matriz de entrada. A continuación,
        multiplica el determinante de cada submatriz por la variable correspondiente (x, y o 1) y
        el signo (-1)^j
        """
        
        # Declarar las variables simbolicas
        x, y = symbols('x y')
        
        ntotal = 0
        
        
        for j in range(matriz.cols):
            
            # signos 
            sig = (-1)**j
            
            # obtener matriz
            subMatriz = recortar_matriz(matriz, 0, j)
            
            # Sacar el determinante
            subDeterminante = determinate(subMatriz)
            
            variable_actual = x if j == 0 else y if j == 1 else 1
            
            escalar = sig * variable_actual
            
            pprint(MatMul(escalar, subMatriz, evaluate=False))
            
            if j == 0:
                ntotal += sig * x * subDeterminante
            elif j == 1:
                ntotal += sig * y * subDeterminante
            else:
                ntotal += sig * 1 * subDeterminante
            
        return ntotal
    
    ecuacion = multiplicar(c)
    print("---------- Ecuacion por determinante ----------")
    pprint(ecuacion)

main()