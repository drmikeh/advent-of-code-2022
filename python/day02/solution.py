import pathlib
import sys

def transform(letter):
    dict = { 'A': 'ROCK', 'B': 'PAPER', 'C': 'SCISSORS', 'X': 'ROCK', 'Y': 'PAPER', 'Z': 'SCISSORS' }
    return dict[letter]

def parse(text_input):
    """Parse input."""

    for record in text_input:
        print(record)

    data = [list(map(transform, record)) for record in text_input]
    for record in data:
        print(record)
    return data

def part1(data):
    """Solve part 1."""

def part2(data):
    """Solve part 2."""

def solve(puzzle_input):
    """Solve the puzzle for the given input."""
    data = parse(puzzle_input)
    solution1 = part1(data)
    solution2 = part2(data)
    return solution1, solution2

if __name__ == "__main__":
    for path in sys.argv[1:]:
        # print(f"{path}:")
        # puzzle_input = pathlib.Path(path).read_text().strip()
        with open(pathlib.Path(path)) as f:
            games = [line.split() for line in f.readlines()]
        solutions = solve(games)
        print("\n".join(str(solution) for solution in solutions))
