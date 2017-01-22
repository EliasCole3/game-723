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

// class Item {

//   constructor(x, y, image, name) {
//     this.x = x
//     this.y = y
//     this.image = image
//     this.name = name
//   }

// }

class Cell {

  constructor(x, y, cellType, backgroundImage, passable=true, occupiedBy=null, indicator=null) {
    this.x = x
    this.y = y
    this.cellType = cellType
    this.backgroundImage = backgroundImage
    this.passable = passable
    this.occupiedBy = occupiedBy
    this.indicator = indicator
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

// function setConstructorParams() {

// }


// constructor(...params) {
//   params.forEach(x => {
//     this[x] = x
//   })
// }


export {Cell, Blah, Unit, Warrior, Archer, Wizard, Player}


