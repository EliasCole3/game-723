'use strict'

// this is ridiculous. I get why there are testing frameworks now >.<

// let Player = require('./src/js/classes.es6').Player

class Player {
  constructor(username, handle, color, hasTakenTurn=false) {
    this.username = username
    this.handle = handle
    this.color = color
    this.hasTakenTurn = hasTakenTurn
  }
}

let player1 = new Player('username1', 'Irritic', '0000cc')
let player2 = new Player('username2', 'Findled', 'cc0033')
let player3 = new Player('username3', 'Oprah Windfury', '33cc00')

let gamestate = {
  players: [player1, player2, player3],
}

function allPlayersHaveTakenTheirTurn(gamestate) {
  let playersDone = true
  gamestate.players.forEach(x => {
    if(!x.hasTakenTurn) playersDone = false
  })
  return playersDone
}

console.log(`should be false: ${allPlayersHaveTakenTheirTurn(gamestate)}`)

gamestate.players[0].hasTakenTurn = true

console.log(`should be false: ${allPlayersHaveTakenTheirTurn(gamestate)}`)

gamestate.players[1].hasTakenTurn = true

console.log(`should be false: ${allPlayersHaveTakenTheirTurn(gamestate)}`)

gamestate.players[2].hasTakenTurn = true

console.log(`should be true: ${allPlayersHaveTakenTheirTurn(gamestate)}`)