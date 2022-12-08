function addFile(parent, name, size) {
    parent.files.push({ name, size })
}

function addDirectory(parent, name) {
    parent.dirs.push({ parent, name, files: [], dirs: []})
}

function findDirectory(parent, name) {
    return parent.dirs.find(d => d.name === name)
}

function calcDirectorySizes(node) {
    // depth first
    node.dirs.forEach(d => {
        calcDirectorySizes(d)
    })
    // then sum
    node.size = node.files.reduce((sum, f) => sum + f.size, 0) +
        node.dirs.reduce((sum, d) => sum + d.size, 0)
}

function buildTree(data) {
    const root = { name: 'root', files: [], dirs: [] }
    root.parent = root
    let current = root

    data.forEach(line => {
        if (line.startsWith('$ ')) {
            if (line === '$ cd ..') {
                current = current.parent
            } else if (line === '$ cd /') {
                current = root
            } else if (line.startsWith('$ cd')) {
                const re = /\w+/g
                const match = line.match(re)
                const name = match[1]
                current = findDirectory(current, name)
            } else if (line === '$ ls') {
                // nothing to do here
            }
        } else if (line.startsWith('dir ')) {
            const re = /dir (?<name>\w+)/
            const match = line.match(re)
            const name = match.groups.name
            addDirectory(current, name)
        }
        else {
            const re = /(?<size>\d+)\s(?<name>\w+)/
            const match = line.match(re)
            const name = match.groups.name
            const size = Number(match.groups.size)
            addFile(current, name, size)
        }
    })

    calcDirectorySizes(root)
    return root
}

module.exports = {
    buildTree
}
