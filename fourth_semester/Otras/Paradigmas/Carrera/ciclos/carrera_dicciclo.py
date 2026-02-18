medallas = 98
inscritos = 0
avanzar = True

while avanzar == True:
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

    pago_total = 0

    # ===================== SOLICITAR DATOS CORREDOR 1 =====================
    try:
        nombre = input("Ingresa el nombre del corredor:\n").strip()
        if not nombre:
            raise ValueError("Nombre vacío")

        edad_input = input("Ingresa la edad:\n").strip()
        if not edad_input:
            raise ValueError("Edad vacía")
        edad = int(edad_input)
        if edad <= 0:
            raise ValueError("Edad inválida")

        genero = input("Ingrese su genero (M/F):\n").strip().upper()
        if genero not in ("M", "F"):
            raise ValueError("Genero inválido")

        # ===================== MOSTRAR MENÚ COMPLETO =====================
        print("=" * 75)
        print("CATEGORIAS DISPONIBLES\n")
        for k, v in categorias.items():
            if k != 7:
                print(f"{k}. {v['nombre']} — ${v['precio']}")
            else:
                print("7. Empleados/Iglesia:")
                for rango, desc in v["rangos"].items():
                    print(f"   {desc} — ${v['precio']}")
        print("=" * 75)

        categoria = int(input("Ingrese el numero de su categoria: ").strip())

        # ===================== VALIDAR CATEGORIA 1 =====================
        if categoria not in categorias:
            raise ValueError("Error: Categoría no válida")

        if categoria != 7:
            mostrar = categorias[categoria]["nombre"]
            precio = categorias[categoria]["precio"]
        else:
            # Lógica para categoría 7 basada en rangos del diccionario
            encontrado = False
            for (min_e, max_e), desc in categorias[7]["rangos"].items():
                if min_e <= edad <= max_e:
                    mostrar = desc
                    precio = categorias[7]["precio"]
                    encontrado = True
                    break
            if not encontrado:
                raise ValueError("Edad no válida para categoría 7")

        # ===================== TIPO DE INSCRIPCIÓN =====================
        inscripcion = input('¿Inscripción Individual "I" o inscripción en pareja "P"? ').strip().upper()

        if inscripcion == "P":
            # Cálculo de pago especial para pareja
            pago_total = 80 if precio == 50 else 150

            print("\nDatos del 2do Corredor")
            nombre2 = input("Ingresa el nombre del corredor:\n").strip()
            if not nombre2: raise ValueError("Nombre vacío")

            edad2_input = input("Ingresa la edad:\n").strip()
            edad2 = int(edad2_input)

            genero2 = input("Ingrese su genero (M/F):\n").strip().upper()
            if genero2 not in ("M", "F"): raise ValueError("Genero inválido")

            # Mostrar menú filtrado según el precio del primer corredor
            print("=" * 75)
            print(f"CATEGORIAS DISPONIBLES (Precio: ${precio})")
            for k, v in categorias.items():
                if v["precio"] == precio:
                    if k != 7:
                        print(f"{k}. {v['nombre']}")
                    else:
                        for r, desc in v["rangos"].items():
                            print(f"   7. {desc}")
            print("=" * 75)

            categoria2 = int(input("Ingrese el numero de su categoria: ").strip())
            
            # Validar categoría 2 y que el precio coincida
            if categoria2 not in categorias or categorias[categoria2]["precio"] != precio:
                raise ValueError("La categoría debe ser del mismo costo que el primer corredor.")

            if categoria2 != 7:
                mostrar2 = categorias[categoria2]["nombre"]
            else:
                encontrado2 = False
                for (min_e, max_e), desc in categorias[7]["rangos"].items():
                    if min_e <= edad2 <= max_e:
                        mostrar2 = desc
                        encontrado2 = True
                        break
                if not encontrado2: raise ValueError("Edad 2 no válida para categoría 7")

            # ===================== RESULTADOS PAREJA =====================
            print("\n" + "*" * 75)
            print("DATOS DE LOS INSCRITOS\n")
            
            # Corredor 1
            inscritos += 1
            medallas += 1
            print(f"Corredor: {nombre}\nEdad: {edad}\nGenero: {genero}\nCategoria: {mostrar}")
            print(f'Felicidades corredor #{inscritos} Usted esta Inscrito')
            
            print("Gano medalla" if medallas <= 100 else "Medallas agotadas", "\n")

            # Corredor 2
            inscritos += 1
            medallas += 1
            print(f"Corredor: {nombre2}\nEdad: {edad2}\nGenero: {genero2}\nCategoria: {mostrar2}")
            print(f'Felicidades corredor #{inscritos} Usted esta Inscrito')    
            print("Gano medalla" if medallas <= 100 else "Medallas agotadas", "\n")

        elif inscripcion == "I":
            pago_total = precio
            inscritos += 1
            medallas += 1
            print("\n" + "*" * 75)
            print("DATOS DEL INSCRITO\n")
            print(f"Corredor: {nombre}\nEdad: {edad}\nGenero: {genero}\nCategoria: {mostrar}")
            print(f'Felicidades corredor #{inscritos} Usted esta Inscrito')
            print("Gano medalla" if medallas <= 100 else "Medallas agotadas", "\n")

        else:
            print("Seleccione una inscripción válida")

        if pago_total > 0:
            print("=" * 75)
            print(f"Favor de pasar a pagar en el edificio C la cantidad de ${pago_total} pesos")

    except ValueError as e:
        print(f"Error: {e}")
        print('Corredor no inscrito')
    print("\n" + "-" * 75)

    continuar = input('¿Desea continuar inscribiendo? (Y/N)\n').upper()
    if continuar == 'N':
        avanzar = False
    elif continuar != 'N' and continuar != 'Y':
        print('Ingrese una opción valida')

print('Gracias por participar')