'use strict'

import * as utils from 'utilities.es6'
import * as viewLogic from './view-logic.es6'

function getNextId(gamestate) {
  return gamestate.nextUnitId++
}

function attack(gamestate, attacker, defender) {
  let battleResults = {}
  battleResults.messages = []

  let damageAmount = calculateDamage(attacker, defender)

  defender.current.hp -= damageAmount
  if(defender.current.hp < 0) defender.current.hp = 0

  battleResults.messages.push(`${attacker.name} attacked ${defender.name} for ${damageAmount} points of damage!`)
  battleResults.messages.push(`${defender.name} has ${defender.current.hp} out of ${defender.hp} health points remaining`)

  if(defender.current.hp <= 0) {
    battleResults.messages.push(`${defender.name} is knocked unconscious`)
  }

  let defenderMidpoint = utils.getUnitMidpoint(defender)

  viewLogic.addFloatingText({
    startCoordinates: {
      x: defenderMidpoint.x - 15,
      y: defenderMidpoint.y - 15
    },
    color: 'red',
    size: '24px',
    text: `-${damageAmount}`
  })

  return battleResults
}

function calculateDamage(attacker, defender) {
  let primaryStat = attacker[attacker.primaryStat]
  let bonus = getAttributeBonus(primaryStat)
  let roll = rollDice(getDiceRollForWeapon(attacker.items.equipped.weapon))
  let totalAttackDamage = roll + bonus

  let damageMitigation = getDamageMitigation(defender)

  let total = totalAttackDamage - damageMitigation

  if(total < 0) total = 0

  return total
}

function getDamageMitigation(defender) {
  return 2
}

function getDiceRollForWeapon(weapon) {
  if(weapon === 'basic staff') {
    return '1d6'
  }

  if(weapon === 'axe') {
    return '1d8'
  }

  if(weapon === 'basic bow') {
    return '1d10'
  }

  if(weapon === 'axe of the gods') {
    return '10d12'
  }

  return '1d4'
}

function rollDice(diceRollString) { // ex: '1d4'
  let pieces = diceRollString.split('d')
  let numberOfRolls = +pieces[0]
  let die = +pieces[1]
  let total = 0
  for(let i=0; i<numberOfRolls; i++) {
    total += utils.getRandomIntInclusive(1, die)
  }
  return total
}

function getAttributeBonus(attribute) {
  switch(attribute) {
    case 0:
    case 1:
      return -5
      break

    case 2:
    case 3:
      return -4
      break

    case 4:
    case 5:
      return -3
      break

    case 6:
    case 7:
      return -2
      break

    case 8:
    case 9:
      return -1
      break

    case 10:
    case 11:
      return 0
      break

    case 12:
    case 13:
      return +1
      break

    case 14:
    case 15:
      return +2
      break

    case 16:
    case 17:
      return +3
      break

    case 18:
    case 19:
      return +4
      break

    case 20:
    case 21:
      return +5
      break

    case 22:
    case 23:
      return +6
      break

    case 24:
    case 25:
      return +7
      break

    default:
      return +8
  }
}

function getCoordinatesForWeaponRange(weapon, x, y) {
  let coordinates = []

  if(weapon === 'axe' || weapon === 'axe of the gods' || weapon === 'basic staff') {
    coordinates.push({x: x - 1, y: y})
    coordinates.push({x: x + 1, y: y})
    coordinates.push({x: x, y: y - 1})
    coordinates.push({x: x, y: y + 1})
  }

  if(weapon === 'basic bow') {
    coordinates.push({x: x - 1, y: y - 1})
    coordinates.push({x: x - 1, y: y + 1})
    coordinates.push({x: x + 1, y: y - 1})
    coordinates.push({x: x + 1, y: y + 1})

    coordinates.push({x: x + 2, y: y})
    coordinates.push({x: x, y: y + 2})
    coordinates.push({x: x - 2, y: y})
    coordinates.push({x: x, y: y - 2})
  }

  if(weapon === 'long bow') {
    coordinates.push({x: x - 1, y: y - 1})
    coordinates.push({x: x - 1, y: y + 1})
    coordinates.push({x: x + 1, y: y - 1})
    coordinates.push({x: x + 1, y: y + 1})

    coordinates.push({x: x + 2, y: y})
    coordinates.push({x: x, y: y + 2})
    coordinates.push({x: x - 2, y: y})
    coordinates.push({x: x, y: y - 2})

    coordinates.push({x: x + 3, y: y})
    coordinates.push({x: x, y: y + 3})
    coordinates.push({x: x - 3, y: y})
    coordinates.push({x: x, y: y - 3})
  }

  // bow, spear, etc.

  return coordinates
}

function getCoordinatesForSpellRange(spell, xSelector, ySelector) {
  let coordinates = []

  if(spell.areaOfEffect === 'single') {
   coordinates.push({x: xSelector, y: ySelector})
  } else {
    /*
    [
      ['0', '1', '0'],
      ['1', 'x', '1'],
      ['0', '1', '0']
    ]

    [
      ['0', '0', '1', '0', '0'],
      ['0', '1', '1', '1', '0'],
      ['1', '1', 'x', '1', '1'],
      ['0', '1', '1', '1', '0'],
      ['0', '0', '1', '0', '0']
    ]
    */

    let midpoint

    spell.areaOfEffect.forEach((row, y) => {
      row.forEach((value, x) => {
        if(value === 'x') midpoint = {x: x, y: y}
      })
    })

    if(midpoint === undefined) throw new Error(`getCoordinatesForSpellRange() : no midpoint in ${spell.name}'s areaOfEffect`)

    spell.areaOfEffect.forEach((row, y) => {
      row.forEach((value, x) => {
        if(value === '1') {
          let _x = xSelector - (midpoint.x - x)
          let _y = ySelector - (midpoint.y - y)
          coordinates.push({x: _x, y: _y})
        }
      })
    })

  coordinates.push(midpoint)

  }

  return coordinates
}

function getCoordinatesForMoveRange(gamestate, unit) {

  let coordinates = getAvailableMoves(gamestate, unit.x, unit.y, unit.speed)

  return coordinates
}


function getAvailableMoves(gamestate, x, y, movesLeft, moves=[]) {

  let potentialCoordinates = [
    {x: x - 1, y: y},
    {x: x + 1, y: y},
    {x: x, y: y - 1},
    {x: x, y: y + 1}
  ]

  let board = gamestate.board

  potentialCoordinates.forEach(cell => {
    let x = cell.x
    let y = cell.y

    if(board[x] && board[x][y] && board[x][y].passable) {

      if(!utils.arrayContainsObject(moves, cell)) {
        moves.push(cell)
      }

      if(movesLeft > 1) {
        getAvailableMoves(gamestate, cell.x, cell.y, movesLeft - 1).forEach(foundMove => {
          if(!utils.arrayContainsObject(moves, foundMove)) {
            moves.push(foundMove)
          }
        })
      }

    }

  })

  return moves
}


















































export {getNextId, attack, getCoordinatesForWeaponRange, getCoordinatesForSpellRange, getCoordinatesForMoveRange}













































