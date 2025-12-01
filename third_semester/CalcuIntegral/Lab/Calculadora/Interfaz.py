import tkinter as tk 
from tkinter import ttk, Toplevel

# Importamos las clases de las aplicaciones de los métodos
from riemann import SumaRimannApp 
from simpson import SimpsonApp
from trapecio import TrapecioApp

# colores
COLOR_FONDO = '#F0F0F0'
COLOR_SIDEBAR = "#6D156A" 
COLOR_TEXTO_MENU = 'black'
COLOR_ACCENT = "#FFFFFF"

class MainMenuApp:
    def __init__(self, master):
        self.master = master
        master.title("Calculadora de Integración Numérica Avanzada")
        
        # Estado actual del contenido
        self.current_app = None
        
        # 1. Configuración de Ventana
        self.configurar_ventana(master)
        
        # 2. Creación de Frames (Sidebar y Contenido)
        self.crear_layout(master)
        
        # 3. Mostrar la pantalla inicial
        self.mostrar_aplicacion(TrapecioApp) # Inicia con el método del Trapecio

    def configurar_ventana(self, master):
        """Aplica la configuración de ventana maximizada y grid."""
        master.configure(bg=COLOR_FONDO)
        
        # Configurar grid principal 
        master.grid_columnconfigure(0, weight=0) #tiene ancho fijo
        master.grid_columnconfigure(1, weight=1)
        master.grid_rowconfigure(0, weight=1)

        # Maximizar la ventana
        try:
            master.state('zoomed') # Windows
        except:
            master.attributes('-zoomed', True) # Algunas versiones de Linux/Mac

    def crear_layout(self, master):
        """menú lateral y el frame de contenido."""
        
        #FRAME LATERAL (SIDEBAR)
        self.sidebar_frame = tk.Frame(master, bg=COLOR_SIDEBAR, width=200)
        self.sidebar_frame.grid(row=0, column=0, sticky="nswe")
        self.sidebar_frame.grid_propagate(False) # Evita que el frame se ajuste al contenido
        
        # Título del menú
        tk.Label(self.sidebar_frame, text="MÉTODOS", font=("Arial", 14, "bold"), 
                 bg=COLOR_SIDEBAR, fg=COLOR_ACCENT).pack(pady=(20, 10))
        
        # Botones de navegación
        ttk.Button(self.sidebar_frame, text="1. Regla del Trapecio", command=lambda: self.mostrar_aplicacion(TrapecioApp), style='Menu.TButton').pack(fill='x', padx=10, pady=5)
        ttk.Button(self.sidebar_frame, text="2. Regla de Simpson", command=lambda: self.mostrar_aplicacion(SimpsonApp), style='Menu.TButton').pack(fill='x', padx=10, pady=5)
        ttk.Button(self.sidebar_frame, text="3. Suma de Rimann", command=lambda: self.mostrar_aplicacion(SumaRimannApp), style='Menu.TButton').pack(fill='x', padx=10, pady=5)
        
        # Botón Salir
        tk.Button(self.sidebar_frame, text="SALIR", command=master.quit, bg="#DC3545", fg="white").pack(fill='x', padx=10, pady=(50, 10))
        
        # --- FRAME DE CONTENIDO PRINCIPAL ---
        self.content_frame = tk.Frame(master, bg=COLOR_FONDO)
        self.content_frame.grid(row=0, column=1, sticky="nswe", padx=10, pady=10)

        #estilo de botones del menú
        style = ttk.Style()
        style.configure('Menu.TButton', background=COLOR_SIDEBAR, foreground=COLOR_TEXTO_MENU, font=("Arial", 10))
        style.map('Menu.TButton', background=[('active', '#495057')])

    def mostrar_aplicacion(self, AppClass):
        """Limpia y dibuja la interfaz del método seleccionado."""
        
        # Destruir la aplicación anterior si existe
        if self.current_app:
            self.current_app.destroy()
            
        # Limpiar widgets existentes en el content_frame
        for widget in self.content_frame.winfo_children():
            widget.destroy()
            
        # Instanciar y dibujar la nueva aplicación en el content_frame
        # Se pasa self.content_frame como el "master" para que dibuje allí.
        self.current_app = AppClass(self.content_frame)


if __name__ == "__main__":
    root = tk.Tk()
    app = MainMenuApp(root)
    root.mainloop()