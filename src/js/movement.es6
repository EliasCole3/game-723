'use strict'

import * as utils from 'utilities.es6'

function moveLeft(gamestate) {
  move(gamestate.selectedCell.x, gamestate.selectedCell.y, 'left', gamestate)
}

function moveRight(gamestate) {
  move(gamestate.selectedCell.x, gamestate.selectedCell.y, 'right', gamestate)
}

function moveUp(gamestate) {
  move(gamestate.selectedCell.x, gamestate.selectedCell.y, 'up', gamestate)
}

function moveDown(gamestate) {
  move(gamestate.selectedCell.x, gamestate.selectedCell.y, 'down', gamestate)
}

function move(x, y, direction, gamestate) {
  if(gamestate.currentMode !== 'move') return

  let newX = x
  let newY = y

  switch(direction) {
    case 'left':
      newX--
      break
    case 'right':
      newX++
      break
    case 'up':
      newY--
      break
    case 'down':
      newY++
      break
  }

  // world boundaries
  let conditions = [
    newX < 0,
    newX > gamestate.boardsize.x-1,
    newY < 0,
    newY > gamestate.boardsize.y-1
  ]

  // x and y start off null
  conditions.push(x === null)
  conditions.push(y === null)

  if(utils.anyOfTheseAreTrue(conditions)) {
    // console.log('trying to move out of the world')
    console.log('illegal move')
    return
  }

  let oldCell = gamestate.board[x][y]
  let newCell = gamestate.board[newX][newY]

  // if an empty cell is selected, and the user tries to move
  if(!oldCell.occupiedBy) {
    console.log('there\'s nothing in that cell to move')
    return
  }

  // if, for whatever reason, the currently selected unit isn't actually in the currently selected cell
  if(gamestate.selectedUnitId !== oldCell.occupiedBy.id) {
    return
  }

  // // if there's something in the new cell
  if(newCell.occupiedBy !== null) {
    console.log('cell is currently occupied')
    return
  }

  if(newCell.indicator !== 'indicator-move-range') {
    console.log('can only move where you\'re supposed to')
    return
  }

  moveUnit(gamestate, oldCell, newCell)
}

function moveUnit(gamestate, oldCell, newCell) {
  // the actual move
  newCell.occupiedBy = oldCell.occupiedBy
  oldCell.occupiedBy = null

  // setting the unit's internal coordinates
  newCell.occupiedBy.x = newCell.x
  newCell.occupiedBy.y = newCell.y

  // moves the selector along, to allow for continuous movement
  gamestate.selectedCell.x = newCell.x
  gamestate.selectedCell.y = newCell.y
}

export {moveLeft, moveRight, moveUp, moveDown, moveUnit}





































