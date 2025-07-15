import threading
import pandas as pd
from cache.rw_lock import RWLock

rwlock = RWLock()
cache_store = {}

def insert_core_cache(key, value):
    global cache_store
    rwlock.acquire_write()
    try:
        cache_store[key] = value
    finally:
        rwlock.release_write()

def get_core_cache(key):
    global cache_store
    rwlock.acquire_read()
    try:
        return cache_store.get(key, None)
    finally:
        rwlock.release_read()


def clear_core_cache():
    global cache_store
    rwlock.acquire_write()
    try:
        cache_store.clear()
    finally:
        rwlock.release_write()