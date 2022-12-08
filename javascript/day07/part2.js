const { assert } = require('console')
const { buildTree } = require('./build-tree')
const input = require('../file-reader.js').readFile('input.txt', '\n', String)

const TOTAL_DISK_SPACE = 70000000
const SPACE_NEEDED_FOR_UPDATE = 30000000

function findCandidateDirectories(node, minimumSize, result = []) {
    if (node.size >= minimumSize) {
        result.push(node)
    }
    node.dirs.forEach(child => {
        findCandidateDirectories(child, minimumSize, result)
    })
    return result
}

const root = buildTree(input)
// prettyPrint(root)
// pp(root)
const unusedSpace = TOTAL_DISK_SPACE - root.size
const minSpaceToBeFreed = SPACE_NEEDED_FOR_UPDATE - unusedSpace
console.log(minSpaceToBeFreed)

const candidates = findCandidateDirectories(root, minSpaceToBeFreed)
const smallestCandidate = candidates.sort((a, b) => a.size - b.size)[0]
const result = smallestCandidate.size
console.log(result)
assert(result === 8679207)
