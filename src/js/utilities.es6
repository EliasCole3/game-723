'use strict'

function forEachCell(gamestate, callback) {
  for(let x=0; x<gamestate.boardsize.x; x++) {
    for(let y=0; y<gamestate.boardsize.y; y++) {
      callback(gamestate.board[x][y])
    }
  }
}

// console.log(anyOfTheseAreTrue([true, true, true]))
// console.log(anyOfTheseAreTrue([true, true, false]))
// console.log(anyOfTheseAreTrue([true, false, false]))
// console.log(anyOfTheseAreTrue([false, true, false]))
// console.log(anyOfTheseAreTrue([false, false, false]))
function anyOfTheseAreTrue(conditions) {
  let returnValue = false

  conditions.forEach(x => {
    if(x) returnValue = true
  })

  return returnValue
}

// console.log(allOfTheseAreTrue([true, true, true]))
// console.log(allOfTheseAreTrue([true, true, false]))
// console.log(allOfTheseAreTrue([true, false, false]))
// console.log(allOfTheseAreTrue([false, true, false]))
// console.log(allOfTheseAreTrue([false, false, false]))
function allOfTheseAreTrue(conditions) {
  let returnValue = true

  conditions.forEach(x => {
    if(!x) returnValue = false
  })

  return returnValue
}

function getUnitfromSelectedUnitId(gamestate) {
  let unit = null

  for(let x=0; x<gamestate.boardsize.x; x++) {
    for(let y=0; y<gamestate.boardsize.y; y++) {
      if(gamestate.board[x][y].occupiedBy && gamestate.board[x][y].occupiedBy.id === gamestate.selectedUnitId) {
        unit = gamestate.board[x][y].occupiedBy
      }
      if(gamestate.board[x][y].unitMovingThrough && gamestate.board[x][y].unitMovingThrough.id === gamestate.selectedUnitId) {
        unit = gamestate.board[x][y].unitMovingThrough
      }
    }
  }

  return unit
}

function getCellFromCoordinates(gamestate, x, y) {
  if(gamestate.board[x] && gamestate.board[x][y]) {
    return gamestate.board[x][y]
  } else {
    console.log('illegal coordinates in getCellFromCoordinates(), returning null')
    return null
  }
}

function forAllUnits(gamestate, callback) {
  for(let x=0; x<gamestate.boardsize.x; x++) {
    for(let y=0; y<gamestate.boardsize.y; y++) {
      let cell = gamestate.board[x][y]
      if(cell.occupiedBy) {
        let unit = cell.occupiedBy
        callback(unit)
      }
    }
  }
}

function forAllUnitsOfAPlayer(gamestate, player, callback) {
  for(let x=0; x<gamestate.boardsize.x; x++) {
    for(let y=0; y<gamestate.boardsize.y; y++) {
      let cell = gamestate.board[x][y]
      if(cell.occupiedBy && cell.occupiedBy.player === player) {
        let unit = cell.occupiedBy
        callback(unit)
      }
    }
  }
}

function allPlayersUnitsAreDead(gamestate, player) {
  // if(player.handle === 'Oprah Windfury') debugger

  let unitsAreDead = true

  forAllUnitsOfAPlayer(gamestate, player, unit => {
    if(unit.current.hp !== 0) unitsAreDead = false
  })

  return unitsAreDead
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function getRandomAngleInRadians() {
  return Math.random() * Math.PI * 2
}

function currentPlayersTurnIsOver(gamestate) {
  let turnOver = true

  // if there are any units that haven't taken their turn yet, the player's turn isn't done
  forEachCell(gamestate, cell => {
    if(cell.occupiedBy && cell.occupiedBy.player === gamestate.currentPlayer) {
      if(!cell.occupiedBy.hasTakenTurn) turnOver = false
    }
  })

  return turnOver
}

function allPlayersHaveTakenTheirTurn(gamestate) {
  let playersDone = true
  gamestate.players.forEach(x => {
    if(!x.disabled && !x.hasTakenTurn) playersDone = false // if player is alive and hasn't taken their turn
  })
  return playersDone
}

// function sleep(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms))
// }

function sleep(ms) {
  var start = new Date().getTime(), expire = start + ms
  while (new Date().getTime() < expire) { }
  return
}

// only one level deepm meant for a flat array of flat objects
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

function unitsAreAllies(unitA, unitB) {
  return unitA.player === unitB.player
}

function getUnitMidpoint(unit) {
  let unitBox = document.getElementById(`${unit.x}-${unit.y}`).getBoundingClientRect()
  let unitMidX = (unitBox.right + unitBox.left) / 2
  let unitMidY = (unitBox.top + unitBox.bottom) / 2
  return {x: unitMidX, y: unitMidY}
}

function cellCoordinatesAreWithWorldBoundariesAndNotNull(gamestate, x, y) {
  let conditions = [
    x < 0,
    x > gamestate.boardsize.x-1,
    y < 0,
    y > gamestate.boardsize.y-1
  ]

  // x and y start off null
  conditions.push(x === null)
  conditions.push(y === null)

  if(anyOfTheseAreTrue(conditions)) {
    return false
  }

  return true
}

function getSelectorCoordinatesBasedOnGameMode(gamestate) {
  let coords = {}

  // if we're doing something, we're moving the secondary selector(the red one)
  if(gamestate.currentMode === 'attack' || gamestate.currentMode === 'item' || gamestate.currentMode === 'casting') {
    coords.x = gamestate.selectedCellSecondary.x
    coords.y = gamestate.selectedCellSecondary.y

  // otherwise we're just moving the selector around
  } else {
    coords.x = gamestate.selectedCell.x
    coords.y = gamestate.selectedCell.y
  }

  return coords
}

function getSpellFromSpellId(spells, spellId) {
  let spell = spells.filter(x => {
    return x.id === spellId
  })[0]
  if(spell === undefined) throw new Error(`getSpellFromSpellId() : failed to find spell with id: ${spellId}`)
  return spell
}

function dataTypeOf(value) {
  if(typeof(value) === 'string') return 'string'
  if(typeof(value) === 'number') return 'number'
  if(typeof(value) === 'symbol') return 'symbol'
  if(typeof(value) === 'boolean') return 'boolean'
  if(typeof(value) === 'undefined') return 'undefined'
  if(typeof(value) === 'function') return 'function'
  if(value === null) return 'null'
  if(typeof(value) === 'object') {
    if(Array.isArray(value)) return 'array'
    return 'object'
  }
}

export {
  forEachCell,
  anyOfTheseAreTrue,
  allOfTheseAreTrue,
  getUnitfromSelectedUnitId,
  getCellFromCoordinates,
  forAllUnits,
  forAllUnitsOfAPlayer,
  allPlayersUnitsAreDead,
  getRandomIntInclusive,
  getRandomAngleInRadians,
  currentPlayersTurnIsOver,
  allPlayersHaveTakenTheirTurn,
  sleep,
  arrayContainsObject,
  unitsAreAllies,
  getUnitMidpoint,
  cellCoordinatesAreWithWorldBoundariesAndNotNull,
  getSelectorCoordinatesBasedOnGameMode,
  getSpellFromSpellId,
  dataTypeOf
}
















