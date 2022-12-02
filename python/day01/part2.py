from file_reader import read_file

lines = read_file('input.txt', '\n\n')
elf_calories = [list(map(int, line.strip().split('\n'))) for line in lines]

summed_calories = [sum(elf) for elf in elf_calories]
print(sum(sorted(summed_calories, reverse=True)[0:3]))
