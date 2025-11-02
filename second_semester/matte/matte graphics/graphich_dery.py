import sympy as sp
import numpy as np
import matplotlib.pyplot as plt

# Solicitar la función al usuario
entrada = input("Ingresa la función f(x): (usa 'e' para exponencial y 'sen' para seno)\n")

# Reemplazar 'e' y 'sen' por funciones compatibles con sympy
entrada = entrada.replace("sen", "sin").replace("e", "exp(1)")

# Definir la variable simbólica
x = sp.symbols('x')

# Crear la función simbólica y su derivada
f = sp.sympify(entrada)
f_prime = sp.diff(f, x)

# Convertir a funciones evaluables numéricamente
f_lamb = sp.lambdify(x, f, modules=['numpy'])
f_prime_lamb = sp.lambdify(x, f_prime, modules=['numpy'])

# Método de Newton-Raphson
def newton_raphson(f, f_prime, x0, tol=1e-6, max_iter=50):
    xi = x0
    for i in range(max_iter):
        fxi = f(xi)
        fpxi = f_prime(xi)
        if abs(fpxi) < 1e-12:
            raise ZeroDivisionError("La derivada es cero. Método no puede continuar.")
        xi1 = xi - fxi / fpxi
        if abs(xi1 - xi) < tol:
            return xi1
        xi = xi1
    raise Exception("No se encontró raíz en el número de iteraciones dado.")

# Punto inicial
x0 = float(input("Ingresa el valor inicial x0: "))

# Ejecutar el método
try:
    raiz = newton_raphson(f_lamb, f_prime_lamb, x0)
    print(f"Raíz encontrada: x = {raiz}")
except Exception as e:
    print(str(e))
    raiz = None

# Graficar
x_vals = np.linspace(x0 - 10, x0 + 10, 1000)
y_vals = f_lamb(x_vals)

plt.figure(figsize=(8, 5))
plt.plot(x_vals, y_vals, label=f'f(x) = {entrada}')
plt.axhline(0, color='gray', linestyle='--')
plt.axvline(0, color='gray', linestyle='--')
if raiz is not None:
    plt.plot(raiz, f_lamb(raiz), 'ro', label=f'Raíz aprox: {raiz:.4f}')
plt.title("Método de Newton-Raphson")
plt.xlabel("x")
plt.ylabel("f(x)")
plt.legend()
plt.grid(True)
plt.show()
