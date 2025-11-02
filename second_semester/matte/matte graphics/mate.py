"""
import math

x=0.867948
y= math.exp(x-1)-(math.sin(x)/x)
yd= math.exp(x-1)-(x*math.cos(x)-math.sin(x)/x)
f=y/yd
r1=x-f
e=x-r1
print(f'r0=  {f}')
print(f'rR+1=  {r1}')
print(f'Error= {e}')
"""
import numpy as np
import matplotlib.pyplot as plt

# Definir la función eta(x)
def eta(x):
    # Usamos np.where para evitar la división por cero
    return np.exp(x - 1) * np.where(x != 0, np.sin(x) / x, 1)

# Crear un rango de valores de x
x_vals = np.linspace(-10, 10, 1000)
y_vals = eta(x_vals)

# Graficar la función
plt.figure(figsize=(8, 5))
plt.plot(x_vals, y_vals, label=r'$\eta(x) = e^{(x-1)} \cdot \frac{\sin(x)}{x}$')
plt.title("Gráfica de y")
plt.xlabel("x")
plt.ylabel("y")
plt.axhline(0, color='gray', linewidth=0.5)
plt.axvline(0, color='gray', linewidth=0.5)
plt.grid(True)
plt.legend()
plt.show()
