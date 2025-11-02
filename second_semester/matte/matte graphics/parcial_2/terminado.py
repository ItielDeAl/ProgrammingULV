import tkinter as tk
from tkinter import messagebox
import sympy as sp
import numpy as np
import matplotlib.pyplot as plt

# Variable simbólica
x = sp.Symbol('x')

def newton_raphson(x0, y, derivada, tolerancia=1e-6, max_iter = 30):
    iteraciones = 0
    error_absoluto = float('inf')
    resultados = []

    while iteraciones < max_iter and error_absoluto > tolerancia:
        try:
            x1 = x0 - (y.subs(x, x0) / derivada.subs(x, x0))
            error_absoluto = abs(x1 - x0)
            resultados.append((iteraciones, x0, x1, error_absoluto))
            x0 = x1
            iteraciones += 1
            
            if abs(y.subs(x, x1)) < tolerancia:
                break
                
        except ZeroDivisionError:
            return None

    return resultados, x0, iteraciones

def plot_function(y, x_points):
    plt.figure(figsize=(8, 6))
    
    f = sp.lambdify(x, y, 'numpy')
    
    # Generar valores de x para graficar
    x_min = min(x_points) - 2
    x_max = max(x_points) + 2
    x_vals = np.linspace(x_min, x_max, 1000)
    y_vals = f(x_vals)
    
    # Graficar la función
    plt.plot(x_vals, y_vals, 'r-', label='f(x)')
    
    # Graficar puntos de iteración
    y_points = [float(y.subs(x, xi)) for xi in x_points]
    plt.plot(x_points, y_points, 'bo', label='Iteraciones')
    
    plt.axhline(0, color='black', lw=0.5, ls='--')  # Línea horizontal en y=0
    plt.axvline(0, color='black', lw=0.5, ls='--')  # Línea vertical en x=0
    plt.grid(True)
    plt.legend()
    plt.title('Gráfica de la función y puntos de iteración')
    plt.xlabel('x')
    plt.ylabel('f(x)')
    
    # Mostrar la gráfica en una nueva ventana
    plt.show(block=False)

def calcular():
    try:
        # Obtener valores de entrada
        funcion = entrada_funcion.get()
        x0 = float(entrada_aprox.get())
        tolerancia = float(entrada_error.get())
        
        # Crear función y derivada
        y = sp.sympify(funcion)
        derivada = sp.diff(y, x)
        
        # Calcular resultados
        resultado_completo = newton_raphson(x0, y, derivada, tolerancia)
        
        # Limpiar resultados anteriores
        texto_resultados.delete(1.0, tk.END)
        
        if resultado_completo:
            resultados, raiz_final, total_iteraciones = resultado_completo
            # Mostrar resultados en formato de tabla
            texto_resultados.insert(tk.END, "i\tRi\tRi+1\tError\n")
            texto_resultados.insert(tk.END, "-" * 50 + "\n")
            
            # Recopilar puntos de x para graficar
            x_points = []
            for i, r0, r1, error in resultados:
                texto_resultados.insert(tk.END, f"{i}\t{r0:.6f}\t{r1:.6f}\t{error:.6f}\n")
                x_points.extend([r0, r1])
            
            # Graficar función y puntos en una nueva ventana
            plot_function(y, x_points)
            
            # Mostrar mensaje con iteraciones y raíz aproximada
            messagebox.showinfo("Resultado Final", 
                              f"Número total de iteraciones: {total_iteraciones}\n"
                              f"Raíz aproximada: {raiz_final:.6f}")
        else:
            texto_resultados.insert(tk.END, "Error: División por cero")
            
    except Exception as e:
        texto_resultados.delete(1.0, tk.END)
        texto_resultados.insert(tk.END, f"Error: {str(e)}")

# Crear ventana principal
ventana = tk.Tk()
ventana.title("Método de Newton-Raphson")
ventana.geometry("600x600")

# Crear marco de entrada
frame_entrada = tk.Frame(ventana)
frame_entrada.pack(pady=20)

# Nombres y entradas
tk.Label(frame_entrada, text="Función f(x):").grid(row=0, column=0, padx=5, pady=5)
entrada_funcion = tk.Entry(frame_entrada, width=30)
entrada_funcion.grid(row=0, column=1, padx=5, pady=5)

tk.Label(frame_entrada, text="Aproximación inicial:").grid(row=1, column=0, padx=5, pady=5)
entrada_aprox = tk.Entry(frame_entrada, width=30)
entrada_aprox.grid(row=1, column=1, padx=5, pady=5)

tk.Label(frame_entrada, text="Margen de error:").grid(row=2, column=0, padx=5, pady=5)
entrada_error = tk.Entry(frame_entrada, width=30)
entrada_error.grid(row=2, column=1, padx=5, pady=5)

# Botón de calcular
frame_botones = tk.Frame(ventana)
frame_botones.pack(pady=10)

tk.Button(frame_botones, text="Calcular", command=calcular).pack(side=tk.LEFT, padx=5)

# Cuadro de resultados
texto_resultados = tk.Text(ventana, height=15, width=50)
texto_resultados.pack(pady=20)

ventana.mainloop()
