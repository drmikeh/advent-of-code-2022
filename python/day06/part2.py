for line in open('input.txt'):
    for x in range(14, len(line)):
        if len(set(line[x - 14:x])) == 14:
            print(x)
            assert x == 3059
            exit(0)
