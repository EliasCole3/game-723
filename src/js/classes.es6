// module.exports = class Cell {

//   constructor(x, y, cellType, backgroundImage) {
//     this.x = x
//     this.y = y
//     this.cellType = cellType
//     this.backgroundImage = backgroundImage
//   }

// }

class Blah {

  constructor(x, y, cellType, backgroundImage) {
    this.x = x
    this.y = y
    this.cellType = cellType
    this.backgroundImage = backgroundImage
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

class Cell {

  constructor(x, y, cellType, backgroundImage, occupiedBy=null, indicator=null) {
    this.x = x
    this.y = y
    this.cellType = cellType
    this.backgroundImage = backgroundImage
    this.occupiedBy = occupiedBy
    this.indicator = indicator
  }

}

class Unit {

  constructor(id, x, y, hp, mp, strength, intelligence, dexterity, name, image, player, hasTakenTurn, speed, items={}) {
    this.id = id
    this.x = x
    this.y = y
    this.hp = hp
    this.mp = mp
    this.strength = strength
    this.intelligence = intelligence
    this.dexterity = dexterity
    this.name = name
    this.image = image
    this.player = player
    this.hasTakenTurn = hasTakenTurn
    this.speed = speed
    this.items = items
    this.current = {
      hp: hp,
      mp: mp,
      strength: strength,
      intelligence: intelligence,
      dexterity: dexterity,
      hasTakenTurn: hasTakenTurn,
      speed: speed
    }
  }


}

class Warrior extends Unit {

  constructor(id, x, y, hp, mp, strength, intelligence, dexterity, name, image, player, hasTakenTurn, speed, items) {
    super(id, x, y, hp, mp, strength, intelligence, dexterity, name, image, player, hasTakenTurn, speed, items)

    // console.log('constructing new warrior:')
    // for(let prop in this) {
    //   console.log(prop, this[prop])
    // }
  }

}

class Player {

  constructor(username, handle, color, hasTakenTurn=false) {
    this.username = username
    this.handle = handle
    this.color = color
    this.hasTakenTurn = hasTakenTurn
  }

}

// function setConstructorParams() {

// }


// constructor(...params) {
//   params.forEach(x => {
//     this[x] = x
//   })
// }


export {Item, Cell, Blah, Unit, Warrior, Player}


