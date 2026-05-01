# ===================== CLASE CORREDOR =====================
class Corredor:
    def __init__(self, nombre: str, edad: int, genero: str):
        self.nombre = nombre
        self.edad = edad
        self.genero = genero


# ===================== CLASE INSCRIPCION =====================
class Inscripcion:
    medallas = 99  

    def pedir_datos(self) -> Corredor:
        while True:
            try:
                nombre = input("Ingresa el nombre del corredor:\n").strip()
                if nombre == "":
                    raise ValueError("Nombre vacío")

                edad = input("Ingresa la edad:\n").strip()
                if edad == "":
                    raise ValueError("Edad vacía")
                edad = int(edad)

                genero = input("Ingrese su genero (M/F):\n").strip().upper()
                if genero not in ("M", "F"):
                    raise ValueError("Genero inválido")

                return Corredor(nombre, edad, genero)

            except ValueError as e:
                print(f"Error: {e}. Intente nuevamente.\n")

    def obtener_categoria(self, categoria: int, edad: int) -> str:
        if categoria < 1 or categoria > 7:
            raise ValueError("Categoría no válida")

        match categoria:
            case 1:
                return "Infantil - Preescolar (2 vueltas) — $50"
            case 2:
                return "Primaria 1ro-3ro (3 vueltas) — $50"
            case 3:
                return "Primaria 4to-6to (4 vueltas) — $50"
            case 4:
                return "Secundaria (7 km) — $80"
            case 5:
                return "Preparatoria (7 km) — $80"
            case 6:
                return "Universitarios (7 km) — $80"
            case 7:
                if 22 <= edad <= 39:
                    return "Empleados/Iglesia: 22-39 (7 km) — $80"
                elif 40 <= edad <= 49:
                    return "Empleados/Iglesia: 40-49 (7 km) — $80"
                elif edad >= 50:
                    return "Empleados/Iglesia: 50 y + (7 km) — $80"
                else:
                    raise ValueError("Edad no válida para categoría 7")

    def mostrar_inscrito(self, corredor: Corredor, categoria_texto: str):
        print(f'\nCorredor: #{Inscripcion.medallas + 1}')
        print(f'Nombre: {corredor.nombre}')
        print(f'Edad: {corredor.edad}')
        print(f'Genero: {corredor.genero}')
        print(f'Categoria: {categoria_texto}')
        self.asignar_medalla()

    def asignar_medalla(self):
        Inscripcion.medallas += 1

        if Inscripcion.medallas <= 100:
            print("Ganó medalla.")
        else:
            print("Medallas agotadas.")

        print("~" * 40)


# ===================== CLASE SISTEMA =====================
class SistemaCarrera:
    def __init__(self):
        self.avanzar = True
        self.inscripcion = Inscripcion()

        # ====== MENÚS  ======
        self.menu_comp = """
        CATEGORIAS DISPONIBLES

        1. Infantil - Preescolar (2 vueltas) — $50
        2. Primaria 1ro-3ro (3 vueltas) — $50
        3. Primaria 4to-6to (4 vueltas) — $50
        4. Secundaria (7 km) — $80
        5. Preparatoria (7 km) — $80
        6. Universitarios (7 km) — $80
        7. Empleados/Iglesia:
        22-39 (7 km) — $80
        40-49 (7 km) — $80
        50 y + (7 km) — $80
        """

        self.menu_kids = """
        CATEGORIAS DE PROMOCIÓN DISPONIBLES 

        1. Infantil - Preescolar (2 vueltas) — $50
        2. Primaria 1ro-3ro (3 vueltas) — $50
        3. Primaria 4to-6to (4 vueltas) — $50
        """

        self.menu_adultos = """
        CATEGORIAS DE PROMOCIÓN DISPONIBLES

        4. Secundaria (7 km) — $80
        5. Preparatoria (7 km) — $80
        6. Universitarios (7 km) — $80
        7. Empleados/Iglesia:
        22-39 (7 km) — $80
        40-49 (7 km) — $80
        50 y + (7 km) — $80
        """

    def pedir_categoria_valida(self, edad):
        while True:
            try:
                categoria = int(input("Ingrese el numero de su categoria: ").strip())
                categoria_texto = self.inscripcion.obtener_categoria(categoria, edad)
                return categoria, categoria_texto
            except ValueError as e:
                print(f"Error: {e}. Intente nuevamente.\n")

    def ejecutar(self):
        while self.avanzar:
            print("======================================= Bienvenido a la inscripción de la 8va Carrera de las estrellas =======================================")

            corredor1 = self.inscripcion.pedir_datos()

            print("=" * 75)
            print(self.menu_comp)
            print("=" * 75)

            categoria, categoria_texto = self.pedir_categoria_valida(corredor1.edad)

            tipo = input('¿Inscripción Individual "I" o inscripción en pareja "P"? ').strip().upper()

            if tipo == "I":
                self.proceso_individual(corredor1, categoria, categoria_texto)

            elif tipo == "P":
                self.proceso_pareja(corredor1, categoria)

            else:
                print("Seleccione una inscripción válida")

            print("=" * 75)
            self.cerrar_programa()

        print("Gracias por participar")

    def proceso_individual(self, corredor, categoria, categoria_texto):
        pago = 50 if categoria in (1, 2, 3) else 80

        print("\n" + "*" * 75)
        print("DATOS DEL INSCRITO\n")

        self.inscripcion.mostrar_inscrito(corredor, categoria_texto)

        print("=" * 75)
        print(f'Favor de pasar a pagar en el edificio C la cantidad de ${pago} pesos')

    def proceso_pareja(self, corredor1, categoria):
        pago = 80 if categoria in (1, 2, 3) else 150

        print("\nDatos del 2do Corredor")
        corredor2 = self.inscripcion.pedir_datos()

        print("=" * 75)
        if categoria in (1, 2, 3):
            print(self.menu_kids)
        else:
            print(self.menu_adultos)
        print("=" * 75)

        categoria2, categoria_texto2 = self.pedir_categoria_valida(corredor2.edad)

        print("\n" + "*" * 75)
        print("DATOS DE LOS INSCRITOS\n")

        self.inscripcion.mostrar_inscrito(
            corredor1,
            self.inscripcion.obtener_categoria(categoria, corredor1.edad),
        )

        self.inscripcion.mostrar_inscrito(corredor2, categoria_texto2)

        print("=" * 75)
        print(f'Favor de pasar a pagar en el edificio C la cantidad de ${pago} pesos')

    def cerrar_programa(self):
        while True:
            continuar = input("¿Desea continuar inscribiendo? (Y/N): ").strip().upper()
            if continuar == "Y":
                self.avanzar = True
                break
            elif continuar == "N":
                self.avanzar = False
                break
            else:
                print("Ingrese una opción válida")


# ===================== MAIN =====================
if __name__ == "__main__":
    sistema = SistemaCarrera()
    sistema.ejecutar()