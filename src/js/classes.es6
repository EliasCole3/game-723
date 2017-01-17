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

  constructor(id, x, y, hp, mp, strength, intelligence, dexterity, name, image, player, speed, images={}, items={}) {
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

  constructor(id, x, y, hp, mp, strength, intelligence, dexterity, name, image, player, speed, images, items) {
    super(id, x, y, hp, mp, strength, intelligence, dexterity, name, image, player, speed, images, items)

    this.primaryStat = 'strength'
    // console.log('constructing new warrior:')
    // for(let prop in this) {
    //   console.log(prop, this[prop])
    // }
  }

}

class Archer extends Unit {

  constructor(id, x, y, hp, mp, strength, intelligence, dexterity, name, image, player, speed, images, items) {
    super(id, x, y, hp, mp, strength, intelligence, dexterity, name, image, player, speed, images, items)

    this.primaryStat = 'dexterity'
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


export {Cell, Blah, Unit, Warrior, Player}


