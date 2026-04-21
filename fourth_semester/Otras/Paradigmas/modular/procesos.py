import datos

# ===================== SOLICITAR DATOS =====================
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


# ===================== VALIDAR CATEGORIA =====================
def list_categoria(categoria: str, edad: int):
    """
    devuelve la categoria del usuario

    Manejo de errores, evita que el usuario ingrese mal una 
    categoria y devuelve la correspondiente a la edad
    y categoria seleccionada.
    """
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


# ===================== IMPRIMIR CORREDOR =====================
def mostrar_inscrito(nombre: str, edad: int, genero: str, categoria_texto: str, medallas: int):
    """
    Imprime los datos del corredor
    """
    print(f'Corredor: #{medallas+1} {nombre}\nEdad: {edad}\nGenero: {genero}\nCategoria: {categoria_texto}')
    asignar_medalla()


# ===================== CONTROL DE MEDALLAS =====================
def asignar_medalla():
    """Actualiza las cantidad de medallas"""
    datos.medallas += 1

    if datos.medallas <= 100:
        print("Gano medalla.")
    else:
        print("Medallas agotadas.")
    print(f'{"~"*30}\n')


# ===================== CERRAR EL BUCLE =====================
def cerrar_programa():
    """Por medio de un bucle maneja el error para cerrar el programa"""

    continuar = input(f'¿Desea continuar inscribiendo? (Y/N), {"=" * 75}\n').upper()
    if continuar == 'N':
        datos.avanzar = False
    elif continuar == 'Y':
        datos.avanzar = True
    else:
        print('Ingrese una opción valida')
        print("=" * 75)
        cerrar_programa()


# ===================== MODULO INSCRIPCION INDIVIDUAL =====================
def inscripcion_individual(nombre, edad, genero, categoria, categoria_texto):
    match categoria:
        case 1 | 2 | 3:
            datos.pago = 50
        case _:
            datos.pago = 80

    print("\n" + "*" * 75)
    print("DATOS DEL INSCRITO\n")

    mostrar_inscrito(nombre, edad, genero, categoria_texto, datos.medallas)


# ===================== MODULO INSCRIPCION PAREJA =====================
def inscripcion_pareja(nombre, edad, genero, categoria, categoria_texto):
    match categoria:
        case 1 | 2 | 3:
            datos.pago = 80
        case _:
            datos.pago = 150

    print("\nDatos del 2do Corredor")
    nombre2, edad2, genero2 = pedir_datos()

    match categoria:
        case 1 | 2 | 3:
            print(datos.menu_kids)
        case _:
            print(datos.menu_adultos)

    categoria2 = int(input("Ingrese el numero de su categoria: ").strip())
    categoria_texto2 = list_categoria(categoria2, edad2)

    print("\n" + "*" * 75)
    print("DATOS DE LOS INSCRITOS\n")

    mostrar_inscrito(nombre, edad, genero, categoria_texto, datos.medallas)
    mostrar_inscrito(nombre2, edad2, genero2, categoria_texto2, datos.medallas)

    print("=" * 75)


# ===================== MODULO PRINCIPAL DE PROCESO =====================
def procesar_inscripcion():
    nombre, edad, genero = pedir_datos()

    print("=" * 75)
    print(datos.menu_comp)
    print("=" * 75)

    categoria = int(input("Ingrese el numero de su categoria: ").strip())
    categoria_texto = list_categoria(categoria, edad)

    inscripcion = input('¿Inscripción Individual "I" o inscripción en pareja "P"? ').strip().upper()

    match inscripcion:
        case "P":
            inscripcion_pareja(nombre, edad, genero, categoria, categoria_texto)
        case "I":
            inscripcion_individual(nombre, edad, genero, categoria, categoria_texto)
        case _:
            print("Seleccione una inscripción válida")

    print("=" * 75)
    print(f'Favor de pasar a pagar en el edificio C la cantidad de ${datos.pago} pesos')
    print("=" * 75)