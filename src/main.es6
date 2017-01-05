import './css/jquery-ui.css'
import './scss/style'
import 'chosen/chosen.jquery'
import 'chosen/chosen.css'
import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap/dist/css/bootstrap.css'
import keypress from 'keypress.js'

// clean this up. I think these are only needed in the board files
import img_mountains    from './images/app/moutains.png'
import img_water        from './images/app/water.png'
import img_warrior      from './images/app/warrior.png'
import img_warrior_dead from './images/app/warrior-dead.png'

import * as gameLogic   from './js/game-logic.es6'
import * as viewLogic   from './js/view-logic.es6'
import * as utils       from 'utilities.es6'

import { Cell, Unit, Warrior, Player } from './js/classes.es6'

import { getBoard as getBoard1 } from './js/boards/board1.es6'



let config = {
  chosenOptions: {
    search_contains: true
  }
}

let player1 = new Player('username1', 'Irritic', '0000cc')
let player2 = new Player('username2', 'Findled', 'cc0033')
let player3 = new Player('username3', 'Oprah Windfury', '33cc00')
let player4 = new Player('username4', 'DoctorOctorock', 'ff6600')
let player5 = new Player('username5', 'XxXSwAgL0Rd420NoSCoPeXxX', 'cc33cc')

let gamestate = {
  currentPlayer: player1,
  players: [player1, player2, player3],
  nextUnitId: 1,
  selectedCell: {
    x: null,
    y: null
  },
  selectedCellSecondary: {
    x: null,
    y: null
  },
  board: null,
  boardsize: {
    x: 5,
    y: 5
  },
  units: [],
  round: 1,
  selectedUnitId: null,
  currentMode: 'default'
}


$(() => {

  $('#board-size-x').chosen(config.chosenOptions)
  $('#board-size-y').chosen(config.chosenOptions)

  $('#start').on('click', e => {
    startHandler(gamestate)
    setKeyboardHandlers(gamestate)
    setNonBoardHandlers(gamestate)
    viewLogic.addPlayerAnimations(gamestate)
    viewLogic.addGeneralAnimations(gamestate)
    viewLogic.createWindows()
    viewLogic.setInitialMessages(gamestate)
  })

})



function startHandler(gamestate) {

  // let boardsizeX = +$('#board-size-x option:selected').val()
  // let boardsizeY = +$('#board-size-y option:selected').val()
  // gamestate.boardsize.x = boardsizeX
  // gamestate.boardsize.y = boardsizeY

  gamestate.boardsize.x = 5
  gamestate.boardsize.y = 5

  gamestate.board = getBoard1(gamestate)

  render(gamestate)
}



function setKeyboardHandlers(gamestate) {
  let listener = new keypress.Listener()

  listener.simple_combo('shift s', () => {
    console.log('You pressed shift and s')
  })

  listener.simple_combo('left', () => {
    moveLeft(gamestate)
  })

  listener.simple_combo('right', () => {
    moveRight(gamestate)
  })

  listener.simple_combo('up', () => {
    moveUp(gamestate)
  })

  listener.simple_combo('down', () => {
    moveDown(gamestate)
  })

  listener.register_combo({
    keys: 'p',
    on_keydown: (e, countPressed, autoRepeat) => {
      if(autoRepeat) return
      viewLogic.addPlayerIndicators(gamestate)
      render(gamestate)
    },
    on_keyup: (e, countPressed, autoRepeat) => {
      viewLogic.removePlayerIndicators(gamestate)
      render(gamestate)
    }
  })

}

function setNonBoardHandlers(gamestate) {

  $('#end-turn').click(e => {
    endTurn(gamestate)
  })

  $('#disable-player-1').click(e => {
    gamestate.players[0].disabled = true
  })

  $('#disable-player-2').click(e => {
    gamestate.players[1].disabled = true
  })

  $('#disable-player-3').click(e => {
    gamestate.players[2].disabled = true
  })

}




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

  if(utils.anyOfTheseAreTrue(conditions)) {
    console.log('trying to move out of the world')
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

  // if there's nothing in the new cell
  if(newCell.occupiedBy !== null) {
    console.log('cell is currently occupied')
    return
  }


  newCell.occupiedBy = oldCell.occupiedBy
  oldCell.occupiedBy = null

  newCell.occupiedBy.x = newX
  newCell.occupiedBy.y = newY

  gamestate.selectedCell.x = newX
  gamestate.selectedCell.y = newY

  render(gamestate)

  // this is here so the unit position in the window will update
  viewLogic.showUnitInfo(newCell.occupiedBy)
}



