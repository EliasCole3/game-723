'use strict'

import * as utils                from 'utilities.es6'
import * as animations           from 'animations.es6'
import { Cell, Unit, Warrior, Archer, Wizard, Player, addUnitToBoard, Spell } from 'classes.es6'
import fireball       from '../images/spells/fireball.png'
import iceShard       from '../images/spells/ice-shard.jpg'

let spells = []

spells.push(new Spell(
  1,
  'Fireball',
  '2d6',
  'burning',
  {
    'default': fireball
  },
  'single'
))

spells.push(new Spell(
  2,
  'Ice Shard',
  '1d10',
  'slowed',
  {
    'default': iceShard
  },
  [
    ['0', '1', '0'],
    ['1', '1', '1'],
    ['0', '1', '0']
  ]
))

export {
  spells
}
















