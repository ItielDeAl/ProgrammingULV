import subprocess
import sys
import time
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

proceso = None
ARCHIVO = "ecuatrix.py" 

class ReloadHandler(FileSystemEventHandler):
    def on_modified(self, event):
        global proceso
        if event.src_path.endswith(".py"):
            print("Cambio detectado, reiniciando...")

            if proceso:
                proceso.kill()

            proceso = subprocess.Popen([sys.executable, ARCHIVO])

if __name__ == "__main__":
    proceso = subprocess.Popen([sys.executable, ARCHIVO])

    observer = Observer()
    observer.schedule(ReloadHandler(), path=".", recursive=False)
    observer.start()

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
        proceso.kill()

    observer.join()