function endTurn(gamestate) {
  logMessage(`${gamestate.currentPlayer.handle}'s turn ended`)
  gamestate.currentPlayer.hasTakenTurn = true

  // progress to the next player, and keep going if multiple players are disabled
  do {
    gamestate.players.next()
    gamestate.currentPlayer = gamestate.players[gamestate.players.current]
  } while(gamestate.currentPlayer.disabled === true)

  // reset turn bool for each player
  if(utils.allPlayersHaveTakenTheirTurn(gamestate)) {
    gamestate.players.forEach(x => {
      x.hasTakenTurn = false
    })
    gamestate.round++
  }

  $('#message-window-content').html(`It is currently ${gamestate.currentPlayer.handle}'s turn`)
  logMessage(`round ${gamestate.round}, ${gamestate.currentPlayer.handle}'s turn`)
  viewLogic.addCurrentPlayerBorderToBoard(gamestate)
}

function setHandlers(gamestate) {
  $('.cell').on('click', e => {

    let cell = $(e.currentTarget)
    let x = +cell.attr('data-x')
    let y = +cell.attr('data-y')
    console.log('cell clicked, coordinates: ', x, y)

    if(gamestate.currentMode === 'default') {

      gamestate.selectedCell.x = x
      gamestate.selectedCell.y = y

      render(gamestate)

      if(gamestate.board[x][y].occupiedBy) {
        unitClicked(x, y, gamestate)
      } else {
        setActionsWindow_Empty(gamestate)
      }
    }

    if(gamestate.currentMode === 'attack') {
      gamestate.selectedCellSecondary.x = x
      gamestate.selectedCellSecondary.y = y

      render(gamestate)

      let cell = utils.getCellFromCoordinates(x, y, gamestate)

      if(cell.indicator === 'indicator-weapon-range') {
        setActionsWindow_ConfirmAttack(gamestate)
      }
    }

    if(gamestate.currentMode === 'move') {

    }

    if(gamestate.currentMode === 'item') {

    }

  })

}

function unitClicked(x, y, gamestate) {
  let unit = gamestate.board[x][y].occupiedBy

  // console.log(unit)

  if(unit.player.username !== gamestate.currentPlayer.username) {
    logMessage('That unit doesn\'t belong to the current player')
    return
  }

  gamestate.selectedUnitId = unit.id

  setActionsWindow_BasicActions(gamestate)
  viewLogic.showUnitInfo(unit)
}



function setActionsWindow_Empty(gamestate) {
  $('#actions-window-content').html('')
}

function setActionsWindow_BasicActions(gamestate) {
  let htmlString = ``
  htmlString += `<button id='action-move' class='btn btn-medium'>Move</button>`
  htmlString += `<button id='action-attack' class='btn btn-medium'>Attack</button>`
  htmlString += `<button id='action-defend' class='btn btn-medium'>Defend</button>`
  htmlString += `<button id='action-items' class='btn btn-medium'>Items</button>`
  htmlString += `<button id='action-magic' class='btn btn-medium'>Magic</button>`
  htmlString += `<button id='action-special-talent' class='btn btn-medium'>Special Talent</button>`
  htmlString += `<button id='end-turn' class='btn btn-medium'>Temporary - End Turn</button>`

  $('#actions-window-content').html(htmlString)

  actionButtonHandlers_BasicActions(gamestate)
}

function actionButtonHandlers_BasicActions(gamestate) {
  $('#action-attack').click(e => {
    let unit = utils.getUnitfromSelectedUnitId(gamestate)
    showWeaponRange(unit, gamestate.selectedCell.x, gamestate.selectedCell.y, gamestate)
    gamestate.currentMode = 'attack'
    setActionsWindow_CancelAttack(gamestate)
  })
}



