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
// console.log(anyOfTheseAreTrue([false, false, false]))
function anyOfTheseAreTrue(conditions) {
  let returnValue = false

  conditions.forEach(x => {
    if(x) returnValue = true
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
    }
  }

  return unit
}

function getCellFromCoordinates(x, y, gamestate) {
  if(gamestate.board[x] && gamestate.board[x][y]) {
    return gamestate.board[x][y]
  } else {
    console.log('illegal coordinates in getCellFromCoordinates(), returning null')
    return null
  }
}

function forAllUnitsOfAPlayer(player, gamestate, callback) {
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

function allPlayersUnitsAreDead(player, gamestate) {
  // if(player.handle === 'Oprah Windfury') debugger

  let unitsAreDead = true

  forAllUnitsOfAPlayer(player, gamestate, unit => {
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
    if(!x.hasTakenTurn) playersDone = false
  })
  return playersDone
}

export {forEachCell, anyOfTheseAreTrue, getUnitfromSelectedUnitId, getCellFromCoordinates, forAllUnitsOfAPlayer, allPlayersUnitsAreDead, getRandomIntInclusive, currentPlayersTurnIsOver, allPlayersHaveTakenTheirTurn}