import pathlib
import sys
import functools
import operator

def transform1(letter):
    dict = { 'A': 'ROCK', 'B': 'PAPER', 'C': 'SCISSORS', 'X': 'ROCK', 'Y': 'PAPER', 'Z': 'SCISSORS' }
    return dict[letter]

def parse1(text_input):
    """Parse input."""
    return [list(map(transform1, record)) for record in text_input]

toolPointsMap = { 'ROCK': 1, 'PAPER': 2, 'SCISSORS': 3 }

LOST_POINTS = 0
DRAW_POINTS = 3
WIN_POINTS = 6

def part1(data):
    """Solve part 1."""
    outcomePointsMap = {
        'ROCK': { 'ROCK': DRAW_POINTS, 'PAPER': LOST_POINTS, 'SCISSORS': WIN_POINTS },
        'PAPER': { 'ROCK': WIN_POINTS, 'PAPER': DRAW_POINTS, 'SCISSORS': LOST_POINTS },
        'SCISSORS': { 'ROCK': LOST_POINTS, 'PAPER': WIN_POINTS, 'SCISSORS': DRAW_POINTS },
    }
    calcScore = lambda tools : toolPointsMap[tools[1]] + outcomePointsMap[tools[1]][tools[0]]
    score = functools.reduce(operator.add, map(lambda game : calcScore(game), data))
    assert score == 12458, 'Incorrect score'
    return score

def transform2(letter):
    dict = { 'A': 'ROCK', 'B': 'PAPER', 'C': 'SCISSORS', 'X': 'LOSE', 'Y': 'DRAW', 'Z': 'WIN' }
    return dict[letter]

def parse2(text_input):
    """Parse input."""
    return [list(map(transform2, record)) for record in text_input]

def part2(data):
    """Solve part 2."""
    findMyToolMap = {
        'ROCK': { 'WIN': 'PAPER', 'DRAW': 'ROCK', 'LOSE': 'SCISSORS' },
        'PAPER': { 'WIN': 'SCISSORS', 'DRAW': 'PAPER', 'LOSE': 'ROCK' },
        'SCISSORS': { 'WIN': 'ROCK', 'DRAW': 'SCISSORS', 'LOSE': 'PAPER' },
    }
    outcomePointsMap = {
        'LOSE': 0,
        'DRAW': 3,
        'WIN': 6
    }

    calcScore = lambda game : toolPointsMap[findMyToolMap[game[0]][game[1]]] + outcomePointsMap[game[1]]
    score = functools.reduce(operator.add, map(lambda game : calcScore(game), data))
    assert score == 12683, 'Incorrect score'
    return score

def solve(puzzle_input):
    """Solve the puzzle for the given input."""
    data1 = parse1(puzzle_input)
    solution1 = part1(data1)
    data2 = parse2(puzzle_input)
    solution2 = part2(data2)
    return solution1, solution2

if __name__ == "__main__":
    for path in sys.argv[1:]:
        # print(f"{path}:")
        with open(pathlib.Path(path)) as f:
            games = [line.split() for line in f.readlines()]
        solutions = solve(games)
        print("\n".join(str(solution) for solution in solutions))
