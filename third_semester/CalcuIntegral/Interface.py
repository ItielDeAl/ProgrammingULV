import tkinter as tk    #Interfas (GUI)
import numpy as np      #Arreglos numericos
import sympy as sp      #Manipulación simbolica de la función
from matplotlib.figure import Figure        #Grafica de la función
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg

def calcular():
    #Calcular la integral simbolica
    try:
        """
        Valores ingresados por el usuario
        se utilizan los get por que las ventanas lo dan 
        en modo privado
        """
        y_str = entrada_funcion.get()
        a = float(inferior.get())
        b = float(superior.get())
        m = int(rectangulo.get())
        
        # definir la variable y la función.
        x = sp.symbols('x')
        f = sp.sympify(y_str)
        
        # Calcular la integral simbolica
        I = sp.integrate(f, (x, a, b))
        integracion = I.evalf()
        
        # Cuadro de texto
        texto_resultados.delete('1.0', tk.END)
        texto_resultados.insert(tk.END, f"El valor de la integral simbólica es:\n {integracion}\n")
        
        # Calcular los intervalos
        h = (b - a) / m
        x_values = np.linspace(a, b, m + 1)
        
        # Funcion simbolica a numerica
        f_numerica = sp.lambdify(x, f, 'numpy')
        
        integral = (h / 2) * (f_numerica(x_values[0]) + 2 * np.sum(f_numerica(x_values[1:-1])) + f_numerica(x_values[-1]))
        
        texto_resulta2.delete('1.0', tk.END)
        texto_resulta2.insert(tk.END, f"El valor aproximado de la integral es:\n {integral}\n")

    except (ValueError, sp.SympifyError) as e:
        #manejo de errores en la función
        texto_resultados.delete('1.0', tk.END)
        texto_resultados.insert(tk.END, f"Error en la entrada: {e}. Por favor, verifique los valores e ingrese una función válida.")

def graficar():

    #Graficar la funcion y area
    
    try:
        y_str = entrada_funcion.get()
        a = float(inferior.get())
        b = float(superior.get())
        m = int(rectangulo.get())
        
        x = sp.symbols('x')
        f = sp.sympify(y_str)
        
        # Calcular los intervalos
        h = (b - a) / m
        x_values = np.linspace(a, b, m + 1)
        
        # Borrar grafica anterior
        for widget in frame_grafica.winfo_children():
            widget.destroy()

        # Nueva grafica y ejes
        figura = Figure(figsize=(10, 6), dpi=100)
        ejes = figura.add_subplot(111)

        # Función numerica a simbolica para graficar
        f_numerica = sp.lambdify(x, f, 'numpy')

        # Graficación de la curva
        x_plot = np.linspace(a - 1, b + 1, 400)
        y_plot = f_numerica(x_plot)
        ejes.plot(x_plot, y_plot, label=f'f(x) = {y_str}', color='blue')

        #Sombrear debajo de la función
        x_fill = np.linspace(a, b, 200)
        y_fill = f_numerica(x_fill)
        ejes.fill_between(x_fill, y_fill, color='burlywood', alpha=0.5, label='Área de integración')

        # Lineas verticales
        # Graficar líneas verticales desde a hasta b
        for i in range(m + 1):
            x_line = a + i * h  # Calcular la posición x de la línea
            y_line = f.subs(x, x_line)  # Calcular el valor de la función en x_line
            ejes.plot([x_line, x_line], [0, y_line], color='grey', linewidth=1, ls='--')  # Dibujar la línea vertical

        # Etiquetas y titulos
        ejes.set_title('Gráfica de la función')
        ejes.set_xlabel('x')
        ejes.set_ylabel('f(x)')
        
        # ejes
        ejes.axhline(0, color='black', linewidth=1.5)
        ejes.axvline(0, color='black', linewidth=1.5)
        
        #Intervalo a y b
        ejes.axvline(b, color='red', linewidth=1.5, ls='--', label='Límite superior b')
        ejes.axvline(a, color='green', linewidth=1.5, ls='--', label='Límite inferior a')
        
        # cuadriculado
        ejes.grid(True)
        ejes.legend()

        # Mostrar el grafico en la ventana
        canvas = FigureCanvasTkAgg(figura, master=frame_grafica)
        canvas.draw()
        canvas.get_tk_widget().pack(side=tk.TOP, fill=tk.BOTH, expand=1)

    except (ValueError, sp.SympifyError) as e:
        # Error al graficar
        for widget in frame_grafica.winfo_children():
            widget.destroy()
        error_label = tk.Label(frame_grafica, text=f"Error al graficar: {e}\nPor favor, verifique la función y los límites.", fg="red", bg="white")
        error_label.pack(pady=20)
        
def borrar():
    #eliminar los resultados calculados
    texto_resultados.delete('1.0', tk.END)
    texto_resulta2.delete('1.0', tk.END)
    #eliminar grafica
    for widget in frame_grafica.winfo_children():
        widget.destroy()
    

# Ventana principal
ventana = tk.Tk()
ventana.title("Integración Númerica")
ventana.geometry("600x600")
ventana.configure(bg='cadetblue')

frame_entrada = tk.Frame(ventana, bg='cadetblue')
frame_entrada.pack(pady=20)

# Entradas
tk.Label(frame_entrada, text="Función f(x):", bg='cadetblue').grid(row=0, column=0, padx=5, pady=5)
entrada_funcion = tk.Entry(frame_entrada, width=30)
entrada_funcion.grid(row=0, column=1, padx=5, pady=5)
tk.Label(frame_entrada, text="Ejemplo: sin(x), exp(x), x**2 + 2*x", bg='cadetblue', font=("Arial", 8)).grid(row=0, column=2, padx=5, pady=5)

tk.Label(frame_entrada, text="Límite inferior a:", bg='cadetblue').grid(row=1, column=0, padx=5, pady=5)
inferior = tk.Entry(frame_entrada, width=30)
inferior.grid(row=1, column=1, padx=5, pady=5)

tk.Label(frame_entrada, text="Límite superior b:", bg='cadetblue').grid(row=2, column=0, padx=5, pady=5)
superior = tk.Entry(frame_entrada, width=30)
superior.grid(row=2, column=1, padx=5, pady=5)

tk.Label(frame_entrada, text="Número de rectángulos de x:", bg='cadetblue').grid(row=3, column=0, padx=5, pady=5)
rectangulo = tk.Entry(frame_entrada, width=30)
rectangulo.grid(row=3, column=1, padx=5, pady=5)

# Botones
frame_botones = tk.Frame(ventana, bg='cadetblue')
frame_botones.pack(pady=10)

tk.Button(frame_botones, text="Calcular", command=calcular, bg="white", fg="green").pack(side=tk.LEFT, padx=5)
tk.Button(frame_botones, text="Graficar", command=graficar, bg="white", fg="blue").pack(side=tk.LEFT, padx=5)
tk.Button(frame_botones, text="Borrar", command=borrar, bg="white", fg="magenta").pack(side=tk.LEFT, padx=5)
tk.Button(frame_botones, text="Salir", command=ventana.quit, bg="white", fg="red").pack(side=tk.LEFT, padx=5)

# Cuadro de resultados
texto_resultados = tk.Text(ventana, height=2, width=50)
texto_resultados.pack(pady=10)
texto_resulta2 = tk.Text(ventana, height=2, width=50)
texto_resulta2.pack(pady=10)

# Marco de la ventana
frame_grafica = tk.Frame(ventana)
frame_grafica.pack(pady=20)

ventana.mainloop()