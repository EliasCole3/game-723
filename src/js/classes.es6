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

  constructor(x, y, cellType, backgroundImage, occupiedBy=null) {
    this.x = x
    this.y = y
    this.cellType = cellType
    this.backgroundImage = backgroundImage
    this.occupiedBy = occupiedBy
  }

}

class Unit {

  constructor(id, x, y, hp, mp, strength, intelligence, dexterity, name, image, player) {
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
  }


}

class Warrior extends Unit {

  constructor(id, x, y, hp, mp, strength, intelligence, dexterity, name, image, player) {
    super(id, x, y, hp, mp, strength, intelligence, dexterity, name, image, player)

    console.log('constructing new warrior:')
    for(let prop in this) {
      console.log(prop, this[prop])
    }
  }

}

// function setConstructorParams() {

// }


// constructor(...params) {
//   params.forEach(x => {
//     this[x] = x
//   })
// }


export {Item, Cell, Blah, Unit, Warrior}


