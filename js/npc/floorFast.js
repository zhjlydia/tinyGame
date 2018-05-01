import FloorBase from '../npc/floorBase'
const ENEMY_IMG_SRC = 'images/floor4.png'
export default class FloorFast extends FloorBase {
  constructor() {
    super(ENEMY_IMG_SRC, 100, 20)
  }

  hitRun() {
    if (this.hit) {
      return;
    }
    this.hit = true;

  }
  setView(ctx) {
    this.drawToCanvas(ctx)
  }
}
