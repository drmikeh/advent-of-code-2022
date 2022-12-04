t = 0

with open('input.txt') as f:
    lines = f.readlines()
    for index in range(0, len(lines), 3):
        x = lines[index].strip()
        y = lines[index+1].strip()
        z = lines[index+2].strip()

        k, = set(x) & set(y) & set(z)
        if k >= "a":
            t += ord(k) - ord("a") + 1
        else:
            t += ord(k) - ord("A") + 27

print(t)
assert t == 2616, 'Incorrect result'
