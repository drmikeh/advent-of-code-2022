t = 0

for line in open('input.txt'):
    x = len(line) // 2
    a = line[:x]
    b = line[x:]
    k, = set(a) & set(b)
    if k >= "a":
        t += ord(k) - ord("a") + 1
    else:
        t += ord(k) - ord("A") + 27

print(t)
assert t == 7848, 'Incorrect result'
