import numpy as np
import matplotlib.pyplot as plt

#ingreso de los valores de los coeficientes
coef= np.zeros(3)
valores= input("Ingrese los coeficientes a, b y c por espacios: ")
coef= np.fromstring(valores, sep=' ')
a=coef[0]
b=coef[1]
c=coef[2]

#cálculo de las raíces de la función
discriminante= b**2-4*a*c #cálculo del discriminante
 
if discriminante>0:
     x1= (-b+np.sqrt(discriminante))/2*a # cálculo de la primera raíz
     x2= (-b-np.sqrt(discriminante))/2*a # cálculo de la segunda raíz
     print("Las raíces de la ecuación f(x)",a,"x^2 +",b,"x +",c,", son: x1=",x1,"y x2=",x2)

elif discriminante==0:
    x1= (-b+discriminante)/2*a
    print("Las raíz de la ecuación f(x)=",a,"x^2 +",b,"x +",c,"es x1=",x1)

elif discriminante<0:
    print("La ecuación no tiene solución")

#etapa de graficación de la función
def f(x):
    return a*x**2+b*x+c  #definición de la función

x=np.linspace(-3,3,100)#rango de graficación

plt.plot(x,f(x),'r--',label='f(x)')#gráfica de la función f(x)
plt.xlabel('eje x')#texto para el eje x
plt.ylabel('eje y')#texto para el eje y
plt.legend(loc=1)#coloca leyenda para cada gráfica
plt.text(x1,f(x1), 'x1')
plt.text(x2,f(x2), 'x2')
plt.grid()#coloca cuadrí­cula
plt.title("Gráfica una función cuadrática")
plt.show()