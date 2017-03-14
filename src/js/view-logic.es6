'use strict'

import * as windows from 'windows.es6'
import * as utils   from 'utilities.es6'
import bootstrap    from 'bootstrap.js'
import greensock    from 'greensock.js'
import keypress     from 'keypress.js'

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

      // to allow movement over allies and corpses
      if(cell.unitMovingThrough) {
        let unit = cell.unitMovingThrough
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
      if(cellIsSelected(gamestate, cell)) {
        htmlString += `<span class='selector default-selector'></span>`
      }

      // context sensitive selector, for attacking, moving, etc.
      if(cellIsSelectedSecondary(gamestate, cell)) {
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

function cellIsSelected(gamestate, cell) {
  if(cell.x === gamestate.selectedCell.x && cell.y === gamestate.selectedCell.y) return true
  return false
}

function cellIsSelectedSecondary(gamestate, cell) {
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

// insertModalHtml("modal-lg")
// insertModalHtml("modal-sm")
// insertModalHtml()
// http://getbootstrap.com/javascript/#modals
function insertModalHtml(size) {
  let _size = size === undefined ? "" : size
  let htmlString = `
  <div id='modal' class='modal fade'>
    <div class='modal-dialog ${_size}'>
      <div class='modal-content'>
        <div id='modal-header' class='modal-header'></div>
        <div id='modal-body' class='modal-body'>
          <div id='form-target'></div>
        </div>
        <div id='modal-footer' class='modal-footer'></div>
      </div>
    </div>
  </div>`

  $('#modal-holder').html(htmlString)
}

function autotype(params) {
  if(params.index === undefined) params.index = 0

  if(params.index === params.message.length) {
    if(params.callback) params.callback()
    return
  }

  $(params.selector).append(params.message[params.index])
  params.index++

  setTimeout(() => {
    autotype(params)
  }, params.speed)
}

/*

  Example Usage:

  viewLogic.addFloatingText({
    startCoordinates: {
      x: 300,
      y: 300
    },
    color: '#0000ff',
    size: '14px',
    text: 'slooooooowed'
  })

 */
function addFloatingText(params) {
  let randomId = utils.getRandomIntInclusive(10000000, 99999999)
  let styles = [
    `color: ${params.color}`,
    `top: ${params.startCoordinates.y}px`,
    `left: ${params.startCoordinates.x}px`,
    `position: absolute`,
    `font-size: ${params.size}`
  ]
  let htmlString = `<span id='${randomId}' class='' style='${styles.join(';')}'>${params.text}</span>`
  $('#wrapper').append(htmlString)
  let newRandomParticle = $(`#${randomId}`)
  TweenMax.to(newRandomParticle, 2, {
    top: `${params.startCoordinates.y - 40}px`,
    opacity: '.5',
    onComplete: () => {
      newRandomParticle.remove()
    }
  })
}

/*

  Example usage:

  messageSet({
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

 */
function messageSet(params) {
  // default parameters
  if(!params.speed) params.speed = 40
  if(!params.selector) params.selector = '#modal-body'

  params.listener = new keypress.Listener()

  // Generator, which produces an iterator
  function* getMessageSetIterator(params) {
    let index = 0

    while(index < params.messages.length) {
      yield params.messages[index++]
    }
  }

  params.messageSet = getMessageSetIterator(params)

  // always do it once, because it's a message set
  let tempAutotypeValues = addNextMessageInMessageSet(params)

  params.listener.simple_combo('space', () => {

    // remove the last box
    tempAutotypeValues.box.remove()

    // create the new box and start autotyping
    tempAutotypeValues = addNextMessageInMessageSet(params)

  })
}

function addNextMessageInMessageSet(params) {
  let randomId = utils.getRandomIntInclusive(10000000, 99999999)
  let htmlString = `<span id='${randomId}'></span>`
  $(params.selector).append(htmlString)
  let tempAutotypeBox = $(`#${randomId}`)

  let nextMessage = params.messageSet.next()

  if(nextMessage.done === true) {

    // otherwise the spacebar handlers start building up. Equivalent to $('').off()
    params.listener.reset()

    if(params.callback) params.callback()
  } else {
    autotype({
      selector: `#${randomId}`,
      message: nextMessage.value,
      speed: params.speed
    })
  }

  return {box: tempAutotypeBox, message: nextMessage}
}

function unitSays(params) {

  let unit

  utils.forAllUnits(params.gamestate, x => {
    if(x.name === params.unitName) unit = x
  })

  if(!unit) console.log('unit name not found in unitSays()')

  let unitMidpoint = utils.getUnitMidpoint(unit)

  let randomId = utils.getRandomIntInclusive(10000000, 99999999)

  let styles = [
    `top: ${unitMidpoint.y - 20}px`,
    `left: ${unitMidpoint.x + 20}px`,
    `width: 200px`,
    `height: 80px`,
    `position: absolute`,
    `background-color: white`
  ]

  let id = `unit-dialogue-box-${randomId}`

  let htmlString = `<span id='${id}' style='${styles.join(';')}'></span>`

  $('#wrapper').append(htmlString)

  messageSet({
    selector: `#${id}`,
    messages: params.messages,
    speed: 40,
    callback: () => {
      $(`#${id}`).remove()
      if(params.callback) params.callback()
    }
  })

}



/*

show.bs.modal
shown.bs.modal
hide.bs.modal
hidden.bs.modal

 */
// $('#modal').on('shown.bs.modal', function(e) {

// })

// $('#form-target').html(htmlString)

// $('#modal').modal('hide')
// $('#modal').modal('show')


export {render, addPlayerAnimations, addGeneralAnimations, setInitialMessages, createWindows, addPlayerIndicators, removePlayerIndicators, addCurrentPlayerBorderToBoard, showUnitInfo, autotype, addFloatingText, messageSet, unitSays}














































