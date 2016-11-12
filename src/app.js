require('./scss/style')
require('chosen/chosen.jquery')
require('chosen/chosen.css')
require('bootstrap/dist/js/bootstrap.js')
require('bootstrap/dist/css/bootstrap.css')
let img_mountains = require('./images/moutains.png')
let img_water = require('./images/water.png')
let img_warrior = require('./images/warrior.png')

let say = require('./js/sample1')
let Cell = require('./js/classes.es6').Cell
let Blah = require('./js/classes.es6').Blah
let Unit = require('./js/classes.es6').Unit
let Warrior = require('./js/classes.es6').Warrior
let viewLogic = require('./js/view-logic.es6')
// import{Cell, Blah} from './js/classes.es6' //figure this out later

let keypress = require('keypress.js')



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

let gamestate = {
  currentPlayer: 'player1',
  players: ['player1', 'player2']
}


$(() => {
  let listener = new keypress.Listener()
  listener.simple_combo('shift s', () => {
    console.log('You pressed shift and s')
  })


  $('#board-size-x').chosen(config.chosenOptions)
  $('#board-size-y').chosen(config.chosenOptions)



  // let test = new Unit()
  // let test2 = new Cell(x, y)

  let test3 = new Unit(1, 1, 20, 0, 10, 10, 10)
  console.log(test3)

  let test4 = new Warrior(1, 1, 20, 0, 10, 10, 10, 'wargog', img_warrior)
  console.log(test4)

  $('#start').on('click', e => {
    startHandler()
  })





})



function startHandler() {
  let testCell = new Cell(0, 0, 'mountains', img_mountains)
  console.log(testCell)
  // $('#game').html(`<img src='${mountains}'>`)
  $('#game').html(`<img src='${testCell.backgroundImage}'>`)
  // let testBlah = new Blah(0, 0, 'mountains', './images/tiles/mountains.jpg')
  // console.log(testBlah)


  let boardSizeX = +$('#board-size-x option:selected').val()
  let boardSizeY = +$('#board-size-y option:selected').val()
  console.log(boardSizeX, boardSizeY)

  let board = []

  for(let i=0; i<boardSizeX; i++) {
    board.push([])
  }

  for(let x=0; x<boardSizeX; x++) {
    for(let y=0; y<boardSizeY; y++) {
      board[x][y] = new Cell(x, y, 'mountains', img_mountains)
    }
  }

  board[1][1].backgroundImage = img_water
  board[1][2].backgroundImage = img_water
  board[2][2].backgroundImage = img_water

  viewLogic.render('#game', board)
}