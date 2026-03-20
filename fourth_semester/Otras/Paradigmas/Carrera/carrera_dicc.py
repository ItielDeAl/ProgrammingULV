
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

# ===================== FUNCIONES =====================
def pedir_datos():
    """
    Obtiene datos del usuario

    Manejo de errores, evita que el usuario ingrese mal una 
    solicitud las variables donde se almacenan se llama de 
    la misma manera que el dato que se solicita.
    """


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

    return nombre, edad, genero
    


def obtener_categoria(categoria, edad):
    try:   
        """
        devuelve la categoria del usuario

        Manejo de errores, evita que el usuario ingrese mal una 
        categoria y devuelve la correspondiente a la edad
        y categoria seleccionada.
        """
        if categoria not in categorias:
            raise ValueError("Error: Categoría no válida")

        if categoria != 7:
            info = categorias[categoria]
            return info["nombre"], info["precio"]

        for (min_edad, max_edad), descripcion in categorias[7]["rangos"].items():
            if min_edad <= edad <= max_edad:
                return descripcion, categorias[7]["precio"]
    except ValueError:
        raise ValueError("Error: Categoría no válida")

def mostrar_menu():
    """IMPRIME EL MENU COMPLETO"""
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
    """"""
    print("\nCATEGORIAS DISPONIBLES PARA INSCRIPCIÓN EN PAREJA\n")

    for key, value in categorias.items():

        if key != 7 and value["precio"] == precio_objetivo:
            print(f"{key}. {value['nombre']} — ${value['precio']}")

        elif key == 7 and value["precio"] == precio_objetivo:
            print("7. Empleados/Iglesia:")
            for rango, desc in value["rangos"].items():
                print(f"   {desc} — ${value['precio']}")
    print()

# ===================== IMPRIMIR CORREDOR =====================
def mostrar_inscrito(nombre: str, edad: int, genero: str, categoria_texto: str, medallas: int):
    """
    Imprime los datos del corredor

    recopila los datos ya ingresados 
    para mostrarlos y actuzaliza 
    la cantidad de medallas mediante 
    el llamado a otra función.
    """

    print(f'Corredor: #{medallas+1} {nombre}\nEdad: {edad}\nGenero: {genero}\nCategoria: {categoria_texto}')
    asignar_medalla()

# ===================== CONTROL DE MEDALLAS =====================
def asignar_medalla():
    """Actualiza las cantidad de medallas"""
    global medallas
    medallas += 1

    if medallas <= 100:
        print("Gano medalla.")
    else:
        print("Medallas agotadas.")
    print(f"{"~"*30} \n")

# ===================== CERRAR EL BUCLE =====================

def cerrar_programa():
    """Por medio de un bucle maneja el error para cerrar el programa"""

    global avanzar

    continuar = input(f'¿Desea continuar inscribiendo? (Y/N), {"=" * 75}\n').upper()
    if continuar == 'N':
        avanzar = False

    elif continuar == 'Y':
        avanzar = True

    else:
        print('Ingrese una opción valida')
        print("=" * 75)
        cerrar_programa()

# ===================== VARIABLES =====================
avanzar = True
medallas = 99
pago = 0

# ===================== PROGRAMA PRINCIPAL =====================
while avanzar:

    try:   
        nombre, edad, genero = pedir_datos()

        print("=" * 75)
        mostrar_menu()
        print("=" * 75)

        categoria = int(input("Ingrese el numero de su categoria: ").strip())
        categoria_texto, precio = obtener_categoria(categoria, edad)

        inscripcion = input('¿Inscripción Individual "I" o inscripción en pareja "P"? ').strip().upper()

        # ===================== INSCRIPCIÓN EN PAREJA =====================

        if inscripcion == "P":

            print("\nDatos del 2do Corredor")
            nombre2, edad2, genero2 = pedir_datos()

            print("=" * 75)
            mostrar_menu_filtrado(precio)
            print("=" * 75)

            categoria2 = int(input("Ingrese el numero de su categoria: ").strip())
            categoria_texto2, precio2 = obtener_categoria(categoria2, edad2)

            if precio2 != precio:
                raise ValueError("La categoría debe ser del mismo costo que el primer corredor.")

            #TARIFA ESPECIAL EN PAREJA
            if precio == 50:
                pago = 80
            elif precio == 80:
                pago = 150

            print("\n" + "*" * 75)
            print("DATOS DE LOS INSCRITOS\n")

            # Primer corredor
            mostrar_inscrito(nombre, edad, genero, categoria_texto, medallas)

            # Segundo corredor
            mostrar_inscrito(nombre2, edad2, genero2, categoria_texto2, medallas)
            print("=" * 75)

        # ===================== INSCRIPCIÓN INDIVIDUAL =====================

        elif inscripcion == "I":

            pago += precio

            mostrar_inscrito(nombre, edad, genero, categoria_texto, medallas)

        else:
            print("Seleccione una inscripción válida")

        print("=" * 75)
        print(f"Favor de pasar a pagar en el edificio C la cantidad de ${pago} pesos")
        print("=" * 75)

    except ValueError:
            print("Datos inválidos. Verifique la información ingresada.")
            print('Corredor no inscrito')
            print("\n" + "-" * 75)
    
    cerrar_programa()

print('Gracias por participar')