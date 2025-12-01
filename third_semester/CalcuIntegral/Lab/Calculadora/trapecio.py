import numpy as np
import sympy as sp
import tkinter as tk 
from tkinter import ttk, messagebox
from matplotlib.figure import Figure
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg
from matplotlib.patches import Polygon 
import sys

# --- CONSTANTES DE ESTILO (VISTA) ---
COLOR_FONDO = '#F0F0F0' 
COLOR_CONTENEDOR = 'white'
COLOR_EXITO = '#28A745' # Verde para Trapecio
COLOR_ERROR = '#DC3545' 

# --- LÓGICA MATEMÁTICA
def calcular_integral_trapecio(funcion_str, a, b, n):
    x = sp.symbols('x')
    try:
        f_simbolica = sp.sympify(funcion_str)
    except Exception:
        raise sp.SympifyError("Función inválida. Asegúrese de usar 'x', sin(x), exp(x), etc.")
    
    if a >= b:
        raise ValueError("El límite inferior 'a' debe ser menor que el límite superior 'b'.")
    if n <= 0:
        raise ValueError("El número de intervalos 'n' debe ser un entero positivo.")
    
    # Integral Simbólica (Valor Exacto)
    I_simbolica = sp.integrate(f_simbolica, (x, a, b))
    exacta = float(I_simbolica.evalf()) 

    # Cálculo Numérico (Regla del Trapecio)
    h = (b - a) / n 
    x_values = np.linspace(a, b, n + 1)
    
    f_numerica = sp.lambdify(x, f_simbolica, 'numpy') 
    y_values = f_numerica(x_values)

    integral_aprox = (h / 2) * (y_values[0] + 2 * np.sum(y_values[1:-1]) + y_values[-1])
    
    # Cálculo del Error
    error_abs = float(abs(exacta - integral_aprox))

    return exacta, integral_aprox, f_numerica, error_abs


