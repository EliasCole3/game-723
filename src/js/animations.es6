'use strict'

import greensock from 'greensock.js'
import * as utils from 'utilities.es6'
import { Warrior, Archer, Wizard } from 'classes.es6'

// function test() {

//   // <div id='one' class='demobox'></div>

//   // .demobox {
//   //   position: absolute;
//   //   width: 100px;
//   //   height: 100px;
//   // }

//   let one = document.getElementById('one')
//   TweenMax.to(one, 3, {left: '600px', backgroundColor: 'black', opacity: '.3'})
// }

function attack(gamestate, attacker, defender) {
  let attackerBox = document.getElementById(`${attacker.x}-${attacker.y}`).getBoundingClientRect()
  let defenderBox = document.getElementById(`${defender.x}-${defender.y}`).getBoundingClientRect()

  let attackerMidX = (attackerBox.right + attackerBox.left) / 2
  let attackerMidY = (attackerBox.top + attackerBox.bottom) / 2
  let defenderMidX = (defenderBox.right + defenderBox.left) / 2
  let defenderMidY = (defenderBox.top + defenderBox.bottom) / 2

  if(attacker instanceof Wizard) {
    burstOfStars({
      originX: attackerMidX,
      originY: attackerMidY,
      destinationX: defenderMidX,
      destinationY: defenderMidY,
      spread: 25,
      amount: 500,
      duration: 2,
      startColor: 'yellow',
      finishColor: 'black'
    })
  }



}












function addAStar(params) {
  let randomId = utils.getRandomIntInclusive(10000000, 99999999)
  let styles = [
    `background-color: ${params.startColor}`,
    `top: ${params.originY}px`,
    `left: ${params.originX}px`
  ]
  let htmlString = `<span id='${randomId}' class='demobox-tiny' style='${styles.join(';')}'></span>`
  $('#wrapper').append(htmlString)
  let newRandomParticle = $(`#${randomId}`)
  TweenMax.to(newRandomParticle, 2, {
    left: `${params.finalTargetX}px`,
    top: `${params.finalTargetY}px`,
    backgroundColor: `${params.finishColor}`,
    opacity: '.5',
    rotation: 3000,
    onComplete: () => {
      // need something better. On number collision, it's leaving a box at the origin
      newRandomParticle.remove()
    }
  })
}

function addAVariableSquareStar(params) {
  let randomId = utils.getRandomIntInclusive(100000, 999999)
  let randomDimension = utils.getRandomIntInclusive(5, 25)
  let styles = [
    `background-color: ${params.startColor}`,
    `top: ${params.originY}px`,
    `left: ${params.originX}px`,
    `position: absolute`,
    `width: ${randomDimension}px`,
    `height: ${randomDimension}px`
  ]
  let htmlString = `<span id='${randomId}'  style='${styles.join(';')}'></span>`
  $('#wrapper').append(htmlString)
  let newRandomParticle = $(`#${randomId}`)
  TweenMax.to(newRandomParticle, 2, {
    left: `${params.finalTargetX}px`,
    top: `${params.finalTargetY}px`,
    backgroundColor: `${params.finishColor}`,
    opacity: '.5',
    rotation: 3000,
    onComplete: () => {
      // need something better. On number collision, it's leaving a box at the origin
      newRandomParticle.remove()
    }
  })
}

function addAVariableRectangleStar(params) {
  let randomId = utils.getRandomIntInclusive(100000, 999999)
  let styles = [
    `background-color: ${params.startColor}`,
    `top: ${params.originY}px`,
    `left: ${params.originX}px`,
    `position: absolute`,
    `width: ${utils.getRandomIntInclusive(5, 30)}px`,
    `height: ${utils.getRandomIntInclusive(5, 30)}px`
  ]
  let htmlString = `<span id='${randomId}'  style='${styles.join(';')}'></span>`
  $('#wrapper').append(htmlString)
  let newRandomParticle = $(`#${randomId}`)
  TweenMax.to(newRandomParticle, 2, {
    left: `${params.finalTargetX}px`,
    top: `${params.finalTargetY}px`,
    backgroundColor: `${params.finishColor}`,
    opacity: '.5',
    rotation: 3000,
    onComplete: () => {
      // need something better. On number collision, it's leaving a box at the origin
      newRandomParticle.remove()
    }
  })
}

