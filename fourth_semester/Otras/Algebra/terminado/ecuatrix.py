import tkinter as tk
import customtkinter as ctk
from PIL import Image, ImageTk
import numpy as np
from matplotlib.figure import Figure
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg

import os
import sys


# ===== FUNCIÓN PARA CARGAR RECURSOS EN EL .EXE =====
def resource_path(relative_path):
    try:
        base_path = sys._MEIPASS
    except Exception:
        base_path = os.path.abspath(".")

    return os.path.join(base_path, relative_path)


class App:
    def __init__(self, root):
        self.root = root
        self.root.title("Ecuatrix")
        self.root.geometry("1920x1080")

        # ===== CONTENEDORES =====
        self.menu_frame = tk.Frame(root, bg="#094167", width=220)
        self.menu_frame.pack(side="left", fill="y")
        self.menu_frame.pack_propagate(False)

        self.content_frame = tk.Frame(root, bg="#ecf0f1")
        self.content_frame.pack(side="right", expand=True, fill="both")

        # ===== SUBCONTENEDORES =====
        self.top_menu = tk.Frame(self.menu_frame, bg="#094167")
        self.top_menu.pack(side="top", fill="both", expand=True)

        self.bottom_menu = tk.Frame(self.menu_frame, bg="#094167")
        self.bottom_menu.pack(side="bottom", fill="x")

        # ===== BOTONES =====
        opciones = [
            "Inicio",
            "Gauss-Jordan",
            "Área",
            "Perímetro",
            "Ecuación de la recta",
            "Ecuación del plano",
            "Salir"
        ]

        ctk.set_appearance_mode("dark")

        for opcion in opciones:
            boton = ctk.CTkButton(
                self.menu_frame,
                text=opcion,
                fg_color="#e7b816",
                text_color="Black",
                corner_radius=17,
                command=lambda op=opcion: self.cambiar_vista(op)
            )
            boton.pack(in_=self.top_menu, fill="x", pady=10, padx=22)

        # ===== IMAGEN SIDEBAR =====
        img = Image.open(resource_path("letras.png")).resize((200, 200))
        self.img_sidebar = ImageTk.PhotoImage(img)

        tk.Label(
            self.bottom_menu,
            image=self.img_sidebar,
            bg="#094167"
        ).pack(pady=10)

        self.vista_inicio()

    # ===== LIMPIAR =====
    def limpiar_pantalla(self):
        for widget in self.content_frame.winfo_children():
            widget.destroy()

    # ===== VISTA INICIO =====
    def vista_inicio(self):
        self.limpiar_pantalla()

        tk.Label(
            self.content_frame,
            text="Bienvenido a Ecuatrix",
            font=("Courier New", 40, "bold"),
            bg="#ecf0f1"
        ).pack(pady=20)

        # ===== LOGO =====
        img = Image.open(resource_path("Logo.png")).resize((500, 500))
        img_tk = ImageTk.PhotoImage(img)

        lbl = tk.Label(
            self.content_frame,
            image=img_tk,
            bg="#ecf0f1"
        )

        lbl.image = img_tk
        lbl.pack(pady=30)

        tk.Label(
            self.content_frame,
            text="Calculadora de Problemas de Geometría Analítica \ny Sistemas de Ecuaciones Lineales",
            font=("Courier New", 20, "bold"),
            bg="#ecf0f1"
        ).pack(pady=20)

        tk.Label(
            self.content_frame,
            text="Desarrollado por: Itiel, Jair y Moisés.",
            font=("Courier New", 12, "bold"),
            bg="#ecf0f1",
            fg="gray"
        ).pack(side="bottom", anchor="e", padx=20, pady=10)
    # ===== CAMBIO DE VISTA =====
    def cambiar_vista(self, opcion):
        self.limpiar_pantalla()

        if opcion == "Inicio":
            self.vista_inicio()

        elif opcion == "Gauss-Jordan":

            top_frame = tk.Frame(self.content_frame, bg="#ecf0f1")
            top_frame.pack(fill="x")

            bottom_frame = tk.Frame(self.content_frame, bg="#ecf0f1")
            bottom_frame.pack(fill="both", expand=True)

            tk.Label(top_frame, text="Método de Gauss-Jordan",
                     font=("Courier New", 30, "bold"),
                     bg="#ecf0f1").pack()
            tk.Label(top_frame, text="Seleccione la dimención de la matriz aumentada.",
                                font=("Courier New", 10, "bold"),
                                bg="#ecf0f1").pack(pady=5)
            dim_var = tk.IntVar(value=3)
            
            # ===== SELECTOR DE DIMENSIÓN =====
            tk.OptionMenu(top_frame, dim_var, 2, 3).pack(pady=5)
            
            tk.Label(top_frame, text="Generar el espacio o matriz ejemplo.",
                                font=("Courier New", 10, "bold"),
                                bg="#ecf0f1").pack(pady=5)
            
            # ===== BOTONES ARRIBA (ANTES DEL SELECTOR) =====
            botones_frame = tk.Frame(top_frame, bg="#ecf0f1")
            botones_frame.pack(pady=5)

            ctk.CTkButton(
                botones_frame,
                text="Generar",
                fg_color="#094167",
                text_color="white",
                command=lambda: crear()
            ).pack(side="left", padx=5)
            ctk.CTkButton(
                botones_frame,
                text="Ejemplo",
                fg_color="#094167",
                text_color="white",
                command=lambda: ejemplo()
            ).pack(side="left", padx=5)
            
            tk.Label(top_frame, text="*Primero genere el espacio*",
                                font=("Courier New", 8, "bold",),
                                fg="#094167",
                                bg="#eceff1").pack(pady=2)
            # ===== CONTENEDOR MATRICES =====
            matrices_frame = tk.Frame(top_frame, bg="#ecf0f1")
            matrices_frame.pack(pady=8)

            entries_A = []
            entries_B = []

            def crear():
                for w in matrices_frame.winfo_children():
                    w.destroy()

                n = dim_var.get()
                entries_A.clear()
                entries_B.clear()

                fA = tk.Frame(matrices_frame, bg="#ecf0f1")
                fA.grid(row=0, column=0)

                for i in range(n):
                    row = []
                    fr = tk.Frame(fA, bg="#ecf0f1")
                    fr.pack()
                    for j in range(n):
                        e = tk.Entry(fr, width=5)
                        e.pack(side="left")
                        row.append(e)
                    entries_A.append(row)

                fB = tk.Frame(matrices_frame, bg="#ecf0f1")
                fB.grid(row=0, column=1)

                for i in range(n):
                    e = tk.Entry(fB, width=5)
                    e.pack()
                    entries_B.append(e)

                ctk.CTkButton(
                    matrices_frame,
                    text="Calcular",
                    fg_color="#094167",
                    text_color="white",
                    command=resolver
                ).grid(row=0, column=2, padx=20)
                
            tk.Label(top_frame, text="Deslice para ver procedimiento:",
                            font=("Courier New", 10, "bold"),
                            bg="#ecf0f1", anchor="w").pack(fill="x",pady=5)
            def ejemplo():
                n = dim_var.get()
                if n == 2:
                    A = [[2,1],[5,7]]
                    B = [11,13]
                else:
                    A = [[2,1,-1],[-3,-1,2],[-2,1,2]]
                    B = [8,-11,-3]

                for i in range(n):
                    for j in range(n):
                        entries_A[i][j].delete(0, tk.END)
                        entries_A[i][j].insert(0, A[i][j])

                    entries_B[i].delete(0, tk.END)
                    entries_B[i].insert(0, B[i])

            def resolver():
                try:
                    self.txt_pasos.delete("1.0", tk.END)

                    n = dim_var.get()

                    A = [[float(entries_A[i][j].get()) for j in range(n)] for i in range(n)]
                    B = [[float(entries_B[i].get())] for i in range(n)]

                    self.imprimir_matriz_gui([A[i] + B[i] for i in range(n)])
                    X = self.gauss_jordan(A, B)

                    for i,v in enumerate(X):
                        self.log(f"x{i+1} = {round(v,4)}")

                    self.graficar(A, B)

                except Exception as e:
                    self.log("Error: Ingrese una matriz valida")

            self.txt_pasos = tk.Text(
                bottom_frame,
                height=6,
                bg="#ecf0f1",
                fg="black",
                insertbackground="black"
            )
            self.txt_pasos.pack(fill="x")

            self.fig = Figure(figsize=(5,4), facecolor="#ecf0f1")
            self.canvas = FigureCanvasTkAgg(self.fig, master=bottom_frame)
            self.canvas.get_tk_widget().pack(fill="both", expand=True)

            crear()

        elif opcion in ["Área", "Perímetro"]:

            top_frame = tk.Frame(self.content_frame, bg="#ecf0f1")
            top_frame.pack(fill="x")

            bottom_frame = tk.Frame(self.content_frame, bg="#ecf0f1")
            bottom_frame.pack(fill="both", expand=True)

            titulo = "Área de un polígono" if opcion == "Área" else "Perímetro de un polígono"

            tk.Label(
                top_frame,
                text=titulo,
                font=("Courier New", 30, "bold"),
                bg="#ecf0f1"
            ).pack(pady=10)

            tk.Label(
                top_frame,
                text="Número de vértices:",
                font=("Courier New", 10, "bold"),
                bg="#ecf0f1"
            ).pack(pady=5)

            n_var = tk.IntVar(value=3)

            tk.Entry(
                top_frame,
                textvariable=n_var,
                width=5
            ).pack()
            #=========GENERAR EJEMPLO===============
            def ejemplo():

                n_var.set(4)

                generar()

                datos = [
                    [0, 0],
                    [4, 0],
                    [4, 3],
                    [0, 3]
                ]

                for i in range(4):

                    entries[i][0].delete(0, tk.END)
                    entries[i][0].insert(0, datos[i][0])

                    entries[i][1].delete(0, tk.END)
                    entries[i][1].insert(0, datos[i][1])
            
            # ===== GENERAR ESPACIOS =====
            def generar():

                for w in vertices_frame.winfo_children():
                    w.destroy()

                entries.clear()

                n = n_var.get()

                for i in range(n):

                    fila = []

                    fr = tk.Frame(vertices_frame, bg="#ecf0f1")
                    fr.pack(pady=2)

                    tk.Label(
                        fr,
                        text=f"P{i+1}:",
                        bg="#ecf0f1",
                        font=("Courier New", 10, "bold")
                    ).pack(side="left", padx=5)

                    for j in range(2):

                        e = tk.Entry(fr, width=6)
                        e.pack(side="left", padx=2)

                        fila.append(e)

                    entries.append(fila)

            botones = tk.Frame(top_frame, bg="#ecf0f1")
            botones.pack(pady=5)

            ctk.CTkButton(
                botones,
                text="Generar",
                fg_color="#094167",
                text_color="white",
                command=generar
            ).pack(side="left", padx=5, pady=5)

            ctk.CTkButton(
                botones,
                text="Ejemplo",
                fg_color="#094167",
                text_color="white",
                command=ejemplo
            ).pack(side="left", padx=5, pady=5)
            
            tk.Label(top_frame, text="*Primero genere el espacio*",
                                font=("Courier New", 8, "bold",),
                                fg="#094167",
                                bg="#eceff1").pack(pady=2)
            # ===== CONTENEDOR VÉRTICES =====
            vertices_frame = tk.Frame(top_frame, bg="#ecf0f1")
            vertices_frame.pack(pady=10)

            entries = []


            # ===== CALCULAR =====
            def calcular():

                try:

                    self.txt_pasos.delete("1.0", tk.END)

                    n = n_var.get()

                    vertices = []

                    for i in range(n):

                        x = float(entries[i][0].get())
                        y = float(entries[i][1].get())

                        vertices.append([x, y])

                    # cerrar polígono
                    vertices.append(vertices[0])

                    vertices = np.array(vertices)

                    # ================= ÁREA =================
                    if opcion == "Área":

                        x = vertices[:, 0]
                        y = vertices[:, 1]

                        self.log("Método Shoelace")
                        self.log("-" * 40)

                        parte1 = 0
                        parte2 = 0

                        for i in range(n):

                            a = x[i] * y[i+1]
                            b = x[i+1] * y[i]

                            parte1 += a
                            parte2 += b

                            self.log(
                                f"({x[i]} * {y[i+1]}) - ({x[i+1]} * {y[i]})"
                            )

                        self.log("-" * 40)

                        self.log(f"Suma 1 = {parte1}")
                        self.log(f"Suma 2 = {parte2}")

                        area = abs(parte1 - parte2) / 2

                        self.log(f"Área = |{parte1} - {parte2}| / 2")
                        self.log(f"Área = {round(area,4)}")

                    # ================= PERÍMETRO =================
                    else:

                        perimetro = 0

                        self.log("Distancia entre vértices")
                        self.log("-" * 40)

                        for i in range(n):

                            x1 = vertices[i][0]
                            y1 = vertices[i][1]

                            x2 = vertices[i+1][0]
                            y2 = vertices[i+1][1]

                            d = np.sqrt((x2-x1)**2 + (y2-y1)**2)

                            self.log(
                                f"P{i+1} → P{i+2 if i+1 < n else 1}"
                            )

                            self.log(
                                f"√(({x2}-{x1})² + ({y2}-{y1})²)"
                            )

                            self.log(f"= {round(d,4)}")
                            self.log("-" * 20)

                            perimetro += d

                        self.log(f"Perímetro total = {round(perimetro,4)}")

                    # ================= GRÁFICA =================

                    self.fig.clear()

                    ax = self.fig.add_subplot(
                        111,
                        facecolor="#ecf0f1"
                    )

                    ax.plot(
                        vertices[:,0],
                        vertices[:,1],
                        marker='o'
                    )

                    ax.fill(
                        vertices[:,0],
                        vertices[:,1],
                        alpha=0.2
                    )

                    for i in range(n):

                        ax.text(
                            vertices[i][0],
                            vertices[i][1],
                            f"P{i+1}",
                            color="black"
                        )

                    ax.set_title(
                        "Polígono",
                        color="black"
                    )

                    ax.grid(True, color="black")

                    self.canvas.draw()

                except Exception as e:

                    self.log("Error: Ingrese vertices validos")

            # ===== BOTONES =====

            boton = tk.Frame(top_frame, bg="#ecf0f1")
            boton.pack(pady=5)

            ctk.CTkButton(
                boton,
                text="Calcular",
                fg_color="#094167",
                text_color="white",
                command=calcular
            ).pack(padx=5, pady=5)

            # ===== LOG =====

            self.txt_pasos = tk.Text(
                bottom_frame,
                height=8,
                bg="#ecf0f1",
                fg="black",
                insertbackground="black"
            )

            self.txt_pasos.pack(fill="x")

            # ===== GRÁFICA =====

            self.fig = Figure(
                figsize=(5,4),
                facecolor="#ecf0f1"
            )

            self.canvas = FigureCanvasTkAgg(
                self.fig,
                master=bottom_frame
            )

            self.canvas.get_tk_widget().configure(
                bg="#ecf0f1",
                highlightthickness=0
            )

            self.canvas.get_tk_widget().pack(
                fill="both",
                expand=True
            )

            generar()
        elif opcion == "Ecuación de la recta":

            top_frame = tk.Frame(self.content_frame, bg="#ecf0f1")
            top_frame.pack(fill="x")

            bottom_frame = tk.Frame(self.content_frame, bg="#ecf0f1")
            bottom_frame.pack(fill="both", expand=True)

            tk.Label(
                top_frame,
                text="Ecuación de la Recta",
                font=("Courier New", 30, "bold"),
                bg="#ecf0f1"
            ).pack(pady=10)

            puntos_frame = tk.Frame(top_frame, bg="#ecf0f1")
            puntos_frame.pack(pady=10)

            entries = []

            labels = ["Punto 1", "Punto 2"]

            for i in range(2):

                fila = tk.Frame(puntos_frame, bg="#ecf0f1")
                fila.pack(pady=5)

                tk.Label(
                    fila,
                    text=labels[i],
                    font=("Courier New", 10, "bold"),
                    bg="#ecf0f1"
                ).pack(side="left", padx=5)

                fila_entries = []

                for j in range(2):

                    e = tk.Entry(fila, width=6)
                    e.pack(side="left", padx=2)

                    fila_entries.append(e)

                entries.append(fila_entries)

            def ejemplo():

                datos = [
                    [1, 2],
                    [4, 6]
                ]

                for i in range(2):
                    for j in range(2):

                        entries[i][j].delete(0, tk.END)
                        entries[i][j].insert(0, datos[i][j])

            ctk.CTkButton(
                top_frame,
                text="Ejemplo",
                fg_color="#094167",
                text_color="white",
                command=ejemplo
            ).pack(pady=5)

            self.txt_pasos = tk.Text(
                bottom_frame,
                height=10,
                bg="#ecf0f1",
                fg="black",
                insertbackground="black"
            )

            self.txt_pasos.pack(fill="x")

            self.fig = Figure(figsize=(5,4), facecolor="#ecf0f1")

            self.canvas = FigureCanvasTkAgg(
                self.fig,
                master=bottom_frame
            )

            self.canvas.get_tk_widget().pack(
                fill="both",
                expand=True
            )

            def calcular():

                try:

                    self.txt_pasos.delete("1.0", tk.END)

                    x1 = float(entries[0][0].get())
                    y1 = float(entries[0][1].get())

                    x2 = float(entries[1][0].get())
                    y2 = float(entries[1][1].get())

                    self.log("Ecuación de la recta usando determinantes")
                    self.log("-"*50)

                    self.log("| x  y  1 |")
                    self.log(f"| {x1}  {y1}  1 | = 0")
                    self.log(f"| {x2}  {y2}  1 |")

                    A = y1 - y2
                    B = x2 - x1
                    C = (x1*y2) - (x2*y1)

                    self.log("-"*50)

                    self.log(f"A = y1 - y2")
                    self.log(f"A = {y1} - {y2}")
                    self.log(f"A = {A}")

                    self.log("")

                    self.log(f"B = x2 - x1")
                    self.log(f"B = {x2} - {x1}")
                    self.log(f"B = {B}")

                    self.log("")

                    self.log(f"C = (x1*y2) - (x2*y1)")
                    self.log(f"C = ({x1}*{y2}) - ({x2}*{y1})")
                    self.log(f"C = {C}")

                    self.log("-"*50)

                    self.log(f"Ecuación general:")
                    self.log(f"{A}x + {B}y + ({C}) = 0")

                    self.fig.clear()

                    ax = self.fig.add_subplot(
                        111,
                        facecolor="#ecf0f1"
                    )

                    x = np.linspace(min(x1,x2)-10, max(x1,x2)+10, 100)

                    if B != 0:

                        y = (-A*x - C)/B
                        ax.plot(x, y)

                    ax.scatter([x1,x2],[y1,y2], color="red")

                    ax.text(x1,y1,"P1")
                    ax.text(x2,y2,"P2")

                    ax.grid(True, color="black")

                    ax.set_title("Recta", color="black")

                    self.canvas.draw()

                except:
                    self.log("Error: Datos inválidos")

            ctk.CTkButton(
                top_frame,
                text="Calcular",
                fg_color="#094167",
                text_color="white",
                command=calcular
            ).pack(pady=10)
        
        elif opcion == "Ecuación del plano":

            top_frame = tk.Frame(self.content_frame, bg="#ecf0f1")
            top_frame.pack(fill="x")

            bottom_frame = tk.Frame(self.content_frame, bg="#ecf0f1")
            bottom_frame.pack(fill="both", expand=True)

            tk.Label(
                top_frame,
                text="Ecuación del Plano",
                font=("Courier New", 30, "bold"),
                bg="#ecf0f1"
            ).pack(pady=10)

            puntos_frame = tk.Frame(top_frame, bg="#ecf0f1")
            puntos_frame.pack(pady=10)

            entries = []

            labels = ["Punto 1", "Punto 2", "Punto 3"]

            for i in range(3):

                fila = tk.Frame(puntos_frame, bg="#ecf0f1")
                fila.pack(pady=5)

                tk.Label(
                    fila,
                    text=labels[i],
                    font=("Courier New", 10, "bold"),
                    bg="#ecf0f1"
                ).pack(side="left", padx=5)

                fila_entries = []

                for j in range(3):

                    e = tk.Entry(fila, width=6)
                    e.pack(side="left", padx=2)

                    fila_entries.append(e)

                entries.append(fila_entries)

            def ejemplo():

                datos = [
                    [1,2,1],
                    [2,0,3],
                    [4,1,2]
                ]

                for i in range(3):
                    for j in range(3):

                        entries[i][j].delete(0, tk.END)
                        entries[i][j].insert(0, datos[i][j])

            ctk.CTkButton(
                top_frame,
                text="Ejemplo",
                fg_color="#094167",
                text_color="white",
                command=ejemplo
            ).pack(pady=5)

            self.txt_pasos = tk.Text(
                bottom_frame,
                height=10,
                bg="#ecf0f1",
                fg="black",
                insertbackground="black"
            )

            self.txt_pasos.pack(fill="x")

            self.fig = Figure(figsize=(5,4), facecolor="#ecf0f1")

            self.canvas = FigureCanvasTkAgg(
                self.fig,
                master=bottom_frame
            )

            self.canvas.get_tk_widget().pack(
                fill="both",
                expand=True
            )

            def calcular():

                try:

                    self.txt_pasos.delete("1.0", tk.END)

                    datos = []

                    for i in range(3):
                        for j in range(3):

                            datos.append(
                                float(entries[i][j].get())
                            )

                    x1,y1,z1,x2,y2,z2,x3,y3,z3 = datos

                    self.log("Plano usando determinantes")
                    self.log("-"*50)

                    self.log("| x  y  z  1 |")
                    self.log(f"| {x1}  {y1}  {z1}  1 |")
                    self.log(f"| {x2}  {y2}  {z2}  1 | = 0")
                    self.log(f"| {x3}  {y3}  {z3}  1 |")

                    A = (y1*(z2-z3)+y2*(z3-z1)+y3*(z1-z2))
                    B = (z1*(x2-x3)+z2*(x3-x1)+z3*(x1-x2))
                    C = (x1*(y2-y3)+x2*(y3-y1)+x3*(y1-y2))
                    D = -(x1*(y2*z3-y3*z2)+x2*(y3*z1-y1*z3)+x3*(y1*z2-y2*z1))

                    self.log("-"*50)

                    self.log("Cálculo de A")
                    self.log("A = y1(z2-z3) + y2(z3-z1) + y3(z1-z2)")

                    self.log(
                        f"A = {y1}({z2}-{z3}) + "
                        f"{y2}({z3}-{z1}) + "
                        f"{y3}({z1}-{z2})"
                    )

                    self.log(
                        f"A = {y1*(z2-z3)} + "
                        f"{y2*(z3-z1)} + "
                        f"{y3*(z1-z2)}"
                    )

                    self.log(f"A = {A}")

                    self.log("-"*30)

                    self.log("Cálculo de B")
                    self.log("B = z1(x2-x3) + z2(x3-x1) + z3(x1-x2)")

                    self.log(
                        f"B = {z1}({x2}-{x3}) + "
                        f"{z2}({x3}-{x1}) + "
                        f"{z3}({x1}-{x2})"
                    )

                    self.log(
                        f"B = {z1*(x2-x3)} + "
                        f"{z2*(x3-x1)} + "
                        f"{z3*(x1-x2)}"
                    )

                    self.log(f"B = {B}")

                    self.log("-"*30)

                    self.log("Cálculo de C")
                    self.log("C = x1(y2-y3) + x2(y3-y1) + x3(y1-y2)")

                    self.log(
                        f"C = {x1}({y2}-{y3}) + "
                        f"{x2}({y3}-{y1}) + "
                        f"{x3}({y1}-{y2})"
                    )

                    self.log(
                        f"C = {x1*(y2-y3)} + "
                        f"{x2*(y3-y1)} + "
                        f"{x3*(y1-y2)}"
                    )

                    self.log(f"C = {C}")

                    self.log("-"*30)

                    self.log("Cálculo de D")

                    self.log(
                        "D = -(x1(y2z3-y3z2) + "
                        "x2(y3z1-y1z3) + "
                        "x3(y1z2-y2z1))"
                    )

                    self.log(
                        f"D = -({x1}({y2}*{z3}-{y3}*{z2}) + "
                        f"{x2}({y3}*{z1}-{y1}*{z3}) + "
                        f"{x3}({y1}*{z2}-{y2}*{z1}))"
                    )

                    self.log(
                        f"D = -({x1*(y2*z3-y3*z2)} + "
                        f"{x2*(y3*z1-y1*z3)} + "
                        f"{x3*(y1*z2-y2*z1)})"
                    )

                    self.log(f"D = {D}")

                    self.log("-"*50)

                    self.log("Ecuación general:")
                    self.log(f"{A}x + {B}y + {C}z + ({D}) = 0")

                    self.fig.clear()

                    ax = self.fig.add_subplot(
                        111,
                        projection='3d',
                        facecolor="#ecf0f1"
                    )

                    xx, yy = np.meshgrid(
                        np.linspace(-5,5,10),
                        np.linspace(-5,5,10)
                    )

                    if C != 0:

                        zz = (-A*xx - B*yy - D)/C

                        ax.plot_surface(
                            xx,
                            yy,
                            zz,
                            alpha=0.5
                        )

                    ax.scatter(
                        [x1,x2,x3],
                        [y1,y2,y3],
                        [z1,z2,z3],
                        color="red"
                    )

                    ax.text(x1,y1,z1,"P1")
                    ax.text(x2,y2,z2,"P2")
                    ax.text(x3,y3,z3,"P3")

                    ax.set_title(
                        "Plano 3D",
                        color="black"
                    )

                    self.canvas.draw()

                except:
                    self.log("Error: Datos inválidos")

            ctk.CTkButton(
                top_frame,
                text="Calcular",
                fg_color="#094167",
                text_color="white",
                command=calcular
            ).pack(pady=10)
            
        elif opcion == "Salir":
            self.root.quit()


if __name__ == "__main__":
    root = tk.Tk()
    app = App(root)
    root.mainloop()