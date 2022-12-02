from file_reader import read_file

lines = read_file('input.txt', '\n\n')
elf_calories = [list(map(int, line.strip().split('\n'))) for line in lines]

max = 0
for elf in elf_calories:
    if max <= sum(elf):
        max = sum(elf)
print(max)
