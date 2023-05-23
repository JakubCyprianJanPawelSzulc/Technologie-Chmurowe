import platform

def powitanie():
    system = platform.system()
    if system == 'Linux':
        return 'Willkommen bei Linux!'
    elif system == 'Windows':
        return 'Willkommen im Fenstersystem!'
    else:
        return 'Achtung! Fehler aufgetreten!'

if __name__ == '__main__':
    print(powitanie())