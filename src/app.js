require('./css/jquery-ui.css')
require('./scss/style')
require('chosen/chosen.jquery')
require('chosen/chosen.css')
require('bootstrap/dist/js/bootstrap.js')
require('bootstrap/dist/css/bootstrap.css')

let img_mountains = require('./images/app/moutains.png')
let img_water = require('./images/app/water.png')
let img_warrior = require('./images/app/warrior.png')
let img_warrior_dead = require('./images/app/warrior-dead.png')

let say = require('./js/sample1')
let Cell = require('./js/classes.es6').Cell
let Blah = require('./js/classes.es6').Blah
let Unit = require('./js/classes.es6').Unit
let Warrior = require('./js/classes.es6').Warrior
let Player = require('./js/classes.es6').Player
let gameLogic = require('./js/game-logic.es6')
let viewLogic = require('./js/view-logic.es6')
let windows = require('./js/windows.es6')

// import{Cell, Blah} from './js/classes.es6' //figure this out later

let keypress = require('keypress.js')






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
    viewLogic.addPlayerAnimations(gamestate)
    viewLogic.addGeneralAnimations(gamestate)
    startHandler(gamestate)
    setKeyboardHandlers(gamestate)
    setNonBoardHandlers(gamestate)
    createWindows()
    setInitialMessages(gamestate)
  })

})

function setInitialMessages(gamestate) {
  logMessage('Game started!')
  logMessage('Top of round 1')
  logMessage(`${gamestate.currentPlayer.handle}'s turn`)
  $('#message-window-content').html(`It is currently ${gamestate.currentPlayer.handle}'s turn`)
}

function createWindows() {
  windows.createWindow({
    windowId: 'message',
    content: ``,
    width: '450px',
    height: '320px',
    locationX: '300px',
    locationY: '50px'
  })

  windows.createWindow({
    windowId: 'log',
    content: ``,
    width: '450px',
    height: '200px',
    locationX: '300px',
    locationY: '400px'
  })

  windows.createWindow({
    windowId: 'context',
    content: ``,
    width: '450px',
    height: '320px',
    locationX: '800px',
    locationY: '50px'
  })

  windows.createWindow({
    windowId: 'actions',
    content: ``,
    width: '450px',
    height: '320px',
    locationX: '800px',
    locationY: '400px'
  })
}

