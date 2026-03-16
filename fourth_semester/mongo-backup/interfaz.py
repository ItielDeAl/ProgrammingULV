import tkinter as tk
import subprocess

from tkinter import filedialog, messagebox
from pymongo import MongoClient
from datetime import date

"""
OBTENER FECHA ACTUAL
"""

fecha = date.today()

"""
CONEXIÓN A MONGODB
"""

client = MongoClient("mongodb://localhost:27017")
databases = client.list_database_names()

"""
VENTANA PRINCIPAL
"""

root = tk.Tk()
root.title('MongoDB Backup')
root.geometry("700x400")

"""
BARRA LATERAL
"""

sidebar = tk.Frame(root, width=200, bg="#121212")
sidebar.pack(side="left", fill="y")

tk.Label(
    sidebar,
    text="MENU",
    fg="#00f7ff",
    bg="#121212",
    font=("Consolas", 16, "bold")
).pack(pady=60)

opcion_menu = tk.StringVar(value="backup")

style_rb = {
    "bg": "#121212",
    "fg": "#ffffff",
    "selectcolor": "#000000",
    "activebackground": "#121212",
    "activeforeground": "#00ff88",
    "font": ("Segoe UI", 10),
    "anchor": "w"
}

"""
CONTENIDO DE LA VENTANA
"""

main = tk.Frame(root)
main.pack(side="left", fill="both", expand=True)

"""
DATOS / VARIABLES
"""

db_select = tk.StringVar(main)

if databases:
    db_select.set(databases[0])

carpeta_var = tk.StringVar()
carpeta_grup_var = tk.StringVar()
carpeta_push_var = tk.StringVar()
archivo_coleccion = tk.StringVar()

"""
RUTA POR DEFECTO
"""

carpeta_var.set("C:/respaldos")
carpeta_grup_var.set("C:/respaldos")

"""
FUNCIONES GENERALES
"""

def limpiar_main():
    for widget in main.winfo_children():
        widget.destroy()

"""
FUNCIONES BACKUP
"""
def seleccionar_carpeta():
    carpeta = filedialog.askdirectory()
    carpeta_var.set(carpeta)

def seleccionar_carpetag():
    carpeta = filedialog.askdirectory()
    carpeta_grup_var.set(carpeta)

def crear_backup():

    db = db_select.get()
    ruta = carpeta_var.get()

    comando = f'mongodump --db {db} --out "{ruta}/backup/{fecha}"'
    subprocess.run(comando, shell=True)

    messagebox.showinfo(f'Backup de {db}', "Creado correctamente")

def crear_backup_todas():

    ruta = carpeta_grup_var.get()
    comando = f'mongodump --out "{ruta}/backup/{fecha}"'
    subprocess.run(comando, shell=True)
    messagebox.showinfo('Backup de todas las DB', "Creados correctamente")

"""
FUNCIONES RESTORE
"""
def subir_db():
    carpeta = filedialog.askdirectory()
    carpeta_push_var.set(carpeta)

def seleccionar_coleccion():
    archivo = filedialog.askopenfilename(
        title="Seleccionar colección",
        filetypes=[("BSON files","*.bson")]
    )
    if archivo:
        archivo_coleccion.set(archivo)

def restaurar_backup():

    carpeta = carpeta_push_var.get()

    if not carpeta:
        messagebox.showerror("Error", "Seleccione una carpeta")
        return

    nombre_bd = carpeta.split("/")[-1]
    comando = f'mongorestore --db {nombre_bd} "{carpeta}"'
    subprocess.run(comando, shell=True)
    messagebox.showinfo("Restore", "Backup restaurado correctamente")

def restaurar_coleccion():

    db = db_select.get()
    archivo = archivo_coleccion.get()

    if not archivo:
        messagebox.showerror("Error", "Seleccione un archivo .bson")
        return

    coleccion = archivo.split("/")[-1].replace(".bson", "")
    comando = f'mongorestore --db {db} --collection {coleccion} "{archivo}"'
    subprocess.run(comando, shell=True)
    messagebox.showinfo("Restore", "Colección restaurada correctamente")

"""
PANTALLA BACKUP
"""

def cargar_backup():

    limpiar_main()

    tk.Label(main, 
    text="Backup individual",
    fg="#0004ff",
    font=("Consolas", 16, "bold")).pack()

    tk.Label(main, text="Selecciona la base de datos").pack()
    tk.OptionMenu(main, db_select, *databases).pack(pady=10)
    tk.Button(main, text="Elegir carpeta", command=seleccionar_carpeta).pack(pady=10)
    tk.Label(main, textvariable=carpeta_var).pack()
    tk.Button(main, text="Crear backup", command=crear_backup).pack(pady=10)
    
    tk.Label(main, 
    text="Backup grupal",
    fg="#0004ff",
    font=("Consolas", 16, "bold")).pack()
    
    tk.Button(main, text="Elegir carpeta", command=seleccionar_carpetag).pack(pady=10)
    tk.Label(main, textvariable=carpeta_grup_var).pack()
    tk.Button(main, text="Crear backup", command=crear_backup_todas).pack(pady=20)

"""
PANTALLA RESTORE
"""

def cargar_restore():

    limpiar_main()

    tk.Label(main, 
    text="Restaurar DB",
    fg="#0004ff",
    font=("Consolas", 16, "bold")).pack()

    tk.Label(main, text="Selecciona la Carpeta").pack()
    tk.Button(main, text="Elegir carpeta", command=subir_db).pack(pady=10)
    tk.Label(main, textvariable=carpeta_push_var).pack()
    tk.Button(main, text="Subir backup", command=restaurar_backup).pack(pady=5)
    
    tk.Label(main,
    text="Restaurar Colección",
    fg="#0004ff",
    font=("Consolas", 16, "bold")).pack()

    tk.Label(main, text="Selecciona la base de datos").pack()
    tk.OptionMenu(main, db_select, *databases).pack(pady=10)
    tk.Label(main, text="Selecciona la colección").pack()
    tk.Button(main, text="Elegir .bson", command=seleccionar_coleccion).pack(pady=10)
    tk.Label(main, textvariable=archivo_coleccion).pack()
    tk.Button(main, text="Subir colección", command=restaurar_coleccion).pack(pady=5)

"""
CAMBIAR VISTA
"""

def cambiar_vista():

    opcion = opcion_menu.get()

    if opcion == "backup":
        cargar_backup()

    elif opcion == "restore":
        cargar_restore()

"""
BOTONES MENU
"""

tk.Radiobutton(
    sidebar,
    text="Crear Backup",
    variable=opcion_menu,
    value="backup",
    command=cambiar_vista,
    **style_rb
).pack(fill="x", padx=25, pady=10)

tk.Radiobutton(
    sidebar,
    text="Subir Backup",
    variable=opcion_menu,
    value="restore",
    command=cambiar_vista,
    **style_rb
).pack(fill="x", padx=25, pady=10)

tk.Label(
    sidebar,
    text="MONGODB",
    fg="#ff5100",
    bg="#121212",
    font=("Consolas", 16, "bold")
).pack(pady=60)

"""
INICIAR VENTANA
"""

root.mainloop()