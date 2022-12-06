for line in open('input.txt'):
    for x in range(4, len(line)):
        if len(set(line[x - 4:x])) == 4:
            print(x)
            assert x == 1987
            exit(0)