function startHandler(gamestate) {

  let boardsizeX = +$('#board-size-x option:selected').val()
  let boardsizeY = +$('#board-size-y option:selected').val()
  gamestate.boardsize.x = boardsizeX
  gamestate.boardsize.y = boardsizeY

  let board = []

  for(let i=0; i<boardsizeX; i++) {
    board.push([])
  }

  for(let x=0; x<boardsizeX; x++) {
    for(let y=0; y<boardsizeY; y++) {
      board[x][y] = new Cell(x, y, 'mountains', img_mountains)
    }
  }

  board[1][1] = new Cell(1, 1, 'water', img_water)
  board[1][2] = new Cell(1, 2, 'water', img_water)
  board[2][2] = new Cell(2, 2, 'water', img_water)

  let wargogsItems = {
    equipped: {
      weapon: 'axe',
      armor: '',
      healm: '',
      boots: '',
      ring: ''
    },
    inventory: {
      quest: [],
      consumables: [],
      equippable: []
    }
  }

  let wargrogsItems = {
    equipped: {
      weapon: 'axe of the gods',
      armor: '',
      healm: '',
      boots: '',
      ring: ''
    },
    inventory: {
      quest: [],
      consumables: [],
      equippable: []
    }
  }

  let joesItems = {
    equipped: {
      weapon: 'axe',
      armor: '',
      healm: '',
      boots: '',
      ring: ''
    },
    inventory: {
      quest: [],
      consumables: [],
      equippable: []
    }
  }

  let hanksItems = {
    equipped: {
      weapon: 'axe',
      armor: '',
      healm: '',
      boots: '',
      ring: ''
    },
    inventory: {
      quest: [],
      consumables: [],
      equippable: []
    }
  }

  let lightningsItems = {
    equipped: {
      weapon: 'axe',
      armor: '',
      healm: '',
      boots: '',
      ring: ''
    },
    inventory: {
      quest: [],
      consumables: [],
      equippable: []
    }
  }

  let thundersItems = {
    equipped: {
      weapon: 'axe',
      armor: '',
      healm: '',
      boots: '',
      ring: ''
    },
    inventory: {
      quest: [],
      consumables: [],
      equippable: []
    }
  }

  let warriorImages = {
      default: img_warrior,
      dead: img_warrior_dead
    }

  // board[2][3].occupiedBy = new Warrior(gameLogic.getNextId(gamestate), 2, 3, 20, 0, 25, 13, 12, 'wargog', img_warrior, player1, false, 5, warriorImages, wargogsItems)
  board[0][1].occupiedBy = new Warrior(gameLogic.getNextId(gamestate), 0, 1, 22, 0, 11, 10, 8, 'wargrog', img_warrior, player1, false, 4, warriorImages, wargrogsItems)
  // board[3][4].occupiedBy = new Warrior(gameLogic.getNextId(gamestate), 3, 4, 30, 0, 8, 12, 13, 'Joe', img_warrior, player2, false, 3, warriorImages, joesItems)
  board[4][4].occupiedBy = new Warrior(gameLogic.getNextId(gamestate), 4, 4, 25, 0, 11, 12, 9, 'Hank', img_warrior, player2, false, 4, warriorImages, hanksItems)
  // board[0][2].occupiedBy = new Warrior(gameLogic.getNextId(gamestate), 4, 4, 25, 0, 25, 12, 9, 'Lightning', img_warrior, player3, false, 4, warriorImages, lightningsItems)
  board[0][4].occupiedBy = new Warrior(gameLogic.getNextId(gamestate), 4, 4, 25, 0, 22, 12, 9, 'Thunder', img_warrior, player3, false, 4, warriorImages, thundersItems)

  gamestate.board = board

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
      addPlayerIndicators(gamestate)
      render(gamestate)
    },
    on_keyup: (e, countPressed, autoRepeat) => {
      removePlayerIndicators(gamestate)
      render(gamestate)
    }
  })

}

function addPlayerIndicators(gamestate) {
  for(let x=0; x<gamestate.boardsize.x; x++) {
    for(let y=0; y<gamestate.boardsize.y; y++) {
      if(gamestate.board[x][y].occupiedBy) {
        gamestate.board[x][y].indicator = `indicator-${gamestate.board[x][y].occupiedBy.player.username}`
      }
    }
  }
}

