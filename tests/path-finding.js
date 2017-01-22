'use strict'

let board = [
  ['_', '_', '_', '_', '_', '_', '_'],
  ['_', '_', '_', '_', '_', '_', '_'],
  ['_', '_', '_', 'b', '_', '_', '_'],
  ['_', '_', 'b', 'u', 'b', '_', '_'],
  ['_', '_', 'b', '_', '_', '_', '_'],
  ['_', '_', '_', 'b', '_', '_', '_'],
  ['_', '_', '_', '_', '_', '_', '_']
]

// let board = [
//   ['_', '_', '_', '_', '_', '_', '_'],
//   ['_', '_', '_', '_', '_', '_', '_'],
//   ['_', '_', '_', '_', '_', '_', '_'],
//   ['_', '_', '_', 'u', '_', '_', '_'],
//   ['_', '_', '_', '_', '_', '_', '_'],
//   ['_', '_', '_', '_', '_', '_', '_'],
//   ['_', '_', '_', '_', '_', '_', '_']
// ]

// let unit = {x: 3, y: 3, movesLeft: 2}
let unit = {x: 3, y: 3, movesLeft: 4}


let moves = getAvailableMoves(unit.x, unit.y, unit.movesLeft)

console.log(moves.sort((a, b) => {
  if(a.x > b.x) return 1
  if(a.x < b.x) return -1
  if(a.x === b.x) { // isn't working hmm...
    if(a.y > b.y) return 1
    if(a.y < b.y) return -1
  }
  return 0
}))

console.log(board)
console.log('')

moves.forEach(move => {
  board[move.y][move.x] = 'x'
})

console.log(board)



function getAvailableMoves(x, y, movesLeft, moves=[]) {
  console.log('')
  console.log(`evaluating ${x} ${y}`)

  let potentialCoordinates = [
    {x: x - 1, y: y},
    {x: x + 1, y: y},
    {x: x, y: y - 1},
    {x: x, y: y + 1}
  ]

  potentialCoordinates.forEach(cell => {
    let x = cell.x
    let y = cell.y
    console.log(`checking neighbor: ${x} ${y}`)

    if(board[y] && board[y][x] && board[y][x] !== 'b' && board[y][x] !== 'u') {

      // console.log('')
      // console.log(`arrayContainsObject(): ${arrayContainsObject(moves, cell)}`)

      if(!arrayContainsObject(moves, cell)) {
        // console.log(`pushing ${x} ${y}, moves left: ${movesLeft}`)
        moves.push(cell)
      }

      if(movesLeft > 1) {
        getAvailableMoves(cell.x, cell.y, movesLeft - 1).forEach(foundMove => {
          if(!arrayContainsObject(moves, foundMove)) {
            // console.log(`pushing ${x} ${y}, moves left: ${movesLeft}`)
            moves.push(foundMove)
          }
        })
      }

    }


  })

  console.log('')
  console.log('')
  return moves
}

// only one level deep
// console.log(arrayContainsObject([{x: 1, y: 1}, {x: 2, y: 2}], {x: 0, y:0})) // should be false
// console.log(arrayContainsObject([{x: 1, y: 1}, {x: 2, y: 2}], {x: 1, y:1})) // should be true
function arrayContainsObject(array, object) {
  let found = false
  array.forEach(obj => {
    let objectsMatch = true
    for(let prop in object) {
      if(object[prop] !== obj[prop]) {
        objectsMatch = false
      }
    }
    if(objectsMatch) found = true
  })
  return found
}