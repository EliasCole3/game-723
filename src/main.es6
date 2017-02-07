'use strict'

import './css/jquery-ui.css'
import './scss/style'
import 'chosen/chosen.jquery'
import 'chosen/chosen.css'
import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap/dist/css/bootstrap.css'
import keypress                  from 'keypress.js'
import bootstrap                 from 'bootstrap.js'
import * as gameLogic            from './js/game-logic.es6'
import * as viewLogic            from './js/view-logic.es6'
import * as utils                from 'utilities.es6'
import * as movement             from 'movement.es6'
import * as animations           from 'animations.es6'
import { Player }                from './js/classes.es6'
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
    x: 0,
    y: 0
  },
  selectedCellSecondary: {
    x: 0,
    y: 0
  },
  board: null,
  boardsize: {
    x: 7,
    y: 10
  },
  units: [],
  round: 1,
  selectedUnitId: null,
  currentMode: 'default',
  moveRevertCoordinates: {
    x: null,
    y: null
  },
  showingMessageSet: false
}



$(() => {

  // animations.test()

  $('#board-size-x').chosen(config.chosenOptions)
  $('#board-size-y').chosen(config.chosenOptions)

  $('#start').on('click', e => {
    startHandler(gamestate)
    setKeyboardHandlers(gamestate)
    viewLogic.addPlayerAnimations(gamestate)
    viewLogic.addGeneralAnimations(gamestate)
    viewLogic.createWindows()
    viewLogic.setInitialMessages(gamestate)
  })

  $('#test-move').click(e => {
    $('#start').click()
    $('#2-1-image').click()
    $('#action-move').click()
    // utils.sleep(1000)
  })

  $('#test-full-round').click(e => {
    $('#start').click()

    $('#0-1-image').click()
    $('#action-move').click()
    movement.moveDown(gamestate)
    movement.moveDown(gamestate)
    render(gamestate)
    $('#action-confirm-move').click()

    $('#action-attack').click()
    $('#0-4-image').click()
    $('#action-confirm-attack').click()

    $('#end-turn').click()

    $('#3-2-image').click()
    $('#action-move').click()
    movement.moveUp(gamestate)
    render(gamestate)
    $('#action-confirm-move').click()

    $('#action-attack').click()
    $('#2-1-image').click()
    $('#action-confirm-attack').click()

    $('#end-turn').click()
    console.log(gamestate)

  })


  $('#test-arrow').click(e => {
    $('#start').click()

    $('#1-0-image').click()

    $('#action-move').click()

    movement.moveRight(gamestate)
    movement.moveRight(gamestate)
    render(gamestate)

    $('#action-confirm-move').click()

    $('#action-attack').click()

    $('#3-2-image').click()

    setTimeout(() => {
      $('#action-confirm-attack').click()
    }, 250)
  })

  $('#test-attack').click(e => {
    $('#start').click()

    $('#0-1-image').click()
    $('#action-move').click()
    movement.moveDown(gamestate)
    movement.moveDown(gamestate)
    render(gamestate)
    $('#action-confirm-move').click()

    $('#action-attack').click()
    $('#0-4-image').click()
    setTimeout(() => {
      $('#action-confirm-attack').click()
    }, 250)
  })


  // Not allowed for browser security. I'm just used to having it from selenium driver tests
  // function pressDownArrow() {
  //   // $('body').trigger($.Event('keydown', { keyCode: 40}))
  //   // $('#wrapper').trigger($.Event('keydown', { keyCode: 40}))
  //   // $('body').simulateKeyPress(40)
  // }

  $('#test-modal-and-autotyping').click(e => {
    // viewLogic.showModal() ?
    $('#modal').modal('show')
    viewLogic.autotype({
      selector: '#modal-body',
      message: 'Thundercats polaroid twee subway tile, four loko +1 plaid four dollar toast. Ut ennui culpa shoreditch.',
      speed: 40,
      callback: () => {
        console.log('all done!')
        $('#modal').modal('hide')
      }
    })
  })



  $('#test-message-set').click(e => {

    $('#modal').modal('show')

    viewLogic.messageSet({
      selector: '#modal-body',
      messages: [
        'Thundercats polaroid twee subway tile, four loko +1 plaid four dollar toast. Ut ennui culpa shoreditch.',
        'Ut ennui culpa shoreditch. Vinyl seitan commodo, skateboard edison bulb squid reprehenderit laborum health goth tumeric tumblr venmo.',
        'Blog banh mi aute reprehenderit, vape portland PBR&B letterpress poutine freegan eiusmod fanny pack.',
        'Actually typewriter dolore, master cleanse cardigan kombucha quis VHS succulents odio stumptown echo park.'
      ],
      speed: 40,
      callback: () => {
        console.log('all done!')
        $('#modal').modal('hide')
      }
    })
  })


  $('#test-floating-text').click(e => {
    viewLogic.addFloatingText({
      startCoordinates: {
        x: 300,
        y: 300
      },
      color: '#0000ff',
      size: '14px',
      text: 'slooooooowed'
    })
  })



})










