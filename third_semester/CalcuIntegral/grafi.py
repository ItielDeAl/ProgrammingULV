

import numpy as np #librerías por utilizar
import matplotlib.pyplot as plt

#limites de integracion

a = 0

b = 4

#c = 0

def f(x):
    return 4*x-x**2

def g(x):
    return 3-x
                  
x=np.linspace(-1,6, 400)#rango de graficación

plt.title('Gráfica de la función')

plt.plot(x,f(x),'r--',label='f(x)', color='blue')#gráfica de la función f(x)

#plt.plot(x,g(x),label='g(x)', color='brown')#gráfica de la función f(y)

plt.xlabel('eje x')#texto para el eje x
plt.ylabel('eje y')#texto para el eje y
plt.axhline(0, color='black', linewidth=1)
plt.axvline(0, color='black', linewidth=1)

plt.axvline(a, color='green', linewidth=1, ls='--', label=a)

plt.axhline(6, color='red', linewidth=1, label='eje de giro')

plt.axvline(b, color='orange', linewidth=1,ls='--', label=b)

plt.legend(loc=1)#coloca leyenda para cada gráfica
plt.grid()#coloca cuadrícula
plt.show()

"""

import numpy as np #librerías por utilizar
import matplotlib.pyplot as plt

#limites de integracion
a = 2
b = 2

# Definimos las dos ramas de la parábola y^2 = 8x
def f1(x):
    # Usamos np.errstate para ignorar los warnings de raíces negativas
    # numpy devolverá 'NaN' (Not a Number) para x < 0, y matplotlib no los graficará.
    with np.errstate(invalid='ignore'):
        return np.sqrt(8*x) 

def f2(x):
    with np.errstate(invalid='ignore'):
        return -np.sqrt(8*x) 
      
x = np.linspace(-10, 10, 400) #rango de graficación

plt.title('Gráfica de la relación $y^2 = 8x$')

# Gráfica de la rama superior (la que ya tenías)
# Le ponemos la etiqueta aquí
plt.plot(x, f1(x), label='$y^2 = 8x$', color='blue')

# Gráfica de la rama inferior
# Usamos el mismo color pero sin etiqueta, para que la leyenda sea una sola
plt.plot(x, f2(x), color='blue')

plt.xlabel('eje x') #texto para el eje x
plt.ylabel('eje y') #texto para el eje y
plt.axhline(0, color='black', linewidth=0.5)
plt.axvline(0, color='black', linewidth=0.5)

plt.axvline(a, color='red', linewidth=1, label= 'eje de giro')


# Tu línea vertical
#plt.axvline(a, color='green', linewidth=1, ls='--', label=f'x = {a}')

plt.legend(loc=1) #coloca leyenda para cada gráfica
plt.grid() #coloca cuadrícula
plt.show()
"""