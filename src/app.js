require('./css/jquery-ui.css')
require('./scss/style')
require('chosen/chosen.jquery')
require('chosen/chosen.css')
require('bootstrap/dist/js/bootstrap.js')
require('bootstrap/dist/css/bootstrap.css')

let img_mountains = require('./images/app/moutains.png')
let img_water = require('./images/app/water.png')
let img_warrior = require('./images/app/warrior.png')

let say = require('./js/sample1')
let Cell = require('./js/classes.es6').Cell
let Blah = require('./js/classes.es6').Blah
let Unit = require('./js/classes.es6').Unit
let Warrior = require('./js/classes.es6').Warrior
let Player = require('./js/classes.es6').Player
let gameLogic = require('./js/game-logic.es6')
let viewLogic = require('./js/view-logic.es6')
let createMessageWindow = require('./js/windows.es6').createMessageWindow

// import{Cell, Blah} from './js/classes.es6' //figure this out later

let keypress = require('keypress.js')



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


let config = {
  chosenOptions: {
    search_contains: true
  }
}

let player1 = new Player('username1', 'Irritic', '0000cc')
let player2 = new Player('username2', 'Findled', 'cc0033')
let player3 = new Player('username3', 'Oprahwindfury', '33cc00')
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
  board: null,
  boardsize: {
    x: 5,
    y: 5
  },
  units: []
}


$(() => {


  $('#board-size-x').chosen(config.chosenOptions)
  $('#board-size-y').chosen(config.chosenOptions)

  // let test3 = new Unit(gameLogic.getNextId(gamestate), 1, 1, 1, 20, 0, 10, 10, 10)
  // console.log(test3)

  // let test4 = new Warrior(gameLogic.getNextId(gamestate), 1, 1, 20, 0, 10, 10, 10, 'wargog', img_warrior)
  // console.log(test4)

  $('#start').on('click', e => {
    viewLogic.addPlayerAnimations(gamestate)
    startHandler(gamestate)
    setKeyboardHandlers(gamestate)
    setNonBoardHandlers(gamestate)
    createMessageWindow()
  })





})



function startHandler(gamestate) {
  // let testCell = new Cell(0, 0, 'mountains', img_mountains)
  // console.log(testCell)
  // $('#game').html(`<img src='${mountains}'>`)
  // $('#game').html(`<img src='${testCell.backgroundImage}'>`)
  // let testBlah = new Blah(0, 0, 'mountains', './images/app/tiles/mountains.jpg')
  // console.log(testBlah)


  let boardsizeX = +$('#board-size-x option:selected').val()
  let boardsizeY = +$('#board-size-y option:selected').val()
  // console.log(boardsizeX, boardsizeY)
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

  let testWarrior = new Warrior(gameLogic.getNextId(gamestate), 2, 3, 20, 0, 10, 10, 10, 'wargog', img_warrior, player1, false, 5, [])

  board[2][3].occupiedBy = testWarrior
  board[3][4].occupiedBy = new Warrior(gameLogic.getNextId(gamestate), 2, 3, 20, 0, 10, 10, 10, 'wargiggle', img_warrior, player2, false, 3, [])

  gamestate.board = board

  viewLogic.render('#game', gamestate)
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

      $('#events').html(`p down`)

      for(let x=0; x<gamestate.boardsize.x; x++) {
        for(let y=0; y<gamestate.boardsize.y; y++) {
          if(gamestate.board[x][y].occupiedBy) {
            // console.log(`${gamestate.board[x][y].occupiedBy.name} is owned by ${gamestate.board[x][y].occupiedBy.player.handle}`)
            gamestate.board[x][y].indicator = `indicator-${gamestate.board[x][y].occupiedBy.player.username}`
          }

        }
      }

      viewLogic.render('#game', gamestate)
    },
    on_keyup: (e, countPressed, autoRepeat) => {
      $('#events').html(`p up`)

      let playerIndicators = []
      gamestate.players.forEach(x => {
        playerIndicators.push(`indicator-${x.username}`)
      })

      forEachCell(gamestate, cell => {
        if(playerIndicators.includes(cell.indicator)) {
          cell.indicator = null
        }
      })

      viewLogic.render('#game', gamestate)
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

  if(!oldCell.occupiedBy) {
    console.log('there\'s nothing in that cell sillyface')
    return
  }

  newCell.occupiedBy = oldCell.occupiedBy
  oldCell.occupiedBy = null

  gamestate.selectedCell.x = newX
  gamestate.selectedCell.y = newY

  viewLogic.render('#game', gamestate)
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


function setNonBoardHandlers(gamestate) {

  $('#end-turn').click(e => {
    endTurn(gamestate)
  })




}

function endTurn(gamestate) {
  // temporary, for testing
  $('#events').html(`${gamestate.currentPlayer.handle}'s turn has ended. Current player is now ${gamestate.players.next().handle}`)

  gamestate.currentPlayer = gamestate.players[gamestate.players.current]
}


function forEachCell(gamestate, callback) {
  for(let x=0; x<gamestate.boardsize.x; x++) {
    for(let y=0; y<gamestate.boardsize.y; y++) {
      callback(gamestate.board[x][y])
    }
  }
}




























