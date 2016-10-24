require('./scss/style')
require('chosen/chosen.jquery')
require('chosen/chosen.css')
require('bootstrap/dist/js/bootstrap.js')
require('bootstrap/dist/css/bootstrap.css')
let img_mountains = require('./images/moutains.png')
let img_water = require('./images/water.png')

let say = require('./js/sample1')
let Cell = require('./js/classes.es6').Cell
let Blah = require('./js/classes.es6').Blah
let viewLogic = require('./js/view-logic.es6')
// import{Cell, Blah} from './js/classes.es6' //figure this out later


let config = {
  chosenOptions: {
    search_contains: true
  }
}



$(() => {


  $('#board-size-x').chosen(config.chosenOptions)
  $('#board-size-y').chosen(config.chosenOptions)

  $('#start').on('click', e => {
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


  })



})