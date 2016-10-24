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
      htmlString += `<td id='${cell.x}-${cell.y}'>`
      htmlString += `<img src='${cell.backgroundImage}'>`
      htmlString += `</td>`
    })

    htmlString += `</tr>`
  }


  htmlString += `</table>`
  return htmlString
}


export {render}














































