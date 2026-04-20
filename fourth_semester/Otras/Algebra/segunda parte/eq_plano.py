def ecuacion_plano(): # Se crea la funcion para calcular la ecuacion del plano a partir de los tres puntos ingresados
    print("Ingresa el primer punto (x1, y1, z1):") # Se solicita al usuario que ingrese las coordenadas del primer punto
    x1 = float(input("x1: "))
    y1 = float(input("y1: "))
    z1 = float(input("z1: "))
    print("\nIngresa el segundo punto (x2, y2, z2):") # Se solicita al usuario que ingrese las coordenadas del segundo punto
    x2 = float(input("x2: "))
    y2 = float(input("y2: "))
    z2 = float(input("z2: "))
    print("\nIngresa el tercer punto (x3, y3, z3):") # Se solicita al usuario que ingrese las coordenadas del tercer punto
    x3 = float(input("x3: "))
    y3 = float(input("y3: "))
    z3 = float(input("z3: "))
  
    
    A= (y1*(z2 - z3)+ y2*(z3 - z1)+ y3*(z1 - z2)) # Se calcula el coeficiente A de la ecuacion del plano utilizando la formula de determinantes para tres puntos en el espacio
    B= (z1*(x2 - x3)+ z2*(x3 - x1)+ z3*(x1 - x2)) # Se calcula el coeficiente B de la ecuacion del plano utilizando la formula de determinantes para tres puntos en el espacio
    C= (x1*(y2 - y3)+ x2*(y3 - y1)+ x3*(y1 - y2)) # Se calcula el coeficiente C de la ecuacion del plano utilizando la formula de determinantes para tres puntos en el espacio
    D= -(x1*(y2*z3 - y3*z2)+
         x2*(y3*z1 - y1*z3)+
         x3*(y1*z2 - y2*z1))
    
# Verificar
    if A == 0 and B == 0 and C == 0: # Si los coeficientes A, B y C son todos cero, significa que los puntos son colineales y no forman un plano
     print("Error: Los puntos son colineales, no forman un plano.") # Se muestra un mensaje de error indicando que los puntos son colineales y no pueden formar un plano
     return 
    print ("\nEcuacion del plano") # Se muestra un mensaje indicando que se va a mostrar la ecuacion del plano
    print (f"{A}x + {B}y + {C}z + {D} = 0") # Se muestra la ecuacion del plano en la forma general Ax + By + Cz + D = 0 utilizando los coeficientes calculados anteriormente

ecuacion_plano() # Se llama a la funcion para ejecutar el programa 


 