# --- APLICACIÓN TKINTER (VISTA Y CONTROLADOR) ---
class TrapecioApp:
    def __init__(self, master):
        # El master es ahora el frame central del MainMenuApp
        self.master = master
        
        # Configuración del frame principal de esta aplicación (para tener padding)
        self.main_frame = ttk.Frame(self.master, padding="15 15 15 15")
        self.main_frame.pack(fill=tk.BOTH, expand=True)

        self.canvas = None
        self.frame_grafica = None
        
        def validar_flotante(P):
            if P in ('', '-'): return True
            try:
                float(P); return True
            except ValueError:
                return False

        def validar_entero(P):
            return P.isdigit() or P == ""

        vcmd_flotante = master.register(validar_flotante)
        self.vcmd_numerico = (vcmd_flotante, '%P') 

        vcmd_int = master.register(validar_entero)
        self.vcmd_entero = (vcmd_int, '%P')

        self.crear_widgets()

    def crear_widgets(self):
        """Define y coloca todos los elementos de la interfaz."""
        
        # --- Título de la Sección ---
        ttk.Label(self.main_frame, text="🟢 Regla del Trapecio", font=("Arial", 16, "bold"), foreground=COLOR_EXITO).pack(pady=(0, 15), anchor='w')

        # --- Frame de Entradas (Grid) ---
        frame_entrada = ttk.Frame(self.main_frame, padding="10 10 10 10", relief=tk.RIDGE)
        frame_entrada.pack(pady=(5, 10), padx=5, fill=tk.X)
        frame_entrada.columnconfigure(1, weight=1) 

        # Fila 1: Función
        ttk.Label(frame_entrada, text="Función f(x):").grid(row=1, column=0, padx=5, pady=5, sticky='w')
        self.entrada_funcion = ttk.Entry(frame_entrada)
        self.entrada_funcion.grid(row=1, column=1, padx=5, pady=5, sticky='ew')
        ttk.Label(frame_entrada, text="Ej: x**2, sin(x)").grid(row=1, column=2, padx=5, pady=5, sticky='w')
        self.entrada_funcion.insert(0, "sin(x) + 2")

        # Fila 2-4: Límites e Intervalos
        ttk.Label(frame_entrada, text="Límite inferior 'a':").grid(row=2, column=0, padx=5, pady=5, sticky='w')
        self.inferior = ttk.Entry(frame_entrada, validate='key', validatecommand=self.vcmd_numerico)
        self.inferior.grid(row=2, column=1, padx=5, pady=5, sticky='ew')
        self.inferior.insert(0, "0")

        ttk.Label(frame_entrada, text="Límite superior 'b':").grid(row=3, column=0, padx=5, pady=5, sticky='w')
        self.superior = ttk.Entry(frame_entrada, validate='key', validatecommand=self.vcmd_numerico)
        self.superior.grid(row=3, column=1, padx=5, pady=5, sticky='ew')
        self.superior.insert(0, "3.1416")

        ttk.Label(frame_entrada, text="Intervalos 'n':").grid(row=4, column=0, padx=5, pady=5, sticky='w')
        self.intervalos = ttk.Entry(frame_entrada, validate='key', validatecommand=self.vcmd_entero) 
        self.intervalos.grid(row=4, column=1, padx=5, pady=5, sticky='ew')
        self.intervalos.insert(0, "6")
        
        # --- Frame de Botones ---
        frame_botones = ttk.Frame(self.main_frame)
        frame_botones.pack(pady=10)

        ttk.Button(frame_botones, text="Calcular", command=self.calcular, style="Accent.TButton").pack(side=tk.LEFT, padx=10)
        ttk.Button(frame_botones, text="Graficar", command=self.graficar).pack(side=tk.LEFT, padx=10)
        ttk.Button(frame_botones, text="Borrar", command=self.borrar).pack(side=tk.LEFT, padx=10)

        # --- Frame de Resultados ---
        frame_resultados = ttk.Frame(self.main_frame, padding="10 10 10 10", relief=tk.RIDGE)
        frame_resultados.pack(pady=(5, 10), padx=5, fill=tk.X)
        
        ttk.Label(frame_resultados, text="Resultados del Cálculo:", font=("Arial", 12, "bold")).grid(row=0, column=0, columnspan=2, sticky='w', pady=(0, 5))
        
        # ... (Widgets de resultados iguales) ...
        ttk.Label(frame_resultados, text="Valor de la integral simbólica (exacta):").grid(row=1, column=0, padx=5, pady=2, sticky='w')
        self.label_simbolica = tk.Label(frame_resultados, text="", bg=COLOR_CONTENEDOR, anchor='w', justify=tk.LEFT, relief=tk.SUNKEN, padx=5, pady=5, font=('Courier', 10), width=60)
        self.label_simbolica.grid(row=1, column=1, padx=5, pady=2, sticky='ew')

        ttk.Label(frame_resultados, text="Valor aproximado (Trapecio):").grid(row=2, column=0, padx=5, pady=2, sticky='w')
        self.label_numerica = tk.Label(frame_resultados, text="", bg=COLOR_CONTENEDOR, anchor='w', justify=tk.LEFT, relief=tk.SUNKEN, padx=5, pady=5, font=('Courier', 10))
        self.label_numerica.grid(row=2, column=1, padx=5, pady=2, sticky='ew')
        
        ttk.Label(frame_resultados, text="Error Absoluto (Exacta - Aprox):").grid(row=3, column=0, padx=5, pady=2, sticky='w')
        self.label_error = tk.Label(frame_resultados, text="", bg=COLOR_CONTENEDOR, anchor='w', justify=tk.LEFT, relief=tk.SUNKEN, padx=5, pady=5, font=('Courier', 10))
        self.label_error.grid(row=3, column=1, padx=5, pady=2, sticky='ew')
        
        frame_resultados.columnconfigure(1, weight=1)

        # --- Marco para la Gráfica ---
        self.frame_grafica = tk.Frame(self.main_frame, bg=COLOR_CONTENEDOR, bd=2, relief=tk.SUNKEN)
        self.frame_grafica.pack(pady=10, fill=tk.BOTH, expand=True, padx=5)

    def obtener_parametros(self):
        # ... (función igual) ...
        y_str = self.entrada_funcion.get().strip()
        a_str = self.inferior.get().strip()
        b_str = self.superior.get().strip()
        n_str = self.intervalos.get().strip()
        
        if not y_str or not a_str or not b_str or not n_str:
            raise ValueError("Todos los campos deben ser completados.")
            
        try:
            a = float(a_str)
            b = float(b_str)
            n = int(n_str)
        except ValueError:
            raise ValueError("Asegúrese de que los límites sean números y los intervalos 'n' un entero positivo.")

        return y_str, a, b, n
        
    def calcular(self):
        self.borrar_resultados()
        try:
            y_str, a, b, n = self.obtener_parametros()
            exacta, aproximada, _, error_abs = calcular_integral_trapecio(y_str, a, b, n)
            
            self.label_simbolica.config(text=f"{exacta:.10f}", fg="black")
            self.label_numerica.config(text=f"{aproximada:.10f}", fg="black")
            self.label_error.config(text=f"{error_abs:.10e}", fg=COLOR_ERROR)
            
        except ValueError as e:
            self.mostrar_error(f"Error de entrada: {e}")
        except sp.SympifyError as e:
            self.mostrar_error(f"Error en la función: {e}. Verifique la sintaxis.")
        except Exception as e:
            self.mostrar_error(f"Error inesperado. Revise la consola.")
            print(f"Error completo en calcular: {e}", file=sys.stderr)


    def graficar(self):
        self.borrar_grafica()
        try:
            y_str, a, b, n = self.obtener_parametros()
            _, _, f_numerica, _ = calcular_integral_trapecio(y_str, a, b, n)

            figura = Figure(figsize=(8, 6), dpi=100)
            ejes = figura.add_subplot(111)

            rango_extra = 0.1 * (b - a) if (b - a) != 0 else 1.0 
            x_plot = np.linspace(a - rango_extra, b + rango_extra, 400)
            y_plot = f_numerica(x_plot)
            ejes.plot(x_plot, y_plot, label=f'f(x) = {y_str}', color='darkblue', linewidth=2)

            x_trapecios = np.linspace(a, b, n + 1)
            y_trapecios = f_numerica(x_trapecios)
            
            ejes.plot(x_trapecios, y_trapecios, 'o', color='red', markersize=4, label='Nodos') 

            for i in range(n):
                verts = [(x_trapecios[i], 0), 
                         (x_trapecios[i+1], 0), 
                         (x_trapecios[i+1], y_trapecios[i+1]), 
                         (x_trapecios[i], y_trapecios[i])]
                
                poly = Polygon(verts, facecolor='green', alpha=0.3, edgecolor='darkgreen', linewidth=1, linestyle='--')
                ejes.add_patch(poly)

            titulo_latex = sp.latex(sp.sympify(y_str), mode='inline') 
            ejes.set_title(f'Grafica')
            ejes.set_xlabel('x')
            ejes.set_ylabel('f(x)')
            ejes.axhline(0, color='black', linewidth=1.0)
            ejes.grid(True, linestyle=':', alpha=0.6)
            ejes.legend()

            self.canvas = FigureCanvasTkAgg(figura, master=self.frame_grafica)
            self.canvas.draw()
            self.canvas.get_tk_widget().pack(side=tk.TOP, fill=tk.BOTH, expand=1)

        except (ValueError, sp.SympifyError) as e:
            self.borrar_grafica()
            self.mostrar_error(f"Error al graficar: {e}\nRevise los datos.", graf=True)
        except Exception as e:
            self.borrar_grafica()
            self.mostrar_error(f"Error inesperado de graficación. Revise la consola.", graf=True)
            print(f"Error de graficación: {e}", file=sys.stderr)


    def mostrar_error(self, msg, graf=False):
        if graf:
            error_label = tk.Label(self.frame_grafica, text=msg, fg=COLOR_ERROR, bg=COLOR_CONTENEDOR, font=("Arial", 11, "bold"))
            error_label.pack(pady=20)
            self.borrar_resultados()
        else:
            self.label_simbolica.config(text=msg, fg=COLOR_ERROR)
            self.label_numerica.config(text="", fg="black")
            self.label_error.config(text="Fallido", fg=COLOR_ERROR)
            self.borrar_grafica()


    def borrar_grafica(self):
        if self.canvas:
            self.canvas.get_tk_widget().destroy()
            self.canvas = None
        for widget in self.frame_grafica.winfo_children():
            widget.destroy()

    def borrar_resultados(self):
        self.label_simbolica.config(text="", fg="black") 
        self.label_numerica.config(text="", fg="black") 
        self.label_error.config(text="", fg="black") 

    def borrar(self):
        self.borrar_resultados()
        self.borrar_grafica()
        
    def destroy(self):
        # Función requerida por MainMenuApp para limpiar el frame.
        self.main_frame.destroy()