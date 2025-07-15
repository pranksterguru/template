import threading

class RWLock:
    def __init__(self):
        self.lock = threading.Lock()
        self.read_ready = threading.Condition(self.lock)
        self.readers = 0

    def acquire_read(self):
        with self.lock:
            self.readers += 1

    def release_read(self):
        with self.lock:
            self.readers -= 1
            if self.readers == 0:
                self.read_ready.notify_all()  # Allow writers when no readers left

    def acquire_write(self):
        self.lock.acquire()
        while self.readers > 0:
            self.read_ready.wait()  # Wait for readers to finish

    def release_write(self):
        self.lock.release()
