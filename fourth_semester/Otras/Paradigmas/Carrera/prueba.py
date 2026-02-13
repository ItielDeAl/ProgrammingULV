import sys

# ===================== BASE DE DATOS (DICCIONARIO PRINCIPAL) =====================
CATEGORIAS = {
    1: {"nombre": "Infantil - Preescolar (2 vueltas)", "precio": 50},
    2: {"nombre": "Primaria 1ro-3ro (3 vueltas)", "precio": 50},
    3: {"nombre": "Primaria 4to-6to (4 vueltas)", "precio": 50},
    4: {"nombre": "Secundaria (7 km)", "precio": 80},
    5: {"nombre": "Preparatoria (7 km)", "precio": 80},
    6: {"nombre": "Universitarios (7 km)", "precio": 80},
    7: {
        "rangos": {
            (22, 39): "Empleados/Iglesia: 22-39 (7 km)",
            (40, 49): "Empleados/Iglesia: 40-49 (7 km)",
            (50, 120): "Empleados/Iglesia: 50 y + (7 km)"
        },
        "precio": 80
    }
}

# ===================== FUNCIONES =====================
def pedir_datos():
    try:
        nombre = input("Ingresa el nombre del corredor:\n").strip()
        if not nombre:
            raise ValueError("Nombre vacío")

        edad = int(input("Ingresa la edad:\n").strip())
        genero = input("Ingrese su genero (M/F):\n").strip().upper()

        if genero not in ("M", "F"):
            raise ValueError("Genero inválido")

        return nombre, edad, genero

    except ValueError:
        print("Datos inválidos.")
        sys.exit()


def obtener_categoria(numero, edad):
    if numero not in CATEGORIAS:
        print("Categoría inválida.")
        sys.exit()

    categoria = CATEGORIAS[numero]
    nombre = categoria["nombre"]
    distancia = categoria["distancia"]

    return nombre, distancia, categoria


def mostrar_menu_completo():
    print("\nCATEGORIAS DISPONIBLES\n")
    for clave, datos in CATEGORIAS.items():
        print(f"{clave}. {datos['nombre']} ({datos['distancia']}) — ${datos['precio']}")


def mostrar_menu_restriccion():
    print("\nCATEGORIAS DISPONIBLES PARA PAREJA (50 pesos)\n")
    for clave in (1, 2, 3):  # Solo las primeras tres categorías
        datos = CATEGORIAS[clave]
        print(f"{clave}. {datos['nombre']} ({datos['distancia']}) — ${datos['precio']}")


# ===================== PROGRAMA PRINCIPAL =====================
medallas = 99

nombre, edad, genero = pedir_datos()
mostrar_menu_completo()

try:
    categoria_num = int(input("\nIngrese el numero de su categoria: ").strip())
except ValueError:
    print("Debe ingresar un número válido.")
    sys.exit()

nombre_cat, distancia, datos_categoria = obtener_categoria(categoria_num, edad)

inscripcion = input('\n¿Inscripción Individual "I" o inscripción en pareja "P"? ').strip().upper()

if inscripcion not in ("I", "P"):
    print("Tipo de inscripción inválida.")
    sys.exit()

# Obtener precio según inscripción
precio = datos_categoria["precio"] if inscripcion == "I" else datos_categoria["precio"] * 1.5

print("\n" + "*" * 60)
print("DATOS DEL INSCRITO\n")

medallas += 1
print(f"Corredor: {nombre}")
print(f"Edad: {edad}")
print(f"Genero: {genero}")
print(f"Categoria: {nombre_cat} ({distancia})")
print("Gano medalla\n" if medallas <= 100 else "Medallas agotadas\n")

# ===================== INSCRIPCIÓN EN PAREJA =====================
if inscripcion == "P":
    # Filtrar menú si el primer costo es 50 pesos
    if datos_categoria["precio"] == 50:
        mostrar_menu_restriccion()
    else:
        mostrar_menu_completo()

    print("\nDatos del 2do Corredor")
    nombre2, edad2, genero2 = pedir_datos()

    try:
        categoria2_num = int(input("\nIngrese el número de su categoría: ").strip())
    except ValueError:
        print("Debe ingresar un número válido.")
        sys.exit()

    nombre_cat2, distancia2, datos_categoria2 = obtener_categoria(categoria2_num, edad2)

    medallas += 1
    print("\nDATOS DEL 2DO INSCRITO\n")
    print(f"Corredor: {nombre2}")
    print(f"Edad: {edad2}")
    print(f"Genero: {genero2}")
    print(f"Categoria: {nombre_cat2} ({distancia2})")
    print("Gano medalla\n" if medallas <= 100 else "Medallas agotadas\n")

print("=" * 60)
print(f"Favor de pasar a pagar en el edificio C la cantidad de ${precio} pesos")