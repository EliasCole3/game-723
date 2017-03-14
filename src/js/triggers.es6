'use strict'

import * as viewLogic            from 'view-logic.es6'
import * as utils                from 'utilities.es6'
import * as animations           from 'animations.es6'
import { Cell, Unit, Warrior, Archer, Wizard, Player, addUnitToBoard } from 'classes.es6'
/*

{
  state: 'unit just moved',
  gamestate: gamestate,
  unit: unit,
  cell: cell
}

 */
function checkTriggers(params) {

  console.log('checkTriggers called')

  switch(params.state) {

    /*
    {
      state: 'unit just moved',
      gamestate: gamestate,
      unit: unit,
      cell: cell
    }
     */
    case 'unit just moved':

      let moveConditions = [
        params.unit.name === 'Sarusek',
        params.cell.x === 3,
        params.cell.y === 1
      ]

      if(utils.allOfTheseAreTrue(moveConditions)) {

        setTimeout(() => {
          viewLogic.unitSays({
            gamestate: params.gamestate,
            unitName: 'Sarusek',
            messages: [
              'I found some treasure! _cackling_'
            ],
            callback: () => { console.log('done') }
          })
        }, 100)

      }

      break


    /*
    {
      state: 'unit just attacked',
      gamestate: gamestate,
      attacker: attacker,
      defender: defender
    }
     */
    case 'unit just attacked':

      let attackConditions = [
        params.attacker.name === 'Sarusek',
        params.defender.name === 'Thunder'
      ]

      if(utils.allOfTheseAreTrue(attackConditions)) {

        setTimeout(() => {
          viewLogic.unitSays({
            gamestate: params.gamestate,
            unitName: 'Sarusek',
            messages: [
              '...such a stupid name. Do you have a twin brother named Lightning? xD'
            ]
          })
        }, 100)

      }

      break
  }

}

export {
  checkTriggers
}
















