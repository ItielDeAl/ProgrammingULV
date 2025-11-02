import sympy as sp

# Definir la función y su derivada
x = sp.symbols('x')
y = sp.sympify(input("Ingresa la función f(x): "))
derivada = sp.diff(y, x)

#Iteraciones del método de Newton-Raphson
def newton_raphson(x0, tolerancia = 1e-6, max_iter = 30, error_absoluto = float('inf')):
    iteraciones = 0 # Inicializar el contador de iteraciones

    #mietras el error absoluto sea mayor que la tolerancia y el número de iteraciones no supere el máximo
    if iteraciones < max_iter:
        print("I          rR             rR+1           Error")
        while error_absoluto > tolerancia:
            try:
                x1 = x0 - ((y.subs(x, x0)) / derivada.subs(x, x0)) # Calcular el nuevo valor de x
                error_absoluto = abs(x1 - x0) # Calcular el error absoluto
                print(f"{iteraciones+1} {x0} {x1} {error_absoluto}")
                x0 = x1 # Actualizar el valor de x0
                iteraciones += 1 # Incrementar el contador de iteraciones
            except ZeroDivisionError:
                print("La derivada es cero. No se puede continuar.")
                return None
        if error_absoluto <= tolerancia:
            print(f"Iteraciones: {iteraciones}")
            print(f"Raíz aproximada: {x1}")
        else:
            print("El método no converge.")

# Definir el valor inicial y ejecutar el método
x0 = float(input("Ingresa el valor inicial: ")) # Convertir a float
# Llamar a la función
newton_raphson(x0)