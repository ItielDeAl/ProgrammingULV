import numpy as np
import matplotlib.pyplot as plt

#Derivada
x = np.arange(-2,10,0.5)
y = x**2+4*x

#Recta tangente.
x1 = np.arange(-2,10,0.5)
y1 = 6*x-1

#interseccion
xi = 1
yi = 5

#Imprimir derivada
plt.plot(x,y, label='Derivada')

#Imprimir recta tangente
plt.plot(x1,y1,'r--', label='Tangente')

#imprimir punto
plt.plot(xi,yi,'black' , marker= 'o', label = 'intersección (1,5)')


#Mostrar texto
plt.xlabel('eje x')
plt.ylabel('eje y')
plt.title('Ejercicio 5.3. A')

#Imprimir cuadriculas
plt.grid(True)
plt.legend()

#imprimir origen
plt.axhline(0, color='black',linewidth =1)
plt.axvline(0, color='black',linewidth =1)

#imprimir grafica
plt.show()