function burstOfStars(params) {
  if(!params.spread)      params.spread      = 25
  if(!params.amount)      params.amount      = 100
  if(!params.duration)    params.duration    = 3
  if(!params.startColor)  params.startColor  = 'red'
  if(!params.finishColor) params.finishColor = 'yellow'
  if(!params.starType)    params.starType    = 'default'


  let intervalTime = (params.duration * 1000) / params.amount

  let intervalId = setInterval(() => {
    addABurstStar(params)
  }, intervalTime)

  setTimeout(() => {
    clearInterval(intervalId)
  }, params.duration*1000)

}

function addABurstStar(params) {
  params.finalTargetX = params.destinationX + utils.getRandomIntInclusive(-params.spread, params.spread)
  params.finalTargetY = params.destinationY + utils.getRandomIntInclusive(-params.spread, params.spread)

  switch(params.starType) {
    case 'default':
      addAStar(params)
      break

    case 'variableSquare':
      addAVariableSquareStar(params)
      break

    case 'variableRectangle':
      addAVariableRectangleStar(params)
      break

    default:
      addAStar(params)
  }

}



function starSquareFill(params) {
  let intervalId = setInterval(() => {
    addAnExplosionStar(params)
  }, 10)

  setTimeout(() => {
    clearInterval(intervalId)
  }, 5*1000)
}

function starSquareEdge(params) {
  let intervalId = setInterval(() => {
    addAnExplosionStar_edge(params)
  }, 10)

  setTimeout(() => {
    clearInterval(intervalId)
  }, 5*1000)
}

function starCircleFill(params) {
  let intervalId = setInterval(() => {
    addAnExplosionStar_circle(params)
  }, 10)

  setTimeout(() => {
    clearInterval(intervalId)
  }, 5*1000)
}

function starCircleEdge(params) {
  let intervalId = setInterval(() => {
    addAnExplosionStar_circle_edge(params)
  }, 10)

  // setInterval(() => {addAnExplosionStar_circle_edge(params)}, 10)
  // setInterval(() => {addAnExplosionStar_circle_edge(params)}, 10)
  // setInterval(() => {addAnExplosionStar_circle_edge(params)}, 10)
  // setInterval(() => {addAnExplosionStar_circle_edge(params)}, 10)

  setTimeout(() => {
    clearInterval(intervalId)
  }, 5*1000)
}



function addAnExplosionStar(params) {
  params.finalTargetX = utils.getRandomIntInclusive(params.lowerBoundX, params.upperBoundX)
  params.finalTargetY = utils.getRandomIntInclusive(params.lowerBoundY, params.upperBoundY)
  addAStar(params)
}

function addAnExplosionStar_edge(params) {
  let cases = utils.getRandomIntInclusive(1, 4)
  switch(cases) {
    case 1:
      params.finalTargetX = params.upperBoundX
      params.finalTargetY = utils.getRandomIntInclusive(params.lowerBoundY, params.upperBoundY)
      break
    case 2:
      params.finalTargetX = params.lowerBoundX
      params.finalTargetY = utils.getRandomIntInclusive(params.lowerBoundY, params.upperBoundY)
      break
    case 3:
      params.finalTargetX = utils.getRandomIntInclusive(params.lowerBoundX, params.upperBoundX)
      params.finalTargetY = params.upperBoundY
      break
    case 4:
      params.finalTargetX = utils.getRandomIntInclusive(params.lowerBoundX, params.upperBoundX)
      params.finalTargetY = params.lowerBoundY
      break
  }
  addAStar(params)
}

function addAnExplosionStar_circle(params) {
  let angle = utils.getRandomAngleInRadians()

  // this produces a ring(with params.radius == 200)
  let radius = utils.getRandomIntInclusive(150, params.radius)
  params.finalTargetX = params.originX + (Math.cos(angle) * radius)
  params.finalTargetY = params.originY + (Math.sin(angle) * radius)

  // this produces a distribution heavier closer to the origin
  // let radius = utils.getRandomIntInclusive(5, params.radius)
  // params.finalTargetX = params.originX + (Math.cos(angle) * radius)
  // params.finalTargetY = params.originY + (Math.sin(angle) * radius)

  // this produces a cross distribution. Heavier starts along the axes
  // params.finalTargetX = params.originX + (Math.cos(angle) * utils.getRandomIntInclusive(5, params.radius))
  // params.finalTargetY = params.originY + (Math.sin(angle) * utils.getRandomIntInclusive(5, params.radius))
  addAStar(params)
}

function addAnExplosionStar_circle_edge(params) {
  let angle = utils.getRandomAngleInRadians()
  params.finalTargetX = params.originX + (Math.cos(angle) * params.radius)
  params.finalTargetY = params.originY + (Math.sin(angle) * params.radius)
  addAStar(params)
}


































export {attack}


















