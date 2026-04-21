from procesos import procesar_inscripcion, cerrar_programa
import datos

# ===================== PROGRAMA PRINCIPAL =====================
def main():

    while datos.avanzar:
        try:
            procesar_inscripcion()
        except ValueError:
            print("Datos inválidos. Verifique la información ingresada.")
            print('Corredor no inscrito')
            print("\n" + "-" * 75)

        cerrar_programa()

    print('Gracias por participar')


# ===================== EJECUCION =====================
main()