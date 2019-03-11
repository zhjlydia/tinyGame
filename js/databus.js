import Pool from './base/pool'

let instance

/**
 * 全局状态管理器
 */
export default class DataBus {
  constructor() {
    if ( instance )
      return instance

    instance = this

    this.pool = new Pool()

    this.reset()
  }

  reset() {
    this.frame      = 0
    this.score      = 0
    this.floors     = []
    this.items      = []
    this.animations = []
    this.gameOver   = false
  }

  /**
   * 回收地板，进入对象池
   * 此后不进入帧循环
   */
  removeFloor(floor) {
    let temp = this.floors.shift()
    temp.visible = false
    this.pool.recover('floor', floor)
  }

  removeItem(item){
    let temp = this.items.shift()
    temp.visible = false
    this.pool.recover('item', item)
  }
}
