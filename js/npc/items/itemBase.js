import Sprite from '../../base/sprite'
import DataBus from '../../databus'

const __ = {
  speed: Symbol('speed')
}

let databus = new DataBus()

function rnd(start, end) {
  return Math.floor(Math.random() * (end - start) + start)
}

export default class BaseBase extends Sprite {
  constructor(imgSrc, width, height) {
    super(imgSrc, width, height)
  }

  init(speed, x, y) {
    this.x = x || rnd(0, window.innerWidth - this.width)
    this.y = y || window.innerHeight

    this[__.speed] = speed

    this.visible = true
  }

  // 每一帧更新位置
  update() {
    this.y -= this[__.speed]

    // 对象回收
    if (this.y < -(window.innerHeight + this.height)) {
      databus.removeItem(this)
    }
  }
}
