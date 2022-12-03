/**
 * a = 97  --> 1
 * z = 122 --> 26
 * A = 65  --> 27
 * Z = 90  --> 52
 */
function getPriority(letter) {
    const asciiValue = letter.charCodeAt(0)
    return asciiValue <= 90 ? asciiValue - 38 : asciiValue - 96
}

module.exports = {
    getPriority
}
