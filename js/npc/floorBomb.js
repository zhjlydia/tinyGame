import FloorBase from '../npc/floorBase'
const ENEMY_IMG_SRC = 'images/floor2.png'
export default class FloorBomb extends FloorBase {
  constructor() {
    super(ENEMY_IMG_SRC, 100, 20)
  }

  hitRun(target) {
    if (this.hit) {
      return;
    }
    this.hit = true;
  }
  setView(ctx) {
    this.drawToCanvas(ctx)
  }
}
