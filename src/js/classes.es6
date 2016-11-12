// module.exports = class Cell {

//   constructor(x, y, cellType, backgroundImage) {
//     this.x = x
//     this.y = y
//     this.cellType = cellType
//     this.backgroundImage = backgroundImage
//   }

// }

class Cell {

  constructor(x, y, cellType, backgroundImage) {
    this.x = x
    this.y = y
    this.cellType = cellType
    this.backgroundImage = backgroundImage
  }

}

class Blah {

  constructor(x, y, cellType, backgroundImage) {
    this.x = x
    this.y = y
    this.cellType = cellType
    this.backgroundImage = backgroundImage
  }

}

class Unit {

  constructor(x, y, hp, mp, strength, intelligence, dexterity) {
    this.x = x
    this.y = y
    this.hp = hp
    this.mp = mp
    this.strength = strength
    this.intelligence = intelligence
    this.dexterity = dexterity
  }


}

class Warrior extends Unit {

  constructor(x, y, hp, mp, strength, intelligence, dexterity, backgroundImage, name) {
    super(x, y, hp, mp, strength, intelligence, dexterity)
    this.backgroundImage = backgroundImage
    this.name = name
  }

}

// function setConstructorParams() {

// }


// constructor(...params) {
//   params.forEach(x => {
//     this[x] = x
//   })
// }


export {Cell, Blah, Unit, Warrior}


