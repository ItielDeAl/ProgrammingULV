import sys  # Para cerrar el programa

# ===================== SOLICITAR DATOS =====================
def pedir_datos():
    try:
        nombre = input("Ingresa el nombre del corredor:\n").strip()
        if nombre == "":
            raise ValueError("Nombre vacío")

        edad = int(input("Ingresa la edad:\n").strip())

        genero = input("Ingrese su genero (M/F):\n").strip().upper()
        if genero not in ("M", "F"):
            raise ValueError("Genero inválido")

        return nombre, edad, genero

    except ValueError:
        print("Datos inválidos. Verifique la información ingresada.")
        sys.exit()


# ===================== VALIDAR CATEGORIA =====================
def list_categoria(categoria, edad):
    try:
        if categoria < 1 or categoria > 7:
            raise ValueError

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
                match edad:
                    case _ if 22 <= edad <= 39:
                        return "Empleados/Iglesia: 22-39 (7 km) — $80"
                    case _ if 40 <= edad <= 49:
                        return "Empleados/Iglesia: 40-49 (7 km) — $80"
                    case _ if edad >= 50:
                        return "Empleados/Iglesia: 50 y + (7 km) — $80"
                    case _:
                        raise ValueError

    except ValueError:
        raise ValueError("Error: Categoría no válida")


# ===================== MENUS =====================
menu_comp = """
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

menu_kids = """
CATEGORIAS DE PROMOCIÓN DISPONIBLES 

1. Infantil - Preescolar (2 vueltas) — $50
2. Primaria 1ro-3ro (3 vueltas) — $50
3. Primaria 4to-6to (4 vueltas) — $50
"""

menu_adultos = """
CATEGORIAS DE PROMOCIÓN DISPONIBLES

4. Secundaria (7 km) — $80
5. Preparatoria (7 km) — $80
6. Universitarios (7 km) — $80
7. Empleados/Iglesia:
   22-39 (7 km) — $80
   40-49 (7 km) — $80
   50 y + (7 km) — $80
"""

# ===================== VARIABLES =====================
medallas = 99
pago = 0

# ===================== PROGRAMA PRINCIPAL =====================
nombre, edad, genero = pedir_datos()

print("=" * 75)
print(menu_comp)
print("=" * 75)

try:
    categoria = int(input("Ingrese el numero de su categoria: ").strip())
    categoria_texto = list_categoria(categoria, edad)
except ValueError as e:
    print(e)
    sys.exit()

inscripcion = input('¿Inscripción Individual "I" o inscripción en pareja "P"? ').strip().upper()

match inscripcion:

    # ===================== INSCRIPCION EN PAREJA =====================
    case "P":

        # Calcular pago
        match categoria:
            case 1 | 2 | 3:
                pago = 80
            case _:
                pago = 150

        print("\nDatos del 2do Corredor")
        nombre2, edad2, genero2 = pedir_datos()

        match categoria:
            case 1 | 2 | 3:
                print(menu_kids)
            case _:
                print(menu_adultos)

        try:
            categoria2 = int(input("Ingrese el numero de su categoria: ").strip())
            categoria_texto2 = list_categoria(categoria2, edad2)
        except ValueError as e:
            print(e)
            sys.exit()

        print("\n" + "*" * 75)
        print("DATOS DE LOS INSCRITOS\n")

        # Primer corredor
        medallas += 1
        print(f'Corredor: {nombre}\nEdad: {edad}\nGenero: {genero}\nCategoria: {categoria_texto}')
        print("Gano medalla\n" if medallas <= 100 else "Medallas agotadas\n")

        # Segundo corredor
        medallas += 1
        print(f'Corredor: {nombre2}\nEdad: {edad2}\nGenero: {genero2}\nCategoria: {categoria_texto2}')
        print("Gano medalla\n" if medallas <= 100 else "Medallas agotadas\n")

    # ===================== INSCRIPCION INDIVIDUAL =====================
    case "I":

        match categoria:
            case 1 | 2 | 3:
                pago = 50
            case _:
                pago = 80

        medallas += 1
        print("\n" + "*" * 75)
        print("DATOS DEL INSCRITO\n")

        print(f'Corredor: {nombre}\nEdad: {edad}\nGenero: {genero}\nCategoria: {categoria_texto}')
        print("Gano medalla\n" if medallas <= 100 else "Medallas agotadas\n")

    case _:
        print("Seleccione una inscripción válida")
        sys.exit()

print("=" * 75)
print(f'Favor de pasar a pagar en el edificio C la cantidad de ${pago} pesos')