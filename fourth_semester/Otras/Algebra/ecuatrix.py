import tkinter as tk
import customtkinter as ctk

class App:
    def __init__(self, root):
        self.root = root
        self.root.title("Ecuatrix")
        self.root.geometry("800x500")

        # ===== CONTENEDORES PRINCIPALES =====
        self.menu_frame = tk.Frame(root, bg="#094167", width=200)
        self.menu_frame.pack(side="left", fill="y")

        self.content_frame = tk.Frame(root, bg="#ecf0f1")
        self.content_frame.pack(side="right", expand=True, fill="both")

        # ===== BOTONES DEL MENÚ =====
        opciones = ["Inicio","Gauss-Jordan", "Área", "Perímetro", "Eq. Recta 2p", "Eq. Recta 3p","Salir"]

        ctk.set_appearance_mode("dark")
        for opcion in opciones:
            boton = ctk.CTkButton(
                self.menu_frame,
                text=opcion,
                fg_color="#e7b816",
                text_color="Black",
                corner_radius=15,  # ← aquí defines lo redondeado
                command=lambda op=opcion: self.cambiar_vista(op)
            )
            boton.pack(fill="x", pady=5, padx=10)

    # ===== LIMPIAR CONTENIDO =====
    def limpiar_pantalla(self):
        for widget in self.content_frame.winfo_children():
            widget.destroy()

    # ===== CAMBIAR VISTA =====
    def cambiar_vista(self, opcion):
        self.limpiar_pantalla()

        if opcion == "Inicio":
            tk.Label(self.content_frame, text="Bienvenido", font=("Arial", 20)).pack(pady=20)

        elif opcion == "Gauss-Jordan":
            tk.Label(self.content_frame, text="Módulo de Gauss-Jordan", font=("Arial", 16)).pack(pady=20)

        elif opcion == "Área":
            tk.Label(self.content_frame, text="Módulo de Área", font=("Arial", 16)).pack(pady=20)

        elif opcion == "Perímetro":
            tk.Label(self.content_frame, text="Módulo de Perímetro", font=("Arial", 16)).pack(pady=20)

        elif opcion == "Eq. Recta":
            tk.Label(self.content_frame, text="Eq. Recta del sistema", font=("Arial", 16)).pack(pady=20)
        
        elif opcion == "Eq. Recta 2p":
            tk.Label(self.content_frame, text="Eq. Recta dado 2 puntos", font=("Arial", 16)).pack(pady=20)
        
        elif opcion == "Eq. Recta 3p":
            tk.Label(self.content_frame, text="Eq. Recta dado 3 puntos", font=("Arial", 16)).pack(pady=20)

        elif opcion == "Salir":
            self.root.quit()


# ===== EJECUCIÓN =====
if __name__ == "__main__":
    root = tk.Tk()
    app = App(root)
    root.mainloop()