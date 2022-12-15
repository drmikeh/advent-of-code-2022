const ITEMS_RE = /\s+Starting items:\s+(?<items>[0-9]+(,\s*[0-9]+)*)/
const OP_RE = /\s+Operation: new = old (?<op>[+*])\s(?<amt>[0-9]+|old)/
const TEST_RE = /\s+Test: divisible by (?<amt>[0-9]+)/
const ACTION_RE = /\s+If (true|false): throw to monkey (?<monkey>[0-9]+)/

function getMonkeys() {
    const input = require('../file-reader.js').readFile('input.txt', '\n', String)

    const monkeys = []
    for (let n = 0; n < input.length; n += 6) {
        const itemsLine = input[n + 1]
        let match = itemsLine.match(ITEMS_RE)
        const items = match.groups.items.split(', ').map(s => Number(s))

        const opLine = input[n + 2]
        match = opLine.match(OP_RE)
        const op = match.groups.op
        let opAmt = match.groups.amt
        if (opAmt !== 'old') opAmt = Number(opAmt)

        const testLine = input[n + 3]
        match = testLine.match(TEST_RE)
        const testAmt = Number(match.groups.amt)

        const trueLine = input[n + 4]
        match = trueLine.match(ACTION_RE)
        const trueMonkey = Number(match.groups.monkey)

        const falseLine = input[n + 5]
        match = falseLine.match(ACTION_RE)
        const falseMonkey = Number(match.groups.monkey)

        const monkey = {
            id: n / 6,
            items,
            op,
            opAmt,
            testAmt,
            trueMonkey,
            falseMonkey,
            inspectionCount: 0
        }
        monkeys.push(monkey)
    }
    return monkeys
}

function doRounds(monkeys, numRounds, calcFn) {
    for (let round = 1; round <= numRounds; round++) {
        monkeys.forEach(monkey => {
            const { items, op, opAmt, testAmt, trueMonkey, falseMonkey } = monkey
            while (items.length > 0) {
                const item = items.shift()
                const newItem = calcFn(item, op, opAmt)
                const divisibleTest = newItem % testAmt === 0
                const targetMonkey = divisibleTest ? trueMonkey : falseMonkey
                monkeys[targetMonkey].items.push(newItem)
                monkey.inspectionCount += 1
            }
        })
    }
}

module.exports = {
    getMonkeys,
    doRounds
}
