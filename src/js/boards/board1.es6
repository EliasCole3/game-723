'use strict'

import img_mountains    from '../../images/app/moutains.png' // this is stupid. Every time I try to fix it webpack won't cooperate -_-
import img_water        from '../../images/app/water.png'
import img_warrior      from '../../images/app/warrior.png'
import img_warrior_dead from '../../images/app/warrior-dead.png'
import img_archer      from '../../images/app/archer.png'
import img_archer_dead from '../../images/app/archer-dead.png'

import * as gameLogic   from '../game-logic.es6'

import { Cell, Unit, Warrior, Player } from '../classes.es6'


// assumes three players in gamestate
function getBoard(gamestate) {
  let board = []
  let boardsizeX = gamestate.boardsize.x
  let boardsizeY = gamestate.boardsize.y

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

  let wargogsItems = {
    equipped: {
      weapon: 'axe',
      armor: '',
      healm: '',
      boots: '',
      ring: ''
    },
    inventory: {
      quest: [],
      consumables: [],
      equippable: []
    }
  }

  let wargrogsItems = {
    equipped: {
      weapon: 'axe of the gods',
      armor: '',
      healm: '',
      boots: '',
      ring: ''
    },
    inventory: {
      quest: [],
      consumables: [],
      equippable: []
    }
  }

  let joesItems = {
    equipped: {
      weapon: 'axe',
      armor: '',
      healm: '',
      boots: '',
      ring: ''
    },
    inventory: {
      quest: [],
      consumables: [],
      equippable: []
    }
  }

  let hanksItems = {
    equipped: {
      weapon: 'axe',
      armor: '',
      healm: '',
      boots: '',
      ring: ''
    },
    inventory: {
      quest: [],
      consumables: [],
      equippable: []
    }
  }

  let lightningsItems = {
    equipped: {
      weapon: 'axe',
      armor: '',
      healm: '',
      boots: '',
      ring: ''
    },
    inventory: {
      quest: [],
      consumables: [],
      equippable: []
    }
  }

  let thundersItems = {
    equipped: {
      weapon: 'axe',
      armor: '',
      healm: '',
      boots: '',
      ring: ''
    },
    inventory: {
      quest: [],
      consumables: [],
      equippable: []
    }
  }

  let arrowsItems = {
    equipped: {
      weapon: 'basic bow',
      armor: '',
      healm: '',
      boots: '',
      ring: ''
    },
    inventory: {
      quest: [],
      consumables: [],
      equippable: []
    }
  }

  let warriorImages = {
      default: img_warrior,
      dead: img_warrior_dead
    }

  let archerImages = {
      default: img_archer,
      dead: img_archer_dead
    }

  // board[2][3].occupiedBy = new Warrior(gameLogic.getNextId(gamestate), 2, 3, 20, 0, 25, 13, 12, 'wargog', img_warrior, gamestate.players[0], 5, warriorImages, wargogsItems)
  board[0][1].occupiedBy = new Warrior(gameLogic.getNextId(gamestate), 0, 1, 22, 0, 11, 10, 8, 'wargrog', img_warrior, gamestate.players[0], 4, warriorImages, wargrogsItems)
  board[1][1].occupiedBy = new Warrior(gameLogic.getNextId(gamestate), 1, 1, 12, 0, 8, 11, 16, 'arrow', img_archer, gamestate.players[0], 4, archerImages, arrowsItems)

  // board[3][4].occupiedBy = new Warrior(gameLogic.getNextId(gamestate), 3, 4, 30, 0, 8, 12, 13, 'Joe', img_warrior, gamestate.players[1], 3, warriorImages, joesItems)
  board[4][4].occupiedBy = new Warrior(gameLogic.getNextId(gamestate), 4, 4, 25, 0, 11, 12, 9, 'Hank', img_warrior, gamestate.players[1], 4, warriorImages, hanksItems)

  // board[0][2].occupiedBy = new Warrior(gameLogic.getNextId(gamestate), 4, 4, 25, 0, 25, 12, 9, 'Lightning', img_warrior, gamestate.players[2], 4, warriorImages, lightningsItems)
  board[0][4].occupiedBy = new Warrior(gameLogic.getNextId(gamestate), 0, 4, 25, 0, 22, 12, 9, 'Thunder', img_warrior, gamestate.players[2], 4, warriorImages, thundersItems)

  return board
}

export {getBoard}































































