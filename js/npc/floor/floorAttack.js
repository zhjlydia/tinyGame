import FloorBase from './floorBase'
const ENEMY_IMG_SRC = 'images/floor3.png'
export default class FloorAttack extends FloorBase {
  constructor() {
    super(ENEMY_IMG_SRC, 100, 20)
  }

  hitRun(target) {
    if (this.hit) {
      return;
    }
    this.hit = true;
    target.blood-=1
  }
  setView(ctx) {
    this.drawToCanvas(ctx)
  }
}
