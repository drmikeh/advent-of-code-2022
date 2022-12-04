import functools
import operator

toolPointsMap = { 'ROCK': 1, 'PAPER': 2, 'SCISSORS': 3 }

LOST_POINTS = 0
DRAW_POINTS = 3
WIN_POINTS = 6

outcomePointsMap = {
    'ROCK': { 'ROCK': DRAW_POINTS, 'PAPER': LOST_POINTS, 'SCISSORS': WIN_POINTS },
    'PAPER': { 'ROCK': WIN_POINTS, 'PAPER': DRAW_POINTS, 'SCISSORS': LOST_POINTS },
    'SCISSORS': { 'ROCK': LOST_POINTS, 'PAPER': WIN_POINTS, 'SCISSORS': DRAW_POINTS },
}

def transform(letter):
    dict = { 'A': 'ROCK', 'B': 'PAPER', 'C': 'SCISSORS', 'X': 'ROCK', 'Y': 'PAPER', 'Z': 'SCISSORS' }
    return dict[letter]

def parse(text_input):
    return [list(map(transform, record)) for record in text_input]

with open('input.txt') as f:
    games = [line.split() for line in f.readlines()]
    data = parse(games)
    calcScore = lambda tools : toolPointsMap[tools[1]] + outcomePointsMap[tools[1]][tools[0]]
    score = functools.reduce(operator.add, map(lambda game : calcScore(game), data))
    print(score)
    assert score == 12458, 'Incorrect score'
