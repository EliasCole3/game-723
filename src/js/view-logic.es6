function render(selector, gamestate) {
  $(selector).html(generateBoardHtml(gamestate.board))
  setHandlers(gamestate)
}

/**
 * @param   board      2D array of game cells
 * @return  string     html snippet for the game board
 */
function generateBoardHtml(board) {
  let htmlString = ``

  htmlString += `<table id='game-board'>`

  let numberOfRows = board[0].length

  for(let i=0; i<numberOfRows; i++) {
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
        htmlString += `<img id='${imageId}' src='${cell.occupiedBy.image}' class='cell-image'>`
      }

      if(cell.indicator) {
        htmlString += `<span class='indicator' style='animation: ${cell.indicator} 1.1s infinite; animation-direction: alternate;'></span>`
      }

      htmlString += `</td>`
    })

    htmlString += `</tr>`
  }


  htmlString += `</table>`
  return htmlString
}

function setHandlers(gamestate) {
  $('.cell').on('click', e => {
    let element = $(e.currentTarget)
    let x = +element.attr('data-x')
    let y = +element.attr('data-y')
    console.log('cell clicked, coordinates: ', x, y)
    gamestate.selectedCell.x = x
    gamestate.selectedCell.y = y

    if(gamestate.board[x][y].occupiedBy) { unitClicked(x, y, gamestate) }
  })

}

function unitClicked(x, y, gamestate) {
  let unit = gamestate.board[x][y].occupiedBy

  console.log(unit)

  let htmlString = ``
  for(let prop in unit) {
    htmlString += `${prop}: ${unit[prop]}<br>`
  }

  // $('#window-content').html(unit.name)
  $('#window-content').html(htmlString)
}

function addCssToPage(content) {
  console.log(`adding style to page: ${content}`)
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


export {render, setHandlers, addPlayerAnimations}














































