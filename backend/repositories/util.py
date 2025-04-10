import datetime
import time


def generate_epoch_timestamp():
    return time.time()


def generate_string_datetime():
    dt = datetime.datetime.now()
    current_datetime = str(f'{dt.year}-{dt.month}-{dt.day}-{dt.hour}')
    return current_datetime


def generate_datetime():
    dt = datetime.datetime.now()
    return str(dt)
