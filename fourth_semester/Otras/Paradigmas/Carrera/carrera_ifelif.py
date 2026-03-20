
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
        categoria = int(categoria)

        if categoria < 1 or categoria > 7:
            raise ValueError

        if categoria == 1:
            return "Infantil - Preescolar (2 vueltas) — $50"
        elif categoria == 2:
            return "Primaria 1ro-3ro (3 vueltas) — $50"
        elif categoria == 3:
            return "Primaria 4to-6to (4 vueltas) — $50"
        elif categoria == 4:
            return "Secundaria (7 km) — $80"
        elif categoria == 5:
            return "Preparatoria (7 km) — $80"
        elif categoria == 6:
            return "Universitarios (7 km) — $80"
        elif categoria == 7:
            if 22 <= edad <= 39:
                return "Empleados/Iglesia: 22-39 (7 km) — $80"
            elif 40 <= edad <= 49:
                return "Empleados/Iglesia: 40-49 (7 km) — $80"
            elif edad >= 50:
                return "Empleados/Iglesia: 50 y + (7 km) — $80"
            else:
                raise ValueError

    except ValueError:
        raise ValueError("Error: Categoría no válida")

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
avanzar = True
medallas = 99
pago = 0

# ===================== PROGRAMA PRINCIPAL =====================
while avanzar:
    
    try:
        nombre, edad, genero = pedir_datos()

        print("=" * 75)
        print(menu_comp)
        print("=" * 75)

        categoria = input("Ingrese el numero de su categoria: ").strip()
        categoria_texto = list_categoria(categoria, edad)
        
        inscripcion = input('¿Inscripción Individual "I" o inscripción en pareja "P"? ').strip().upper()

        # ===================== INSCRIPCION EN PAREJA =====================
        if inscripcion == "P":
            #todo Costo a pagar
            if categoria in ("1", "2", "3"):
                pago = 80
            else:
                pago = 150

            print("\nDatos del 2do Corredor")
            nombre2, edad2, genero2 = pedir_datos()

            if categoria in ("1", "2", "3"):
                print(menu_kids)
            else:
                print(menu_adultos)

            categoria2 = input("Ingrese el numero de su categoria: ").strip()
            categoria_texto2 = list_categoria(categoria2, edad2)


            print("\n" + "*" * 75)
            print("DATOS DE LOS INSCRITOS\n")

            # Primer corredor
            mostrar_inscrito(nombre, edad, genero, categoria_texto, medallas)

            # Segundo corredor
            mostrar_inscrito(nombre2, edad2, genero2, categoria_texto2, medallas)
            print("=" * 75)


        # ===================== INSCRIPCION INDIVIDUAL =====================
        elif inscripcion == "I":
            #todo Costo a pagar
            if categoria in ("1", "2", "3"):
                pago = 50
            else:
                pago = 80
            print("\n" + "*" * 75)
            print("DATOS DEL INSCRITO\n")

            mostrar_inscrito(nombre, edad, genero, categoria_texto, medallas)

        else:
            print("Seleccione una inscripción válida")

        print("=" * 75)
        print(f'Favor de pasar a pagar en el edificio C la cantidad de ${pago} pesos')
        print("=" * 75)


    except ValueError:
            print("Datos inválidos. Verifique la información ingresada.")
            print('Corredor no inscrito')
            print("\n" + "-" * 75)

    cerrar_programa()


print('Gracias por participar')