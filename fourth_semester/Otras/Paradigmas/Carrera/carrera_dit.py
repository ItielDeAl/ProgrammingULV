import sys

# ===================== MODELO DE DATOS =====================

categorias = {
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

medallas = 100


# ===================== FUNCIONES =====================

def pedir_datos():
    try:
        nombre = input("Ingresa el nombre del corredor:\n").strip()
        if not nombre:
            raise ValueError

        edad = int(input("Ingresa la edad:\n").strip())
        if edad <= 0:
            raise ValueError

        genero = input("Ingrese su genero (M/F):\n").strip().upper()
        if genero not in ("M", "F"):
            raise ValueError

        return nombre, edad, genero

    except ValueError:
        print("Datos inválidos. Verifique la información ingresada.")
        sys.exit()


def obtener_categoria(categoria, edad):
    if categoria not in categorias:
        raise ValueError("Error: Categoría no válida")

    if categoria != 7:
        info = categorias[categoria]
        return info["nombre"], info["precio"]

    for (min_edad, max_edad), descripcion in categorias[7]["rangos"].items():
        if min_edad <= edad <= max_edad:
            return descripcion, categorias[7]["precio"]

    raise ValueError("Edad no válida para categoría 7")


def mostrar_menu():
    print("\nCATEGORIAS DISPONIBLES\n")
    for key, value in categorias.items():
        if key != 7:
            print(f"{key}. {value['nombre']} — ${value['precio']}")
        else:
            print("7. Empleados/Iglesia:")
            for rango, desc in value["rangos"].items():
                print(f"   {desc} — ${value['precio']}")
    print()


def mostrar_menu_filtrado(precio_objetivo):
    print("\nCATEGORIAS DISPONIBLES PARA INSCRIPCIÓN EN PAREJA\n")

    for key, value in categorias.items():

        if key != 7 and value["precio"] == precio_objetivo:
            print(f"{key}. {value['nombre']} — ${value['precio']}")

        elif key == 7 and value["precio"] == precio_objetivo:
            print("7. Empleados/Iglesia:")
            for rango, desc in value["rangos"].items():
                print(f"   {desc} — ${value['precio']}")
    print()


def asignar_medalla():
    global medallas
    if medallas > 0:
        medallas -= 1
        return "Ganó medalla"
    return "Medallas agotadas"


# ===================== PROGRAMA PRINCIPAL =====================

nombre, edad, genero = pedir_datos()

print("=" * 75)
mostrar_menu()
print("=" * 75)

try:
    categoria = int(input("Ingrese el numero de su categoria: ").strip())
    categoria_texto, precio = obtener_categoria(categoria, edad)
except ValueError as e:
    print(e)
    sys.exit()

inscripcion = input('¿Inscripción Individual "I" o inscripción en pareja "P"? ').strip().upper()

pago_total = 0

# ===================== INSCRIPCIÓN EN PAREJA =====================

if inscripcion == "P":

    print("\nDatos del 2do Corredor")
    nombre2, edad2, genero2 = pedir_datos()

    print("=" * 75)
    mostrar_menu_filtrado(precio)
    print("=" * 75)

    try:
        categoria2 = int(input("Ingrese el numero de su categoria: ").strip())
        categoria_texto2, precio2 = obtener_categoria(categoria2, edad2)

        if precio2 != precio:
            raise ValueError("La categoría debe ser del mismo costo que el primer corredor.")

    except ValueError as e:
        print(e)
        sys.exit()

    # 🔥 TARIFA ESPECIAL EN PAREJA
    if precio == 50:
        pago_total = 80
    elif precio == 80:
        pago_total = 150

    print("\n" + "*" * 75)
    print("DATOS DE LOS INSCRITOS\n")

    print(f"Corredor: {nombre}")
    print(f"Edad: {edad}")
    print(f"Genero: {genero}")
    print(f"Categoria: {categoria_texto}")
    print(asignar_medalla(), "\n")

    print(f"Corredor: {nombre2}")
    print(f"Edad: {edad2}")
    print(f"Genero: {genero2}")
    print(f"Categoria: {categoria_texto2}")
    print(asignar_medalla(), "\n")

# ===================== INSCRIPCIÓN INDIVIDUAL =====================

elif inscripcion == "I":

    pago_total += precio

    print("\n" + "*" * 75)
    print("DATOS DEL INSCRITO\n")

    print(f"Corredor: {nombre}")
    print(f"Edad: {edad}")
    print(f"Genero: {genero}")
    print(f"Categoria: {categoria_texto}")
    print(asignar_medalla(), "\n")

else:
    print("Seleccione una inscripción válida")
    sys.exit()

print("=" * 75)
print(f"Favor de pasar a pagar en el edificio C la cantidad de ${pago_total} pesos")
