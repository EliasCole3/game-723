'use strict'

import * as utils from 'utilities.es6'

function moveLeft(gamestate) {
  move(gamestate, gamestate.selectedCell.x, gamestate.selectedCell.y, 'left')
}

function moveRight(gamestate) {
  move(gamestate, gamestate.selectedCell.x, gamestate.selectedCell.y, 'right')
}

function moveUp(gamestate) {
  move(gamestate, gamestate.selectedCell.x, gamestate.selectedCell.y, 'up')
}

function moveDown(gamestate) {
  move(gamestate, gamestate.selectedCell.x, gamestate.selectedCell.y, 'down')
}

function move(gamestate, x, y, direction) {
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
  if(oldCell.unitMovingThrough === null && gamestate.selectedUnitId !== oldCell.occupiedBy.id) {
    console.log('gamestate.selectedUnitId !== oldCell.occupiedBy.id', gamestate.selectedUnitId, oldCell.occupiedBy.id)
    return
  }

  // // // if there's something in the new cell
  // if(newCell.occupiedBy !== null) {
  //   // console.log('cell is currently occupied')
  //   moveTransientUnit(gamestate, oldCell, newCell)
  //   return
  // }

  if(newCell.indicator !== 'indicator-move-range') {
    console.log('can only move where you\'re supposed to')
    return
  }

  moveUnit(gamestate, oldCell, newCell)
}

function moveUnit(gamestate, oldCell, newCell) {
  // console.log('oldCell.occupiedBy: ', oldCell.occupiedBy)
  // console.log('newCell.occupiedBy: ', newCell.occupiedBy)
  // console.log('oldCell.unitMovingThrough: ', oldCell.unitMovingThrough)
  // console.log('newCell.unitMovingThrough: ', newCell.unitMovingThrough)
  // console.log('')

  if(oldCell.unitMovingThrough !== null) {                                    // transient unit leaving cell and...
    if(newCell.occupiedBy !== null) {                                           // both cells the transient unit is going through are occupied
      if(utils.unitsAreAllies(oldCell.occupiedBy, newCell.occupiedBy)) {          // and they're allies
        moveUnitFromOccupiedCellToOccupiedCell(newCell, oldCell)
      } else {
        console.log('your units are not allowed to pass through enemy units')
        return
      }
    } else {                                                                    // the transient unit is entering an empty cell
      moveUnitFromOccupiedCellToEmptyCell(newCell, oldCell)
    }
  } else if (newCell.occupiedBy !== null) {                                   // transient unit entering cell
    if(utils.unitsAreAllies(oldCell.occupiedBy, newCell.occupiedBy)) {          // and they're allies
      moveUnitFromEmptyCellToOccupiedCell(newCell, oldCell)
    } else {
      console.log('your units are not allowed to pass through enemy units')
      return
    }
  } else {                                                                    // unit entering empty cell
    moveUnitNormal(newCell, oldCell)
  }

  // moves the selector along, to allow for continuous movement
  gamestate.selectedCell.x = newCell.x
  gamestate.selectedCell.y = newCell.y
}

function moveUnitNormal(newCell, oldCell) {
  // the actual move
  newCell.occupiedBy = oldCell.occupiedBy
  oldCell.occupiedBy = null

  // setting the unit's internal coordinates
  newCell.occupiedBy.x = newCell.x
  newCell.occupiedBy.y = newCell.y
}

function moveUnitFromEmptyCellToOccupiedCell(newCell, oldCell) {
  // the actual move
  newCell.unitMovingThrough = oldCell.occupiedBy
  oldCell.occupiedBy = null

  // setting the unit's internal coordinates
  newCell.unitMovingThrough.x = newCell.x
  newCell.unitMovingThrough.y = newCell.y
}

function moveUnitFromOccupiedCellToEmptyCell(newCell, oldCell) {
  // the actual move
  newCell.occupiedBy = oldCell.unitMovingThrough
  oldCell.unitMovingThrough = null

  // setting the unit's internal coordinates
  newCell.occupiedBy.x = newCell.x
  newCell.occupiedBy.y = newCell.y
}

function moveUnitFromOccupiedCellToOccupiedCell(newCell, oldCell) {
  // the actual move
  newCell.unitMovingThrough = oldCell.unitMovingThrough
  oldCell.unitMovingThrough = null

  // setting the unit's internal coordinates
  newCell.unitMovingThrough.x = newCell.x
  newCell.unitMovingThrough.y = newCell.y
}



export {moveLeft, moveRight, moveUp, moveDown, moveUnit}





































