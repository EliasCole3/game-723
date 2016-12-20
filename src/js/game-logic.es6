function getNextId(gamestate) {
  return gamestate.nextUnitId++
}

function attack(attacker, defender, gamestate) {
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
  if(weapon === 'axe') {
    return '1d6'
  }

  if(weapon === 'axe of the gods') {
    return '10d12'
  }

  return '1d4'
}

function rollDice(diceRollString) { //'1d4'
  // console.log('rolling dice')
  // console.log(`dice string: ${diceRollString}`)
  let pieces = diceRollString.split('d')
  let numberOfRolls = +pieces[0]
  let die = +pieces[1]
  let total = 0
  // console.log(`numberOfRolls: ${numberOfRolls}`)
  for(let i=0; i<numberOfRolls; i++) {
    total += getRandomIntInclusive(1, die)
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

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}







export {getNextId, attack}