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
}

function cellIsSelected(cell, gamestate) {
  if(cell.x === gamestate.selectedCell.x && cell.y === gamestate.selectedCell.y) return true
  return false
}

function cellIsSelectedSecondary(cell, gamestate) {
  if(cell.x === gamestate.selectedCellSecondary.x && cell.y === gamestate.selectedCellSecondary.y) return true
  return false
}


// function addCssAnimationToPage() {
//   var style = document.createElement('style')
//   style.type = 'text/css'
//   style.innerHTML = 'body {}'
//   document.getElementsByTagName('head')[0].appendChild(style)
//   this.stylesheet = document.styleSheets[document.styleSheets.length-1]
//   try {
//     this.stylesheet.insertRule('\
//   @-webkit-keyframes spinIt {\
//       100% {\
//           -webkit-transform: rotate(A_DYNAMIC_VALUE);\
//       }\
//   }\
//   @-moz-keyframes spinIt {\
//       100% {\
//           -webkit-transform: rotate(A_DYNAMIC_VALUE);\
//       }\
//   }', this.stylesheet.rules.length);
//       } catch (e) {};
// }


// todo: remove this after figuring out how import/exports work
function logMessage(message) {
  $('#log-window-content').prepend(`${message}<br>`)
}

export {render, addPlayerAnimations, addGeneralAnimations}














































