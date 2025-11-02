import numpy as np #librerías por utilizar
import matplotlib.pyplot as plt

def f(x):
    return 5*np.cos(x)+x**2-6 #note como se declara la función coseno usando np

def g(x):
    return np.sqrt(x)+x**2-6 #note como se declara la función raíz cuadrada usando np

x=np.linspace(-5,5,100)#rango de graficación

plt.plot(x,f(x),'r--',label='f(x)')#gráfica de la función f(x)
plt.plot(x,g(x),label='g(x)')#gráfica de la función f(y)
plt.xlabel('eje x')#texto para el eje x
plt.ylabel('eje y')#texto para el eje y
plt.legend(loc=1)#coloca leyenda para cada gráfica
plt.grid()#coloca cuadrícula
plt.show()