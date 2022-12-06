import re

s = []

x = open('input.txt')

for line in x:
    if line == "\n": break
    s.append([line[k * 4 + 1] for k in range(len(line) // 4)]) # this is just line[1::4] - thanks UnrelatedString

s.pop()

# transpose and flip matrix
s = [list("".join(c).strip()[::-1]) for c in zip(*s)]
# print('\n'.join('\t'.join(map(str, row)) for row in s))

for line in x:
    a, b, c = map(int, re.findall("\\d+", line))
    s[c - 1].extend(s[b - 1][-a:][::-1])
    s[b - 1] = s[b - 1][:-a]

result = "".join([a[-1] for a in s])
print(result)
assert result == 'CNSZFDVLJ'
