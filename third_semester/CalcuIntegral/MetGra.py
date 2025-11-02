import matplotlib.pyplot as plt #Grafica de la función
import numpy as np #Arreglos numericos
import sympy as sp #Manipulación simbolica de la función

# Solicitar la función al usuario
y = input('Ingrese la función: ')
x = sp.symbols('x')  # Definir la variable simbólica
f = sp.sympify(y)  # Convertir la entrada del usuario a una función simbólica

# Solicitar los límites de integración y el número de rectángulos
a = float(input('Ingrese el límite inferior a: '))
b = float(input('Ingrese el límite superior b: '))
m = int(input('Ingrese el número de rectángulos de x: '))

# Calcular la integral usando el método de integración simbólica
I = sp.integrate(f, (x, a, b))
print('El valor de la integral simbólica es:', I.evalf())

# Cálculo del ancho del intervalo
h = (b - a) / m
# Crear los puntos x
x_values = np.linspace(a, b, m + 1)

# Inicializar la integral
integral = 0

# Calcular la integral usando el método del trapecio
for i in range(m):
    desc = (x_values[i] + x_values[i + 1]) / 2
    integral += f.subs(x, desc) * h

print('El valor aproximado de la integral es:', integral)

# Graficar la función
# Crear un rango de valores para x para la gráfica
x_plot = np.linspace(a - 1, b + 1, 400)  # Rango extendido para mejor visualización
y_plot = [f.subs(x, val) for val in x_plot]

plt.figure(figsize=(10, 6))
plt.plot(x_plot, y_plot, label=f'f(x) = {y}', color='blue')

# Graficar líneas verticales desde a hasta b
for i in range(m + 1):
    x_line = a + i * h  # Calcular la posición x de la línea
    plt.axvline(x=x_line, color='grey', linewidth=1, ls='--')  # Dibujar la línea vertical

# Configuración de la gráfica
plt.title('Gráfica de la función con líneas verticales')
plt.xlabel('x')
plt.ylabel('f(x)')
plt.axhline(0, color='black', linewidth=0.5, ls='--')
plt.axvline(0, color='black', linewidth=0.5, ls='--')
plt.axvline(b, color='red', linewidth=1, ls='--', label='Límite superior b')
plt.axvline(a, color='green', linewidth=1, ls='--', label='Límite inferior a')

plt.grid()
plt.legend()

# Mostrar la gráfica
plt.show()
