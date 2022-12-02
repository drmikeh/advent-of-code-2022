def read_file(filename: str, separator: str='\n'):
    with open(filename) as f:
        lines = f.read().split(separator)
    return lines
