function render(selector, board) {
  $(selector).html(generateBoardHtml(board))
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
      if(cell.occupiedBy) htmlString += `<img id='${imageId}' src='${cell.occupiedBy.image}' class='cell-image'>`

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

  $('#window-content').html(unit.name)
}


export {render, setHandlers}














