function setActionsWindow_CancelAttack(gamestate) {
  let htmlString = ``
  htmlString += `<button id='action-cancel-attack' class='btn btn-medium'>Cancel Attack</button>`
  $('#actions-window-content').html(htmlString)
  actionButtonHandlers_CancelAttack(gamestate)
}

function actionButtonHandlers_CancelAttack(gamestate) {
  $('#action-cancel-attack').click(e => {
    gamestate.currentMode = 'default'
    clearWeaponRange(gamestate)
    setActionsWindow_BasicActions(gamestate)
  })
}



function setActionsWindow_ConfirmAttack(gamestate) {
  let htmlString = ``
  htmlString += `<button id='action-cancel-attack' class='btn btn-medium'>Cancel Attack</button>`
  htmlString += `<button id='action-confirm-attack' class='btn btn-medium'>Confirm Attack</button>`
  $('#actions-window-content').html(htmlString)
  actionButtonHandlers_CancelAttack(gamestate)
  actionButtonHandlers_ConfirmAttack(gamestate)

}

function actionButtonHandlers_ConfirmAttack(gamestate) {
  $('#action-confirm-attack').click(e => {
    let attacker = gamestate.board[gamestate.selectedCell.x][gamestate.selectedCell.y].occupiedBy
    let defender = gamestate.board[gamestate.selectedCellSecondary.x][gamestate.selectedCellSecondary.y].occupiedBy

    let battleResults = gameLogic.attack(attacker, defender, gamestate)

    attacker.hasTakenTurn = true

    battleResults.messages.forEach(x => {
      logMessage(x)
    })

    clearSelectors(gamestate)

    clearWeaponRange(gamestate)

    gamestate.players.forEach(player => {
      if(utils.allPlayersUnitsAreDead(player, gamestate)) {
        player.disabled = true
      }
    })

    if(utils.currentPlayersTurnIsOver(gamestate)) {
      endTurn(gamestate)
    }

    gamestate.currentMode = 'default'

    render(gamestate)

    setActionsWindow_Empty(gamestate)


    // win condition

    let numberOfDisabledPlayers = gamestate.players.filter(x => {
      return x.disabled
    }).length

    if(numberOfDisabledPlayers === gamestate.players.length-1) {
      alert(`game over! ${gamestate.currentPlayer.handle} won!`)
    }
  })
}







function showWeaponRange(unit, x, y, gamestate) {

  let coordinates = gameLogic.getCoordinatesForWeaponRange(unit.items.equipped.weapon, x, y)

  coordinates.forEach(coord => {
    if(gamestate.board[coord.x] && gamestate.board[coord.x][coord.y]) {
      gamestate.board[coord.x][coord.y].indicator = `indicator-weapon-range`
    }
  })

  render(gamestate)
}

function clearWeaponRange(gamestate) {
  utils.forEachCell(gamestate, cell => {
    if(cell.indicator === 'indicator-weapon-range') {
      cell.indicator = null
    }
  })

  render(gamestate)
}

function clearSelectors(gamestate) {
  gamestate.selectedCell.x = null
  gamestate.selectedCell.y = null
  gamestate.selectedCellSecondary.x = null
  gamestate.selectedCellSecondary.y = null
}



/*

Utility Functions

*/

function render(gamestate) {
  viewLogic.render('#game', gamestate)
  viewLogic.addCurrentPlayerBorderToBoard(gamestate)
  setHandlers(gamestate)
  // addPlayerIndicators(gamestate) // for debugging, but it is kind of nice
}

function logMessage(message) {
  $('#log-window-content').prepend(`${message}<br>`)
}



/*

Modifying Array.prototype to add more functionality

*/

Array.prototype.random = function () {
  return this[Math.floor((Math.random()*this.length))]
}

Array.prototype.popRandomElement = function () {
  let index = Math.round(Math.random() * (this.length - 1))
  let element = this[index]
  if (index > -1) {
    this.splice(index, 1)
  }
  return element
}

Array.prototype.next = function() {
  let nextVal = this[++this.current]
  if(nextVal !== undefined) return nextVal
  this.current = 0
  return this[this.current]
}

Array.prototype.prev = function() {
  let prevValue = this[--this.current]
  if(prevValue !== undefined) return prevValue
  this.current = this.length - 1
  return this[this.current]
}

Array.prototype.current = 0




