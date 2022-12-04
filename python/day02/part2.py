import functools
import operator

toolPointsMap = { 'ROCK': 1, 'PAPER': 2, 'SCISSORS': 3 }

LOST_POINTS = 0
DRAW_POINTS = 3
WIN_POINTS = 6

outcomePointsMap = {
    'LOSE': 0,
    'DRAW': 3,
    'WIN': 6
}

findMyToolMap = {
    'ROCK': { 'WIN': 'PAPER', 'DRAW': 'ROCK', 'LOSE': 'SCISSORS' },
    'PAPER': { 'WIN': 'SCISSORS', 'DRAW': 'PAPER', 'LOSE': 'ROCK' },
    'SCISSORS': { 'WIN': 'ROCK', 'DRAW': 'SCISSORS', 'LOSE': 'PAPER' },
}

def transform(letter):
    dict = { 'A': 'ROCK', 'B': 'PAPER', 'C': 'SCISSORS', 'X': 'LOSE', 'Y': 'DRAW', 'Z': 'WIN' }
    return dict[letter]

def parse(text_input):
    """Parse input."""
    return [list(map(transform, record)) for record in text_input]

with open('input.txt') as f:
    games = [line.split() for line in f.readlines()]
    data = parse(games)
    calcScore = lambda game : toolPointsMap[findMyToolMap[game[0]][game[1]]] + outcomePointsMap[game[1]]
    score = functools.reduce(operator.add, map(lambda game : calcScore(game), data))
    print(score)
    assert score == 12683, 'Incorrect score'