function startHandler(gamestate) {

  // let boardsizeX = +$('#board-size-x option:selected').val()
  // let boardsizeY = +$('#board-size-y option:selected').val()
  // gamestate.boardsize.x = boardsizeX
  // gamestate.boardsize.y = boardsizeY

  // gamestate.boardsize.x = 5
  // gamestate.boardsize.y = 5

  gamestate.board = getBoard1(gamestate)

  $('#modal').modal('show')

    viewLogic.messageSet({
      selector: '#modal-body',
      messages: [
        '3000 years ago...',
        'In the age of yore...',
        'When magick run amok...',
        'And you could make your destiny with the steel strapped to your back...',
        'Trouble brewed...',
        '/s'
      ],
      speed: 40,
      callback: () => {
        $('#modal').modal('hide')
      }
    })

  render(gamestate)
}



function setKeyboardHandlers(gamestate) {
  let listener = new keypress.Listener()

  listener.simple_combo('shift s', () => {
    console.log('You pressed shift and s')
  })

  listener.simple_combo('left', () => {
    handleArrowKeyInput(gamestate, 'left')
  })

  listener.simple_combo('right', () => {
    // debugger
    handleArrowKeyInput(gamestate, 'right')
  })

  listener.simple_combo('up', () => {
    handleArrowKeyInput(gamestate, 'up')
  })

  listener.simple_combo('down', () => {
    handleArrowKeyInput(gamestate, 'down')
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

  listener.simple_combo('a', () => {
    if(gamestate.currentMode === 'default') {
      actionAttack(gamestate)
    }
  })

  listener.simple_combo('m', () => {
    if(gamestate.currentMode === 'default') {
      actionMove(gamestate)
    }
  })

  listener.simple_combo('enter', () => {
    if(gamestate.currentMode === 'move') {
      confirmMove(gamestate)
    }

    if(gamestate.currentMode === 'attack') {
      confirmAttack(gamestate)
    }
  })

  listener.simple_combo('escape', () => {
    if(gamestate.currentMode === 'move') {
      cancelMove(gamestate)
    }

    if(gamestate.currentMode === 'attack') {
      cancelAttack(gamestate)
    }
  })

}

function handleArrowKeyInput(gamestate, direction) {

  // if we're moving, move the unit
  if(gamestate.currentMode === 'move') {

    switch(direction) {
      case 'left':
        movement.moveLeft(gamestate)
        break

      case 'right':
        movement.moveRight(gamestate)
        break

      case 'up':
        movement.moveUp(gamestate)
        break

      case 'down':
        movement.moveDown(gamestate)
        break
    }

    render(gamestate)
    viewLogic.showUnitInfo(utils.getUnitfromSelectedUnitId(gamestate)) // this is here so the unit position in the window will update
  } else {
    let coords = utils.getSelectorCoordinatesBasedOnGameMode(gamestate)

    // modifier for direction
    switch(direction) {
      case 'left':
        coords.x--
        break

      case 'right':
        coords.x++
        break

      case 'up':
        coords.y--
        break

      case 'down':
        coords.y++
        break
    }

    if(utils.cellCoordinatesAreWithWorldBoundariesAndNotNull(gamestate, coords.x, coords.y)) {
      cellSelected(gamestate, coords.x, coords.y)
    }
  }

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

    utils.forAllUnits(gamestate, unit => {
      unit.hasMoved = false
      unit.hasTakenAction = false
    })

    gamestate.round++
  }

  $('#message-window-content').html(`It is currently ${gamestate.currentPlayer.handle}'s turn`)
  logMessage(`round ${gamestate.round}, ${gamestate.currentPlayer.handle}'s turn`)
  viewLogic.addCurrentPlayerBorderToBoard(gamestate)
}

function setBaseHandlers(gamestate) {
  $('.cell').on('click', e => {
    let cell = $(e.currentTarget)
    let x = +cell.attr('data-x')
    let y = +cell.attr('data-y')
    // console.log('cell clicked, coordinates: ', x, y)
    cellSelected(gamestate, x, y)
  })

  $('#end-turn').click(e => {
    endTurn(gamestate)
  })
}

function cellSelected(gamestate, x, y) {
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

    let cell = utils.getCellFromCoordinates(gamestate, x, y)

    if(cell.indicator === 'indicator-weapon-range') {
      setActionsWindow_ConfirmAttack(gamestate)
    }
  }

  // necessary?
  if(gamestate.currentMode === 'move') {

  }

  if(gamestate.currentMode === 'item') {

  }
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



//
// Views
//
function setActionsWindow_Empty(gamestate) {
  $('#actions-window-content').html('')
}

function setActionsWindow_BasicActions(gamestate) {
  let unit = utils.getUnitfromSelectedUnitId(gamestate)
  let moveDisabled = unit.hasMoved ? 'disabled' : ''
  let actionDisabled = unit.hasTakenAction ? 'disabled' : ''

  let htmlString = ``
  htmlString += `<button id='action-move' class='btn btn-medium' ${moveDisabled}>Move</button>`
  htmlString += `<button id='action-attack' class='btn btn-medium' ${actionDisabled}>Attack</button>`
  htmlString += `<button id='action-defend' class='btn btn-medium' ${actionDisabled}>Defend</button>`
  htmlString += `<button id='action-items' class='btn btn-medium' ${actionDisabled}>Items</button>`
  htmlString += `<button id='action-magic' class='btn btn-medium' ${actionDisabled}>Magic</button>`
  htmlString += `<button id='action-special-talent' class='btn btn-medium' ${actionDisabled}>Special Talent</button>`
  htmlString += `<button id='end-turn' class='btn btn-medium' ${actionDisabled}>Temporary - End Turn</button>`

  $('#actions-window-content').html(htmlString)

  $('#action-attack').click(e => {
    actionAttack(gamestate)
  })

  $('#action-move').click(e => {
    actionMove(gamestate)
  })

  // other basic actions...
}

function setActionsWindow_CancelAttack(gamestate) {
  let htmlString = ``
  htmlString += `<button id='action-cancel-attack' class='btn btn-medium'>Cancel Attack</button>`
  $('#actions-window-content').html(htmlString)

  $('#action-cancel-attack').click(e => {
    cancelAttack(gamestate)
  })
}

function setActionsWindow_ConfirmAttack(gamestate) {
  let htmlString = ``
  htmlString += `<button id='action-cancel-attack' class='btn btn-medium'>Cancel Attack</button>`
  htmlString += `<button id='action-confirm-attack' class='btn btn-medium'>Confirm Attack</button>`
  $('#actions-window-content').html(htmlString)

  $('#action-cancel-attack').click(e => {
    cancelAttack(gamestate)
  })

  $('#action-confirm-attack').click(e => {
    confirmAttack(gamestate)
  })
}

function setActionsWindow_Moving(gamestate) {
  let htmlString = ``
  htmlString += `<button id='action-cancel-move' class='btn btn-medium'>Cancel Move</button>`
  htmlString += `<button id='action-confirm-move' class='btn btn-medium'>Confirm Move</button>`
  $('#actions-window-content').html(htmlString)

  $('#action-cancel-move').click(e => {
    cancelMove(gamestate)
  })

  $('#action-confirm-move').click(e => {
    confirmMove(gamestate)
  })
}

function actionAttack(gamestate) {
  let unit = utils.getUnitfromSelectedUnitId(gamestate)
  showWeaponRange(unit, gamestate)
  gamestate.currentMode = 'attack'
  setActionsWindow_CancelAttack(gamestate)

  // this is so the secondary cursor will start of where you left your unit
  gamestate.selectedCellSecondary.x = gamestate.selectedCell.x
  gamestate.selectedCellSecondary.y = gamestate.selectedCell.y
}

function actionMove(gamestate) {
  let unit = utils.getUnitfromSelectedUnitId(gamestate)
  gamestate.moveRevertCoordinates.x = unit.x
  gamestate.moveRevertCoordinates.y = unit.y
  showUnitMoveRange(unit, gamestate)
  gamestate.currentMode = 'move'
  setActionsWindow_Moving(gamestate)
}

function cancelMove(gamestate) {
  gamestate.currentMode = 'default'
  clearMoveRangeIndicators(gamestate)
  setActionsWindow_BasicActions(gamestate)

  // move unit back to where it started
  let unit = utils.getUnitfromSelectedUnitId(gamestate)
  let oldCell = utils.getCellFromCoordinates(gamestate, unit.x, unit.y)
  let newCell = utils.getCellFromCoordinates(gamestate, gamestate.moveRevertCoordinates.x, gamestate.moveRevertCoordinates.y)

  // click move then click cancel without moving
  if(newCell !== oldCell) {
    movement.moveUnit(gamestate, oldCell, newCell)
  }

  render(gamestate)
}

function cancelAttack(gamestate) {
  gamestate.currentMode = 'default'
  clearWeaponRangeIndicators(gamestate)
  setActionsWindow_BasicActions(gamestate)
}

function confirmAttack(gamestate) {
  let attacker = gamestate.board[gamestate.selectedCell.x][gamestate.selectedCell.y].occupiedBy
  let defender = gamestate.board[gamestate.selectedCellSecondary.x][gamestate.selectedCellSecondary.y].occupiedBy

  // check for empty square

  animations.attack(gamestate, attacker, defender)

  let battleResults = gameLogic.attack(gamestate, attacker, defender)

  attacker.hasTakenAction = true

  battleResults.messages.forEach(x => {
    logMessage(x)
  })

  // clearSelectors(gamestate)

  clearWeaponRangeIndicators(gamestate)

  gamestate.players.forEach(player => {
    if(utils.allPlayersUnitsAreDead(gamestate, player)) {
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

  console.log(gamestate.selectedCell)
}

function confirmMove(gamestate) {
  let unit = utils.getUnitfromSelectedUnitId(gamestate)
  let cell = utils.getCellFromCoordinates(gamestate, unit.x, unit.y)
  if(cell.unitMovingThrough === null) { // unit is not occupying someone else's square
    gamestate.currentMode = 'default'
    clearMoveRangeIndicators(gamestate)
    unit.hasMoved = true
    setActionsWindow_BasicActions(gamestate)
    render(gamestate)
  } else {
    console.log('can\'t place a unit on top of another unit')
  }
}





function showWeaponRange(unit, gamestate) {
  let x = gamestate.selectedCell.x
  let y = gamestate.selectedCell.y

  let coordinates = gameLogic.getCoordinatesForWeaponRange(unit.items.equipped.weapon, x, y)

  if(coordinates.length === 0) { console.log('weapon not listed in gameLogic.getCoordinatesForWeaponRange()') }

  coordinates.forEach(coord => {
    if(gamestate.board[coord.x] && gamestate.board[coord.x][coord.y]) {
      gamestate.board[coord.x][coord.y].indicator = `indicator-weapon-range`
    }
  })

  render(gamestate)
}

function clearWeaponRangeIndicators(gamestate) {
  utils.forEachCell(gamestate, cell => {
    if(cell.indicator === 'indicator-weapon-range') {
      cell.indicator = null
    }
  })

  render(gamestate)
}

function clearMoveRangeIndicators(gamestate) {
  utils.forEachCell(gamestate, cell => {
    if(cell.indicator === 'indicator-move-range') {
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

function showUnitMoveRange(unit, gamestate) {
  let coordinates = gameLogic.getCoordinatesForMoveRange(gamestate, unit)

  coordinates.forEach(coord => {
    gamestate.board[coord.x][coord.y].indicator = `indicator-move-range`
  })

  render(gamestate)
}


/*

Utility Functions

*/

function render(gamestate) {
  viewLogic.render('#game', gamestate)
  viewLogic.addCurrentPlayerBorderToBoard(gamestate)
  setBaseHandlers(gamestate)
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




