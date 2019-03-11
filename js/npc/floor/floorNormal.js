import FloorBase from './floorBase'
const ENEMY_IMG_SRC = 'images/floor0.png'
export default class FloorNormal extends FloorBase {
  constructor() {
    super(ENEMY_IMG_SRC, 100, 20)
  }

  hitRun(target) {
    if (this.hit) {
      return;
    }
    this.hit = true;
  }

  setView(ctx){
    this.drawToCanvas(ctx)
  }
}
