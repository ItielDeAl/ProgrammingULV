import tkinter as tk
from tkinter import ttk, messagebox
import ast
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.figure import Figure
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg

class AppMatrices:
    def __init__(self, root):
        self.root = root
        self.root.title("Proyecto Integrador - Fase 1 (Itiel Delgadillo)")
        self.root.geometry("1200x850")
        self.root.configure(bg="#000000")

        # --- BARRA LATERAL ---
        sidebar = tk.Frame(self.root, width=220, bg="#121212", highlightbackground="#333333", highlightthickness=1)
        sidebar.pack(side="left", fill="y")

        tk.Label(sidebar, text="MENU", fg="#00ff88", bg="#121212", 
                 font=("Consolas", 16, "bold")).pack(pady=30)
        
        self.opcion_metodo = tk.StringVar(value="1")
        
        style_rb = {"bg": "#121212", "fg": "#ffffff", "selectcolor": "#000000", 
                    "activebackground": "#121212", "activeforeground": "#00ff88", 
                    "font": ("Segoe UI", 10), "anchor": "w"}

        tk.Radiobutton(sidebar, text="Eliminación Gauss", variable=self.opcion_metodo, 
                       value="1", **style_rb).pack(fill="x", padx=25, pady=10)
        
        tk.Radiobutton(sidebar, text="Gauss-Jordan", variable=self.opcion_metodo, 
                       value="2", **style_rb).pack(fill="x", padx=25, pady=10)

        # --- ÁREA PRINCIPAL ---
        main_frame = tk.Frame(self.root, bg="#000000")
        main_frame.pack(side="right", fill="both", expand=True, padx=25, pady=20)

        input_frame = tk.Frame(main_frame, bg="#000000")
        input_frame.pack(fill="x", pady=10)

        lbl_style = {"bg": "#000000", "fg": "#888888", "font": ("Segoe UI", 9, "bold")}
        entry_style = {"bg": "#1e1e1e", "fg": "#00ff88", "insertbackground": "white", 
                       "relief": "flat", "font": ("Consolas", 11)}

        tk.Label(input_frame, text="MATRIZ A (COEFICIENTES)", **lbl_style).grid(row=0, column=0, sticky="w", padx=5)
        self.ent_a = tk.Entry(input_frame, width=50, **entry_style)
        self.ent_a.insert(0, "[[2, 1, -1], [-3, -1, 2], [-2, 1, 2]]")
        self.ent_a.grid(row=1, column=0, pady=10, padx=5)

        tk.Label(input_frame, text="MATRIZ B", **lbl_style).grid(row=0, column=1, sticky="w", padx=5)
        self.ent_b = tk.Entry(input_frame, width=20, **entry_style)
        self.ent_b.insert(0, "[[8], [-11], [-3]]")
        self.ent_b.grid(row=1, column=1, pady=10, padx=5)

        self.btn_resolver = tk.Button(input_frame, text="EJECUTAR ANÁLISIS", 
                                 command=self.ejecutar, bg="#00ff88", fg="#000000", 
                                 font=("Segoe UI", 9, "bold"), relief="flat", 
                                 activebackground="#00cc6e", cursor="hand2", padx=20)
        self.btn_resolver.grid(row=1, column=2, padx=20, sticky="s", pady=10)

        # Terminal de Procedimiento
        self.txt_pasos = tk.Text(main_frame, height=10, font=("Consolas", 10), 
                                 bg="#0a0a0a", fg="#d1d1d1", relief="flat", 
                                 highlightbackground="#333333", highlightthickness=1)
        self.txt_pasos.pack(fill="x", pady=10)

        # Área de Visualización Gráfica
        self.fig = Figure(figsize=(6, 5), dpi=100, facecolor='#000000')
        self.canvas = FigureCanvasTkAgg(self.fig, master=main_frame)
        self.canvas.get_tk_widget().config(bg="#000000")
        self.canvas.get_tk_widget().pack(fill="both", expand=True)

    def log(self, texto):
        self.txt_pasos.insert(tk.END, " " + texto + "\n")
        self.txt_pasos.see(tk.END)

    def imprimir_matriz_gui(self, M):
        for fila in M:
            linea = "   ".join(f"{elemento:^10.2f}" for elemento in fila)
            self.log(linea)
        self.log("-" * 65)

    def graficar(self, A, B):
        self.fig.clear()
        m, n = len(A), len(A[0])
        
        plt.rcParams['text.color'] = 'white'
        plt.rcParams['axes.labelcolor'] = '#00ff88'
        plt.rcParams['xtick.color'] = '#cccccc'
        plt.rcParams['ytick.color'] = '#cccccc'

        sol_pt = None
        try:
            sol_pt = np.linalg.solve(A, B).flatten()
        except:
            pass

        if m == 2 and n == 2:
            ax = self.fig.add_subplot(111, facecolor='#000000')
            x_v = np.linspace(-10, 10, 100)
            colores = ['#00ff88', '#00bfff']
            for i in range(2):
                if A[i][1] != 0:
                    y_v = (B[i][0] - A[i][0] * x_v) / A[i][1]
                    ax.plot(x_v, y_v, lw=2, color=colores[i], label=f'Ecuación {i+1}')
            
            if sol_pt is not None:
                ax.scatter(sol_pt[0], sol_pt[1], color='#ff3f34', s=100, 
                           edgecolors='white', zorder=5, label='Intersección')
            
            ax.set_title("REPRESENTACIÓN GEOMÉTRICA 2D", color='#00ff88', pad=15)
            ax.set_xlabel("Eje X")
            ax.set_ylabel("Eje Y")
            ax.grid(True, color='#222222')
            ax.legend(facecolor='#121212', edgecolor='#333333')
        
        elif m == 3 and n == 3:
            ax = self.fig.add_subplot(111, projection='3d', facecolor='#000000')
            ax.set_facecolor('#000000')
            
            bx, by = (sol_pt[0], sol_pt[1]) if sol_pt is not None else (0,0)
            x, y = np.meshgrid(np.linspace(bx-5, bx+5, 10), np.linspace(by-5, by+5, 10))
            
            colores = ['#00ff88', '#00bfff', '#ff0055']
            for i in range(3):
                if A[i][2] != 0:
                    z = (B[i][0] - A[i][0]*x - A[i][1]*y) / A[i][2]
                    ax.plot_surface(x, y, z, alpha=0.4, color=colores[i], edgecolor='none')
            
            if sol_pt is not None:
                ax.scatter(sol_pt[0], sol_pt[1], sol_pt[2], color='#ff3f34', s=150, 
                           edgecolors='white', zorder=10, label='Punto Solución')

            ax.set_title("REPRESENTACIÓN GEOMÉTRICA 3D", color='#00ff88', pad=20)
            ax.set_xlabel('Eje X')
            ax.set_ylabel('Eje Y')
            ax.set_zlabel('Eje Z')
            ax.tick_params(axis='z', colors='#cccccc')
            
            ax.xaxis.pane.fill = ax.yaxis.pane.fill = ax.zaxis.pane.fill = False
            ax.xaxis.pane.set_edgecolor('#333333')
            ax.yaxis.pane.set_edgecolor('#333333')
            ax.zaxis.pane.set_edgecolor('#333333')
            ax.legend(facecolor='#121212', edgecolor='#333333', loc='upper left')

        self.canvas.draw()

    def ejecutar(self):
        self.txt_pasos.delete("1.0", tk.END)
        self.log(">>> INICIANDO ANÁLISIS DEL SISTEMA...")
        try:
            A = ast.literal_eval(self.ent_a.get())
            B = ast.literal_eval(self.ent_b.get())
            
            if len(A) != len(B):
                messagebox.showwarning("Dimensión", "A y B deben tener el mismo número de filas.")
                return

            # Crear matriz ampliada C
            C = [list(A[i]) + list(B[i]) for i in range(len(A))]
            m, n = len(C), len(C[0])

            self.log("MATRIZ AMPLIADA INICIAL:")
            self.imprimir_matriz_gui(C)
            self.graficar(A, B)

            if self.opcion_metodo.get() == "1":
                self.met_gauss(m, C, n)
            else:
                self.met_gauss_jordan(m, C, n)

        except Exception as e:
            messagebox.showerror("Engine Error", f"Error en procesamiento: {e}")

    def met_gauss(self, m, C, n):
        for k in range(m):
            # --- PIVOTEO PARCIAL ---
            max_row = max(range(k, m), key=lambda i: abs(C[i][k]))
            if abs(C[max_row][k]) < 1e-10:
                self.log("ERROR: Sistema singular o sin solución única."); return
            
            if max_row != k:
                C[k], C[max_row] = C[max_row], C[k]
                self.log(f"INTERCAMBIO: Fila {k+1} <-> Fila {max_row+1}")

            # Normalización y Reducción
            p = C[k][k]
            for j in range(k, n): C[k][j] /= p
            for i in range(k + 1, m):
                factor = C[i][k]
                for j in range(k, n):
                    C[i][j] -= factor * C[k][j]
            
            self.log(f"PASO {k+1} (Eliminación):")
            self.imprimir_matriz_gui(C)
        
        # Sustitución regresiva
        X = [0] * m
        for i in range(m-1, -1, -1):
            suma = sum(C[i][j] * X[j] for j in range(i+1, m))
            X[i] = C[i][m] - suma
        self.log("RESULTADO FINAL (Sustitución): " + str([round(v, 4) for v in X]))

    def met_gauss_jordan(self, m, C, n):
        for k in range(m):
            # --- PIVOTEO PARCIAL ---
            max_row = max(range(k, m), key=lambda i: abs(C[i][k]))
            if abs(C[max_row][k]) < 1e-10:
                self.log("ERROR: Sistema singular."); return
            
            if max_row != k:
                C[k], C[max_row] = C[max_row], C[k]
                self.log(f"INTERCAMBIO: Fila {k+1} <-> Fila {max_row+1}")

            # Normalización y Eliminación completa
            p = C[k][k]
            for j in range(k, n): C[k][j] /= p
            for i in range(m):
                if i != k:
                    factor = C[i][k]
                    for j in range(k, n):
                        C[i][j] -= factor * C[k][j]
            
            self.log(f"ITERACIÓN JORDAN {k+1}:")
            self.imprimir_matriz_gui(C)
        self.log("RESULTADO FINAL: " + str([round(C[i][m], 4) for i in range(m)]))

if __name__ == "__main__":
    root = tk.Tk()
    app = AppMatrices(root)
    root.mainloop()