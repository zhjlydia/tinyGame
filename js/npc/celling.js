import Sprite from '../base/sprite'

const ENEMY_IMG_SRC = 'images/ue.png'
const ENEMY_WIDTH = window.innerWidth
const ENEMY_HEIGHT = 16

export default class Celling extends Sprite {
  constructor() {
    super(ENEMY_IMG_SRC, ENEMY_WIDTH, ENEMY_HEIGHT)

    this.x = 0
    this.y = 0
  }
}
