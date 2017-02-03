'use strict'

// import img_mountains    from '../../images/app/terrain/mountains.png' // this is stupid. Every time I try to fix it webpack won't cooperate -_-
import img_mountains    from '../../images/app/terrain/mountainmf.png'
import img_water        from '../../images/app/terrain/water.png'
import img_plains       from '../../images/app/terrain/plains.png'
import img_woods        from '../../images/app/terrain/woods.png'
import img_desert       from '../../images/app/terrain/desert.png'

import img_warrior      from '../../images/app/warrior.png'
import img_warrior_dead from '../../images/app/warrior-dead.png'
import img_archer       from '../../images/app/archer.png'
import img_archer_dead  from '../../images/app/archer-dead.png'
import img_wizard       from '../../images/app/wizard.png'
import img_wizard_dead  from '../../images/app/wizard-dead.png'

import * as gameLogic   from '../game-logic.es6'
// import * as utils       from 'utilities.es6'

import { Cell, Unit, Warrior, Archer, Wizard, Player, addUnitToBoard } from '../classes.es6'


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
      board[x][y] = new Cell(x, y, 'plains', img_plains)
    }
  }

  board[1][2] = new Cell(1, 2, 'water', img_water, false)
  board[1][3] = new Cell(1, 3, 'water', img_water, false)
  board[2][3] = new Cell(2, 3, 'water', img_water, false)

  board[6][0] = new Cell(6, 0, 'mountains', img_mountains, false)
  board[5][0] = new Cell(5, 0, 'mountains', img_mountains, false)
  board[6][1] = new Cell(6, 1, 'mountains', img_mountains, false)
  board[6][2] = new Cell(6, 2, 'mountains', img_mountains, false)
  board[4][0] = new Cell(4, 0, 'mountains', img_mountains, false)
  board[5][1] = new Cell(5, 1, 'mountains', img_mountains, false)
  board[5][2] = new Cell(5, 2, 'mountains', img_mountains, false)
  board[4][1] = new Cell(4, 1, 'mountains', img_mountains, false)


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

  let longarrowsItems = {
    equipped: {
      weapon: 'long bow',
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

  let saruseksItems = {
    equipped: {
      weapon: 'basic staff',
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

  let wizardImages = {
    default: img_wizard,
    dead: img_wizard_dead
  }



  addUnitToBoard(gamestate, board, {
    class: Warrior,
    x: 0,
    y: 1,
    hp: 22,
    mp: 0,
    str: 11,
    int: 10,
    dex: 8,
    name: 'wargrog',
    player: gamestate.players[0],
    speed: 4,
    images: warriorImages,
    items: wargrogsItems
  })

  addUnitToBoard(gamestate, board, {
    class: Archer,
    x: 1,
    y: 1,
    hp: 12,
    mp: 0,
    str: 8,
    int: 11,
    dex: 16,
    name: 'arrow',
    player: gamestate.players[0],
    speed: 5,
    images: archerImages,
    items: arrowsItems
  })

  addUnitToBoard(gamestate, board, {
    class: Archer,
    x: 1,
    y: 0,
    hp: 12,
    mp: 0,
    str: 9,
    int: 12,
    dex: 17,
    name: 'longarrow',
    player: gamestate.players[0],
    speed: 5,
    images: archerImages,
    items: longarrowsItems
  })

  addUnitToBoard(gamestate, board, {
    class: Wizard,
    x: 2,
    y: 1,
    hp: 10,
    mp: 16,
    str: 6,
    int: 18,
    dex: 12,
    name: 'sarusek',
    player: gamestate.players[0],
    speed: 3,
    images: wizardImages,
    items: saruseksItems
  })


  // board[2][3].occupiedBy = new Warrior(gameLogic.getNextId(gamestate), 2, 3, 20, 0, 25, 13, 12, 'wargog', gamestate.players[0], 5, warriorImages, wargogsItems)

  // board[1][1].occupiedBy = new Archer(gameLogic.getNextId(gamestate), 1, 1, 12, 0, 8, 11, 16, 'arrow', gamestate.players[0], 5, archerImages, arrowsItems)
  // board[1][0].occupiedBy = new Archer(gameLogic.getNextId(gamestate), 1, 0, 12, 0, 8, 11, 16, 'longarrow', gamestate.players[0], 5, archerImages, longarrowsItems)
  // board[2][1].occupiedBy = new Wizard(gameLogic.getNextId(gamestate), 2, 1, 10, 16, 6, 18, 12, 'sarusek', gamestate.players[0], 3, wizardImages, saruseksItems)



  addUnitToBoard(gamestate, board, {
    class: Warrior,
    x: 3,
    y: 2,
    hp: 25,
    mp: 0,
    str: 11,
    int: 12,
    dex: 9,
    name: 'Hank',
    player: gamestate.players[1],
    speed: 4,
    images: warriorImages,
    items: hanksItems
  })

  // board[3][4].occupiedBy = new Warrior(gameLogic.getNextId(gamestate), 3, 4, 30, 0, 8, 12, 13, 'Joe', gamestate.players[1], 3, warriorImages, joesItems)
  // board[3][2].occupiedBy = new Warrior(gameLogic.getNextId(gamestate), 3, 2, 25, 0, 11, 12, 9, 'Hank', gamestate.players[1], 4, warriorImages, hanksItems)



  addUnitToBoard(gamestate, board, {
    class: Warrior,
    x: 0,
    y: 4,
    hp: 25,
    mp: 0,
    str: 22,
    int: 12,
    dex: 9,
    name: 'Thunder',
    player: gamestate.players[2],
    speed: 4,
    images: warriorImages,
    items: thundersItems
  })

  // board[0][2].occupiedBy = new Warrior(gameLogic.getNextId(gamestate), 4, 4, 25, 0, 25, 12, 9, 'Lightning', gamestate.players[2], 4, warriorImages, lightningsItems)
  // board[0][4].occupiedBy = new Warrior(gameLogic.getNextId(gamestate), 0, 4, 25, 0, 22, 12, 9, 'Thunder', gamestate.players[2], 4, warriorImages, thundersItems)

  return board
}

export {getBoard}































































