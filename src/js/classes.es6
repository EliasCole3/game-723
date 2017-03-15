'use strict'

import * as gameLogic from './game-logic.es6'

// class Item {

//   constructor(x, y, image, name) {
//     this.x = x
//     this.y = y
//     this.image = image
//     this.name = name
//   }

// }

class Cell {

  constructor(x, y, cellType, backgroundImage, passable=true, occupiedBy=null, indicator=null, unitMovingThrough=null) {
    this.x = x
    this.y = y
    this.cellType = cellType
    this.backgroundImage = backgroundImage
    this.passable = passable
    this.occupiedBy = occupiedBy
    this.indicator = indicator
    this.unitMovingThrough = unitMovingThrough
  }

}

class Unit {

  constructor(id, x, y, hp, mp, strength, intelligence, dexterity, name, player, speed, images={}, items={}, hasMoved=false, hasTakenAction=false) {
    this.id = id
    this.x = x
    this.y = y
    this.hp = hp
    this.mp = mp
    this.strength = strength
    this.intelligence = intelligence
    this.dexterity = dexterity
    this.name = name
    this.images = images
    this.player = player
    this.speed = speed
    this.items = items

    this.hasTakenTurn = false
    this.current = {
      hp: hp,
      mp: mp,
      strength: strength,
      intelligence: intelligence,
      dexterity: dexterity,
      hasTakenTurn: this.hasTakenTurn,
      speed: speed
    }
  }


}

class Warrior extends Unit {

  constructor(id, x, y, hp, mp, strength, intelligence, dexterity, name, player, speed, images, items, hasMoved, hasTakenAction) {
    super(id, x, y, hp, mp, strength, intelligence, dexterity, name, player, speed, images, items, hasMoved, hasTakenAction)

    this.primaryStat = 'strength'
    // console.log('constructing new warrior:')
    // for(let prop in this) {
    //   console.log(prop, this[prop])
    // }
  }

}

class Archer extends Unit {

  constructor(id, x, y, hp, mp, strength, intelligence, dexterity, name, player, speed, images, items, hasMoved, hasTakenAction) {
    super(id, x, y, hp, mp, strength, intelligence, dexterity, name, player, speed, images, items, hasMoved, hasTakenAction)

    this.primaryStat = 'dexterity'
  }

}

class Wizard extends Unit {

  constructor(id, x, y, hp, mp, strength, intelligence, dexterity, name, player, speed, images, items, hasMoved, hasTakenAction) {
    super(id, x, y, hp, mp, strength, intelligence, dexterity, name, player, speed, images, items, hasMoved, hasTakenAction)

    this.primaryStat = 'intelligence'
  }

}

class Player {

  constructor(username, handle, color, hasTakenTurn=false, disabled=false) {
    this.username = username
    this.handle = handle
    this.color = color
    this.hasTakenTurn = hasTakenTurn
    this.disabled = disabled
  }

}

class Item {

  constructor(x, y, image, name) {
    this.x = x
    this.y = y
    this.image = image
    this.name = name
  }

}

class Spell {

  constructor(id, name, damage, effect, images={},) {
    this.id = id
    this.name = name
    this.damage = damage
    this.effect = effect
    this.images = images
  }
}




function addUnitToBoard(gamestate, board, params) {
  board[params.x][params.y].occupiedBy = new params.class (
    gameLogic.getNextId(gamestate),
    params.x,
    params.y,
    params.hp,
    params.mp,
    params.str,
    params.int,
    params.dex,
    params.name,
    params.player,
    params.speed,
    params.images,
    params.items
  )
}








export {Cell, Unit, Warrior, Archer, Wizard, Player, addUnitToBoard, Spell}


