from gpiozero import Buzzer, DigitalOutputDevice, Button
import RPi.GPIO as GPIO
import time
import tkinter as tk
from tkinter import messagebox

# Initialize GUI
root = tk.Tk()
root.title("Sistema de Alarma")
root.geometry("300x200")  # Reduced size since we don't need keypad space

# Create display
display_var = tk.StringVar()
display_var.set("")

display_label = tk.Label(root, textvariable=display_var, font=('Arial', 20), height=2)
display_label.pack(pady=20)

# Status label for messages
status_var = tk.StringVar()
status_var.set("Ingrese contraseña")

status_label = tk.Label(root, textvariable=status_var, font=('Arial', 14))
status_label.pack(pady=10)

# GPIO Setup
ledR = 37
ledB = 40
ledG = 38
sGas = 35
buzzer = Buzzer(16)

# Matrix keypad setup
rows_pins = [18, 23, 24, 25]
cols_pins = [10, 22, 27, 17]
keys = ["1", "2", "3", "A",
        "4", "5", "6", "B",
        "7", "8", "9", "C",
        "*", "0", "#", "D"]

GPIO.setmode(GPIO.BOARD)
GPIO.setup(ledR, GPIO.OUT)
GPIO.setup(ledB, GPIO.OUT)
GPIO.setup(ledG, GPIO.OUT)
GPIO.setup(sGas, GPIO.IN)

# Initialize row pins as DigitalOutputDevice
rows = [DigitalOutputDevice(pin) for pin in rows_pins]
# Initialize column pins as Buttons
cols = [Button(pin, pull_up=False) for pin in cols_pins]

intento = 0
entered_keys = []
password = ["1", "7", "0", "3"]

def update_display():
    display_var.set("".join(entered_keys))

def check_password():
    global intento, entered_keys
    if entered_keys == password:
        status_var.set("ACCESO CONCEDIDO")
        GPIO.output(ledB, 1)
        root.after(2500, lambda: [GPIO.output(ledB, 0), status_var.set("Aire limpio")])
    else:
        status_var.set("ACCESO DENEGADO")
        intento += 1
        GPIO.output(ledR, 1)
        root.after(1000, lambda: [GPIO.output(ledR, 0), status_var.set("Aire limpio")])
        if intento >= 3:
            status_var.set("SISTEMA BLOQUEADO")
            GPIO.output(ledR, 1)
            GPIO.output(ledG, 0)
            buzzer.beep(0.5, 0.25)
    entered_keys = []
    update_display()

def check_gas():
    lectura = GPIO.input(sGas)
    if lectura == 0:
        status_var.set("¡GAS DETECTADO!")
        GPIO.output(ledR, 1)
        GPIO.output(ledG, 0)
        buzzer.beep(0.5, 0.25, 2)
        root.after(1000, lambda: [GPIO.output(ledR, 0), status_var.set("Aire limpio")])
    else:
        GPIO.output(ledG, 1)
        GPIO.output(ledR, 0)
    root.after(100, check_gas)

# Add close button (add this before mainloop)
close_button = tk.Button(root, text="Cerrar", command=root.destroy)
close_button.pack(pady=10)

def read_keypad():
    pressed_keys = []
    for i, row in enumerate(rows):
        row.on()
        for j, col in enumerate(cols):
            if col.is_pressed:
                index = i * len(cols) + j
                key = keys[index]
                if key == "#":
                    check_password()
                elif key == "*":
                    entered_keys.clear()
                    update_display()
                else:
                    if intento < 3:
                        entered_keys.append(key)
                        update_display()
        row.off()
    root.after(100, read_keypad)

# Start keypad and gas checking
read_keypad()
check_gas()

# Initialize LED states
GPIO.output(ledR, 0)
GPIO.output(ledG, 1)
GPIO.output(ledB, 0)

status_var.set("Aire limpio")

root.mainloop()

# Cleanup
GPIO.cleanup()