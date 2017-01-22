'use strict'

import * as windows from 'windows.es6'
import * as utils from 'utilities.es6'

function render(selector, gamestate) {
  $(selector).html(generateBoardHtml(gamestate))
}

/**
 * @param   board      2D array of game cells
 * @return  string     html snippet for the game board
 */
function generateBoardHtml(gamestate) {
  let board = gamestate.board
  let htmlString = ``

  htmlString += `<table id='game-board'>`

  // number of rows
  for(let i=0; i<board[0].length; i++) {
    htmlString += `<tr id='row-${i}'>`

    board.forEach(column => {
      let cell = column[i]
      // let image = cell.image ? cell.image : cell.backgroundImage
      let backgroundImageId = `${cell.x}-${cell.y}-background-image`
      let imageId = `${cell.x}-${cell.y}-image`

      htmlString += `<td id='${cell.x}-${cell.y}' data-x='${cell.x}' data-y='${cell.y}' class='cell'>`

      htmlString += `<img id='${backgroundImageId}' src='${cell.backgroundImage}' class='cell-background-image'>`

      // if there's something in the cell, add it's image on top of the cell image(assuming transparent images for units, items, etc.)
      if(cell.occupiedBy) {
        let unit = cell.occupiedBy
        if(unit.current.hp === 0) {
          htmlString += `<img id='${imageId}' src='${unit.images.dead}' class='cell-image'>`
        } else {
          htmlString += `<img id='${imageId}' src='${unit.images.default}' class='cell-image'>`
        }

      }

      if(cell.indicator) {
        htmlString += `<span class='indicator' style='animation: ${cell.indicator} 1.1s infinite; animation-direction: alternate;'></span>`
      }

      // primary selector
      if(cellIsSelected(cell, gamestate)) {
        htmlString += `<span class='selector default-selector'></span>`
      }

      // context sensitive selector, for attacking, moving, etc.
      if(cellIsSelectedSecondary(cell, gamestate)) {
        if(gamestate.currentMode === 'attack') {
          htmlString += `<span class='selector attack-selector'></span>`
        }
      }

      htmlString += `</td>`
    })

    htmlString += `</tr>`
  }


  htmlString += `</table>`
  return htmlString
}



function addCssToPage(content) {
  // console.log(`adding style to page: ${content}`)
  var style = document.createElement('style')
  style.type = 'text/css'
  style.innerHTML = content
  document.getElementsByTagName('head')[0].appendChild(style)
  // console.log(document.getElementsByTagName('head')[0])
}

function addIndicatorAnimationToPage(nameParam, color1, color2) {
  let name = `indicator-${nameParam}`
  let style = `
    @keyframes ${name} {
      0% {
        background-color: #${color1};
      }
      100% {
        background-color: #${color2};
      }
    }`

  addCssToPage(style)
}

function addPlayerAnimations(gamestate) {
  gamestate.players.forEach(x => {
    addIndicatorAnimationToPage(x.username, '999999', x.color)
    // addIndicatorAnimationToPage(x.username, x.color, x.color)
  })
}

function addGeneralAnimations(gamestate) {
  addIndicatorAnimationToPage('weapon-range', '8e0404', 'e00202')
  addIndicatorAnimationToPage('move-range', '8e0404', '02e002')
}

function cellIsSelected(cell, gamestate) {
  if(cell.x === gamestate.selectedCell.x && cell.y === gamestate.selectedCell.y) return true
  return false
}

function cellIsSelectedSecondary(cell, gamestate) {
  if(cell.x === gamestate.selectedCellSecondary.x && cell.y === gamestate.selectedCellSecondary.y) return true
  return false
}

// todo: remove this after figuring out how import/exports work
function logMessage(message) {
  $('#log-window-content').prepend(`${message}<br>`)
}

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
    width: '350px',
    height: '320px',
    locationX: '550px',
    locationY: '50px'
  })

  windows.createWindow({
    windowId: 'log',
    content: ``,
    width: '350px',
    height: '200px',
    locationX: '550px',
    locationY: '400px'
  })

  windows.createWindow({
    windowId: 'context',
    content: ``,
    width: '450px',
    height: '320px',
    locationX: '950px',
    locationY: '50px'
  })

  windows.createWindow({
    windowId: 'actions',
    content: ``,
    width: '450px',
    height: '320px',
    locationX: '950px',
    locationY: '400px'
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

  utils.forEachCell(gamestate, cell => {
    if(playerIndicators.includes(cell.indicator)) {
      cell.indicator = null
    }
  })
}

function addCurrentPlayerBorderToBoard(gamestate) {
  $('#game-board').css({
    'border': `10px groove #${gamestate.currentPlayer.color}`
  })
}

function showUnitInfo(unit) {
  let htmlString = ``

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

export {render, addPlayerAnimations, addGeneralAnimations, setInitialMessages, createWindows, addPlayerIndicators, removePlayerIndicators, addCurrentPlayerBorderToBoard, showUnitInfo}














