function removePlayerIndicators(gamestate) {
  let playerIndicators = []

  gamestate.players.forEach(x => {
    playerIndicators.push(`indicator-${x.username}`)
  })

  forEachCell(gamestate, cell => {
    if(playerIndicators.includes(cell.indicator)) {
      cell.indicator = null
    }
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

  if(anyOfTheseAreTrue(conditions)) {
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
  showUnitInfo(newCell.occupiedBy)
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

function endTurn(gamestate) {
  logMessage(`${gamestate.currentPlayer.handle}'s turn ended`)
  gamestate.currentPlayer.hasTakenTurn = true

  // always rotate players once, and keep going if multiple players are disabled
  do {
    gamestate.players.next()
    gamestate.currentPlayer = gamestate.players[gamestate.players.current]
  } while(gamestate.currentPlayer.disabled === true)

  if(allPlayersHaveTakenTheirTurn(gamestate)) {
    gamestate.players.forEach(x => {
      x.hasTakenTurn = false
    })
    gamestate.round++
  }

  $('#message-window-content').html(`It is currently ${gamestate.currentPlayer.handle}'s turn`)
  logMessage(`round ${gamestate.round}, ${gamestate.currentPlayer.handle}'s turn`)
  addCurrentPlayerBorderToBoard(gamestate)
}

function allPlayersHaveTakenTheirTurn(gamestate) {
  let playersDone = true
  gamestate.players.forEach(x => {
    if(!x.hasTakenTurn) playersDone = false
  })
  return playersDone
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

      let cell = getCellFromCoordinates(x, y, gamestate)

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
  showUnitInfo(unit)
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
    let unit = getUnitfromUnitId(gamestate)
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
      if(allPlayersUnitsAreDead(player, gamestate)) {
        player.disabled = true
      }
    })

    if(currentPlayersTurnIsOver(gamestate)) {
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


function currentPlayersTurnIsOver(gamestate) {
  let turnOver = true

  // if there are any units that haven't taken their turn yet, the player's turn isn't done
  forEachCell(gamestate, cell => {
    // try {
    //   console.log('**************************')
    //   console.log(cell.occupiedBy)
    //   console.log(cell.occupiedBy.player)
    //   console.log(gamestate.currentPlayer)
    //   console.log(gamestate.currentPlayer == cell.occupiedBy.player)
    //   console.log(gamestate.currentPlayer === cell.occupiedBy.player)
    //   console.log(cell.occupiedBy.hasTakenTurn)
    //   console.log('**************************')
    //   console.log()
    // } catch(e) {
    //   console.log('error')
    // }

    if(cell.occupiedBy && cell.occupiedBy.player === gamestate.currentPlayer) {
      if(!cell.occupiedBy.hasTakenTurn) turnOver = false
    }
  })

  return turnOver
}





function showUnitInfo(unit) {
  htmlString = ``

  let propertiesToNotShow = [
    'id',
    'image',
    'player',
    'items',
    'current'
  ]

  for(let prop in unit) {
    // if the current property isn't in the list. Easier to blacklist than whitelist
    if(!propertiesToNotShow.includes(prop)) {
      htmlString += `${prop}: ${unit[prop]}<br>`
    }
  }

  $('#context-window-content').html(htmlString)
}

function showWeaponRange(unit, x, y, gamestate) {

  let coordinates = getCoordinatesForWeaponRange(unit.items.equipped.weapon, x, y)

  coordinates.forEach(coord => {
    if(gamestate.board[coord.x] && gamestate.board[coord.x][coord.y]) {
      gamestate.board[coord.x][coord.y].indicator = `indicator-weapon-range`
    }
  })

  render(gamestate)
}

function getCoordinatesForWeaponRange(weapon, x, y) {
  let coordinates = []

  if(weapon === 'axe' || weapon === 'axe of the gods') {
    coordinates.push({x: x - 1, y: y})
    coordinates.push({x: x + 1, y: y})
    coordinates.push({x: x, y: y - 1})
    coordinates.push({x: x, y: y + 1})
  }

  // bow, spear, etc.

  return coordinates
}

function clearWeaponRange(gamestate) {
  forEachCell(gamestate, cell => {
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

function addCurrentPlayerBorderToBoard(gamestate) {
  $('#game-board').css({
    'border': `10px groove #${gamestate.currentPlayer.color}`
  })
}

function allPlayersUnitsAreDead(player, gamestate) {
  // if(player.handle === 'Oprah Windfury') debugger

  let unitsAreDead = true

  forAllUnitsOfAPlayer(player, gamestate, unit => {
    if(unit.current.hp !== 0) unitsAreDead = false
  })

  return unitsAreDead
}









/*

Utility Functions

*/

function render(gamestate) {
  viewLogic.render('#game', gamestate)
  addCurrentPlayerBorderToBoard(gamestate)
  setHandlers(gamestate)
  // addPlayerIndicators(gamestate) // for debugging, but it is kind of nice
}

function getUnitfromUnitId(gamestate) {
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

function forEachCell(gamestate, callback) {
  for(let x=0; x<gamestate.boardsize.x; x++) {
    for(let y=0; y<gamestate.boardsize.y; y++) {
      callback(gamestate.board[x][y])
    }
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




