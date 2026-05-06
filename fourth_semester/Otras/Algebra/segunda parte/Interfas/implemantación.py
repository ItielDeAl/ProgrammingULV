import tkinter as tk
from tkinter import messagebox
import numpy as np
from sympy import *
import matplotlib.pyplot as plt
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg

# ---------------- LÓGICA ----------------

def calcular_area(vertices, n):
    x = vertices[:, 0]
    y = vertices[:, 1]
    parte1 = sum(x[i]*y[i+1] for i in range(n))
    parte2 = sum(x[i+1]*y[i] for i in range(n))
    return abs(parte1 - parte2) / 2

def calcular_perimetro(vertices, n):
    return sum(np.sqrt(
        (vertices[i+1][0]-vertices[i][0])**2 +
        (vertices[i+1][1]-vertices[i][1])**2
    ) for i in range(n))

def ecuacion_recta_calc(x1,y1,x2,y2):
    m = (y2 - y1)/(x2 - x1)
    b = y1 - m*x1
    return m,b

def ecuacion_plano_calc(p):
    x1,y1,z1,x2,y2,z2,x3,y3,z3 = p
    A= (y1*(z2 - z3)+ y2*(z3 - z1)+ y3*(z1 - z2)) 
    B= (z1*(x2 - x3)+ z2*(x3 - x1)+ z3*(x1 - x2))
    C= (x1*(y2 - y3)+ x2*(y3 - y1)+ x3*(y1 - y2)) 
    D= -(x1*(y2*z3 - y3*z2)+x2*(y3*z1 - y1*z3)+x3*(y1*z2 - y2*z1))
    return A,B,C,D

# ---------------- UI ----------------

root = tk.Tk()
root.title("Geometría Computacional")
root.geometry("900x550")

frame_menu = tk.Frame(root, width=150, bg="#2c3e50")
frame_menu.pack(side="left", fill="y")

frame_content = tk.Frame(root)
frame_content.pack(side="right", fill="both", expand=True)

def limpiar():
    for widget in frame_content.winfo_children():
        widget.destroy()

# ---------------- POLIGONO ----------------

def mostrar_poligono():
    limpiar()

    tk.Label(frame_content, text="Vertices (x,y)").pack()
    txt = tk.Text(frame_content, height=5)
    txt.pack()

    frame_grafica = tk.Frame(frame_content)
    frame_grafica.pack()

    lbl = tk.Label(frame_content, text="")
    lbl.pack()

    def calcular():
        try:
            data = txt.get("1.0","end").strip().split("\n")
            vertices = [list(map(float, d.replace(" ","").split(","))) for d in data]

            n = len(vertices)
            vertices.append(vertices[0])
            vertices = np.array(vertices)

            area = calcular_area(vertices, n)
            perimetro = calcular_perimetro(vertices, n)

            for w in frame_grafica.winfo_children():
                w.destroy()

            fig, ax = plt.subplots(figsize=(4,3))
            ax.plot(vertices[:,0], vertices[:,1], marker='o')
            ax.set_title("Polígono")

            canvas = FigureCanvasTkAgg(fig, master=frame_grafica)
            canvas.draw()
            canvas.get_tk_widget().pack()

            lbl.config(text=f"Área: {area} | Perímetro: {perimetro}")

        except:
            messagebox.showerror("Error", "Datos inválidos")

    tk.Button(frame_content, text="Calcular", command=calcular).pack()

# ---------------- RECTA ----------------

def mostrar_recta():
    limpiar()

    tk.Label(frame_content, text="Punto 1 (x,y)").pack()
    e1 = tk.Entry(frame_content)
    e1.pack()

    tk.Label(frame_content, text="Punto 2 (x,y)").pack()
    e2 = tk.Entry(frame_content)
    e2.pack()

    frame_grafica = tk.Frame(frame_content)
    frame_grafica.pack()

    lbl = tk.Label(frame_content, text="")
    lbl.pack()

    def calcular():
        try:
            x1,y1 = map(float, e1.get().replace(" ","").split(","))
            x2,y2 = map(float, e2.get().replace(" ","").split(","))

            m,b = ecuacion_recta_calc(x1,y1,x2,y2)

            for w in frame_grafica.winfo_children():
                w.destroy()

            x = np.linspace(x1-5, x2+5, 100)
            y = m*x + b

            fig, ax = plt.subplots(figsize=(4,3))
            ax.plot(x,y)
            ax.scatter([x1,x2],[y1,y2])
            ax.set_title("Recta")

            canvas = FigureCanvasTkAgg(fig, master=frame_grafica)
            canvas.draw()
            canvas.get_tk_widget().pack()

            lbl.config(text=f"Ecuación: y = {m}x + {b}")

        except:
            messagebox.showerror("Error", "Datos inválidos")

    tk.Button(frame_content, text="Calcular", command=calcular).pack()

# ---------------- PLANO 3D ----------------

def mostrar_plano():
    limpiar()

    entries = []
    for txt in ["x1,y1,z1","x2,y2,z2","x3,y3,z3"]:
        tk.Label(frame_content, text=txt).pack()
        e = tk.Entry(frame_content)
        e.pack()
        entries.append(e)

    frame_grafica = tk.Frame(frame_content)
    frame_grafica.pack()

    lbl = tk.Label(frame_content, text="")
    lbl.pack()

    def calcular():
        try:
            datos = []
            for e in entries:
                datos += list(map(float, e.get().replace(" ","").split(",")))

            A,B,C,D = ecuacion_plano_calc(datos)

            for w in frame_grafica.winfo_children():
                w.destroy()

            fig = plt.figure(figsize=(4,3))
            ax = fig.add_subplot(111, projection='3d')

            xx, yy = np.meshgrid(range(-5,6), range(-5,6))

            if C != 0:
                zz = (-A*xx - B*yy - D)/C
                ax.plot_surface(xx, yy, zz, alpha=0.5)
            else:
                zz = np.zeros_like(xx)
                ax.plot_surface(xx, yy, zz, alpha=0.5)

            x1,y1,z1,x2,y2,z2,x3,y3,z3 = datos
            ax.scatter([x1,x2,x3],[y1,y2,y3],[z1,z2,z3])

            ax.set_title("Plano 3D")

            canvas = FigureCanvasTkAgg(fig, master=frame_grafica)
            canvas.draw()
            canvas.get_tk_widget().pack()

            lbl.config(text=f"{A}x + {B}y + {C}z + {D} = 0")

        except:
            messagebox.showerror("Error", "Datos inválidos")

    tk.Button(frame_content, text="Calcular", command=calcular).pack()

# ---------------- MENU ----------------

tk.Button(frame_menu, text="Polígono", width=15, command=mostrar_poligono).pack(pady=10)
tk.Button(frame_menu, text="Recta", width=15, command=mostrar_recta).pack(pady=10)
tk.Button(frame_menu, text="Plano", width=15, command=mostrar_plano).pack(pady=10)

root.mainloop()