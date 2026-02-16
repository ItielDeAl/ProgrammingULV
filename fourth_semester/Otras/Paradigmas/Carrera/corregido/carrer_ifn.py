
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

# ===================== SOLICITAR DATOS =====================
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


                # ===================== VARIABLES =====================
        medallas = 99
        pago = 0
        print("=" * 75)
        print(menu_comp)
        print("=" * 75)

        try:
            categoria = input("Ingrese el numero de su categoria: ").strip()
            
            # ===================== VALIDAR CATEGORIA =====================
            try:
                    categoria = int(categoria)

                    if categoria < 1 or categoria > 7:
                        raise ValueError

                    if categoria == 1:
                        mostrar = "Infantil - Preescolar (2 vueltas) — $50"
                    elif categoria == 2:
                        mostrar = "Primaria 1ro-3ro (3 vueltas) — $50"
                    elif categoria == 3:
                        mostrar = "Primaria 4to-6to (4 vueltas) — $50"
                    elif categoria == 4:
                        mostrar = "Secundaria (7 km) — $80"
                    elif categoria == 5:
                        mostrar = "Preparatoria (7 km) — $80"
                    elif categoria == 6:
                        mostrar = "Universitarios (7 km) — $80"
                    elif categoria == 7:
                        if 22 <= edad <= 39:
                            mostrar = "Empleados/Iglesia: 22-39 (7 km) — $80"
                        elif 40 <= edad <= 49:
                            mostrar = "Empleados/Iglesia: 40-49 (7 km) — $80"
                        elif edad >= 50:
                            mostrar = "Empleados/Iglesia: 50 y + (7 km) — $80"
                        else:
                            raise ValueError

            except ValueError:
                    raise ValueError("Error: Categoría no válida")
                

        except ValueError as e:
            print(e)

        inscripcion = input('¿Inscripción Individual "I" o inscripción en pareja "P"? ').strip().upper()

        # ===================== INSCRIPCION EN PAREJA =====================
        if inscripcion == "P":
            #todo Costo a pagar
            if categoria in ("1", "2", "3"):
                pago = 80
            else:
                pago = 150

            print("\nDatos del 2do Corredor")
            try:
                nombre2 = input("Ingresa el nombre del corredor:\n").strip()
                if nombre2 == "":
                    raise ValueError("Nombre vacío")

                edad2 = input("Ingresa la edad:\n").strip()
                if edad2 == "":
                    raise ValueError("Edad vacía")
                edad2 = int(edad2)

                genero2 = input("Ingrese su genero (M/F):\n").strip().upper()
                if genero2 not in ("M", "F"):
                    raise ValueError("Genero inválido")
                if categoria in ("1", "2", "3"):
                    print(menu_kids)
                else:
                    print(menu_adultos)

                try:
                    categoria2 = input("Ingrese el numero de su categoria: ").strip()
                    #####
                    # ===================== VALIDAR CATEGORIA =====================
                    try:
                            categoria2 = int(categoria2)

                            if categoria2 < 1 or categoria2 > 7:
                                raise ValueError

                            if categoria2 == 1:
                                mostrar2 = "Infantil - Preescolar (2 vueltas) — $50"
                            elif categoria2 == 2:
                                mostrar2 = "Primaria 1ro-3ro (3 vueltas) — $50"
                            elif categoria2 == 3:
                                mostrar2 = "Primaria 4to-6to (4 vueltas) — $50"
                            elif categoria2 == 4:
                                mostrar2 = "Secundaria (7 km) — $80"
                            elif categoria2 == 5:
                                mostrar2 = "Preparatoria (7 km) — $80"
                            elif categoria2 == 6:
                                mostrar2 = "Universitarios (7 km) — $80"
                            elif categoria2 == 7:
                                if 22 <= edad2 <= 39:
                                    mostrar2 = "Empleados/Iglesia: 22-39 (7 km) — $80"
                                elif 40 <= edad2 <= 49:
                                    mostrar2 = "Empleados/Iglesia: 40-49 (7 km) — $80"
                                elif edad2 >= 50:
                                    mostrar2 = "Empleados/Iglesia: 50 y + (7 km) — $80"
                                else:
                                    raise ValueError

                    except ValueError:
                            raise ValueError("Error: Categoría no válida")
                    #####
                except ValueError as e:
                    print(e)

                print("\n" + "*" * 75)
                print("DATOS DE LOS INSCRITOS\n")

                # Primer corredor
                medallas += 1
                print(f'Corredor: {nombre}\nEdad: {edad}\nGenero: {genero}\nCategoria: {mostrar}')
                if medallas <= 100:
                    print("Gano medalla\n")
                else:
                    print("Medallas agotadas\n")

                # Segundo corredor
                medallas += 1
                print(f'Corredor: {nombre2}\nEdad: {edad2}\nGenero: {genero2}\nCategoria: {mostrar2}')
                if medallas <= 100:
                    print("Gano medalla\n")
                else:
                    print("Medallas agotadas\n")
                print("=" * 75)
                print(f'Favor de pasar a pagar en el edificio C la cantidad de ${pago} pesos')
            except ValueError:
                print("Datos inválidos. Verifique la información ingresada.")

            

        # ===================== INSCRIPCION INDIVIDUAL =====================
        elif inscripcion == "I":
            #todo Costo a pagar
            if categoria in ("1", "2", "3"):
                pago = 50
            else:
                pago = 80
            medallas += 1
            print("\n" + "*" * 75)
            print("DATOS DEL INSCRITO\n")

            print(f'Corredor: {nombre}\nEdad: {edad}\nGenero: {genero}\nCategoria: {mostrar}')
            if medallas <= 100:
                print("Gano medalla\n")
            else:
                print("Medallas agotadas\n")
            print("=" * 75)
            print(f'Favor de pasar a pagar en el edificio C la cantidad de ${pago} pesos')

        else:
            print("Seleccione una inscripción válida")
        

except ValueError:
        print("Datos inválidos. Verifique la información ingresada.")