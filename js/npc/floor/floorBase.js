import Sprite from '../../base/sprite'
import DataBus from '../../databus'

const __ = {
  speed: Symbol('speed')
}

let databus = new DataBus()

function rnd(start, end) {
  return Math.floor(Math.random() * (end - start) + start)
}

export default class FloorBase extends Sprite {
  constructor(imgSrc, width, height) {
    super(imgSrc, width, height)
    this.hit=false
    this.ctrlIndex=0
  }

  init(speed,x,y) {
    this.x = x || rnd(0, window.innerWidth - this.width)
    this.y = y || window.innerHeight

    this[__.speed] = speed

    this.visible = true
  }

  // 每一帧更新位置
  update() {
    this.y -= this[__.speed]

    // 对象回收
    if (this.y < -(window.innerHeight + this.height)){
      this.hit=false
      this.ctrlIndex=0
      databus.removeFloor(this)
    }
  }

  /**
 * 地板的顶部与player底部接触
 * @param{Sprite} sp: Sptite的实例
 */
  isTouched(sp) {
    let spX = sp.x + sp.width / 2
    let spY = sp.y + sp.height

    if (!this.visible || !sp.visible)
      return false

    return !!(spX >= this.x
      && spX <= this.x + this.width
      && spY >= this.y
      && spY <= this.y + this.height)
  }
}
